/* Compact output-list review status dots. Keeps completion policy intact. */
(() => {
  function outputReviewState(output) {
    const held = Number(output?.heldSubmissionCount || 0);
    const pending = Number(output?.pendingReviewCount || 0);
    const approved = Number(output?.approvedSubmissionCount || 0);
    if (held > 0) return { status: "held", label: `보류 ${held}건`, held, pending, approved };
    if (pending > 0) return { status: "pending", label: `검토 필요 ${pending}건`, held, pending, approved };
    if (approved > 0) return { status: "approved", label: `승인 ${approved}건`, held, pending, approved };
    return null;
  }

  function statusDot(output) {
    const state = outputReviewState(output);
    if (!state) return "";
    const details = [
      state.approved ? `승인 ${state.approved}` : "",
      state.pending ? `검토 필요 ${state.pending}` : "",
      state.held ? `보류 ${state.held}` : ""
    ].filter(Boolean).join(" · ");
    return `<span class="output-review-dot is-${state.status}" role="img" aria-label="${escapeHtml(details)}" title="${escapeHtml(details)}"></span>`;
  }

  const previousRenderTaskOutput = renderTaskOutput;
  renderTaskOutput = function renderTaskOutputWithStatusDot(output, task, taskIndex, outputIndex, editable) {
    if (editable) return previousRenderTaskOutput(output, task, taskIndex, outputIndex, editable);

    const type = output.type || "any";
    const optional = output.required === false
      ? '<span class="requirement-badge is-optional">선택</span>'
      : "";

    return `
      <div class="task-output-row ${output.required === false ? "is-optional" : "is-required"}"
           data-output-index="${outputIndex}"
           data-output-id="${escapeHtml(output.id || "")}">
        <span class="task-output-connector" aria-hidden="true">└</span>
        <div class="task-output-main">
          <span class="task-output-text">${escapeHtml(output.text)}</span>
          <div class="task-output-meta">
            ${statusDot(output)}
            <span class="output-kind">${escapeHtml(taskOutputTypeLabels[type] || type)}</span>
            ${optional}
          </div>
        </div>
        ${taskOutputAction(output, task, editable)}
      </div>`;
  };

  const previousRenderDialog = renderDialog;
  renderDialog = function renderDialogWithoutOutputPolicy(phase, options = {}) {
    previousRenderDialog(phase, options);
    document.querySelector("#dialog-content .output-policy")?.remove();
  };
})();
