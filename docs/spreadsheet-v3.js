/* Phase 3 Excel-style editor and integrated spreadsheet viewer. */
(() => {
  const MAX_ROWS = 500;
  const MAX_COLUMNS = 50;
  const MAX_CELLS = 20_000;
  const INITIAL_ROWS = 12;
  const INITIAL_COLUMNS = 8;
  const VIEWER_MAX_ROWS = 1000;
  const VIEWER_MAX_COLUMNS = 100;
  const spreadsheetExtensions = new Set(["csv", "tsv", "xls", "xlsx"]);

  submissionTypeLabels.table = "표 입력";
  taskOutputTypeLabels.table = "표 입력";
  if (!taskOutputTypeOptions.some(([value]) => value === "table")) {
    taskOutputTypeOptions.push(["table", "표 입력"]);
  }

  const editor = {
    outputId: null,
    rows: [],
    hasHeader: true,
    note: "",
    active: { row: 0, column: 0 },
    anchor: { row: 0, column: 0 },
    focus: { row: 0, column: 0 },
    dragging: false,
    undo: [],
    importWorkbook: null,
    editingCell: null
  };

  const manifestCache = new Map();
  const previousFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await previousFetch(...args);
    try {
      const requestUrl = typeof args[0] === "string" ? args[0] : args[0]?.url;
      const url = new URL(requestUrl, location.href);
      const match = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/);
      if (match && response.ok) manifestCache.set(match[1], await response.clone().json());
    } catch (error) {
      console.warn("Spreadsheet manifest capture failed", error);
    }
    return response;
  };

  function blankRows(rows = INITIAL_ROWS, columns = INITIAL_COLUMNS) {
    return Array.from({ length: rows }, () => Array(columns).fill(""));
  }

  function resetEditor(output) {
    editor.outputId = output?.id || null;
    editor.rows = blankRows();
    editor.hasHeader = true;
    editor.note = "";
    editor.active = { row: 0, column: 0 };
    editor.anchor = { row: 0, column: 0 };
    editor.focus = { row: 0, column: 0 };
    editor.undo = [];
    editor.importWorkbook = null;
    editor.editingCell = null;
  }

  function normalizeCell(value) {
    return String(value ?? "").replace(/\r\n?/g, "\n");
  }

  function cloneRows(rows) {
    return rows.map((row) => row.map(normalizeCell));
  }

  function columnLabel(index) {
    let label = "";
    let value = index + 1;
    while (value > 0) {
      value -= 1;
      label = String.fromCharCode(65 + value % 26) + label;
      value = Math.floor(value / 26);
    }
    return label;
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }

  function rowCount() {
    return editor.rows.length;
  }

  function columnCount() {
    return Math.max(1, ...editor.rows.map((row) => row.length));
  }

  function validateSize(rows, columns) {
    if (rows > MAX_ROWS || columns > MAX_COLUMNS || rows * columns > MAX_CELLS) {
      throw new Error(`표는 최대 ${MAX_ROWS}행, ${MAX_COLUMNS}열, ${MAX_CELLS.toLocaleString()}셀까지 입력할 수 있습니다.`);
    }
  }

  function ensureSize(rows, columns) {
    validateSize(rows, columns);
    const currentColumns = columnCount();
    while (editor.rows.length < rows) editor.rows.push(Array(currentColumns).fill(""));
    editor.rows.forEach((row) => {
      while (row.length < columns) row.push("");
    });
  }

  function snapshot() {
    return {
      rows: cloneRows(editor.rows),
      hasHeader: editor.hasHeader,
      note: editor.note,
      active: { ...editor.active },
      anchor: { ...editor.anchor },
      focus: { ...editor.focus }
    };
  }

  function pushUndo() {
    editor.undo.push(snapshot());
    if (editor.undo.length > 60) editor.undo.shift();
  }

  function undoEditor() {
    const previous = editor.undo.pop();
    if (!previous) {
      showToast("실행 취소할 변경이 없습니다.");
      return;
    }
    editor.rows = previous.rows;
    editor.hasHeader = previous.hasHeader;
    editor.note = previous.note;
    editor.active = previous.active;
    editor.anchor = previous.anchor;
    editor.focus = previous.focus;
    renderEditorGrid();
    syncEditorOptions();
    focusActiveCell();
  }

  function selectionBounds() {
    return {
      top: Math.min(editor.anchor.row, editor.focus.row),
      bottom: Math.max(editor.anchor.row, editor.focus.row),
      left: Math.min(editor.anchor.column, editor.focus.column),
      right: Math.max(editor.anchor.column, editor.focus.column)
    };
  }

  function isSelected(row, column) {
    const bounds = selectionBounds();
    return row >= bounds.top && row <= bounds.bottom && column >= bounds.left && column <= bounds.right;
  }

  function setActive(row, column, extend = false) {
    const nextRow = Math.max(0, Math.min(rowCount() - 1, row));
    const nextColumn = Math.max(0, Math.min(columnCount() - 1, column));
    editor.active = { row: nextRow, column: nextColumn };
    editor.focus = { row: nextRow, column: nextColumn };
    if (!extend) editor.anchor = { row: nextRow, column: nextColumn };
    refreshSelection();
  }

  function moveActive(rowDelta, columnDelta, extend = false) {
    setActive(editor.active.row + rowDelta, editor.active.column + columnDelta, extend);
    focusActiveCell();
  }

  function refreshSelection() {
    document.querySelectorAll("#excel-entry-grid [data-excel-cell]").forEach((input) => {
      const row = Number(input.dataset.row);
      const column = Number(input.dataset.column);
      input.closest("td")?.classList.toggle("is-selected", isSelected(row, column));
      input.closest("td")?.classList.toggle("is-active", row === editor.active.row && column === editor.active.column);
    });
    const nameBox = document.querySelector("#excel-name-box");
    if (nameBox) nameBox.value = `${columnLabel(editor.active.column)}${editor.active.row + 1}`;
  }

  function focusActiveCell() {
    const input = document.querySelector(`#excel-entry-grid [data-row="${editor.active.row}"][data-column="${editor.active.column}"]`);
    input?.focus({ preventScroll: true });
    input?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function beginEdit(input, initialValue = null) {
    if (!input || input.dataset.editing === "true") return;
    pushUndo();
    const row = Number(input.dataset.row);
    const column = Number(input.dataset.column);
    editor.editingCell = { row, column, original: editor.rows[row][column] };
    input.dataset.editing = "true";
    input.readOnly = false;
    input.closest("td")?.classList.add("is-editing");
    if (initialValue !== null) {
      input.value = initialValue;
      editor.rows[row][column] = initialValue;
    }
    input.focus();
    if (initialValue === null) input.select();
    else input.setSelectionRange(input.value.length, input.value.length);
  }

  function finishEdit(input, move = null) {
    if (!input || input.dataset.editing !== "true") return;
    const row = Number(input.dataset.row);
    const column = Number(input.dataset.column);
    editor.rows[row][column] = normalizeCell(input.value);
    input.readOnly = true;
    input.dataset.editing = "false";
    input.closest("td")?.classList.remove("is-editing");
    editor.editingCell = null;
    if (move) moveActive(move.row, move.column, false);
  }

  function cancelEdit(input) {
    if (!input || input.dataset.editing !== "true") return;
    const cell = editor.editingCell;
    if (cell) {
      editor.rows[cell.row][cell.column] = cell.original;
      input.value = cell.original;
    }
    input.readOnly = true;
    input.dataset.editing = "false";
    input.closest("td")?.classList.remove("is-editing");
    editor.editingCell = null;
    editor.undo.pop();
    input.focus();
  }

  function rangeRows() {
    const bounds = selectionBounds();
    return editor.rows.slice(bounds.top, bounds.bottom + 1).map((row) =>
      row.slice(bounds.left, bounds.right + 1).map(normalizeCell)
    );
  }

  function rangeTsv() {
    return rangeRows().map((row) => row.map((cell) => cell.replace(/[\t\r\n]+/g, " ")).join("\t")).join("\n");
  }

  async function copySelection() {
    const text = rangeTsv();
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      if (!document.execCommand("copy")) throw new Error("clipboard unavailable");
      textarea.remove();
    }
    showToast("선택 범위를 복사했습니다.");
  }

  function clearSelection() {
    pushUndo();
    const bounds = selectionBounds();
    for (let row = bounds.top; row <= bounds.bottom; row += 1) {
      for (let column = bounds.left; column <= bounds.right; column += 1) editor.rows[row][column] = "";
    }
    renderEditorGrid();
    focusActiveCell();
  }

  function parseClipboardRange(text) {
    const lines = String(text || "").replace(/\r\n?/g, "\n").split("\n");
    while (lines.length > 1 && lines.at(-1) === "") lines.pop();
    return lines.map((line) => line.split("\t").map(normalizeCell));
  }

  function pasteRange(rows, startRow = editor.active.row, startColumn = editor.active.column) {
    const columns = Math.max(1, ...rows.map((row) => row.length));
    pushUndo();
    ensureSize(startRow + rows.length, startColumn + columns);
    rows.forEach((row, rowOffset) => row.forEach((value, columnOffset) => {
      editor.rows[startRow + rowOffset][startColumn + columnOffset] = normalizeCell(value);
    }));
    editor.anchor = { row: startRow, column: startColumn };
    editor.focus = { row: startRow + rows.length - 1, column: startColumn + columns - 1 };
    editor.active = { row: startRow, column: startColumn };
    renderEditorGrid();
    focusActiveCell();
  }

  function parseDelimited(text, delimiter) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;
    const source = String(text || "").replace(/^\uFEFF/, "");
    for (let index = 0; index < source.length; index += 1) {
      const character = source[index];
      if (quoted) {
        if (character === '"' && source[index + 1] === '"') {
          value += '"';
          index += 1;
        } else if (character === '"') quoted = false;
        else value += character;
        continue;
      }
      if (character === '"') quoted = true;
      else if (character === delimiter) {
        row.push(value);
        value = "";
      } else if (character === "\n") {
        row.push(value.replace(/\r$/, ""));
        rows.push(row);
        row = [];
        value = "";
      } else value += character;
    }
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
    while (rows.length > 1 && rows.at(-1).every((cell) => !cell)) rows.pop();
    return rows.map((item) => item.map(normalizeCell));
  }

  function normalizeImportedRows(rows) {
    const normalized = (rows || []).map((row) => (Array.isArray(row) ? row : [row]).map(normalizeCell));
    while (normalized.length && normalized.at(-1).every((cell) => !cell.trim())) normalized.pop();
    let lastColumn = -1;
    normalized.forEach((row) => row.forEach((cell, index) => {
      if (cell.trim()) lastColumn = Math.max(lastColumn, index);
    }));
    const result = lastColumn < 0 ? [[""]] : normalized.map((row) =>
      Array.from({ length: lastColumn + 1 }, (_, index) => row[index] || "")
    );
    validateSize(result.length, Math.max(1, ...result.map((row) => row.length)));
    return result;
  }

  function workbookFromArrayBuffer(buffer, extension, fileName = "스프레드시트") {
    if (extension === "csv" || extension === "tsv") {
      const text = new TextDecoder("utf-8").decode(buffer);
      const delimiter = extension === "tsv" ? "\t" : ",";
      return { name: fileName, sheets: [{ name: extension.toUpperCase(), rows: parseDelimited(text, delimiter) }] };
    }
    if (!window.XLSX) throw new Error("XLS/XLSX 해석 라이브러리를 불러오지 못했습니다.");
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true, raw: false });
    return {
      name: fileName,
      sheets: workbook.SheetNames.map((name) => ({
        name,
        rows: XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, raw: false, defval: "" })
      }))
    };
  }

  async function importSpreadsheetFile(file) {
    const extension = String(file.name || "").split(".").pop().toLowerCase();
    if (!spreadsheetExtensions.has(extension)) throw new Error("CSV, TSV, XLS, XLSX 파일만 불러올 수 있습니다.");
    const workbook = workbookFromArrayBuffer(await file.arrayBuffer(), extension, file.name);
    if (!workbook.sheets.length) throw new Error("읽을 수 있는 Sheet가 없습니다.");
    editor.importWorkbook = workbook;
    renderImportSheetSelector();
    applyImportedSheet(0);
  }

  function applyImportedSheet(index) {
    const sheet = editor.importWorkbook?.sheets?.[index];
    if (!sheet) return;
    pushUndo();
    editor.rows = normalizeImportedRows(sheet.rows);
    editor.active = { row: 0, column: 0 };
    editor.anchor = { row: 0, column: 0 };
    editor.focus = { row: 0, column: 0 };
    renderEditorGrid();
    showToast(`${sheet.name} Sheet를 불러왔습니다.`);
  }

  function renderImportSheetSelector() {
    const panel = document.querySelector("#excel-import-sheets");
    const workbook = editor.importWorkbook;
    if (!panel || !workbook) return;
    panel.hidden = false;
    panel.innerHTML = `
      <span>${escapeHtml(workbook.name)}</span>
      <select id="excel-import-sheet" aria-label="불러올 Sheet 선택">
        ${workbook.sheets.map((sheet, index) => `<option value="${index}">${escapeHtml(sheet.name)}</option>`).join("")}
      </select>
      <button id="excel-apply-sheet" class="btn btn--small" type="button">선택 Sheet 불러오기</button>`;
    panel.querySelector("#excel-apply-sheet")?.addEventListener("click", () => {
      applyImportedSheet(Number(panel.querySelector("#excel-import-sheet")?.value || 0));
    });
  }

  function gridHtml() {
    const columns = columnCount();
    return `
      <table class="excel-grid" role="grid" aria-label="Excel형 표 입력기">
        <thead><tr><th class="excel-corner"></th>${Array.from({ length: columns }, (_, index) => `<th scope="col">${columnLabel(index)}</th>`).join("")}</tr></thead>
        <tbody>${editor.rows.map((row, rowIndex) => `
          <tr><th scope="row">${rowIndex + 1}</th>${Array.from({ length: columns }, (_, columnIndex) => `
            <td class="${isSelected(rowIndex, columnIndex) ? "is-selected" : ""} ${editor.active.row === rowIndex && editor.active.column === columnIndex ? "is-active" : ""}">
              <input data-excel-cell data-row="${rowIndex}" data-column="${columnIndex}" value="${escapeAttribute(row[columnIndex] || "")}" readonly spellcheck="false" aria-label="${columnLabel(columnIndex)}${rowIndex + 1}">
            </td>`).join("")}</tr>`).join("")}</tbody>
      </table>`;
  }

  function renderEditorGrid() {
    const grid = document.querySelector("#excel-entry-grid");
    if (!grid) return;
    grid.innerHTML = gridHtml();
    bindEditorGrid();
    updateEditorSize();
  }

  function bindEditorGrid() {
    const grid = document.querySelector("#excel-entry-grid");
    if (!grid) return;
    grid.querySelectorAll("[data-excel-cell]").forEach((input) => {
      input.addEventListener("pointerdown", (event) => {
        if (input.dataset.editing === "true") return;
        editor.dragging = true;
        setActive(Number(input.dataset.row), Number(input.dataset.column), event.shiftKey);
      });
      input.addEventListener("pointerenter", () => {
        if (!editor.dragging) return;
        editor.focus = { row: Number(input.dataset.row), column: Number(input.dataset.column) };
        editor.active = { ...editor.focus };
        refreshSelection();
      });
      input.addEventListener("dblclick", () => beginEdit(input));
      input.addEventListener("input", () => {
        editor.rows[Number(input.dataset.row)][Number(input.dataset.column)] = normalizeCell(input.value);
      });
      input.addEventListener("blur", () => finishEdit(input));
      input.addEventListener("copy", (event) => {
        if (input.dataset.editing === "true" && input.selectionStart !== input.selectionEnd) return;
        event.preventDefault();
        event.clipboardData?.setData("text/plain", rangeTsv());
      });
      input.addEventListener("paste", (event) => {
        if (input.dataset.editing === "true" && !event.clipboardData?.getData("text/plain").includes("\t")) return;
        event.preventDefault();
        try { pasteRange(parseClipboardRange(event.clipboardData?.getData("text/plain") || "")); }
        catch (error) { showToast(error.message); }
      });
      input.addEventListener("keydown", (event) => handleCellKeydown(event, input));
    });
  }

  function handleCellKeydown(event, input) {
    const command = event.ctrlKey || event.metaKey;
    const editing = input.dataset.editing === "true";
    if (command && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (editing) finishEdit(input);
      undoEditor();
      return;
    }
    if (command && event.key.toLowerCase() === "c" && !editing) {
      event.preventDefault();
      copySelection().catch(() => showToast("선택 범위를 복사하지 못했습니다."));
      return;
    }
    if (command && event.key.toLowerCase() === "a" && !editing) {
      event.preventDefault();
      editor.anchor = { row: 0, column: 0 };
      editor.focus = { row: rowCount() - 1, column: columnCount() - 1 };
      editor.active = { row: 0, column: 0 };
      refreshSelection();
      return;
    }
    if (editing) {
      if (event.key === "Escape") {
        event.preventDefault();
        cancelEdit(input);
      } else if (event.key === "Enter") {
        event.preventDefault();
        finishEdit(input, { row: event.shiftKey ? -1 : 1, column: 0 });
      } else if (event.key === "Tab") {
        event.preventDefault();
        finishEdit(input, { row: 0, column: event.shiftKey ? -1 : 1 });
      }
      return;
    }
    const moves = {
      ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1]
    };
    if (moves[event.key]) {
      event.preventDefault();
      moveActive(moves[event.key][0], moves[event.key][1], event.shiftKey);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      moveActive(0, event.shiftKey ? -1 : 1, false);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      moveActive(event.shiftKey ? -1 : 1, 0, false);
      return;
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      clearSelection();
      return;
    }
    if (event.key === "F2") {
      event.preventDefault();
      beginEdit(input);
      return;
    }
    if (!command && !event.altKey && event.key.length === 1) {
      event.preventDefault();
      beginEdit(input, event.key);
    }
  }

  function trimRows(rows) {
    const result = cloneRows(rows);
    while (result.length && result.at(-1).every((cell) => !cell.trim())) result.pop();
    if (!result.length) return [];
    let lastColumn = -1;
    result.forEach((row) => row.forEach((cell, index) => {
      if (cell.trim()) lastColumn = Math.max(lastColumn, index);
    }));
    if (lastColumn < 0) return [];
    return result.map((row) => Array.from({ length: lastColumn + 1 }, (_, index) => row[index] || ""));
  }

  function updateEditorSize() {
    const label = document.querySelector("#excel-size-label");
    if (label) label.textContent = `${rowCount()}행 × ${columnCount()}열`;
  }

  function syncEditorOptions() {
    const header = document.querySelector("#excel-has-header");
    const note = document.querySelector("#excel-note");
    if (header) header.checked = editor.hasHeader;
    if (note) note.value = editor.note;
  }

  window.renderTableSubmission = function renderExcelTableSubmission() {
    if (editor.outputId !== submissionOutput?.id) resetEditor(submissionOutput);
    openSubmissionDialog(`
      <span class="dialog-phase">Excel형 표 입력 · ${escapeHtml(submissionOutput.id)}</span>
      <h2>${escapeHtml(submissionOutput.text)}</h2>
      <p class="submission-help">Excel 또는 Workbench 범위를 그대로 복사해 첫 셀에 붙여넣을 수 있습니다. XLS·XLSX의 여러 Sheet도 선택해 불러올 수 있습니다.</p>
      <div class="excel-commandbar">
        <label class="btn btn--small excel-import-button">파일 불러오기<input id="excel-import-file" type="file" accept=".csv,.tsv,.xls,.xlsx" hidden></label>
        <button id="excel-undo" class="btn btn--small" type="button">실행 취소</button>
        <button id="excel-add-row" class="btn btn--small" type="button">행 추가</button>
        <button id="excel-add-column" class="btn btn--small" type="button">열 추가</button>
        <button id="excel-remove-row" class="btn btn--small" type="button">행 삭제</button>
        <button id="excel-remove-column" class="btn btn--small" type="button">열 삭제</button>
        <button id="excel-trim" class="btn btn--small" type="button">빈 영역 정리</button>
        <button id="excel-clear" class="btn btn--small" type="button">전체 지우기</button>
        <span id="excel-size-label" class="sheet-size"></span>
      </div>
      <div id="excel-import-sheets" class="excel-import-sheets" hidden></div>
      <div class="excel-formula-bar"><label><span>이름</span><input id="excel-name-box" readonly value="A1"></label><div><span>fx</span><small>셀을 더블클릭하거나 F2를 눌러 편집</small></div></div>
      <div id="excel-entry-grid" class="excel-grid-wrap"></div>
      <div class="sheet-options">
        <label><input id="excel-has-header" type="checkbox" ${editor.hasHeader ? "checked" : ""}> 첫 번째 행을 제목 행으로 사용</label>
        <small>방향키·Shift 범위 선택·Tab·Enter·Delete·Ctrl+Z 지원 · 최대 ${MAX_ROWS}행 × ${MAX_COLUMNS}열</small>
      </div>
      <label class="field-label">표 설명<textarea id="excel-note" rows="3" placeholder="변수 단위, 최적 조건 선정 기준, 주의사항 등을 적어 주세요.">${escapeHtml(editor.note)}</textarea></label>
      <div class="dialog-actions"><button id="submit-excel-table" class="btn btn--primary" type="button">표 저장</button><button id="excel-back" class="btn" type="button">뒤로</button></div>`);

    renderEditorGrid();
    document.addEventListener("pointerup", () => { editor.dragging = false; }, { once: true });
    document.querySelector("#excel-import-file")?.addEventListener("change", async (event) => {
      try { if (event.target.files?.[0]) await importSpreadsheetFile(event.target.files[0]); }
      catch (error) { showToast(error.message); }
      event.target.value = "";
    });
    document.querySelector("#excel-undo")?.addEventListener("click", undoEditor);
    document.querySelector("#excel-has-header")?.addEventListener("change", (event) => { editor.hasHeader = event.target.checked; });
    document.querySelector("#excel-note")?.addEventListener("input", (event) => { editor.note = event.target.value; });
    document.querySelector("#excel-add-row")?.addEventListener("click", () => mutateSize(1, 0));
    document.querySelector("#excel-add-column")?.addEventListener("click", () => mutateSize(0, 1));
    document.querySelector("#excel-remove-row")?.addEventListener("click", () => mutateSize(-1, 0));
    document.querySelector("#excel-remove-column")?.addEventListener("click", () => mutateSize(0, -1));
    document.querySelector("#excel-trim")?.addEventListener("click", () => {
      pushUndo();
      editor.rows = trimRows(editor.rows);
      if (!editor.rows.length) editor.rows = blankRows();
      setActive(0, 0);
      renderEditorGrid();
    });
    document.querySelector("#excel-clear")?.addEventListener("click", () => {
      pushUndo();
      editor.rows = blankRows();
      setActive(0, 0);
      renderEditorGrid();
    });
    document.querySelector("#submit-excel-table")?.addEventListener("click", submitSpreadsheetTable);
    document.querySelector("#excel-back")?.addEventListener("click", () => openSubmissionChoice(submissionOutput));
    focusActiveCell();
  };

  function mutateSize(rowDelta, columnDelta) {
    try {
      pushUndo();
      if (rowDelta > 0) ensureSize(rowCount() + 1, columnCount());
      if (columnDelta > 0) ensureSize(rowCount(), columnCount() + 1);
      if (rowDelta < 0 && rowCount() > 1) editor.rows.pop();
      if (columnDelta < 0 && columnCount() > 1) editor.rows.forEach((row) => row.pop());
      setActive(Math.min(editor.active.row, rowCount() - 1), Math.min(editor.active.column, columnCount() - 1));
      renderEditorGrid();
    } catch (error) {
      editor.undo.pop();
      showToast(error.message);
    }
  }

  async function submitSpreadsheetTable() {
    const button = document.querySelector("#submit-excel-table");
    try {
      const rows = trimRows(editor.rows);
      if (!rows.length) throw new Error("저장할 표 데이터를 입력해 주세요.");
      validateSize(rows.length, Math.max(...rows.map((row) => row.length)));
      button.disabled = true;
      button.textContent = "저장 중";
      await submitOutput("table", { rows, hasHeader: editor.hasHeader, note: editor.note.trim() });
      editor.outputId = null;
      editor.rows = [];
    } catch (error) {
      showToast(error.message);
      if (button) {
        button.disabled = false;
        button.textContent = "표 저장";
      }
    }
  }

  const originalOpenSubmissionChoice = openSubmissionChoice;
  openSubmissionChoice = function openSubmissionChoiceWithSpreadsheet(output) {
    submissionOutput = output;
    completionCheckbox = null;
    if (output.type === "table") {
      resetEditor(output);
      renderTableSubmission();
      return;
    }
    if (output.type !== "any") {
      originalOpenSubmissionChoice(output);
      return;
    }
    const choices = {
      files: ["파일 업로드", "이미지, 그래프, PDF 및 문서 제출"],
      code: ["코드 삽입", "SDE, SProcess, SDevice, SVisual, Tcl, Python 코드"],
      server: ["서버 경로 등록", "대용량 TDR, PLT 및 서버 원본 위치"],
      table: ["Excel형 표 입력", "범위 붙여넣기 또는 CSV·TSV·XLS·XLSX 불러오기"]
    };
    openSubmissionDialog(`
      <span class="dialog-phase">산출물 ${escapeHtml(output.id)}</span><h2>산출물 제출</h2><p class="submission-target">${escapeHtml(output.text)}</p>
      <div class="submission-choice-grid">${Object.entries(choices).map(([mode, values]) => `<button class="submission-choice" data-mode="${mode}" type="button"><strong>${values[0]}</strong><span>${values[1]}</span></button>`).join("")}</div>
      <div class="dialog-actions"><button id="submission-cancel" class="btn" type="button">취소</button></div>`);
    document.querySelectorAll(".submission-choice").forEach((button) => button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (mode === "files") renderFileSubmission();
      if (mode === "code") {
        codeBlocks = [{ title: "", type: "sdevice", fileName: "", content: "" }];
        codeDescription = "";
        renderCodeSubmission();
      }
      if (mode === "server") renderServerSubmission();
      if (mode === "table") {
        resetEditor(output);
        renderTableSubmission();
      }
    }));
    document.querySelector("#submission-cancel")?.addEventListener("click", closeSubmissionDialog);
  };

  const legacyReviewOutput = reviewOutput;
  reviewOutput = function reviewOutputWithIntegratedSpreadsheet(output) {
    const submissions = output?.submissions || [];
    if (submissions.some((item) => item.type === "table" && item.table?.dataUrl)) {
      openStoredTableViewer(output);
      return;
    }
    legacyReviewOutput(output);
  };

  function openStoredTableViewer(output) {
    const dialog = document.querySelector("#submission-viewer-dialog");
    const root = document.querySelector("#submission-viewer-content");
    const submissions = [...(output.submissions || [])].reverse();
    if (!dialog || !root) return;
    root.innerHTML = `
      <header class="submission-viewer__header"><div><span class="submission-viewer__eyebrow">결과 확인 · ${escapeHtml(output.id)}</span><h2 id="submission-viewer-title">Spreadsheet Viewer</h2></div><button id="spreadsheet-viewer-close" class="submission-viewer__close" type="button">×</button></header>
      <div class="submission-viewer__body spreadsheet-integrated-body">
        <aside class="submission-viewer__sidebar"><section><div class="submission-viewer__section-title"><strong>제출본</strong><span>${submissions.length}건</span></div><div class="submission-viewer__submission-list">${submissions.map((item) => `<button class="submission-viewer__submission" data-table-submission="${escapeAttribute(item.submissionId)}" type="button"><strong>${escapeHtml(item.memberName || displayName(item.uploader))}</strong><span>${escapeHtml(formatDate(item.uploadedAt))}</span><small>${escapeHtml(item.summary || "표 제출")}</small></button>`).join("")}</div></section></aside>
        <section class="submission-viewer__workspace"><div id="spreadsheet-result-toolbar" class="submission-viewer__toolbar spreadsheet-result-toolbar"></div><div id="spreadsheet-result-stage" class="submission-viewer__stage"><div class="submission-viewer__loading"><span></span><p>표를 불러오는 중입니다.</p></div></div></section>
      </div>`;
    if (!dialog.open) dialog.showModal();
    root.querySelector("#spreadsheet-viewer-close")?.addEventListener("click", () => dialog.close());
    root.querySelectorAll("[data-table-submission]").forEach((button) => button.addEventListener("click", () => {
      loadStoredTableSubmission(submissions.find((item) => String(item.submissionId) === button.dataset.tableSubmission), root);
    }));
    if (submissions[0]) loadStoredTableSubmission(submissions[0], root);
  }

  async function loadStoredTableSubmission(item, root) {
    root.querySelectorAll("[data-table-submission]").forEach((button) => button.classList.toggle("is-active", button.dataset.tableSubmission === String(item.submissionId)));
    const toolbar = root.querySelector("#spreadsheet-result-toolbar");
    const stage = root.querySelector("#spreadsheet-result-stage");
    toolbar.innerHTML = `<div class="submission-viewer__toolbar-main"><div class="submission-viewer__file-heading"><strong>${escapeHtml(item.outputText || "저장된 표")}</strong><span>spreadsheet · ${escapeHtml(item.summary || "표")}</span></div><div class="submission-viewer__toolbar-actions"><a class="btn btn--small" href="${escapeAttribute(item.table.csvUrl)}">CSV</a><a class="btn btn--small" href="${escapeAttribute(item.folderUrl)}" target="_blank" rel="noreferrer">GitHub</a></div></div>`;
    stage.innerHTML = '<div class="submission-viewer__loading"><span></span><p>표 데이터를 불러오는 중입니다.</p></div>';
    try {
      const response = await fetch(item.table.dataUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("표 데이터를 불러오지 못했습니다.");
      const data = await response.json();
      renderWorkbook(stage, { name: item.outputText || "저장된 표", sheets: [{ name: "표", rows: data.rows || [], hasHeader: Boolean(data.hasHeader) }] });
    } catch (error) {
      stage.innerHTML = `<div class="submission-viewer__error"><h3>표를 표시하지 못했습니다.</h3><p>${escapeHtml(error.message)}</p></div>`;
    }
  }

  function renderWorkbook(stage, workbook) {
    if (!workbook?.sheets?.length) {
      stage.innerHTML = '<div class="submission-viewer__error"><h3>읽을 수 있는 Sheet가 없습니다.</h3></div>';
      return;
    }
    stage.innerHTML = `<div class="spreadsheet-viewer"><div class="spreadsheet-sheet-tabs" role="tablist">${workbook.sheets.map((sheet, index) => `<button type="button" role="tab" data-sheet-index="${index}" class="${index === 0 ? "is-active" : ""}">${escapeHtml(sheet.name || `Sheet ${index + 1}`)}</button>`).join("")}</div><div class="spreadsheet-sheet-meta"></div><div class="spreadsheet-readonly-grid"></div></div>`;
    const show = (index) => {
      const sheet = workbook.sheets[index];
      stage.querySelectorAll("[data-sheet-index]").forEach((button) => button.classList.toggle("is-active", Number(button.dataset.sheetIndex) === index));
      const rows = normalizeViewerRows(sheet.rows || []);
      const actualRows = rows.length;
      const actualColumns = Math.max(1, ...rows.map((row) => row.length));
      const visibleRows = rows.slice(0, VIEWER_MAX_ROWS).map((row) => row.slice(0, VIEWER_MAX_COLUMNS));
      stage.querySelector(".spreadsheet-sheet-meta").textContent = `${actualRows.toLocaleString()}행 × ${actualColumns.toLocaleString()}열${actualRows > VIEWER_MAX_ROWS || actualColumns > VIEWER_MAX_COLUMNS ? " · 큰 파일은 일부 범위만 표시" : ""}`;
      stage.querySelector(".spreadsheet-readonly-grid").innerHTML = readOnlyGridHtml(visibleRows, Boolean(sheet.hasHeader));
    };
    stage.querySelectorAll("[data-sheet-index]").forEach((button) => button.addEventListener("click", () => show(Number(button.dataset.sheetIndex))));
    show(0);
  }

  function normalizeViewerRows(rows) {
    const normalized = (rows || []).map((row) => (Array.isArray(row) ? row : [row]).map(normalizeCell));
    return normalized.length ? normalized : [[""]];
  }

  function readOnlyGridHtml(rows, hasHeader) {
    const columns = Math.max(1, ...rows.map((row) => row.length));
    return `<table class="spreadsheet-readonly-table"><thead><tr><th class="excel-corner"></th>${Array.from({ length: columns }, (_, index) => `<th>${columnLabel(index)}</th>`).join("")}</tr></thead><tbody>${rows.map((row, rowIndex) => `<tr><th>${rowIndex + 1}</th>${Array.from({ length: columns }, (_, columnIndex) => `<td class="${hasHeader && rowIndex === 0 ? "is-header-value" : ""}">${escapeHtml(row[columnIndex] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  async function renderUploadedSpreadsheet(file, stage) {
    if (stage.dataset.spreadsheetFileId === file.id) return;
    stage.dataset.spreadsheetFileId = file.id;
    stage.innerHTML = '<div class="submission-viewer__loading"><span></span><p>스프레드시트를 해석하는 중입니다.</p></div>';
    try {
      const headers = new Headers();
      if (typeof sessionToken !== "undefined" && sessionToken) headers.set("Authorization", `Bearer ${sessionToken}`);
      const response = await fetch(file.previewUrl, { headers, cache: "no-store" });
      if (!response.ok) throw new Error(`파일 요청 실패 (${response.status})`);
      const extension = String(file.extension || file.name.split(".").pop()).toLowerCase();
      const workbook = workbookFromArrayBuffer(await response.arrayBuffer(), extension, file.name);
      renderWorkbook(stage, workbook);
    } catch (error) {
      stage.innerHTML = `<div class="submission-viewer__error"><h3>스프레드시트를 표시하지 못했습니다.</h3><p>${escapeHtml(error.message)}</p><div><a class="btn" href="${escapeAttribute(file.githubUrl)}" target="_blank" rel="noreferrer">GitHub 원본</a><a class="btn btn--primary" href="${escapeAttribute(file.downloadUrl)}">다운로드</a></div></div>`;
    }
  }

  function enhanceUploadedSpreadsheetViewer() {
    const root = document.querySelector("#submission-viewer-content");
    const activeSubmission = root?.querySelector(".submission-viewer__submission.is-active");
    const activeFile = root?.querySelector(".submission-viewer__file.is-active[data-kind=" + '"spreadsheet"' + "]");
    const stage = root?.querySelector("#submission-viewer-stage");
    if (!activeSubmission || !activeFile || !stage) return;
    const manifest = manifestCache.get(activeSubmission.dataset.submissionId);
    const file = manifest?.files?.find((item) => item.id === activeFile.dataset.fileId);
    if (file?.kind === "spreadsheet") renderUploadedSpreadsheet(file, stage);
  }

  const viewerRoot = document.querySelector("#submission-viewer-content");
  if (viewerRoot) new MutationObserver(() => requestAnimationFrame(enhanceUploadedSpreadsheetViewer)).observe(viewerRoot, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
})();
