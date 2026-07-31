import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


class SubmissionViewerPortfolioPolishTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.css = (DOCS / "submission-viewer.css").read_text(encoding="utf-8")
        cls.polish_css = (DOCS / "submission-viewer-polish.css").read_text(encoding="utf-8")
        cls.js = (DOCS / "submission-viewer-polish.js").read_text(encoding="utf-8")
        cls.index = (DOCS / "index.html").read_text(encoding="utf-8")

    def test_portfolio_modal_density_and_palette(self):
        self.assertIn("grid-template-rows: 44px minmax(0, 1fr)", self.css)
        self.assertIn("background: #1e1e1e", self.css)
        self.assertIn("border-radius: 10px", self.css)
        self.assertIn("grid-template-columns: 58px minmax(0, 1fr) 120px", self.css)
        self.assertIn('font-family: Consolas, "SFMono-Regular"', self.css)

    def test_code_is_selectable_and_scrollbars_are_visible(self):
        self.assertIn("user-select: text !important", self.css)
        self.assertIn("-webkit-user-select: text !important", self.css)
        self.assertIn(".submission-viewer__code-scroll::-webkit-scrollbar", self.css)
        self.assertIn("scrollbar-color: #858585 #1e1e1e", self.css)
        self.assertIn("background: #264f78", self.css)

    def test_minimap_and_sidebar_are_directly_usable(self):
        self.assertIn(":has(.submission-viewer__editor-shell)", self.css)
        self.assertIn("cursor: grab", self.css)
        self.assertIn("pointer-events: auto", self.css)
        self.assertIn('minimap.addEventListener("wheel"', self.js)
        self.assertIn('minimap.title = "클릭하거나 드래그해 코드 위치를 즉시 이동합니다."', self.js)

    def test_sentaurus_highlighting_matches_portfolio(self):
        self.assertIn('if (trimmed.startsWith(";"))', self.js)
        self.assertIn("const propertyTokens = new Set", self.js)
        self.assertIn('return "tok-property"', self.js)
        self.assertIn('normalized.startsWith("sdegeo:")', self.js)
        self.assertIn(".tok-property { color: #dcdcaa; }", self.css)
        self.assertIn(".tok-comment { color: #6a9955; }", self.css)
        self.assertIn(".tok-command { color: #4ec9b0; }", self.css)

    def test_dark_buttons_and_compact_image_controls(self):
        self.assertIn("Prevent the dashboard's light .btn rules", self.css)
        self.assertIn("background: #2b2b2b !important", self.css)
        self.assertIn("height: calc(100% - 92px)", self.css)
        self.assertIn("height: 52px", self.css)
        self.assertIn('button.textContent = "GitHub"', self.js)
        self.assertIn('button.textContent = "삭제"', self.js)

    def test_compact_titlebar_and_mobile_override(self):
        self.assertIn(".submission-viewer__header-actions", self.polish_css)
        self.assertIn('data-viewer-mode="code"', self.polish_css)
        self.assertIn("grid-template-rows: auto minmax(0, 1fr)", self.polish_css)
        self.assertIn("promoteMetaActions(mode)", self.js)

    def test_polish_assets_load_after_core_viewer(self):
        self.assertIn('href="submission-viewer-polish.css"', self.index)
        self.assertLess(
            self.index.index('href="submission-viewer.css"'),
            self.index.index('href="submission-viewer-polish.css"'),
        )
        core = self.index.index('src="submission-viewer.js"')
        polish = self.index.index('src="submission-viewer-polish.js"')
        self.assertLess(core, polish)


if __name__ == "__main__":
    unittest.main()
