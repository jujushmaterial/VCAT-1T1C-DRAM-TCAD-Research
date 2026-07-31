/*
 * Phase 2.1 portfolio parity enhancements.
 * Runs after submission-viewer.js and preserves its API/data behaviour.
 */
(() => {
  const dialog = document.querySelector("#submission-viewer-dialog");
  const root = document.querySelector("#submission-viewer-content");
  if (!dialog || !root) return;

  const keywordTokens = new Set([
    "set", "proc", "foreach", "for", "if", "elseif", "else", "return", "puts",
    "lappend", "incr", "file", "electrode", "physics", "mobility", "recombination",
    "math", "solve", "coupled", "quasistationary", "goal", "plot", "current",
    "output", "effectiveintrinsicdensity", "srh", "newcurrentprefix", "dozero",
    "def", "class", "import", "from", "async", "await", "function", "const", "let",
    "var", "switch", "case", "break", "continue", "while", "try", "catch",
    "finally", "throw", "new", "define", "lambda", "begin"
  ]);

  const commandTokens = new Set([
    "deposit", "etch", "mask", "implant", "diffuse", "struct", "contact", "region",
    "init", "line", "pdbset", "layers", "get_variable_data", "format", "expr", "abs",
    "llength", "lindex", "create_plot", "select_plots", "set_plot_prop", "set_axis_prop",
    "set_legend_prop", "load_file", "create_curve", "set_curve_prop", "ft_scalar",
    "solve", "physics", "electrode", "plot", "math", "file"
  ]);

  const propertyTokens = new Set([
    "material", "type", "thickness", "location", "spacing", "name", "left", "right",
    "dose", "energy", "temperature", "voltage", "workfunction", "initialstep",
    "increment", "minstep", "maxstep", "iterations", "concentration", "field",
    "slice", "angle", "segments", "point", "replace", "bottom", "grid", "xlo", "xhi",
    "ylo", "yhi", "species", "value", "factor", "length", "width", "height"
  ]);

  const tokenPattern =
    /"[^"\n]*"|'[^'\n]*'|@[A-Za-z0-9_|]+@|\$[A-Za-z_][A-Za-z0-9_]*|\b(?:0x[0-9A-Fa-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|[A-Za-z_][A-Za-z0-9_:-]*/g;

  let scheduled = false;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  function scheduleEnhancement() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceViewer();
    });
  }

  function enhanceViewer() {
    const mode = detectMode();
    dialog.dataset.viewerMode = mode;
    dialog.dataset.portfolioParity = "true";

    const sidebar = root.querySelector(".submission-viewer__sidebar");
    if (sidebar) {
      sidebar.title = "제출본·파일 목록 — 마우스를 올리거나 키보드로 포커스하면 펼쳐집니다.";
      sidebar.setAttribute("aria-label", "제출본과 파일 목록");
    }

    decorateHeader(mode);

    if (mode === "code") enhanceCodeViewer();
    if (mode === "image") enhanceImageViewer();
    compactActionLabels();
  }

  function detectMode() {
    if (root.querySelector(".submission-viewer__editor-shell")) return "code";
    if (root.querySelector(".submission-viewer__image-canvas")) return "image";
    if (root.querySelector(".submission-viewer__pdf")) return "pdf";
    if (root.querySelector(".submission-viewer__markdown")) return "markdown";
    if (root.querySelector(".submission-viewer__plain-text")) return "text";
    if (root.querySelector(".submission-viewer__unsupported")) return "unsupported";
    return "loading";
  }

  function decorateHeader(mode) {
    const title = root.querySelector(".submission-viewer__header h2");
    if (!title) return;

    if (!title.dataset.outputTitle || title.dataset.outputTitle === title.textContent) {
      title.dataset.outputTitle = title.textContent.trim();
    }

    const labels = {
      code: "TCAD Source Code",
      image: "Image Viewer",
      pdf: "PDF Viewer",
      markdown: "Markdown Viewer",
      text: "Text Viewer"
    };

    const nextLabel = labels[mode];
    if (nextLabel && title.textContent !== nextLabel) {
      title.title = title.dataset.outputTitle;
      title.textContent = nextLabel;
    }
  }

  function compactActionLabels() {
    root.querySelectorAll(".submission-viewer__meta-actions .btn").forEach((button) => {
      const text = button.textContent.trim();
      if (text === "GitHub 제출 폴더") {
        button.textContent = "GitHub";
        button.title = "GitHub 제출 폴더 열기";
      } else if (text === "관리자 삭제") {
        button.textContent = "삭제";
        button.title = "관리자 제출본 삭제";
      }
    });
  }

  function enhanceCodeViewer() {
    const code = root.querySelector("#viewer-code-content");
    const scroll = root.querySelector("#viewer-code-scroll");
    const minimap = root.querySelector("#viewer-code-minimap");
    if (!code || !scroll) return;

    scroll.setAttribute("aria-label", "선택과 복사가 가능한 TCAD 소스 코드");
    scroll.setAttribute("spellcheck", "false");
    scroll.style.userSelect = "text";
    scroll.style.webkitUserSelect = "text";

    const language = String(code.dataset.language || "sentaurus").toLowerCase();
    code.querySelectorAll(".submission-viewer__code-line").forEach((line) => {
      const source = line.textContent || "";
      const signature = `${language}:${source}`;
      if (line.dataset.portfolioHighlight === signature) return;
      line.innerHTML = highlightLine(source, language) || " ";
      line.dataset.portfolioHighlight = signature;
      line.style.userSelect = "text";
      line.style.webkitUserSelect = "text";
    });

    if (minimap && !minimap.dataset.portfolioEnhanced) {
      minimap.dataset.portfolioEnhanced = "true";
      minimap.title = "클릭하거나 드래그해 코드 위치를 즉시 이동합니다.";
      minimap.setAttribute("role", "scrollbar");
      minimap.setAttribute("aria-controls", "viewer-code-scroll");
      minimap.addEventListener("wheel", (event) => {
        event.preventDefault();
        scroll.scrollTop += event.deltaY;
      }, { passive: false });
    }
  }

  function highlightLine(line, language) {
    if (!line) return "";

    const commentIndex = findCommentIndex(line, language);
    if (commentIndex < 0) return highlightCodePart(line);

    const codePart = line.slice(0, commentIndex);
    const commentPart = line.slice(commentIndex);
    return `${highlightCodePart(codePart)}<span class="tok-comment">${escapeHtml(commentPart)}</span>`;
  }

  function findCommentIndex(line, language) {
    const trimmed = line.trimStart();
    const leadingWhitespace = line.length - trimmed.length;

    // Sentaurus SDE/Scheme sources use ';' as the dominant comment marker.
    if (trimmed.startsWith(";")) return leadingWhitespace;
    if (trimmed.startsWith("#")) return leadingWhitespace;
    if (trimmed.startsWith("//")) return leadingWhitespace;

    const cLike = new Set([
      "javascript", "typescript", "c", "cpp", "java", "go", "rust",
      "verilog", "systemverilog", "vhdl"
    ]);
    const markers = cLike.has(language) ? ["//"] : ["#"];

    let quote = "";
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if ((character === '"' || character === "'") && line[index - 1] !== "\\") {
        quote = quote === character ? "" : (quote || character);
      }
      if (quote) continue;
      for (const marker of markers) {
        if (line.slice(index, index + marker.length) === marker) return index;
      }
    }
    return -1;
  }

  function highlightCodePart(value) {
    let output = "";
    let cursor = 0;

    for (const match of value.matchAll(tokenPattern)) {
      const index = match.index ?? 0;
      const token = match[0];
      output += escapeHtml(value.slice(cursor, index));
      const className = tokenClass(token);
      output += className
        ? `<span class="${className}">${escapeHtml(token)}</span>`
        : escapeHtml(token);
      cursor = index + token.length;
    }

    return output + escapeHtml(value.slice(cursor));
  }

  function tokenClass(token) {
    if (token.startsWith('"') || token.startsWith("'")) return "tok-string";
    if (token.startsWith("@") || token.startsWith("$")) return "tok-variable";
    if (/^(?:0x[0-9A-Fa-f]+|\d)/.test(token)) return "tok-number";

    const normalized = token.toLowerCase();
    if (keywordTokens.has(normalized)) return "tok-keyword";
    if (commandTokens.has(normalized)) return "tok-command";
    if (
      normalized.startsWith("sdegeo:")
      || normalized.startsWith("sdedr:")
      || normalized.startsWith("sdepe:")
      || normalized.startsWith("sdevice:")
    ) return "tok-command";
    if (propertyTokens.has(normalized)) return "tok-property";
    return "";
  }

  function enhanceImageViewer() {
    const image = root.querySelector("#viewer-image");
    const fitButton = root.querySelector("#viewer-image-fit");
    if (!image || !fitButton || image.dataset.portfolioEnhanced) return;

    image.dataset.portfolioEnhanced = "true";
    image.title = "더블클릭하면 화면 맞춤과 100% 배율을 전환합니다.";
    image.addEventListener("dblclick", () => {
      const fit = image.classList.contains("is-fit");
      if (fit) {
        root.querySelector("#viewer-image-zoom-in")?.click();
      } else {
        fitButton.click();
      }
    });
  }

  const observer = new MutationObserver(scheduleEnhancement);
  observer.observe(root, { childList: true, subtree: true });

  dialog.addEventListener("close", () => {
    delete dialog.dataset.viewerMode;
  });

  scheduleEnhancement();
})();
