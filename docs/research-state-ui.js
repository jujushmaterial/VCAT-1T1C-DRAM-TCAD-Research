/* Required-output based completion UI.
 * Loaded after task-output-presence.js and table-submission.js.
 */
(() => {
  const taskStateLabels = {
    "not-started": "진행 전",
    "in-progress": "진행 중",
    completed: "완료"
  };

  function classificationFor(existingOutput, submissionId) {
    const record = (existingOutput?.submissions ?? []).find(
      (item) => String(item.submissionId) === String(submissionId)
    );
    return record?.classification ?? null;
  }

  function evidenceSubmissions(output) {
    return (output?.submissions ?? []).filter(
      (record) => record?.classification?.countsAsEvidence !== false
    );
  }

  function mergeOutputPolicy(existingOutput, incomingOutput) {
    const submissions = (incomingOutput?.submissions ?? existingOutput?.submissions ?? []).map((record) => {
      const classification = record.classification
        ?? classificationFor(existingOutput, record.submissionId);
      return classification ? { ...record, classification } : record;
    });
    const required = existingOutput?.required ?? incomingOutput?.required ?? true;
    const evidenceCount = submissions.filter(
      (record) => record?.classification?.countsAsEvidence !== false
    ).length;

    return {
      ...existingOutput,
      ...incomingOutput,
      required,
      reviewBlocksCompletion: existingOutput?.reviewBlocksCompletion ?? false,
      policyReason: existingOutput?.policyReason ?? null,
      submissions,
      submissionCount: submissions.length,
      evidenceSubmissionCount: evidenceCount,
      submitted: evidenceCount > 0,
      state: evidenceCount > 0 ? "submitted" : (required ? "missing" : "optional")
    };
  }

  function calculateTask(task, declaredChecked = task.declaredChecked ?? task.checked) {
    const outputs = task.outputs ?? [];
    const requiredOutputs = outputs.filter((output) => output.required !== false);
    const outputsDone = outputs.filter((output) => evidenceSubmissions(output).length > 0).length;
    const missingRequiredOutputs = requiredOutputs
      .filter((output) => evidenceSubmissions(output).length === 0)
      .map((output) => output.id);

    const checked = requiredOutputs.length
      ? missingRequiredOutputs.length === 0
      : Boolean(declaredChecked);
    const state = checked ? "completed" : (outputsDone ? "in-progress" : "not-started");

    return {
      ...task,
      declaredChecked: Boolean(declaredChecked),
      checked,
      state,
      outputsDone,
      outputsTotal: outputs.length,
      requiredOutputsDone: requiredOutputs.length - missingRequiredOutputs.length,
      requiredOutputsTotal: requiredOutputs.length,
      missingRequiredOutputs,
      checkboxDrift: Boolean(declaredChecked) !== checked
    };
  }

  function mergeTasks(existingTasks = [], incomingTasks = []) {
    const existingById = new Map(existingTasks.map((task) => [String(task.id), task]));
    return incomingTasks.map((incomingTask) => {
      const existingTask = existingById.get(String(incomingTask.id)) ?? {};
      const existingOutputs = new Map(
        (existingTask.outputs ?? []).map((output) => [String(output.id), output])
      );
      const outputs = (incomingTask.outputs ?? []).map((incomingOutput) =>
        mergeOutputPolicy(existingOutputs.get(String(incomingOutput.id)), incomingOutput)
      );
      return calculateTask({ ...existingTask, ...incomingTask, outputs }, incomingTask.checked);
    });
  }

  function recalculatePhase(phase, incomingState = null) {
    phase.tasks = (phase.tasks ?? []).map((task) => calculateTask(task));
    phase.outputs = flattenTaskOutputs(phase.tasks);
    phase.tasksDone = phase.tasks.filter((task) => task.checked).length;
    phase.tasksTotal = phase.tasks.length;
    phase.outputsDone = phase.outputs.filter((output) => evidenceSubmissions(output).length > 0).length;
    phase.outputsTotal = phase.outputs.length;

    const requiredOutputs = phase.outputs.filter((output) => output.required !== false);
    phase.requiredOutputsDone = requiredOutputs.filter(
      (output) => evidenceSubmissions(output).length > 0
    ).length;
    phase.requiredOutputsTotal = requiredOutputs.length;
    phase.progress = phase.tasksTotal
      ? Math.round((phase.tasksDone / phase.tasksTotal) * 100)
      : 0;

    const hadLockedState = phase.state === "locked";
    if (incomingState === "blocked" || phase.state === "blocked") {
      phase.state = "blocked";
    } else if (phase.tasksTotal && phase.tasksDone === phase.tasksTotal) {
      phase.state = incomingState === "completed" || phase.state === "completed"
        ? "completed"
        : "review";
    } else if (phase.tasks.some((task) => task.state === "in-progress") || phase.tasksDone) {
      phase.state = "in-progress";
    } else {
      phase.state = hadLockedState ? "locked" : "waiting";
    }
  }

  const previousApplyIssueData = applyIssueData;
  applyIssueData = function applyIssueDataWithReconciledState(phase, data, action = null) {
    const existingTasks = structuredClone(phase.tasks ?? []);
    previousApplyIssueData(phase, data, action);
    phase.tasks = mergeTasks(existingTasks, data.tasks ?? phase.tasks ?? []);
    phase.outputs = flattenTaskOutputs(phase.tasks);
    recalculatePhase(phase, data.state);
  };

  outputStatusLabel = function reconciledOutputStatusLabel(output) {
    const count = evidenceSubmissions(output).length;
    if (count) return `결과 ${count}건`;
    return output.required === false ? "선택 미제출" : "필수 미제출";
  };

  renderTaskOutput = function renderRequiredTaskOutput(output, task, taskIndex, outputIndex, editable) {
    const type = output.type || "any";
    const review = output.review || "none";
    const requirement = output.required === false ? "선택" : "필수";
    return `
      <div class="task-output-row ${output.required === false ? "is-optional" : "is-required"}"
           data-output-index="${outputIndex}"
           data-output-id="${escapeHtml(output.id ?? "")}">
        <span class="task-output-connector" aria-hidden="true">└</span>
        <div class="task-output-main">
          ${editable
            ? `<input class="task-output-input" type="text" value="${escapeHtml(output.text)}" placeholder="제출할 산출물 이름">`
            : `<span class="task-output-text">${escapeHtml(output.text)}</span>`}
          <div class="task-output-meta">
            ${editable
              ? `${outputTypeSelect({ ...output, type })}${outputReviewSelect({ ...output, review })}`
              : `<span class="output-kind">${escapeHtml(taskOutputTypeLabels[type] ?? type)}</span>${review === "recommended" ? '<span class="review-badge">검토 권장</span>' : ""}`}
            <span class="requirement-badge ${output.required === false ? "is-optional" : "is-required"}"
                  title="${escapeHtml(output.policyReason ?? "")}">${requirement}</span>
          </div>
        </div>
        ${taskOutputAction(output, task, editable)}
        ${editable ? '<button class="task-output-delete" type="button" aria-label="산출물 삭제">×</button>' : ""}
      </div>`;
  };

  renderTask = function renderAutoTask(task, index, editable) {
    const key = taskKey(task, index);
    const expanded = expandedTaskIds.has(key);
    const outputs = task.outputs ?? [];
    const submitted = outputs.filter((item) => evidenceSubmissions(item).length > 0).length;
    const missing = task.missingRequiredOutputs ?? [];
    const state = task.state ?? (task.checked ? "completed" : (submitted ? "in-progress" : "not-started"));

    return `
      <article class="task-card ${task.checked ? "is-done" : ""}" data-task-index="${index}"
               data-task-id="${escapeHtml(task.id ?? "")}" data-task-key="${escapeHtml(key)}">
        <div class="task-card__main">
          <input class="task-checkbox" type="checkbox"
                 aria-label="과제 ${index + 1} 자동 완료 상태"
                 ${task.checked ? "checked" : ""} disabled data-auto-completion="true">
          ${editable
            ? `<input class="task-input" type="text" value="${escapeHtml(task.text)}" placeholder="과제 내용">`
            : `<span class="task-text">${escapeHtml(task.text)}</span>`}
          <span class="task-state-badge" data-task-state="${escapeHtml(state)}"
                title="${missing.length ? `누락: ${escapeHtml(missing.join(", "))}` : "필수 산출물 충족"}">
            ${escapeHtml(taskStateLabels[state] ?? state)}
          </span>
          <span class="task-output-count">필수 ${task.requiredOutputsDone ?? 0}/${task.requiredOutputsTotal ?? 0} · 제출 ${submitted}/${outputs.length}</span>
          <button class="task-toggle" type="button" aria-expanded="${expanded ? "true" : "false"}"
                  aria-label="산출물 목록 ${expanded ? "접기" : "펼치기"}">▼</button>
          ${editable ? '<button class="task-delete" type="button" aria-label="과제 삭제">×</button>' : ""}
        </div>
        <div class="task-output-panel" ${expanded ? "" : "hidden"}>
          <div class="task-output-heading">
            <strong>연결된 산출물</strong>
            <span>필수 산출물이 모두 제출되면 과제가 자동 완료됩니다. 선택 산출물은 진행률을 막지 않습니다.</span>
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
  renderDialog = function renderDialogWithReconciledPolicy(phase, options = {}) {
    recalculatePhase(phase);
    previousRenderDialog(phase, options);

    const summaryLabel = document.querySelector("#dialog-content .dialog-summary > div:first-child span");
    if (summaryLabel) summaryLabel.textContent = "자동 과제 진행률";

    const policy = document.querySelector("#dialog-content .output-policy p");
    if (policy) {
      policy.textContent = "과제 완료는 Issue 체크박스가 아니라 필수 산출물 제출 여부로 자동 계산합니다. 선택 산출물은 제출하지 않아도 완료를 막지 않으며, 검토 권장은 현재 진행률을 차단하지 않습니다.";
    }

    const source = document.querySelector("#dialog-content .sync-state");
    if (source && options.live) {
      source.textContent = "GitHub Issue 최신 내용 + 필수 산출물 기반 통합 상태";
    }

    if (phase.integrityWarnings > 0 && !document.querySelector("#dialog-content .integrity-notice")) {
      const summary = document.querySelector("#dialog-content .dialog-summary");
      summary?.insertAdjacentHTML(
        "afterend",
        `<div class="integrity-notice">무결성 경고 ${Number(phase.integrityWarnings)}건 · 관리자용 integrity-report.json에서 세부 내용을 확인할 수 있습니다.</div>`
      );
    }
  };

  const previousPhaseCard = phaseCard;
  phaseCard = function phaseCardWithRequiredOutputSummary(phase) {
    recalculatePhase(phase);
    const html = previousPhaseCard(phase);
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const card = template.content.firstElementChild;
    const meta = card?.querySelector(".phase-card__meta");
    if (meta && Number.isFinite(phase.requiredOutputsTotal)) {
      const spans = meta.querySelectorAll("span");
      if (spans[1]) {
        spans[1].textContent = `과제 ${phase.tasksDone}/${phase.tasksTotal} · 필수 산출물 ${phase.requiredOutputsDone}/${phase.requiredOutputsTotal}`;
      }
    }
    return card?.outerHTML ?? html;
  };
})();
