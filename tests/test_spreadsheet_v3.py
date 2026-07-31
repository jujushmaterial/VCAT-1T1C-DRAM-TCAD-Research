import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


class SpreadsheetV3Tests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.js = read("docs/spreadsheet-v3.js")
        cls.guard = read("docs/spreadsheet-v3-guard.js")
        cls.css = read("docs/spreadsheet-v3.css")
        cls.index = read("docs/index.html")

    def test_contenteditable_editor_is_not_loaded(self):
        self.assertNotIn('src="table-submission.js"', self.index)
        self.assertNotIn('href="table-submission.css"', self.index)
        self.assertNotIn("contenteditable", self.js.lower())
        self.assertIn("data-excel-cell", self.js)
        self.assertIn("readonly", self.js)

    def test_excel_range_keyboard_and_undo_contracts(self):
        for token in (
            "selectionBounds",
            "rangeTsv",
            "pasteRange",
            "copySelection",
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            'event.key === "Tab"',
            'event.key === "Enter"',
            'event.key === "Delete"',
            'event.key.toLowerCase() === "z"',
            "pushUndo",
            "undoEditor",
        ):
            self.assertIn(token, self.js)
        self.assertIn("event.buttons === 0", self.guard)
        self.assertIn('src="spreadsheet-v3-guard.js"', self.index)

    def test_csv_tsv_xls_xlsx_and_multisheet_contracts(self):
        self.assertIn('new Set(["csv", "tsv", "xls", "xlsx"])', self.js)
        self.assertIn("parseDelimited", self.js)
        self.assertIn("XLSX.read", self.js)
        self.assertIn("workbook.SheetNames.map", self.js)
        self.assertIn("sheet_to_json", self.js)
        self.assertIn("spreadsheet-sheet-tabs", self.js)
        self.assertIn("data-sheet-index", self.js)
        self.assertIn("xlsx-0.20.3/package/dist/xlsx.full.min.js", self.index)

    def test_existing_storage_shape_is_preserved(self):
        self.assertIn('submitOutput("table", { rows, hasHeader: editor.hasHeader, note: editor.note.trim() })', self.js)

    def test_integrated_viewer_spreadsheet_kind_is_connected(self):
        for token in (
            "manifestCache",
            'file?.kind === "spreadsheet"',
            "renderUploadedSpreadsheet",
            "openStoredTableViewer",
            "renderWorkbook",
            "spreadsheet-integrated-body",
        ):
            self.assertIn(token, self.js)
        self.assertIn(".spreadsheet-readonly-table", self.css)
        self.assertIn(".spreadsheet-sheet-tabs", self.css)


if __name__ == "__main__":
    unittest.main()
