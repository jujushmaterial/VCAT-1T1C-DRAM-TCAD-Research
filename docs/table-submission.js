/* Spreadsheet-style table submission for dashboard v5. */

submissionTypeLabels.table = "표 입력";
taskOutputTypeLabels.table = "표 입력";
if (!taskOutputTypeOptions.some(([value]) => value === "table")) {
  taskOutputTypeOptions.push(["table", "표 입력"]);
}

const TABLE_MAX_ROWS = 500;
const TABLE_MAX_COLUMNS = 50;
const TABLE_MAX_CELLS = 20_000;
const TABLE_INITIAL_ROWS = 8;
const TABLE_INITIAL_COLUMNS = 6;
let tableDraftRows = [];
let tableDraftHasHeader = true;
let tableDraftNote = "";
let tableDraftOutputId = null;

function blankTable(rows = TABLE_INITIAL_ROWS, columns = TABLE_INITIAL_COLUMNS) {
  return Array.from({ length: rows }, () => Array(columns).fill(""));
}

function prepareTableDraft(output) {
  tableDraftOutputId = output?.id ?? null;
  tableDraftRows = blankTable();
  tableDraftHasHeader = true;
  tableDraftNote = "";
}

function columnLabel(index) {
  let label = "";
  let value = index + 1;
  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }
  return label;
}

function normalizeCell(value) {
  return String(value ?? "").replace(/\r\n?/g, "\n");
}

function parseClipboardTable(text) {
  const normalized = String(text ?? "").replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  while (lines.length > 1 && lines.at(-1) === "") lines.pop();
  return lines.map((line) => line.split("\t").map(normalizeCell));
}

function ensureTableSize(rowCount, columnCount) {
  if (rowCount > TABLE_MAX_ROWS || columnCount > TABLE_MAX_COLUMNS || rowCount * columnCount > TABLE_MAX_CELLS) {
    throw new Error(`표는 최대 ${TABLE_MAX_ROWS}행, ${TABLE_MAX_COLUMNS}열, ${TABLE_MAX_CELLS.toLocaleString()}셀까지 입력할 수 있습니다.`);
  }
  const currentColumns = Math.max(1, ...tableDraftRows.map((row) => row.length));
  while (tableDraftRows.length < rowCount) tableDraftRows.push(Array(currentColumns).fill(""));
  tableDraftRows.forEach((row) => {
    while (row.length < columnCount) row.push("");
  });
}

function syncTableDraftFromGrid() {
  document.querySelectorAll("#table-entry-grid [data-table-cell]").forEach((cell) => {
    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);
    if (!Number.isInteger(row) || !Number.isInteger(column) || !tableDraftRows[row]) return;
    tableDraftRows[row][column] = normalizeCell(cell.textContent);
  });
  const note = document.querySelector("#table-note");
  if (note) tableDraftNote = note.value;
  const header = document.querySelector("#table-has-header");
  if (header) tableDraftHasHeader = header.checked;
}

function trimTableRows(rows) {
  const result = rows.map((row) => row.map((cell) => normalizeCell(cell)));
  while (result.length && result.at(-1).every((cell) => !cell.trim())) result.pop();
  if (!result.length) return [];
  let lastColumn = -1;
  result.forEach((row) => {
    row.forEach((cell, index) => {
      if (cell.trim()) lastColumn = Math.max(lastColumn, index);
    });
  });
  if (lastColumn < 0) return [];
  return result.map((row) => {
    const normalized = row.slice(0, lastColumn + 1);
    while (normalized.length < lastColumn + 1) normalized.push("");
    return normalized;
  });
}

function tableGridHtml() {
  const columns = Math.max(1, ...tableDraftRows.map((row) => row.length));
  return `
    <table class="sheet-grid" aria-label="표 입력 영역">
      <thead><tr><th class="sheet-corner"></th>${Array.from({ length: columns }, (_, index) => `<th>${columnLabel(index)}</th>`).join("")}</tr></thead>
      <tbody>${tableDraftRows.map((row, rowIndex) => `
        <tr>
          <th>${rowIndex + 1}</th>
          ${Array.from({ length: columns }, (_, columnIndex) => `<td><div contenteditable="true" spellcheck="false" data-table-cell data-row="${rowIndex}" data-column="${columnIndex}">${escapeHtml(row[columnIndex] ?? "")}</div></td>`).join("")}
        </tr>`).join("")}</tbody>
    </table>`;
}

function bindTableGridEvents() {
  const grid = document.querySelector("#table-entry-grid");
  if (!grid) return;
  grid.querySelectorAll("[data-table-cell]").forEach((cell) => {
    cell.addEventListener("input", () => {
      const row = Number(cell.dataset.row);
      const column = Number(cell.dataset.column);
      tableDraftRows[row][column] = normalizeCell(cell.textContent);
    });
    cell.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      const row = Number(cell.dataset.row);
      const column = Number(cell.dataset.column);
      const next = grid.querySelector(`[data-row="${Math.min(row + 1, tableDraftRows.length - 1)}"][data-column="${column}"]`);
      next?.focus();
    });
    cell.addEventListener("paste", (event) => {
      const text = event.clipboardData?.getData("text/plain") ?? "";
      if (!text.includes("\t") && !text.includes("\n") && !text.includes("\r")) return;
      event.preventDefault();
      try {
        syncTableDraftFromGrid();
        const pasted = parseClipboardTable(text);
        const startRow = Number(cell.dataset.row);
        const startColumn = Number(cell.dataset.column);
        const pasteColumns = Math.max(1, ...pasted.map((row) => row.length));
        ensureTableSize(startRow + pasted.length, startColumn + pasteColumns);
        pasted.forEach((row, rowOffset) => {
          row.forEach((value, columnOffset) => {
            tableDraftRows[startRow + rowOffset][startColumn + columnOffset] = value;
          });
        });
        renderTableGrid();
        document.querySelector(`[data-row="${startRow}"][data-column="${startColumn}"]`)?.focus();
      } catch (error) {
        showToast(error.message);
      }
    });
  });
}

function renderTableGrid() {
  const grid = document.querySelector("#table-entry-grid");
  if (!grid) return;
  grid.innerHTML = tableGridHtml();
  bindTableGridEvents();
  updateTableSizeLabel();
}

function updateTableSizeLabel() {
  const label = document.querySelector("#table-size-label");
  if (!label) return;
  const columns = Math.max(1, ...tableDraftRows.map((row) => row.length));
  label.textContent = `${tableDraftRows.length}행 × ${columns}열`;
}

function renderTableSubmission() {
  if (tableDraftOutputId !== submissionOutput?.id) prepareTableDraft(submissionOutput);
  openSubmissionDialog(`
    <span class="dialog-phase">표 입력 · ${escapeHtml(submissionOutput.id)}</span>
    <h2>${escapeHtml(submissionOutput.text)}</h2>
    <p class="submission-help">Workbench에서 범위를 복사한 뒤 첫 셀을 누르고 Ctrl+V 하세요. 탭은 열, 줄바꿈은 행으로 자동 분리됩니다.</p>
    <div class="sheet-toolbar">
      <button id="table-add-row" class="btn btn--small" type="button">행 추가</button>
      <button id="table-add-column" class="btn btn--small" type="button">열 추가</button>
      <button id="table-remove-row" class="btn btn--small" type="button">마지막 행 삭제</button>
      <button id="table-remove-column" class="btn btn--small" type="button">마지막 열 삭제</button>
      <button id="table-trim" class="btn btn--small" type="button">빈 행·열 정리</button>
      <button id="table-clear" class="btn btn--small" type="button">전체 지우기</button>
      <span id="table-size-label" class="sheet-size"></span>
    </div>
    <div id="table-entry-grid" class="sheet-grid-wrap"></div>
    <div class="sheet-options">
      <label><input id="table-has-header" type="checkbox" ${tableDraftHasHeader ? "checked" : ""}> 첫 번째 행을 제목 행으로 사용</label>
      <small>최대 ${TABLE_MAX_ROWS}행 · ${TABLE_MAX_COLUMNS}열 · ${TABLE_MAX_CELLS.toLocaleString()}셀</small>
    </div>
    <label class="field-label">표 설명<textarea id="table-note" rows="3" placeholder="변수 단위, 최적 조건 선정 기준, 주의사항 등을 적어 주세요.">${escapeHtml(tableDraftNote)}</textarea></label>
    <div class="dialog-actions">
      <button id="submit-table" class="btn btn--primary" type="button">표 저장</button>
      <button id="submission-back" class="btn" type="button">뒤로</button>
    </div>`);

  renderTableGrid();
  document.querySelector("#table-has-header")?.addEventListener("change", (event) => { tableDraftHasHeader = event.target.checked; });
  document.querySelector("#table-note")?.addEventListener("input", (event) => { tableDraftNote = event.target.value; });
  document.querySelector("#table-add-row")?.addEventListener("click", () => {
    try {
      syncTableDraftFromGrid();
      ensureTableSize(tableDraftRows.length + 1, Math.max(1, ...tableDraftRows.map((row) => row.length)));
      renderTableGrid();
    } catch (error) { showToast(error.message); }
  });
  document.querySelector("#table-add-column")?.addEventListener("click", () => {
    try {
      syncTableDraftFromGrid();
      const columns = Math.max(1, ...tableDraftRows.map((row) => row.length));
      ensureTableSize(tableDraftRows.length, columns + 1);
      renderTableGrid();
    } catch (error) { showToast(error.message); }
  });
  document.querySelector("#table-remove-row")?.addEventListener("click", () => {
    syncTableDraftFromGrid();
    if (tableDraftRows.length > 1) tableDraftRows.pop();
    renderTableGrid();
  });
  document.querySelector("#table-remove-column")?.addEventListener("click", () => {
    syncTableDraftFromGrid();
    const columns = Math.max(1, ...tableDraftRows.map((row) => row.length));
    if (columns > 1) tableDraftRows.forEach((row) => row.pop());
    renderTableGrid();
  });
  document.querySelector("#table-trim")?.addEventListener("click", () => {
    syncTableDraftFromGrid();
    tableDraftRows = trimTableRows(tableDraftRows);
    if (!tableDraftRows.length) tableDraftRows = blankTable();
    renderTableGrid();
  });
  document.querySelector("#table-clear")?.addEventListener("click", () => {
    tableDraftRows = blankTable();
    renderTableGrid();
  });
  document.querySelector("#submit-table")?.addEventListener("click", submitTable);
  document.querySelector("#submission-back")?.addEventListener("click", () => openSubmissionChoice(submissionOutput));
}

async function submitTable() {
  const button = document.querySelector("#submit-table");
  try {
    syncTableDraftFromGrid();
    const rows = trimTableRows(tableDraftRows);
    if (!rows.length) throw new Error("저장할 표 데이터를 입력해 주세요.");
    const columns = Math.max(...rows.map((row) => row.length));
    if (rows.length > TABLE_MAX_ROWS || columns > TABLE_MAX_COLUMNS || rows.length * columns > TABLE_MAX_CELLS) {
      throw new Error("표 크기가 허용 범위를 넘었습니다.");
    }
    button.disabled = true;
    button.textContent = "저장 중";
    await submitOutput("table", {
      rows,
      hasHeader: tableDraftHasHeader,
      note: tableDraftNote.trim()
    });
    tableDraftOutputId = null;
    tableDraftRows = [];
  } catch (error) {
    showToast(error.message);
    button.disabled = false;
    button.textContent = "표 저장";
  }
}

const baseOpenSubmissionChoiceForTable = openSubmissionChoice;
openSubmissionChoice = function openSubmissionChoiceWithTable(output) {
  submissionOutput = output;
  completionCheckbox = null;
  if (output.type === "table") {
    prepareTableDraft(output);
    renderTableSubmission();
    return;
  }
  const modes = output.type === "any" ? ["files", "code", "server", "table"] : [output.type];
  const choice = {
    files: '<button class="submission-choice" data-mode="files" type="button"><strong>파일 업로드</strong><span>이미지, 그래프, 표, PDF 및 문서 제출</span></button>',
    code: '<button class="submission-choice" data-mode="code" type="button"><strong>코드 삽입</strong><span>SDE, SProcess, SDevice, SVisual, Tcl, Python 코드 붙여넣기</span></button>',
    server: '<button class="submission-choice" data-mode="server" type="button"><strong>서버 경로 등록</strong><span>대용량 TDR, PLT 및 서버 원본 위치 기록</span></button>',
    table: '<button class="submission-choice" data-mode="table" type="button"><strong>표 입력</strong><span>Workbench 또는 Excel 범위를 셀 단위로 붙여넣기</span></button>'
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
      if (mode === "table") {
        prepareTableDraft(output);
        renderTableSubmission();
      }
    });
  });
  document.querySelector("#submission-cancel")?.addEventListener("click", () => closeSubmissionDialog());
};

function readOnlyTableHtml(data) {
  const rows = Array.isArray(data?.rows) ? data.rows : [];
  if (!rows.length) return '<div class="empty-checklist">표 데이터가 없습니다.</div>';
  const columns = Math.max(1, ...rows.map((row) => row.length));
  const normalized = rows.map((row) => Array.from({ length: columns }, (_, index) => row[index] ?? ""));
  const hasHeader = Boolean(data.hasHeader);
  const header = hasHeader ? normalized[0] : Array.from({ length: columns }, (_, index) => `열 ${index + 1}`);
  const body = hasHeader ? normalized.slice(1) : normalized;
  return `<div class="saved-table-wrap"><table class="saved-table"><thead><tr>${header.map((cell) => `<th>${escapeHtml(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

async function showSavedTable(button) {
  const panel = document.querySelector("#saved-table-preview");
  if (!panel) return;
  panel.innerHTML = '<div class="empty-checklist">표를 불러오는 중입니다.</div>';
  try {
    const response = await fetch(button.dataset.tableUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("표 데이터를 불러오지 못했습니다.");
    const data = await response.json();
    panel.innerHTML = `
      <div class="saved-table-heading"><strong>${escapeHtml(button.dataset.tableTitle || "저장된 표")}</strong><span>${Number(data.rowCount || data.rows?.length || 0)}행 × ${Number(data.columnCount || 0)}열</span></div>
      ${readOnlyTableHtml(data)}`;
  } catch (error) {
    panel.innerHTML = `<div class="empty-checklist">${escapeHtml(error.message)}</div>`;
  }
}

const baseReviewOutputForTable = reviewOutput;
reviewOutput = function reviewOutputWithTable(output) {
  if (!output) return;
  const submissions = output.submissions ?? [];
  const hasTable = submissions.some((item) => item.type === "table" && item.table?.dataUrl);
  if (!hasTable) {
    baseReviewOutputForTable(output);
    return;
  }
  submissionOutput = output;
  openSubmissionDialog(`
    <span class="dialog-phase">결과 확인 · ${escapeHtml(output.id)}</span>
    <h2>${escapeHtml(output.text)}</h2>
    <div class="submission-list">
      ${submissions.slice().reverse().map((item) => `
        <article>
          <div><strong>${escapeHtml(displayName(item.uploader))}</strong><span>${escapeHtml(submissionTypeLabels[item.type] ?? item.type)} · ${escapeHtml(formatDate(item.uploadedAt))}</span></div>
          <p>${escapeHtml(item.summary ?? "제출본")}</p>
          <div class="table-result-actions">
            ${item.type === "table" && item.table?.dataUrl ? `<button class="btn btn--small table-preview-button" type="button" data-table-url="${escapeHtml(item.table.dataUrl)}" data-table-title="${escapeHtml(item.outputText || output.text)}">표 보기</button><a class="btn btn--small" href="${escapeHtml(item.table.csvUrl)}" target="_blank" rel="noreferrer">CSV 열기</a>` : ""}
            <a class="btn btn--small" href="${escapeHtml(item.folderUrl)}" target="_blank" rel="noreferrer">제출 폴더 열기</a>
          </div>
        </article>`).join("")}
    </div>
    <div id="saved-table-preview"></div>
    <div class="dialog-actions"><button id="submission-close" class="btn" type="button">닫기</button></div>`);
  document.querySelectorAll(".table-preview-button").forEach((button) => button.addEventListener("click", () => showSavedTable(button)));
  document.querySelector("#submission-close")?.addEventListener("click", () => closeSubmissionDialog());
};
