/* Review-aware completion UI. Approved submissions are the only completion evidence. */
(() => {
  const REVIEW_ACTIVATION_AT = "2026-08-01T06:30:00.000Z";
  const taskStateLabels = {
    "not-started": "진행 전",
    "in-progress": "진행 중",
    completed: "완료"
  };

  function normalizedReview(record) {
    const raw = record?.review;
    if (raw && ["pending", "approved", "held"].includes(String(raw.status))) return raw;
    const uploadedAt = String(record?.uploadedAt || "");
    if (uploadedAt && uploadedAt >= REVIEW_ACTIVATION_AT) return { status: "pending", implicit: true };
    return { status: "approved", legacy: true };
  }

  function countsAsEvidence(record) {
    if (record?.classification?.countsAsEvidence === false) return false;
    return normalizedReview(record).status === "approved";
  }

  function evidenceSubmissions(output) {
    return (output?.submissions || []).filter(countsAsEvidence);
  }

  function reviewCounts(output) {
    const counts = { approved: 0, pending: 0, held: 0 };
    for (const record of output?.submissions || []) {
      if (record?.classification?.countsAsEvidence === false) continue;
      const status = normalizedReview(record).status;
      if (status in counts) counts[status] += 1;
    }
    return counts;
  }

  function recalculateTask(task) {
    const outputs = task.outputs || [];
    for (const output of outputs) {
      const counts = reviewCounts(output);
      const evidence = evidenceSubmissions(output);
      output.submissionCount = (output.submissions || []).length;
      output.evidenceSubmissionCount = evidence.length;
      output.approvedSubmissionCount = counts.approved;
      output.pendingReviewCount = counts.pending;
      output.heldSubmissionCount = counts.held;
      output.submitted = evidence.length > 0;
      output.state = evidence.length
        ? "submitted"
        : counts.held
          ? "held"
          : counts.pending
            ? "review-pending"
            : output.required === false ? "optional" : "missing";
    }
    const required = outputs.filter((output) => output.required !== false);
    const missing = required.filter((output) => evidenceSubmissions(output).length === 0).map((output) => output.id);
    const approvedOutputs = outputs.filter((output) => evidenceSubmissions(output).length > 0).length;
    const activeOutputs = outputs.filter((output) => (output.submissions || []).length > 0).length;
    const checked = required.length ? missing.length === 0 : Boolean(task.declaredChecked ?? task.checked);
    task.checked = checked;
    task.state = checked ? "completed" : activeOutputs ? "in-progress" : "not-started";
    task.outputsDone = approvedOutputs;
    task.outputsTotal = outputs.length;
    task.requiredOutputsDone = required.length - missing.length;
    task.requiredOutputsTotal = required.length;
    task.missingRequiredOutputs = missing;
    return task;
  }

  function recalculatePhase(phase) {
    phase.tasks = (phase.tasks || []).map(recalculateTask);
    phase.outputs = typeof flattenTaskOutputs === "function"
      ? flattenTaskOutputs(phase.tasks)
      : phase.tasks.flatMap((task) => (task.outputs || []).map((output) => ({ ...output, taskId: task.id })));
    phase.tasksDone = phase.tasks.filter((task) => task.checked).length;
    phase.tasksTotal = phase.tasks.length;
    phase.outputsDone = phase.outputs.filter((output) => evidenceSubmissions(output).length > 0).length;
    phase.outputsTotal = phase.outputs.length;
    const required = phase.outputs.filter((output) => output.required !== false);
    phase.requiredOutputsDone = required.filter((output) => evidenceSubmissions(output).length > 0).length;
    phase.requiredOutputsTotal = required.length;
    phase.pendingReviewCount = phase.outputs.reduce((sum, output) => sum + reviewCounts(output).pending, 0);
    phase.heldSubmissionCount = phase.outputs.reduce((sum, output) => sum + reviewCounts(output).held, 0);
    phase.progress = phase.tasksTotal ? Math.round(phase.tasksDone / phase.tasksTotal * 100) : 0;
    if (phase.state !== "blocked") {
      if (phase.tasksTotal && phase.tasksDone === phase.tasksTotal) phase.state = phase.state === "completed" ? "completed" : "review";
      else if (phase.tasks.some((task) => task.state === "in-progress") || phase.tasksDone) phase.state = "in-progress";
      else if (phase.state !== "locked") phase.state = "waiting";
    }
    return phase;
  }

  const previousApplyIssueData = applyIssueData;
  applyIssueData = function applyIssueDataWithApproval(phase, data, action = null) {
    previousApplyIssueData(phase, data, action);
    recalculatePhase(phase);
  };

  outputStatusLabel = function reviewAwareOutputStatusLabel(output) {
    const counts = reviewCounts(output);
    const parts = [];
    if (counts.approved) parts.push(`승인 ${counts.approved}`);
    if (counts.pending) parts.push(`검토 필요 ${counts.pending}`);
    if (counts.held) parts.push(`보류 ${counts.held}`);
    if (parts.length) return parts.join(" · ");
    return output.required === false ? "선택 미제출" : "필수 미제출";
  };

  renderTask = function renderReviewAwareTask(task, index, editable) {
    recalculateTask(task);
    const key = taskKey(task, index);
    const expanded = expandedTaskIds.has(key);
    const outputs = task.outputs || [];
    const submitted = outputs.filter((item) => evidenceSubmissions(item).length > 0).length;
    const totalRecords = outputs.reduce((sum, output) => sum + (output.submissions || []).length, 0);
    const pending = outputs.reduce((sum, output) => sum + reviewCounts(output).pending, 0);
    const held = outputs.reduce((sum, output) => sum + reviewCounts(output).held, 0);
    const missing = task.missingRequiredOutputs || [];
    const state = task.state || (task.checked ? "completed" : totalRecords ? "in-progress" : "not-started");
    const reviewSummary = [pending ? `검토 ${pending}` : "", held ? `보류 ${held}` : ""].filter(Boolean).join(" · ");

    return `
      <article class="task-card ${task.checked ? "is-done" : ""}" data-task-index="${index}"
               data-task-id="${escapeHtml(task.id || "")}" data-task-key="${escapeHtml(key)}">
        <div class="task-card__main">
          <input class="task-checkbox" type="checkbox" aria-label="과제 ${index + 1} 자동 완료 상태"
                 ${task.checked ? "checked" : ""} disabled data-auto-completion="true">
          ${editable
            ? `<input class="task-input" type="text" value="${escapeHtml(task.text)}" placeholder="과제 내용">`
            : `<span class="task-text">${escapeHtml(task.text)}</span>`}
          <span class="task-state-badge" data-task-state="${escapeHtml(state)}"
                title="${missing.length ? `누락 또는 미승인: ${escapeHtml(missing.join(", "))}` : "필수 산출물 승인 완료"}">
            ${escapeHtml(taskStateLabels[state] || state)}
          </span>
          <span class="task-output-count">필수 승인 ${task.requiredOutputsDone || 0}/${task.requiredOutputsTotal || 0} · 승인 제출 ${submitted}/${outputs.length}${reviewSummary ? ` · ${escapeHtml(reviewSummary)}` : ""}</span>
          <button class="task-toggle" type="button" aria-expanded="${expanded ? "true" : "false"}"
                  aria-label="산출물 목록 ${expanded ? "접기" : "펼치기"}">▼</button>
          ${editable ? '<button class="task-delete" type="button" aria-label="과제 삭제">×</button>' : ""}
        </div>
        <div class="task-output-panel" ${expanded ? "" : "hidden"}>
          <div class="task-output-heading">
            <strong>연결된 산출물</strong>
            <span>필수 산출물에 승인된 제출본이 하나 이상 있으면 과제가 자동 완료됩니다.</span>
          </div>
          <div class="task-output-list">
            ${outputs.length
              ? outputs.map((output, outputIndex) => renderTaskOutput(output, task, index, outputIndex, editable)).join("")
              : '<div class="empty-checklist">등록된 산출물이 없습니다.</div>'}
          </div>
          ${editable ? '<button class="btn btn--small add-task-output" type="button">산출물 추가</button>' : ""}
        </div>
      </article>`;
  };

  const previousRenderDialog = renderDialog;
  renderDialog = function renderDialogWithApproval(phase, options = {}) {
    recalculatePhase(phase);
    previousRenderDialog(phase, options);
    recalculatePhase(phase);
    const progress = document.querySelector("#dialog-content .dialog-summary > div:first-child strong");
    if (progress) progress.textContent = `${phase.progress}%`;
    const policy = document.querySelector("#dialog-content .output-policy p");
    if (policy) policy.textContent = "과제 완료는 승인된 필수 산출물 제출본을 기준으로 자동 계산합니다. 검토 필요·보류 제출본은 진행률 증거로 인정되지 않습니다.";
  };

  const previousPhaseCard = phaseCard;
  phaseCard = function phaseCardWithApproval(phase) {
    const html = previousPhaseCard(phase);
    recalculatePhase(phase);
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const card = template.content.firstElementChild;
    if (!card) return html;
    card.dataset.state = phase.state;
    card.querySelector(".status-chip").textContent = stateLabels[phase.state] || phase.state;
    const progressText = card.querySelector(".metric-row__labels strong");
    const progressBar = card.querySelector(".progress span");
    if (progressText) progressText.textContent = `${phase.progress}%`;
    if (progressBar) progressBar.style.width = `${phase.progress}%`;
    const meta = card.querySelectorAll(".phase-card__meta span");
    if (meta[1]) meta[1].textContent = `과제 ${phase.tasksDone}/${phase.tasksTotal} · 필수 승인 ${phase.requiredOutputsDone}/${phase.requiredOutputsTotal}`;
    if (phase.pendingReviewCount || phase.heldSubmissionCount) {
      const activity = card.querySelector(".phase-card__activity");
      activity?.insertAdjacentHTML("afterend", `<p class="phase-card__review-summary">${phase.pendingReviewCount ? `검토 필요 ${phase.pendingReviewCount}건` : ""}${phase.pendingReviewCount && phase.heldSubmissionCount ? " · " : ""}${phase.heldSubmissionCount ? `보류 ${phase.heldSubmissionCount}건` : ""}</p>`);
    }
    return card.outerHTML;
  };
})();
