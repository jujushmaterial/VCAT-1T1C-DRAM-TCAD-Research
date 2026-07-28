const stateLabels = {
  waiting: "대기",
  "in-progress": "진행 중",
  review: "검토 중",
  completed: "완료",
  blocked: "문제 발생",
  locked: "선행 단계 대기"
};

const submissionTypeLabels = {
  files: "파일 제출",
  code: "코드 제출",
  server: "서버 경로"
};

const codeTypeOptions = [
  ["sde", "Sentaurus SDE"],
  ["sprocess", "Sentaurus SProcess"],
  ["sdevice", "Sentaurus SDevice"],
  ["svisual", "Sentaurus SVisual"],
  ["tcl", "Tcl"],
  ["python", "Python"],
  ["other", "기타"]
];

const allowedUploadExtensions = new Set([
  "png", "jpg", "jpeg", "svg", "webp", "pdf", "docx", "pptx", "xlsx",
  "csv", "json", "txt", "md", "zip"
]);
const maxFileBytes = 10 * 1024 * 1024;
const maxUploadBytes = 30 * 1024 * 1024;
const maxUploadFiles = 10;

const config = window.DASHBOARD_CONFIG ?? {};
const apiBaseUrl = String(config.apiBaseUrl ?? "").replace(/\/$/, "");
const pollIntervalMs = Number(config.pollIntervalMs ?? 15000);
const sessionKey = "vcatDashboardSession";

let allPhases = [];
let allMembers = [];
let membersByLogin = new Map();
let activeFilter = "all";
let sessionToken = sessionStorage.getItem(sessionKey) ?? "";
let currentUser = null;
let dialogPhaseId = null;
let dialogPollTimer = null;
let editingChecklist = false;
let checklistDirty = false;
let submissionOutput = null;
let completionCheckbox = null;
let selectedUploadFiles = [];
let codeBlocks = [];
let codeDescription = "";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "기록 없음";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatRelative(value) {
  if (!value) return "활동 기록 없음";
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return formatDate(value);
  const minutes = Math.max(0, Math.round((Date.now() - time) / 60000));
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.round(hours / 24);
  return `${days}일 전`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

function displayName(login) {
  if (!login) return "기록 없음";
  return membersByLogin.get(String(login).toLowerCase())?.name ?? `@${login}`;
}

function displayAssignees(assignees = []) {
  return assignees.length ? assignees.map(displayName).join(" · ") : "미정";
}

function handleAuthRedirect() {
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const token = hash.get("session");
  if (!token) return;
  sessionToken = token;
  sessionStorage.setItem(sessionKey, token);
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

async function apiFetch(path, options = {}) {
  if (!apiBaseUrl) throw new Error("편집 API가 아직 연결되지 않았습니다.");
  const headers = new Headers(options.headers ?? {});
  headers.set("Accept", "application/json");
  if (sessionToken) headers.set("Authorization", `Bearer ${sessionToken}`);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message ?? `요청 실패 (${response.status})`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

async function refreshAuthState() {
  const button = document.querySelector("#auth-button");
  const userLabel = document.querySelector("#auth-user");

  if (!apiBaseUrl) {
    button.textContent = "편집 기능 준비 중";
    button.title = "Cloudflare Worker 연결 후 GitHub 로그인이 활성화됩니다.";
    userLabel.hidden = true;
    return;
  }

  if (!sessionToken) {
    currentUser = null;
    button.textContent = "GitHub 로그인";
    userLabel.hidden = true;
    return;
  }

  try {
    const data = await apiFetch("/api/me");
    currentUser = data.user;
    button.textContent = "로그아웃";
    userLabel.textContent = displayName(data.user.login);
    userLabel.hidden = false;
  } catch (error) {
    sessionToken = "";
    currentUser = null;
    sessionStorage.removeItem(sessionKey);
    button.textContent = "GitHub 로그인";
    userLabel.hidden = true;
    if (error.status !== 401) showToast(error.message);
  }
}

function memberCard(member) {
  const username = escapeHtml(member.username);
  const avatar = `https://github.com/${encodeURIComponent(member.username)}.png?size=96`;
  const state = member.status ?? member.activityState ?? "inactive";
  const activity = member.recentActivity
    ? `${escapeHtml(member.recentActivity)} · ${escapeHtml(formatRelative(member.lastActivityAt))}`
    : escapeHtml(formatRelative(member.lastActivityAt));

  return `
    <a class="team-card" data-member-state="${escapeHtml(state)}" href="${escapeHtml(member.folderUrl)}" target="_blank" rel="noreferrer">
      <img src="${avatar}" alt="${escapeHtml(member.name)} GitHub 프로필 이미지" loading="lazy">
      <div>
        <strong>${escapeHtml(member.name)}</strong>
        <span class="member-username">@${username}</span>
      </div>
      <span class="member-activity">${activity}</span>
    </a>`;
}

function renderMembers(members = []) {
  allMembers = members;
  membersByLogin = new Map(members.map((member) => [String(member.username).toLowerCase(), member]));
  const grid = document.querySelector("#team-grid");
  grid.innerHTML = members.length
    ? members.map(memberCard).join("")
    : '<div class="empty">등록된 연구원이 없습니다.</div>';
}

function phaseCard(phase) {
  const assignee = displayAssignees(phase.assignees);
  const modifier = phase.lastModifiedBy
    ? `${displayName(phase.lastModifiedBy)} · ${formatRelative(phase.updatedAt)}`
    : formatRelative(phase.updatedAt);
  return `
    <article class="phase-card" data-state="${phase.state}" data-phase-id="${phase.id}">
      <div class="phase-card__top">
        <span class="phase-number">P${phase.id}</span>
        <span class="status-chip">${stateLabels[phase.state] ?? escapeHtml(phase.state)}</span>
      </div>
      <h3>${escapeHtml(phase.shortTitle || phase.title)}</h3>
      <p class="phase-card__tool">${escapeHtml(phase.tool)}</p>
      <p class="phase-card__activity">최근 ${escapeHtml(modifier)}</p>
      <div class="metric-row">
        <div class="metric-row__labels">
          <span>작업·결과물</span>
          <strong>${phase.progress}%</strong>
        </div>
        <div class="progress"><span style="width:${phase.progress}%"></span></div>
      </div>
      <div class="phase-card__meta">
        <span>담당 ${escapeHtml(assignee)}</span>
        <span>${phase.tasksDone + phase.outputsDone}/${phase.tasksTotal + phase.outputsTotal}</span>
      </div>
      <div class="phase-card__actions phase-card__actions--single">
        <button class="btn btn--primary detail-button" data-phase-id="${phase.id}" type="button">내용 보기</button>
      </div>
    </article>`;
}

function renderPhases() {
  const grid = document.querySelector("#phase-grid");
  const filtered = activeFilter === "all"
    ? allPhases
    : allPhases.filter((phase) => phase.state === activeFilter);

  grid.innerHTML = filtered.length
    ? filtered.map(phaseCard).join("")
    : '<div class="empty">해당 상태의 단계가 없습니다.</div>';

  document.querySelectorAll(".detail-button").forEach((button) => {
    button.addEventListener("click", () => openDialog(Number(button.dataset.phaseId)));
  });
}

function updateSummary(statusData) {
  const progress = Number(statusData.overallProgress ?? 0);
  document.querySelector("#overall-progress").textContent = `${progress}%`;
  document.querySelector("#overall-progress-bar").style.width = `${progress}%`;
  document.querySelector("#last-updated").textContent = `최근 반영 ${formatDate(statusData.generatedAt)}`;

  const states = allPhases.map((phase) => phase.state);
  document.querySelector("#count-all").textContent = allPhases.length;
  document.querySelector("#count-progress").textContent = states.filter((state) => state === "in-progress").length;
  document.querySelector("#count-review").textContent = states.filter((state) => state === "review" || state === "completed").length;
  document.querySelector("#count-waiting").textContent = states.filter((state) => state === "waiting" || state === "locked").length;
}

function submissionAction(item, editable) {
  if (!item.id) {
    return editable ? '<span class="output-state">먼저 저장</span>' : "";
  }
  const submissions = item.submissions ?? [];
  const review = submissions.length
    ? `<button class="output-review" type="button" data-output-id="${escapeHtml(item.id)}">결과 확인${submissions.length > 1 ? ` ${submissions.length}건` : ""}</button>`
    : `<span class="output-state">${item.checked ? "파일 없음" : "미제출"}</span>`;
  const submit = editable
    ? `<button class="output-submit" type="button" data-output-id="${escapeHtml(item.id)}">제출</button>`
    : "";
  return `<span class="output-actions">${review}${submit}</span>`;
}

function renderChecklist(items, listName, editable) {
  if (!items?.length) return '<div class="empty-checklist">등록된 항목이 없습니다.</div>';
  return `<div class="checklist">${items.map((item, index) => `
    <div class="checklist-row ${item.checked ? "is-done" : ""}" data-list="${listName}" data-index="${index}" data-id="${escapeHtml(item.id ?? "")}">
      <input type="checkbox" aria-label="${listName} ${index + 1} 완료" ${item.checked ? "checked" : ""} ${editable ? "" : "disabled"} data-initial-checked="${item.checked ? "true" : "false"}">
      ${editable
        ? `<input class="checklist-input" type="text" value="${escapeHtml(item.text)}" aria-label="${listName} ${index + 1} 내용">`
        : `<span class="checklist-text">${escapeHtml(item.text)}</span>`}
      ${listName === "outputs" ? submissionAction(item, editable) : ""}
      ${editable ? '<button class="checklist-delete" type="button" aria-label="항목 삭제">×</button>' : ""}
    </div>`).join("")}</div>`;
}

function getDialogPhase() {
  return allPhases.find((item) => item.id === dialogPhaseId);
}

function renderDialog(phase, options = {}) {
  if (!phase) return;
  const dialog = document.querySelector("#phase-dialog");
  const assignee = displayAssignees(phase.assignees);
  const editable = Boolean(options.editable);
  const canEdit = Boolean(currentUser && apiBaseUrl && phase.issueNumber);
  const sourceLabel = options.live ? "GitHub Issue 실시간 데이터" : "최근 자동 동기화 데이터";
  const modifier = phase.lastModifiedBy
    ? `${displayName(phase.lastModifiedBy)} · ${phase.lastModifiedAction || "수정"} · ${formatRelative(phase.updatedAt)}`
    : formatRelative(phase.updatedAt);

  document.querySelector("#dialog-content").innerHTML = `
    <span class="dialog-phase">PHASE ${phase.id} · ${stateLabels[phase.state] ?? escapeHtml(phase.state)}</span>
    <h2>${escapeHtml(phase.title)}</h2>

    <div class="dialog-summary">
      <div><span>진행률</span><strong>${phase.progress}%</strong></div>
      <div><span>담당자</span><strong>${escapeHtml(assignee)}</strong></div>
      <div><span>최근 수정</span><strong>${escapeHtml(modifier)}</strong></div>
    </div>

    <div class="dialog-section">
      <div class="dialog-section__heading">
        <h3>해야 할 것</h3>
        ${editable ? '<button class="btn btn--small add-item" data-list="tasks" type="button">항목 추가</button>' : ""}
      </div>
      <div id="tasks-list">${renderChecklist(phase.tasks ?? [], "tasks", editable)}</div>
    </div>

    <div class="dialog-section">
      <div class="dialog-section__heading">
        <h3>나와야 하는 결과물</h3>
        ${editable ? '<button class="btn btn--small add-item" data-list="outputs" type="button">항목 추가</button>' : ""}
      </div>
      <div id="outputs-list">${renderChecklist(phase.outputs ?? [], "outputs", editable)}</div>
    </div>

    <div class="dialog-section">
      <h3>과정의 이유</h3>
      <p>${escapeHtml(phase.reason)}</p>
    </div>

    <div class="dialog-section">
      <h3>다음 과정</h3>
      <p>${escapeHtml(phase.next)}</p>
    </div>

    <div class="dialog-actions">
      ${editable
        ? '<button id="save-checklist" class="btn btn--primary" type="button">Issue에 저장</button><button id="cancel-edit" class="btn" type="button">취소</button>'
        : `<button id="edit-checklist" class="btn btn--primary" type="button" ${canEdit ? "" : "disabled"}>${currentUser ? "체크리스트 편집" : "GitHub 로그인 후 편집"}</button>`}
      <a class="btn" href="${escapeHtml(phase.issueUrl)}" target="_blank" rel="noreferrer">GitHub Issue 열기</a>
    </div>
    <div class="dialog-notice">
      <span class="sync-state">${escapeHtml(sourceLabel)}</span>
      ${!apiBaseUrl ? "<br>양방향 편집은 Worker 배포 후 활성화됩니다." : ""}
    </div>`;

  if (!dialog.open) dialog.showModal();
  bindDialogEvents(editable);
}

function readEditableChecklist() {
  const result = { tasks: [], outputs: [] };
  document.querySelectorAll("#dialog-content .checklist-row").forEach((row) => {
    const list = row.dataset.list;
    const checkbox = row.querySelector('input[type="checkbox"]');
    const input = row.querySelector(".checklist-input");
    if (!list || !checkbox || !input) return;
    const text = input.value.trim();
    if (!text) return;
    result[list].push({
      checked: checkbox.checked,
      text,
      ...(row.dataset.id ? { id: row.dataset.id } : {})
    });
  });
  return result;
}

function findOutputById(id) {
  return getDialogPhase()?.outputs?.find((item) => item.id === id) ?? null;
}

function bindDialogEvents(editable) {
  document.querySelectorAll(".output-review").forEach((button) => {
    button.addEventListener("click", () => reviewOutput(findOutputById(button.dataset.outputId)));
  });

  if (editable) {
    document.querySelectorAll("#dialog-content .checklist-row input").forEach((input) => {
      input.addEventListener("input", () => { checklistDirty = true; });
      input.addEventListener("change", () => {
        checklistDirty = true;
        input.closest(".checklist-row")?.classList.toggle("is-done", input.type === "checkbox" && input.checked);
      });
    });

    document.querySelectorAll('#outputs-list .checklist-row input[type="checkbox"]').forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked && checkbox.dataset.initialChecked !== "true") {
          const output = findOutputById(checkbox.closest(".checklist-row")?.dataset.id);
          if (output) openSubmissionChoice(output, checkbox);
        }
      });
    });

    document.querySelectorAll(".output-submit").forEach((button) => {
      button.addEventListener("click", () => {
        const output = findOutputById(button.dataset.outputId);
        if (output) openSubmissionChoice(output, null);
      });
    });

    document.querySelectorAll(".checklist-delete").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".checklist-row")?.remove();
        checklistDirty = true;
      });
    });
    document.querySelectorAll(".add-item").forEach((button) => {
      button.addEventListener("click", () => addChecklistItem(button.dataset.list));
    });
    document.querySelector("#save-checklist")?.addEventListener("click", saveChecklist);
    document.querySelector("#cancel-edit")?.addEventListener("click", () => {
      editingChecklist = false;
      checklistDirty = false;
      renderDialog(getDialogPhase(), { live: true });
    });
  } else {
    document.querySelector("#edit-checklist")?.addEventListener("click", () => {
      if (!currentUser) {
        startLogin();
        return;
      }
      editingChecklist = true;
      checklistDirty = false;
      renderDialog(getDialogPhase(), { live: true, editable: true });
    });
  }
}

function addChecklistItem(listName) {
  const phase = getDialogPhase();
  if (!phase || !["tasks", "outputs"].includes(listName)) return;
  const current = readEditableChecklist();
  current[listName].push({ checked: false, text: "" });
  phase.tasks = current.tasks;
  phase.outputs = current.outputs;
  renderDialog(phase, { live: true, editable: true });
  checklistDirty = true;
  document.querySelector(`#${listName}-list .checklist-row:last-child .checklist-input`)?.focus();
}

function applyIssueData(phase, data, action = null) {
  phase.tasks = data.tasks ?? phase.tasks;
  phase.outputs = data.outputs ?? phase.outputs;
  phase.assignees = data.assignees ?? phase.assignees;
  phase.updatedAt = data.updatedAt ?? phase.updatedAt;
  phase.issueUrl = data.issueUrl ?? phase.issueUrl;
  phase.tasksDone = phase.tasks.filter((item) => item.checked).length;
  phase.tasksTotal = phase.tasks.length;
  phase.outputsDone = phase.outputs.filter((item) => item.checked).length;
  phase.outputsTotal = phase.outputs.length;
  const total = phase.tasksTotal + phase.outputsTotal;
  const done = phase.tasksDone + phase.outputsDone;
  phase.progress = total ? Math.round(done / total * 100) : 0;
  if (data.modifiedBy) phase.lastModifiedBy = data.modifiedBy;
  if (action || data.modifiedAction) phase.lastModifiedAction = action || data.modifiedAction;
}

async function fetchLiveIssue(phase, { silent = false } = {}) {
  if (!apiBaseUrl || !sessionToken || editingChecklist) return;
  try {
    const data = await apiFetch(`/api/issues/${phase.issueNumber}`);
    applyIssueData(phase, data);
    if (dialogPhaseId === phase.id) renderDialog(phase, { live: true });
    renderPhases();
  } catch (error) {
    if (!silent) showToast(error.message);
  }
}

async function saveChecklist() {
  const phase = getDialogPhase();
  if (!phase) return;
  const button = document.querySelector("#save-checklist");
  button.disabled = true;
  button.textContent = "저장 중";

  try {
    const lists = readEditableChecklist();
    const data = await apiFetch(`/api/issues/${phase.issueNumber}/checklist`, {
      method: "PATCH",
      body: JSON.stringify({
        expectedUpdatedAt: phase.updatedAt,
        tasks: lists.tasks,
        outputs: lists.outputs
      })
    });
    applyIssueData(phase, data, "체크리스트 수정");
    editingChecklist = false;
    checklistDirty = false;
    renderDialog(phase, { live: true });
    renderPhases();
    showToast("GitHub Issue에 저장했습니다.");
  } catch (error) {
    if (error.status === 409) {
      showToast("다른 연구원이 먼저 수정했습니다. 최신 내용을 다시 불러옵니다.");
      editingChecklist = false;
      checklistDirty = false;
      await fetchLiveIssue(phase);
    } else {
      showToast(error.message);
      button.disabled = false;
      button.textContent = "Issue에 저장";
    }
  }
}

function openSubmissionDialog(html) {
  const dialog = document.querySelector("#submission-dialog");
  document.querySelector("#submission-content").innerHTML = html;
  if (!dialog.open) dialog.showModal();
}

function closeSubmissionDialog({ revert = false } = {}) {
  if (revert && completionCheckbox) {
    completionCheckbox.checked = false;
    completionCheckbox.closest(".checklist-row")?.classList.remove("is-done");
  }
  completionCheckbox = null;
  submissionOutput = null;
  selectedUploadFiles = [];
  codeBlocks = [];
  codeDescription = "";
  document.querySelector("#submission-dialog")?.close();
}

function openSubmissionChoice(output, checkbox) {
  submissionOutput = output;
  completionCheckbox = checkbox;
  openSubmissionDialog(`
    <span class="dialog-phase">결과물 ${escapeHtml(output.id)}</span>
    <h2>이 결과물을 어떻게 완료하시겠습니까?</h2>
    <p class="submission-target">${escapeHtml(output.text)}</p>
    <div class="submission-choice-grid">
      <button class="submission-choice" data-mode="files" type="button"><strong>파일 업로드</strong><span>이미지, 그래프, 표, PDF 및 문서 제출</span></button>
      <button class="submission-choice" data-mode="code" type="button"><strong>코드 삽입</strong><span>SDE, SProcess, SDevice, SVisual, Tcl, Python 코드 붙여넣기</span></button>
      <button class="submission-choice" data-mode="server" type="button"><strong>서버 경로 등록</strong><span>대용량 TDR, PLT 및 서버 원본 위치 기록</span></button>
      ${checkbox ? '<button class="submission-choice" data-mode="check-only" type="button"><strong>체크만 완료</strong><span>제출 파일 없이 완료 표시</span></button>' : ""}
    </div>
    <div class="dialog-actions"><button id="submission-cancel" class="btn" type="button">취소</button></div>`);

  document.querySelectorAll(".submission-choice").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (mode === "check-only") {
        if (completionCheckbox) completionCheckbox.dataset.initialChecked = "true";
        completionCheckbox = null;
        checklistDirty = true;
        closeSubmissionDialog();
      } else if (mode === "files") {
        renderFileSubmission();
      } else if (mode === "code") {
        codeBlocks = [{ title: "", type: "sdevice", fileName: "", content: "" }];
        codeDescription = "";
        renderCodeSubmission();
      } else if (mode === "server") {
        renderServerSubmission();
      }
    });
  });
  document.querySelector("#submission-cancel")?.addEventListener("click", () => closeSubmissionDialog({ revert: Boolean(checkbox) }));
}

function renderFileSubmission() {
  openSubmissionDialog(`
    <span class="dialog-phase">파일 업로드 · ${escapeHtml(submissionOutput.id)}</span>
    <h2>${escapeHtml(submissionOutput.text)}</h2>
    <label id="file-drop-zone" class="file-drop-zone">
      <input id="submission-files" type="file" multiple accept=".png,.jpg,.jpeg,.svg,.webp,.pdf,.docx,.pptx,.xlsx,.csv,.json,.txt,.md,.zip">
      <strong>파일을 여기에 끌어 놓으세요</strong>
      <span>또는 눌러서 파일 찾기 · 파일당 10MB, 전체 30MB</span>
    </label>
    <div id="selected-files" class="selected-files"></div>
    <label class="field-label">제출 메모<textarea id="file-note" rows="3" placeholder="파일 구성이나 확인할 내용을 간단히 적어 주세요."></textarea></label>
    <div class="dialog-actions">
      <button id="submit-files" class="btn btn--primary" type="button">업로드</button>
      <button id="submission-back" class="btn" type="button">뒤로</button>
    </div>`);

  const input = document.querySelector("#submission-files");
  const drop = document.querySelector("#file-drop-zone");
  input.addEventListener("change", () => setSelectedFiles([...input.files]));
  drop.addEventListener("dragover", (event) => { event.preventDefault(); drop.classList.add("is-dragging"); });
  drop.addEventListener("dragleave", () => drop.classList.remove("is-dragging"));
  drop.addEventListener("drop", (event) => {
    event.preventDefault();
    drop.classList.remove("is-dragging");
    setSelectedFiles([...event.dataTransfer.files]);
  });
  document.querySelector("#submit-files").addEventListener("click", submitFiles);
  document.querySelector("#submission-back").addEventListener("click", () => openSubmissionChoice(submissionOutput, completionCheckbox));
}

function setSelectedFiles(files) {
  selectedUploadFiles = files.slice(0, maxUploadFiles);
  const list = document.querySelector("#selected-files");
  list.innerHTML = selectedUploadFiles.length
    ? selectedUploadFiles.map((file, index) => `
      <div><span>${escapeHtml(file.name)}</span><small>${(file.size / 1024 / 1024).toFixed(2)}MB</small><button type="button" data-index="${index}">×</button></div>`).join("")
    : '<p>선택된 파일이 없습니다.</p>';
  list.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      selectedUploadFiles.splice(Number(button.dataset.index), 1);
      setSelectedFiles(selectedUploadFiles);
    });
  });
}

function validateSelectedFiles() {
  if (!selectedUploadFiles.length) throw new Error("업로드할 파일을 선택해 주세요.");
  if (selectedUploadFiles.length > maxUploadFiles) throw new Error(`파일은 한 번에 ${maxUploadFiles}개까지 제출할 수 있습니다.`);
  let total = 0;
  for (const file of selectedUploadFiles) {
    const extension = file.name.includes(".") ? file.name.split(".").pop().toLowerCase() : "";
    if (!allowedUploadExtensions.has(extension)) throw new Error(`${file.name}: 허용되지 않는 확장자입니다.`);
    if (file.size > maxFileBytes) throw new Error(`${file.name}: 파일당 10MB를 넘을 수 없습니다.`);
    total += file.size;
  }
  if (total > maxUploadBytes) throw new Error("한 번의 제출은 전체 30MB를 넘을 수 없습니다.");
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error(`${file.name} 파일을 읽지 못했습니다.`));
    reader.readAsDataURL(file);
  });
}

async function submitFiles() {
  const button = document.querySelector("#submit-files");
  try {
    validateSelectedFiles();
    button.disabled = true;
    button.textContent = "업로드 중";
    const files = await Promise.all(selectedUploadFiles.map(async (file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      contentBase64: await fileToBase64(file)
    })));
    await submitOutput("files", { files, note: document.querySelector("#file-note").value.trim() });
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = "업로드";
  }
}

function codeBlockHtml(block, index) {
  const options = codeTypeOptions.map(([value, label]) => `<option value="${value}" ${block.type === value ? "selected" : ""}>${label}</option>`).join("");
  return `
    <section class="code-block-card" data-index="${index}">
      <div class="code-block-heading"><strong>코드 ${index + 1}</strong>${codeBlocks.length > 1 ? '<button class="code-remove" type="button">삭제</button>' : ""}</div>
      <div class="code-meta-grid">
        <label>제목<input class="code-title" value="${escapeHtml(block.title)}" placeholder="예: Single-Metal SDE"></label>
        <label>코드 종류<select class="code-type">${options}</select></label>
        <label>파일명<input class="code-file" value="${escapeHtml(block.fileName)}" placeholder="예: single_metal_sde"></label>
      </div>
      <label>코드<textarea class="code-content" rows="13" spellcheck="false" placeholder="전체 코드를 여기에 붙여넣으세요.">${escapeHtml(block.content)}</textarea></label>
      <small class="code-count">${block.content.length.toLocaleString()}자</small>
    </section>`;
}

function syncCodeBlocksFromForm() {
  const description = document.querySelector("#code-description");
  if (description) codeDescription = description.value;
  document.querySelectorAll(".code-block-card").forEach((card) => {
    const index = Number(card.dataset.index);
    codeBlocks[index] = {
      title: card.querySelector(".code-title").value,
      type: card.querySelector(".code-type").value,
      fileName: card.querySelector(".code-file").value,
      content: card.querySelector(".code-content").value
    };
  });
}

function renderCodeSubmission() {
  openSubmissionDialog(`
    <span class="dialog-phase">코드 삽입 · ${escapeHtml(submissionOutput.id)}</span>
    <h2>${escapeHtml(submissionOutput.text)}</h2>
    <p class="submission-help">붙여넣은 코드는 보기용 Markdown과 실행용 원본 파일로 동시에 저장됩니다.</p>
    <div id="code-blocks">${codeBlocks.map(codeBlockHtml).join("")}</div>
    <button id="add-code-block" class="btn btn--small" type="button">코드 블록 추가</button>
    <label class="field-label">실행 조건 및 설명<textarea id="code-description" rows="4" placeholder="공통 변수, 실행 순서, 주의사항 등을 적어 주세요.">${escapeHtml(codeDescription)}</textarea></label>
    <div class="dialog-actions">
      <button id="submit-code" class="btn btn--primary" type="button">코드 제출</button>
      <button id="submission-back" class="btn" type="button">뒤로</button>
    </div>`);

  document.querySelectorAll(".code-content").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      textarea.closest(".code-block-card").querySelector(".code-count").textContent = `${textarea.value.length.toLocaleString()}자`;
    });
  });
  document.querySelectorAll(".code-remove").forEach((button) => {
    button.addEventListener("click", () => {
      syncCodeBlocksFromForm();
      codeBlocks.splice(Number(button.closest(".code-block-card").dataset.index), 1);
      renderCodeSubmission();
    });
  });
  document.querySelector("#add-code-block").addEventListener("click", () => {
    syncCodeBlocksFromForm();
    if (codeBlocks.length >= 12) return showToast("코드 블록은 최대 12개까지 추가할 수 있습니다.");
    codeBlocks.push({ title: "", type: "sdevice", fileName: "", content: "" });
    renderCodeSubmission();
  });
  document.querySelector("#submit-code").addEventListener("click", submitCode);
  document.querySelector("#submission-back").addEventListener("click", () => openSubmissionChoice(submissionOutput, completionCheckbox));
}

async function submitCode() {
  const button = document.querySelector("#submit-code");
  syncCodeBlocksFromForm();
  codeDescription = document.querySelector("#code-description").value;
  const description = codeDescription.trim();
  try {
    let total = 0;
    codeBlocks.forEach((block, index) => {
      block.title = block.title.trim();
      block.fileName = block.fileName.trim();
      if (!block.title) throw new Error(`코드 ${index + 1}의 제목을 입력해 주세요.`);
      if (!block.fileName) throw new Error(`코드 ${index + 1}의 파일명을 입력해 주세요.`);
      if (!block.content.trim()) throw new Error(`코드 ${index + 1}의 내용을 붙여넣어 주세요.`);
      if (block.content.length > 500000) throw new Error(`코드 ${index + 1}은 500KB를 넘을 수 없습니다.`);
      total += block.content.length;
    });
    if (total > 1000000) throw new Error("한 번의 코드 제출은 전체 1MB를 넘을 수 없습니다.");
    button.disabled = true;
    button.textContent = "제출 중";
    await submitOutput("code", { blocks: codeBlocks, description });
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = "코드 제출";
  }
}

function renderServerSubmission() {
  openSubmissionDialog(`
    <span class="dialog-phase">서버 경로 등록 · ${escapeHtml(submissionOutput.id)}</span>
    <h2>${escapeHtml(submissionOutput.text)}</h2>
    <label class="field-label">서버 원본 위치<input id="server-path" type="text" placeholder="/user/.../Myproject/Phase01/result/"></label>
    <label class="field-label">설명<textarea id="server-note" rows="5" placeholder="파일 구성, 실행 조건, 접근 방법 등을 적어 주세요."></textarea></label>
    <div class="dialog-actions">
      <button id="submit-server" class="btn btn--primary" type="button">경로 등록</button>
      <button id="submission-back" class="btn" type="button">뒤로</button>
    </div>`);
  document.querySelector("#submit-server").addEventListener("click", submitServer);
  document.querySelector("#submission-back").addEventListener("click", () => openSubmissionChoice(submissionOutput, completionCheckbox));
}

async function submitServer() {
  const button = document.querySelector("#submit-server");
  const serverPath = document.querySelector("#server-path").value.trim();
  if (!serverPath) return showToast("서버 경로를 입력해 주세요.");
  button.disabled = true;
  button.textContent = "등록 중";
  try {
    await submitOutput("server", {
      serverPath,
      note: document.querySelector("#server-note").value.trim()
    });
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = "경로 등록";
  }
}

async function submitOutput(type, submission) {
  const phase = getDialogPhase();
  if (!phase || !submissionOutput?.id) throw new Error("결과물 정보를 찾지 못했습니다.");
  const lists = readEditableChecklist();
  const output = lists.outputs.find((item) => item.id === submissionOutput.id);
  if (output) output.checked = true;

  const data = await apiFetch(`/api/phases/${phase.id}/outputs/${encodeURIComponent(submissionOutput.id)}/submissions`, {
    method: "POST",
    body: JSON.stringify({
      issueNumber: phase.issueNumber,
      outputText: submissionOutput.text,
      expectedUpdatedAt: phase.updatedAt,
      tasks: lists.tasks,
      outputs: lists.outputs,
      type,
      submission
    })
  });

  applyIssueData(phase, data.issue, "결과물 제출");
  editingChecklist = false;
  checklistDirty = false;
  closeSubmissionDialog();
  renderDialog(phase, { live: true });
  renderPhases();
  showToast(`${submissionTypeLabels[type]}을 저장하고 Issue 체크를 완료했습니다.`);
}

function reviewOutput(output) {
  if (!output) return;
  const submissions = output.submissions ?? [];
  if (submissions.length === 1 && submissions[0].folderUrl) {
    window.open(submissions[0].folderUrl, "_blank", "noopener,noreferrer");
    return;
  }
  submissionOutput = output;
  openSubmissionDialog(`
    <span class="dialog-phase">결과 확인 · ${escapeHtml(output.id)}</span>
    <h2>${escapeHtml(output.text)}</h2>
    <div class="submission-list">
      ${submissions.length ? submissions.slice().reverse().map((item) => `
        <article>
          <div><strong>${escapeHtml(displayName(item.uploader))}</strong><span>${escapeHtml(submissionTypeLabels[item.type] ?? item.type)} · ${escapeHtml(formatDate(item.uploadedAt))}</span></div>
          <p>${escapeHtml(item.summary ?? "제출본")}</p>
          ${item.serverPath ? `<code>${escapeHtml(item.serverPath)}</code>` : ""}
          <a class="btn btn--small" href="${escapeHtml(item.folderUrl)}" target="_blank" rel="noreferrer">제출 폴더 열기</a>
        </article>`).join("") : '<div class="empty-checklist">제출된 결과물이 없습니다.</div>'}
    </div>
    <div class="dialog-actions"><button id="submission-close" class="btn" type="button">닫기</button></div>`);
  document.querySelector("#submission-close")?.addEventListener("click", () => closeSubmissionDialog());
}

async function openDialog(id) {
  const phase = allPhases.find((item) => item.id === id);
  if (!phase) return;
  dialogPhaseId = id;
  editingChecklist = false;
  checklistDirty = false;
  renderDialog(phase);
  await fetchLiveIssue(phase, { silent: true });
  clearInterval(dialogPollTimer);
  if (apiBaseUrl && sessionToken) {
    dialogPollTimer = setInterval(() => {
      if (!editingChecklist && dialogPhaseId === id) fetchLiveIssue(phase, { silent: true });
    }, Math.max(5000, pollIntervalMs));
  }
}

async function loadDashboard() {
  try {
    const [definitionResponse, statusResponse, memberResponse] = await Promise.all([
      fetch("data/phases.json", { cache: "no-store" }),
      fetch("data/status.json", { cache: "no-store" }),
      fetch("data/members.json", { cache: "no-store" })
    ]);

    if (!definitionResponse.ok || !statusResponse.ok || !memberResponse.ok) {
      throw new Error("대시보드 데이터를 불러오지 못했습니다.");
    }

    const definitions = await definitionResponse.json();
    const statusData = await statusResponse.json();
    const memberData = await memberResponse.json();
    renderMembers(memberData.members ?? []);
    const statusMap = new Map(statusData.phases.map((phase) => [phase.id, phase]));

    allPhases = definitions.phases.map((phase) => ({
      ...phase,
      state: "waiting",
      progress: 0,
      tasksDone: 0,
      tasksTotal: 0,
      outputsDone: 0,
      outputsTotal: 0,
      tasks: [],
      outputs: [],
      assignees: [],
      updatedAt: null,
      issueNumber: phase.id,
      ...(statusMap.get(phase.id) ?? {})
    }));

    updateSummary(statusData);
    renderPhases();
    if (currentUser) refreshAuthState();
  } catch (error) {
    console.error(error);
    document.querySelector("#phase-grid").innerHTML = `
      <div class="empty">대시보드 데이터를 불러오지 못했습니다.<br>GitHub 저장소의 Issue에서 체크리스트를 확인해 주세요.</div>`;
    document.querySelector("#team-grid").innerHTML = '<div class="empty">연구원 정보를 불러오지 못했습니다.</div>';
    document.querySelector("#last-updated").textContent = "상태 불러오기 실패";
  }
}

function startLogin() {
  if (!apiBaseUrl) {
    showToast("Worker 배포와 API 주소 설정이 먼저 필요합니다.");
    return;
  }
  if (sessionToken) {
    apiFetch("/auth/logout", { method: "POST" }).catch(() => {});
    sessionToken = "";
    currentUser = null;
    sessionStorage.removeItem(sessionKey);
    refreshAuthState();
    if (dialogPhaseId) renderDialog(getDialogPhase());
    return;
  }
  location.href = `${apiBaseUrl}/auth/start`;
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderPhases();
  });
});

document.querySelector("#auth-button").addEventListener("click", startLogin);

document.querySelector("#dialog-close").addEventListener("click", () => {
  if (editingChecklist && checklistDirty && !confirm("저장하지 않은 변경을 닫을까요?")) return;
  document.querySelector("#phase-dialog").close();
});

document.querySelector("#phase-dialog").addEventListener("click", (event) => {
  if (event.target !== event.currentTarget) return;
  if (editingChecklist && checklistDirty && !confirm("저장하지 않은 변경을 닫을까요?")) return;
  event.currentTarget.close();
});

document.querySelector("#phase-dialog").addEventListener("close", () => {
  dialogPhaseId = null;
  editingChecklist = false;
  checklistDirty = false;
  clearInterval(dialogPollTimer);
});

document.querySelector("#submission-close-x").addEventListener("click", () => closeSubmissionDialog({ revert: Boolean(completionCheckbox) }));
document.querySelector("#submission-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeSubmissionDialog({ revert: Boolean(completionCheckbox) });
});

handleAuthRedirect();
loadDashboard().then(refreshAuthState);
