/* Submission deletion controls for dashboard v6. */

function canDeleteSubmission(item) {
  if (!currentUser) return false;
  const login = String(currentUser.login || "").toLowerCase();
  const uploader = String(item.uploader || "").toLowerCase();
  return Boolean(currentUser.isAdmin || (login && login === uploader));
}

function submissionDeleteButton(item) {
  if (!canDeleteSubmission(item) || !item.submissionId) return "";
  const label = String(currentUser?.login || "").toLowerCase() === String(item.uploader || "").toLowerCase()
    ? "내 제출 삭제"
    : "관리자 삭제";
  return `<button class="btn btn--small submission-delete-button" type="button" data-submission-id="${escapeHtml(item.submissionId)}">${label}</button>`;
}

reviewOutput = function reviewOutputWithDeletion(output) {
  if (!output) return;
  const submissions = output.submissions ?? [];
  submissionOutput = output;
  openSubmissionDialog(`
    <span class="dialog-phase">결과 확인 · ${escapeHtml(output.id)}</span>
    <h2>${escapeHtml(output.text)}</h2>
    <div class="submission-list">
      ${submissions.length ? submissions.slice().reverse().map((item) => `
        <article data-submission-id="${escapeHtml(item.submissionId || "")}">
          <div><strong>${escapeHtml(displayName(item.uploader))}</strong><span>${escapeHtml(submissionTypeLabels[item.type] ?? item.type)} · ${escapeHtml(formatDate(item.uploadedAt))}</span></div>
          <p>${escapeHtml(item.summary ?? "제출본")}</p>
          ${item.serverPath ? `<code>${escapeHtml(item.serverPath)}</code>` : ""}
          <div class="table-result-actions">
            ${item.type === "table" && item.table?.dataUrl ? `<button class="btn btn--small table-preview-button" type="button" data-table-url="${escapeHtml(item.table.dataUrl)}" data-table-title="${escapeHtml(item.outputText || output.text)}">표 보기</button><a class="btn btn--small" href="${escapeHtml(item.table.csvUrl)}" target="_blank" rel="noreferrer">CSV 열기</a>` : ""}
            <a class="btn btn--small" href="${escapeHtml(item.folderUrl)}" target="_blank" rel="noreferrer">제출 폴더 열기</a>
            ${submissionDeleteButton(item)}
          </div>
        </article>`).join("") : '<div class="empty-checklist">제출된 결과물이 없습니다.</div>'}
    </div>
    <div id="saved-table-preview"></div>
    <div class="dialog-actions"><button id="submission-close" class="btn" type="button">닫기</button></div>`);

  document.querySelectorAll(".table-preview-button").forEach((button) => {
    button.addEventListener("click", () => showSavedTable(button));
  });
  document.querySelectorAll(".submission-delete-button").forEach((button) => {
    button.addEventListener("click", () => deleteSubmissionRecord(button, output));
  });
  document.querySelector("#submission-close")?.addEventListener("click", () => closeSubmissionDialog());
};

async function deleteSubmissionRecord(button, output) {
  const phase = getDialogPhase();
  const submissionId = button.dataset.submissionId;
  const taskId = output.taskId;
  if (!phase || !taskId || !submissionId) {
    showToast("삭제할 제출본 정보를 찾지 못했습니다.");
    return;
  }

  const confirmed = window.confirm(
    "이 제출본을 삭제하시겠습니까?\n\n제출 폴더와 대시보드 제출 이력에서 함께 제거되며 되돌릴 수 없습니다."
  );
  if (!confirmed) return;

  button.disabled = true;
  button.textContent = "삭제 중";
  try {
    await apiFetch(
      `/api/phases/${phase.id}/tasks/${encodeURIComponent(taskId)}/outputs/${encodeURIComponent(output.id)}/submissions/${encodeURIComponent(submissionId)}`,
      { method: "DELETE" }
    );
    closeSubmissionDialog();
    await fetchLiveIssue(phase);
    showToast("제출본을 삭제했습니다.");
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = canDeleteSubmission({ uploader: currentUser?.login }) ? "내 제출 삭제" : "관리자 삭제";
  }
}
