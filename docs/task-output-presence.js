/* Task-linked outputs and live researcher presence for dashboard v4. */

const taskOutputTypeLabels = {
  any: "제출 방식 선택",
  files: "파일",
  code: "코드",
  server: "서버 경로"
};
const taskOutputTypeOptions = [
  ["any", "제출자가 방식 선택"],
  ["files", "파일 업로드"],
  ["code", "코드 삽입"],
  ["server", "서버 경로"]
];
const taskOutputReviewOptions = [
  ["none", "검토 불필요"],
  ["recommended", "검토 권장"]
];

let expandedTaskIds = new Set();
let presenceByLogin = new Map();
let presenceTimer = null;
let presenceRefreshTimer = null;

function flattenTaskOutputs(tasks = []) {
  return tasks.flatMap((task) => (task.outputs ?? []).map((output) => ({ ...output, taskId: task.id })));
}

function taskKey(task, index) {
  return task.id || `new-task-${index}`;
}

function outputStatusLabel(output, task) {
  const submissions = output.submissions ?? [];
  if (submissions.length) return `결과 ${submissions.length}건`;
  return task.checked ? "파일 없음" : "미제출";
}

function memberCard(member) {
  const username = escapeHtml(member.username);
  const avatar = `https://github.com/${encodeURIComponent(member.username)}.png?size=96`;
  const state = member.status ?? member.activityState ?? "inactive";
  const presence = presenceByLogin.get(String(member.username).toLowerCase());
  const isOnline = Boolean(presence);
  const activity = isOnline
    ? (presence.phaseId ? `Phase ${presence.phaseId} 확인 중` : "Run Sheet 사용 중")
    : member.recentActivity
      ? `${escapeHtml(member.recentActivity)} · ${escapeHtml(formatRelative(member.lastActivityAt))}`
      : escapeHtml(formatRelative(member.lastActivityAt));

  return `
    <a class="team-card ${isOnline ? "is-online" : ""}" data-member-state="${escapeHtml(state)}" href="${escapeHtml(member.folderUrl)}" target="_blank" rel="noreferrer">
      <span class="presence-dot ${isOnline ? "is-online" : ""}" aria-label="${isOnline ? "활동 중" : "오프라인"}"></span>
      <img src="${avatar}" alt="${escapeHtml(member.name)} GitHub 프로필 이미지" loading="lazy">
      <div>
        <strong>${escapeHtml(member.name)}</strong>
        <span class="member-username">@${username}</span>
      </div>
      <span class="presence-label ${isOnline ? "is-online" : ""}">${isOnline ? "활동 중" : "오프라인"}</span>
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
          <span>과제 진행률</span>
          <strong>${phase.progress}%</strong>
        </div>
        <div class="progress"><span style="width:${phase.progress}%"></span></div>
      </div>
      <div class="phase-card__meta">
        <span>담당 ${escapeHtml(assignee)}</span>
        <span>${phase.tasksDone}/${phase.tasksTotal} 완료</span>
      </div>
      <div class="phase-card__actions phase-card__actions--single">
        <button class="btn btn--primary detail-button" data-phase-id="${phase.id}" type="button">내용 보기</button>
      </div>
    </article>`;
}

function taskOutputAction(output, task, editable) {
  if (!output.id) return '<span class="output-state">먼저 목록 저장</span>';
  const submissions = output.submissions ?? [];
  const review = submissions.length
    ? `<button class="output-review" type="button" data-output-id="${escapeHtml(output.id)}">결과 확인${submissions.length > 1 ? ` ${submissions.length}건` : ""}</button>`
    : `<span class="output-state">${outputStatusLabel(output, task)}</span>`;
  const canSubmit = Boolean(currentUser && apiBaseUrl);
  const submit = canSubmit
    ? `<button class="output-submit" type="button" data-output-id="${escapeHtml(output.id)}">제출</button>`
    : "";
  return `<span class="output-actions">${review}${submit}</span>`;
}

function outputTypeSelect(output) {
  return `<select class="task-output-type" aria-label="제출 방식">${taskOutputTypeOptions.map(([value, label]) =>
    `<option value="${value}" ${output.type === value ? "selected" : ""}>${label}</option>`
  ).join("")}</select>`;
}

function outputReviewSelect(output) {
  return `<select class="task-output-review" aria-label="검토 설정">${taskOutputReviewOptions.map(([value, label]) =>
    `<option value="${value}" ${output.review === value ? "selected" : ""}>${label}</option>`
  ).join("")}</select>`;
}

function renderTaskOutput(output, task, taskIndex, outputIndex, editable) {
  const type = output.type || "any";
  const review = output.review || "none";
  return `
    <div class="task-output-row" data-output-index="${outputIndex}" data-output-id="${escapeHtml(output.id ?? "")}">
      <span class="task-output-connector" aria-hidden="true">└</span>
      <div class="task-output-main">
        ${editable
          ? `<input class="task-output-input" type="text" value="${escapeHtml(output.text)}" placeholder="제출할 산출물 이름">`
          : `<span class="task-output-text">${escapeHtml(output.text)}</span>`}
        <div class="task-output-meta">
          ${editable
            ? `${outputTypeSelect({ ...output, type })}${outputReviewSelect({ ...output, review })}`
            : `<span class="output-kind">${escapeHtml(taskOutputTypeLabels[type] ?? type)}</span>${review === "recommended" ? '<span class="review-badge">검토 권장</span>' : ""}`}
        </div>
      </div>
      ${taskOutputAction(output, task, editable)}
      ${editable ? '<button class="task-output-delete" type="button" aria-label="산출물 삭제">×</button>' : ""}
    </div>`;
}

function renderTask(task, index, editable) {
  const key = taskKey(task, index);
  const expanded = expandedTaskIds.has(key);
  const outputs = task.outputs ?? [];
  const submitted = outputs.filter((item) => (item.submissions ?? []).length > 0).length;
  return `
    <article class="task-card ${task.checked ? "is-done" : ""}" data-task-index="${index}" data-task-id="${escapeHtml(task.id ?? "")}" data-task-key="${escapeHtml(key)}">
      <div class="task-card__main">
        <input class="task-checkbox" type="checkbox" aria-label="과제 ${index + 1} 완료" ${task.checked ? "checked" : ""} ${editable ? "" : "disabled"}>
        ${editable
          ? `<input class="task-input" type="text" value="${escapeHtml(task.text)}" placeholder="과제 내용">`
          : `<span class="task-text">${escapeHtml(task.text)}</span>`}
        <span class="task-output-count">산출물 ${submitted}/${outputs.length}</span>
        <button class="task-toggle" type="button" aria-expanded="${expanded ? "true" : "false"}" aria-label="산출물 목록 ${expanded ? "접기" : "펼치기"}">▼</button>
        ${editable ? '<button class="task-delete" type="button" aria-label="과제 삭제">×</button>' : ""}
      </div>
      <div class="task-output-panel" ${expanded ? "" : "hidden"}>
        <div class="task-output-heading">
          <strong>제출할 수 있는 산출물</strong>
          <span>모든 산출물은 선택 제출이며 미제출 시 과제 완료 후 ‘파일 없음’으로 표시됩니다.</span>
        </div>
        <div class="task-output-list">
          ${outputs.length
            ? outputs.map((output, outputIndex) => renderTaskOutput(output, task, index, outputIndex, editable)).join("")
            : '<div class="empty-checklist">등록된 산출물이 없습니다.</div>'}
        </div>
        ${editable ? '<button class="btn btn--small add-task-output" type="button">산출물 추가</button>' : ""}
      </div>
    </article>`;
}

function renderTaskList(tasks = [], editable = false) {
  if (!tasks.length) return '<div class="empty-checklist">등록된 과제가 없습니다.</div>';
  return `<div class="task-list">${tasks.map((task, index) => renderTask(task, index, editable)).join("")}</div>`;
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
      <div><span>과제 진행률</span><strong>${phase.progress}%</strong></div>
      <div><span>담당자</span><strong>${escapeHtml(assignee)}</strong></div>
      <div><span>최근 수정</span><strong>${escapeHtml(modifier)}</strong></div>
    </div>

    <div class="dialog-section">
      <div class="dialog-section__heading">
        <div><h3>해야 할 것</h3><p class="section-help">과제 오른쪽의 ▼를 눌러 연결된 산출물을 확인하거나 제출합니다.</p></div>
        ${editable ? '<button id="add-task" class="btn btn--small" type="button">과제 추가</button>' : ""}
      </div>
      <div id="tasks-list">${renderTaskList(phase.tasks ?? [], editable)}</div>
    </div>

    <div class="dialog-section output-policy">
      <h3>산출물 운영 기준</h3>
      <p>산출물 제출은 선택입니다. 과제 완료 전에 제출하지 않으면 ‘미제출’, 과제를 완료한 뒤에도 제출물이 없으면 ‘파일 없음’으로 표시됩니다. 코드는 가장 직접적으로 생성되는 과제에 연결하고 이후 과제에서는 같은 제출본을 확인합니다.</p>
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
        : `<button id="edit-checklist" class="btn btn--primary" type="button" ${canEdit ? "" : "disabled"}>${currentUser ? "목록 수정" : "GitHub 로그인 후 수정"}</button>`}
      <a class="btn" href="${escapeHtml(phase.issueUrl)}" target="_blank" rel="noreferrer">GitHub Issue 열기</a>
    </div>
    <div class="dialog-notice">
      <span class="sync-state">${escapeHtml(sourceLabel)}</span>
      ${!apiBaseUrl ? "<br>양방향 편집은 Worker 배포 후 활성화됩니다." : ""}
    </div>`;

  if (!dialog.open) dialog.showModal();
  bindDialogEvents(editable);
}

function currentTaskDraft() {
  const phase = getDialogPhase();
  if (!phase) return [];
  if (!editingChecklist || !document.querySelector("#tasks-list .task-card")) {
    return structuredClone(phase.tasks ?? []);
  }
  return readEditableChecklist().tasks;
}

function readEditableChecklist() {
  const phase = getDialogPhase();
  if (!phase) return { tasks: [], outputs: [] };
  const cards = [...document.querySelectorAll("#tasks-list .task-card")];
  if (!cards.length && !editingChecklist) {
    const tasks = structuredClone(phase.tasks ?? []);
    return { tasks, outputs: flattenTaskOutputs(tasks) };
  }

  const tasks = [];
  cards.forEach((card) => {
    const input = card.querySelector(".task-input");
    const text = input ? input.value.trim() : card.querySelector(".task-text")?.textContent.trim();
    if (!text) return;
    const outputs = [];
    card.querySelectorAll(".task-output-row").forEach((row) => {
      const outputInput = row.querySelector(".task-output-input");
      const outputText = outputInput ? outputInput.value.trim() : row.querySelector(".task-output-text")?.textContent.trim();
      if (!outputText) return;
      outputs.push({
        ...(row.dataset.outputId ? { id: row.dataset.outputId } : {}),
        text: outputText,
        type: row.querySelector(".task-output-type")?.value || "any",
        review: row.querySelector(".task-output-review")?.value || "none"
      });
    });
    tasks.push({
      ...(card.dataset.taskId ? { id: card.dataset.taskId } : {}),
      checked: Boolean(card.querySelector(".task-checkbox")?.checked),
      text,
      outputs
    });
  });
  return { tasks, outputs: flattenTaskOutputs(tasks) };
}

function findOutputById(id) {
  return flattenTaskOutputs(getDialogPhase()?.tasks ?? []).find((item) => item.id === id) ?? null;
}

function bindDialogEvents(editable) {
  document.querySelectorAll(".task-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".task-card");
      const key = card.dataset.taskKey;
      const panel = card.querySelector(".task-output-panel");
      const expanding = panel.hidden;
      panel.hidden = !expanding;
      button.setAttribute("aria-expanded", String(expanding));
      if (expanding) expandedTaskIds.add(key);
      else expandedTaskIds.delete(key);
    });
  });

  document.querySelectorAll(".output-review").forEach((button) => {
    button.addEventListener("click", () => reviewOutput(findOutputById(button.dataset.outputId)));
  });
  document.querySelectorAll(".output-submit").forEach((button) => {
    button.addEventListener("click", () => {
      const output = findOutputById(button.dataset.outputId);
      if (output) openSubmissionChoice(output, null);
    });
  });

  if (editable) {
    document.querySelectorAll("#dialog-content input, #dialog-content select").forEach((input) => {
      input.addEventListener("input", () => { checklistDirty = true; });
      input.addEventListener("change", () => {
        checklistDirty = true;
        if (input.classList.contains("task-checkbox")) {
          input.closest(".task-card")?.classList.toggle("is-done", input.checked);
        }
      });
    });

    document.querySelectorAll(".task-delete").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".task-card");
        expandedTaskIds.delete(card.dataset.taskKey);
        card.remove();
        checklistDirty = true;
      });
    });
    document.querySelectorAll(".task-output-delete").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".task-output-row")?.remove();
        checklistDirty = true;
      });
    });
    document.querySelectorAll(".add-task-output").forEach((button) => {
      button.addEventListener("click", () => addTaskOutput(Number(button.closest(".task-card").dataset.taskIndex)));
    });
    document.querySelector("#add-task")?.addEventListener("click", addTaskItem);
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

function addTaskItem() {
  const phase = getDialogPhase();
  if (!phase) return;
  const tasks = currentTaskDraft();
  tasks.push({ checked: false, text: "", outputs: [] });
  phase.tasks = tasks;
  expandedTaskIds.add(`new-task-${tasks.length - 1}`);
  renderDialog(phase, { live: true, editable: true });
  checklistDirty = true;
  document.querySelector("#tasks-list .task-card:last-child .task-input")?.focus();
}

function addTaskOutput(taskIndex) {
  const phase = getDialogPhase();
  if (!phase) return;
  const tasks = currentTaskDraft();
  if (!tasks[taskIndex]) return;
  tasks[taskIndex].outputs = tasks[taskIndex].outputs ?? [];
  tasks[taskIndex].outputs.push({ text: "", type: "any", review: "none" });
  phase.tasks = tasks;
  const key = taskKey(tasks[taskIndex], taskIndex);
  expandedTaskIds.add(key);
  renderDialog(phase, { live: true, editable: true });
  checklistDirty = true;
  document.querySelector(`[data-task-index="${taskIndex}"] .task-output-row:last-child .task-output-input`)?.focus();
}

function applyIssueData(phase, data, action = null) {
  phase.tasks = data.tasks ?? phase.tasks ?? [];
  phase.outputs = data.outputs ?? flattenTaskOutputs(phase.tasks);
  phase.assignees = data.assignees ?? phase.assignees;
  phase.updatedAt = data.updatedAt ?? phase.updatedAt;
  phase.issueUrl = data.issueUrl ?? phase.issueUrl;
  phase.tasksDone = Number.isFinite(data.tasksDone) ? data.tasksDone : phase.tasks.filter((item) => item.checked).length;
  phase.tasksTotal = Number.isFinite(data.tasksTotal) ? data.tasksTotal : phase.tasks.length;
  phase.outputsDone = Number.isFinite(data.outputsDone)
    ? data.outputsDone
    : phase.outputs.filter((item) => (item.submissions ?? []).length > 0).length;
  phase.outputsTotal = Number.isFinite(data.outputsTotal) ? data.outputsTotal : phase.outputs.length;
  phase.progress = Number.isFinite(data.progress)
    ? data.progress
    : (phase.tasksTotal ? Math.round(phase.tasksDone / phase.tasksTotal * 100) : 0);
  if (data.state) phase.state = data.state;
  if (data.modifiedBy) phase.lastModifiedBy = data.modifiedBy;
  if (action || data.modifiedAction) phase.lastModifiedAction = action || data.modifiedAction;
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
      body: JSON.stringify({ expectedUpdatedAt: phase.updatedAt, tasks: lists.tasks })
    });
    applyIssueData(phase, data, "과제·산출물 목록 수정");
    editingChecklist = false;
    checklistDirty = false;
    renderDialog(phase, { live: true });
    renderPhases();
    showToast("과제와 산출물 목록을 GitHub Issue에 저장했습니다.");
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

function openSubmissionChoice(output) {
  submissionOutput = output;
  completionCheckbox = null;
  const modes = output.type === "any" ? ["files", "code", "server"] : [output.type];
  const choice = {
    files: '<button class="submission-choice" data-mode="files" type="button"><strong>파일 업로드</strong><span>이미지, 그래프, 표, PDF 및 문서 제출</span></button>',
    code: '<button class="submission-choice" data-mode="code" type="button"><strong>코드 삽입</strong><span>SDE, SProcess, SDevice, SVisual, Tcl, Python 코드 붙여넣기</span></button>',
    server: '<button class="submission-choice" data-mode="server" type="button"><strong>서버 경로 등록</strong><span>대용량 TDR, PLT 및 서버 원본 위치 기록</span></button>'
  };
  openSubmissionDialog(`
    <span class="dialog-phase">산출물 ${escapeHtml(output.id)}</span>
    <h2>산출물 제출</h2>
    <p class="submission-target">${escapeHtml(output.text)}</p>
    <div class="submission-choice-grid">${modes.map((mode) => choice[mode]).join("")}</div>
    <div class="dialog-actions"><button id="submission-cancel" class="btn" type="button">취소</button></div>`);

  document.querySelectorAll(".submission-choice").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (mode === "files") renderFileSubmission();
      if (mode === "code") {
        codeBlocks = [{ title: "", type: "sdevice", fileName: "", content: "" }];
        codeDescription = "";
        renderCodeSubmission();
      }
      if (mode === "server") renderServerSubmission();
    });
  });
  document.querySelector("#submission-cancel")?.addEventListener("click", () => closeSubmissionDialog());
}

async function submitOutput(type, submission) {
  const phase = getDialogPhase();
  if (!phase || !submissionOutput?.id || !submissionOutput?.taskId) {
    throw new Error("과제·산출물 정보를 찾지 못했습니다.");
  }
  const data = await apiFetch(
    `/api/phases/${phase.id}/tasks/${encodeURIComponent(submissionOutput.taskId)}/outputs/${encodeURIComponent(submissionOutput.id)}/submissions`,
    {
      method: "POST",
      body: JSON.stringify({
        issueNumber: phase.issueNumber,
        expectedUpdatedAt: phase.updatedAt,
        type,
        submission
      })
    }
  );
  applyIssueData(phase, data.issue, "산출물 제출");
  editingChecklist = false;
  checklistDirty = false;
  closeSubmissionDialog();
  renderDialog(phase, { live: true });
  renderPhases();
  showToast(`${submissionTypeLabels[type]}을 저장했습니다.`);
}

async function sendPresenceHeartbeat() {
  if (!currentUser || !sessionToken || document.visibilityState === "hidden") return;
  try {
    await apiFetch("/api/presence/heartbeat", {
      method: "POST",
      body: JSON.stringify({ phaseId: dialogPhaseId })
    });
  } catch (error) {
    if (error.status !== 401) console.warn("presence heartbeat failed", error);
  }
}

async function refreshPresence() {
  if (!currentUser || !sessionToken) {
    presenceByLogin = new Map();
    if (allMembers.length) renderMembers(allMembers);
    return;
  }
  try {
    const data = await apiFetch("/api/presence");
    presenceByLogin = new Map((data.users ?? []).map((item) => [String(item.login).toLowerCase(), item]));
    if (allMembers.length) renderMembers(allMembers);
  } catch (error) {
    if (error.status !== 401) console.warn("presence refresh failed", error);
  }
}

function stopPresence() {
  clearInterval(presenceTimer);
  clearInterval(presenceRefreshTimer);
  presenceTimer = null;
  presenceRefreshTimer = null;
  presenceByLogin = new Map();
}

function startPresence() {
  if (!currentUser || !sessionToken) return stopPresence();
  if (!presenceTimer) presenceTimer = setInterval(sendPresenceHeartbeat, 30_000);
  if (!presenceRefreshTimer) presenceRefreshTimer = setInterval(refreshPresence, 30_000);
  sendPresenceHeartbeat().then(refreshPresence);
}

const baseRefreshAuthState = refreshAuthState;
refreshAuthState = async function refreshAuthStateWithPresence() {
  await baseRefreshAuthState();
  if (currentUser) startPresence();
  else stopPresence();
};

const baseStartLogin = startLogin;
document.querySelector("#auth-button")?.removeEventListener("click", baseStartLogin);
startLogin = function startLoginWithPresence() {
  if (sessionToken && currentUser) {
    apiFetch("/api/presence/offline", { method: "POST" }).catch(() => {}).finally(() => baseStartLogin());
    return;
  }
  baseStartLogin();
};
document.querySelector("#auth-button")?.addEventListener("click", startLogin);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") sendPresenceHeartbeat().then(refreshPresence);
});
window.addEventListener("focus", () => sendPresenceHeartbeat().then(refreshPresence));
window.addEventListener("load", () => {
  refreshAuthState();
  if (allPhases.length) renderPhases();
});
