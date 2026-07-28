const stateLabels = {
  waiting: "대기",
  "in-progress": "진행 중",
  review: "검토 중",
  completed: "완료",
  blocked: "문제 발생",
  locked: "선행 단계 대기"
};

const config = window.DASHBOARD_CONFIG ?? {};
const apiBaseUrl = String(config.apiBaseUrl ?? "").replace(/\/$/, "");
const pollIntervalMs = Number(config.pollIntervalMs ?? 15000);
const sessionKey = "vcatDashboardSession";

let allPhases = [];
let activeFilter = "all";
let sessionToken = sessionStorage.getItem(sessionKey) ?? "";
let currentUser = null;
let dialogPhaseId = null;
let dialogPollTimer = null;
let editingChecklist = false;
let checklistDirty = false;

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
  if (Number.isNaN(date.getTime())) return value;
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
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
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
    userLabel.textContent = `@${data.user.login}`;
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
  const statusLabel = member.statusLabel ?? "미활동";
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
      <em>${escapeHtml(statusLabel)}</em>
      <span class="member-activity">${activity}</span>
    </a>`;
}

function renderMembers(members = []) {
  const grid = document.querySelector("#team-grid");
  grid.innerHTML = members.length
    ? members.map(memberCard).join("")
    : '<div class="empty">등록된 연구원이 없습니다.</div>';
}

function phaseCard(phase) {
  const assignee = phase.assignees?.length ? phase.assignees.join(", ") : "미정";
  return `
    <article class="phase-card" data-state="${phase.state}" data-phase-id="${phase.id}">
      <div class="phase-card__top">
        <span class="phase-number">P${phase.id}</span>
        <span class="status-chip">${stateLabels[phase.state] ?? escapeHtml(phase.state)}</span>
      </div>
      <h3>${escapeHtml(phase.shortTitle || phase.title)}</h3>
      <p class="phase-card__tool">${escapeHtml(phase.tool)}</p>
      <p class="phase-card__activity">최근 수정 ${escapeHtml(formatRelative(phase.updatedAt))}</p>
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
      <div class="phase-card__actions">
        <button class="btn detail-button" data-phase-id="${phase.id}" type="button">내용 보기</button>
        <a class="btn btn--primary" href="${escapeHtml(phase.issueUrl)}" target="_blank" rel="noreferrer">GitHub 열기</a>
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

function renderChecklist(items, listName, editable) {
  if (!items?.length) return '<div class="empty-checklist">등록된 항목이 없습니다.</div>';
  return `<div class="checklist">${items.map((item, index) => `
    <label class="checklist-row ${item.checked ? "is-done" : ""}" data-list="${listName}" data-index="${index}">
      <input type="checkbox" ${item.checked ? "checked" : ""} ${editable ? "" : "disabled"}>
      ${editable
        ? `<input type="text" value="${escapeHtml(item.text)}" aria-label="${listName} ${index + 1} 내용">`
        : `<span class="checklist-text">${escapeHtml(item.text)}</span>`}
      ${editable ? '<button class="checklist-delete" type="button" aria-label="항목 삭제">×</button>' : ""}
    </label>`).join("")}</div>`;
}

function getDialogPhase() {
  return allPhases.find((item) => item.id === dialogPhaseId);
}

function renderDialog(phase, options = {}) {
  const dialog = document.querySelector("#phase-dialog");
  const assignee = phase.assignees?.length ? phase.assignees.join(", ") : "미정";
  const editable = Boolean(options.editable);
  const canEdit = Boolean(currentUser && apiBaseUrl && phase.issueNumber);
  const sourceLabel = options.live ? "GitHub Issue 실시간 데이터" : "최근 자동 동기화 데이터";

  document.querySelector("#dialog-content").innerHTML = `
    <span class="dialog-phase">PHASE ${phase.id} · ${stateLabels[phase.state] ?? escapeHtml(phase.state)}</span>
    <h2>${escapeHtml(phase.title)}</h2>

    <div class="dialog-summary">
      <div><span>진행률</span><strong>${phase.progress}%</strong></div>
      <div><span>담당자</span><strong>${escapeHtml(assignee)}</strong></div>
      <div><span>최근 수정</span><strong>${escapeHtml(formatRelative(phase.updatedAt))}</strong></div>
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
  document.querySelectorAll(".checklist-row").forEach((row) => {
    const list = row.dataset.list;
    const checkbox = row.querySelector('input[type="checkbox"]');
    const input = row.querySelector('input[type="text"]');
    if (!list || !checkbox || !input) return;
    const text = input.value.trim();
    if (text) result[list].push({ checked: checkbox.checked, text });
  });
  return result;
}

function bindDialogEvents(editable) {
  if (editable) {
    document.querySelectorAll(".checklist-row input").forEach((input) => {
      input.addEventListener("input", () => { checklistDirty = true; });
      input.addEventListener("change", () => { checklistDirty = true; });
    });
    document.querySelectorAll(".checklist-delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
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
  const container = document.querySelector(`#${listName}-list`);
  container?.querySelector('.checklist-row:last-child input[type="text"]')?.focus();
}

async function fetchLiveIssue(phase, { silent = false } = {}) {
  if (!apiBaseUrl || !sessionToken || editingChecklist) return;
  try {
    const data = await apiFetch(`/api/issues/${phase.issueNumber}`);
    phase.tasks = data.tasks;
    phase.outputs = data.outputs;
    phase.updatedAt = data.updatedAt;
    phase.issueUrl = data.issueUrl ?? phase.issueUrl;
    phase.tasksDone = data.tasks.filter((item) => item.checked).length;
    phase.tasksTotal = data.tasks.length;
    phase.outputsDone = data.outputs.filter((item) => item.checked).length;
    phase.outputsTotal = data.outputs.length;
    const total = phase.tasksTotal + phase.outputsTotal;
    const done = phase.tasksDone + phase.outputsDone;
    phase.progress = total ? Math.round(done / total * 100) : 0;
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
    phase.tasks = data.tasks;
    phase.outputs = data.outputs;
    phase.updatedAt = data.updatedAt;
    phase.tasksDone = data.tasks.filter((item) => item.checked).length;
    phase.tasksTotal = data.tasks.length;
    phase.outputsDone = data.outputs.filter((item) => item.checked).length;
    phase.outputsTotal = data.outputs.length;
    const total = phase.tasksTotal + phase.outputsTotal;
    const done = phase.tasksDone + phase.outputsDone;
    phase.progress = total ? Math.round(done / total * 100) : 0;
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

    renderMembers(memberData.members ?? []);
    updateSummary(statusData);
    renderPhases();
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

handleAuthRedirect();
Promise.all([refreshAuthState(), loadDashboard()]);
