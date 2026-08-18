/* Submission deletion controls for dashboard v7. */

const reviewOutputBeforeDeletion = typeof reviewOutput === "function" ? reviewOutput : null;
const submissionRawRoot = "https://raw.githubusercontent.com/jujushmaterial/VCAT-1T1C-DRAM-TCAD-Research/main/";

function canDeleteSubmission(item) {
  if (!currentUser) return false;
  const login = String(currentUser.login || "").toLowerCase();
  const uploader = String(item.uploader || "").toLowerCase();
  return Boolean(currentUser.isAdmin || (login && login === uploader));
}

function submissionDeleteButton(item) {
  if (!canDeleteSubmission(item) || !item.submissionId) return "";
  const ownSubmission = String(currentUser?.login || "").toLowerCase() === String(item.uploader || "").toLowerCase();
  const label = ownSubmission ? "내 제출 삭제" : "관리자 삭제";
  return `<button class="btn btn--small submission-delete-button" type="button" data-submission-id="${escapeHtml(item.submissionId)}">${label}</button>`;
}

function rawSubmissionFileUrl(path) {
  const value = String(path || "").trim().replace(/^\/+/, "");
  if (!value) return "";
  return submissionRawRoot + value.split("/").map((part) => encodeURIComponent(part)).join("/");
}

function findSubmissionFile(item, fileName) {
  const target = String(fileName || "").toLowerCase();
  return (item?.files || []).find((file) => {
    const name = String(file?.name || "").toLowerCase();
    const pathName = String(file?.path || "").split("/").pop().toLowerCase();
    return name === target || pathName === target;
  }) || null;
}

function recoverTableAssetUrl(item, fileName, explicitUrl = "") {
  if (explicitUrl) return String(explicitUrl);
  const file = findSubmissionFile(item, fileName);
  if (!file) return "";
  for (const key of ["rawUrl", "downloadUrl", "previewUrl"]) {
    if (file[key]) return String(file[key]);
  }
  if (file.path) return rawSubmissionFileUrl(file.path);
  if (item?.folderPath) return rawSubmissionFileUrl(`${item.folderPath}/${fileName}`);
  return "";
}

function normalizeTableSubmission(item) {
  if (!item) return item;
  const hasTableFile = Boolean(findSubmissionFile(item, "table.json"));
  if (item.type !== "table" && !item.table && !hasTableFile) return item;

  const dataUrl = recoverTableAssetUrl(item, "table.json", item.table?.dataUrl);
  if (!dataUrl) return item;
  const table = {
    ...(item.table || {}),
    dataUrl,
    csvUrl: recoverTableAssetUrl(item, "table.csv", item.table?.csvUrl),
    tsvUrl: recoverTableAssetUrl(item, "table.tsv", item.table?.tsvUrl)
  };
  return { ...item, type: "table", table };
}

function openTableSubmission(button, output, submissions) {
  const submissionId = button?.dataset?.submissionId || button?.closest("article")?.dataset?.submissionId || "";
  const item = submissions.find((entry) => String(entry?.submissionId || "") === String(submissionId));
  if (!item?.table?.dataUrl) {
    showToast("표 원본 파일을 찾지 못했습니다. 제출 폴더에서 원본을 확인해 주세요.");
    return;
  }
  if (typeof reviewOutputBeforeDeletion !== "function") {
    showToast("Spreadsheet Viewer를 불러오지 못했습니다.");
    return;
  }

  const dialog = document.querySelector("#submission-dialog");
  if (dialog?.open) dialog.close();
  reviewOutputBeforeDeletion({ ...output, submissions: [item] });
}

reviewOutput = function reviewOutputWithDeletion(output) {
  if (!output) return;
  const originalSubmissions = output.submissions ?? [];
  const submissions = originalSubmissions.map(normalizeTableSubmission);
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
            ${item.type === "table" && item.table?.dataUrl ? `<button class="btn btn--small table-preview-button" type="button" data-submission-id="${escapeHtml(item.submissionId || "")}">표 보기</button>${item.table.csvUrl ? `<a class="btn btn--small" href="${escapeHtml(item.table.csvUrl)}" target="_blank" rel="noreferrer">CSV 열기</a>` : ""}` : ""}
            <a class="btn btn--small" href="${escapeHtml(item.folderUrl)}" target="_blank" rel="noreferrer">제출 폴더 열기</a>
            ${submissionDeleteButton(item)}
          </div>
        </article>`).join("") : '<div class="empty-checklist">제출된 결과물이 없습니다.</div>'}
    </div>
    <div class="dialog-actions"><button id="submission-close" class="btn" type="button">닫기</button></div>`);

  document.querySelectorAll(".table-preview-button").forEach((button) => {
    button.addEventListener("click", () => openTableSubmission(button, output, submissions));
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
  if (!phase || !output.id || !submissionId) {
    showToast("삭제할 제출본 정보를 찾지 못했습니다.");
    return;
  }

  const item = (output.submissions ?? []).find((submission) => submission.submissionId === submissionId);
  const submitter = item ? displayName(item.uploader) : "제출자 미확인";
  const submittedAt = item ? formatDate(item.uploadedAt) : "시각 미확인";
  const confirmed = window.confirm(
    `이 제출본을 삭제하시겠습니까?\n\n제출자: ${submitter}\n제출 시각: ${submittedAt}\n\n제출 폴더, submissions.json 기록과 결과물 README 이력이 함께 정리되며 되돌릴 수 없습니다.`
  );
  if (!confirmed) return;

  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "삭제 중";
  try {
    const path = taskId
      ? `/api/phases/${phase.id}/tasks/${encodeURIComponent(taskId)}/outputs/${encodeURIComponent(output.id)}/submissions/${encodeURIComponent(submissionId)}`
      : `/api/phases/${phase.id}/outputs/${encodeURIComponent(output.id)}/submissions/${encodeURIComponent(submissionId)}`;
    const result = await apiFetch(path, { method: "DELETE" });
    output.submissions = (output.submissions ?? []).filter((submission) => submission.submissionId !== submissionId);
    closeSubmissionDialog();
    await fetchLiveIssue(phase);
    showToast(result.remainingSubmissions
      ? `제출본을 삭제했습니다. 해당 산출물에 ${result.remainingSubmissions}개가 남아 있습니다.`
      : "마지막 제출본을 삭제했습니다. 현재 미제출 또는 파일 없음 상태입니다.");
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = originalLabel;
  }
}
