/* Unified in-dashboard submission viewer: code, images, PDF, text and downloads. */
(() => {
  const dialog = document.querySelector("#submission-viewer-dialog");
  const root = document.querySelector("#submission-viewer-content");
  if (!dialog || !root || typeof reviewOutput === "undefined") return;

  const legacyReviewOutput = reviewOutput;
  const viewer = {
    output: null,
    submissions: [],
    submission: null,
    manifest: null,
    file: null,
    textCache: new Map(),
    code: "",
    searchMatches: [],
    searchIndex: -1,
    imageScale: 1,
    imageFit: true,
    activeObjectUrl: null,
    minimap: null,
    draggingMinimap: false,
    minimapOffset: 0,
    submissionRequestId: 0,
    fileRequestId: 0
  };

  const CODE_KIND = "code";
  const IMAGE_KIND = "image";
  const PREVIEWABLE_TEXT = new Set(["code", "text", "json", "markdown"]);

  reviewOutput = function reviewOutputInDashboard(output) {
    if (!output) return;
    const submissions = output.submissions ?? [];
    if (submissions.some((item) => item.type === "table" || item.table)) {
      legacyReviewOutput(output);
      return;
    }
    openViewer(output);
  };

  function openViewer(output) {
    viewer.output = output;
    viewer.submissions = [...(output.submissions ?? [])].reverse();
    viewer.submission = null;
    viewer.manifest = null;
    viewer.file = null;
    viewer.textCache.clear();
    revokeObjectUrl();
    root.innerHTML = shellTemplate(output);
    if (!dialog.open) dialog.showModal();
    bindShellEvents();
    if (viewer.submissions.length) selectSubmission(viewer.submissions[0].submissionId);
  }

  function shellTemplate(output) {
    return `
      <header class="submission-viewer__header">
        <div>
          <span class="submission-viewer__eyebrow">결과 확인 · ${escapeHtml(output.id || "")}</span>
          <h2 id="submission-viewer-title">${escapeHtml(output.text || "제출 결과")}</h2>
        </div>
        <button class="submission-viewer__close" id="submission-viewer-close" type="button" aria-label="통합 제출본 뷰어 닫기">×</button>
      </header>
      <div class="submission-viewer__body">
        <aside class="submission-viewer__sidebar" aria-label="제출본과 파일 목록">
          <section>
            <div class="submission-viewer__section-title"><strong>제출본</strong><span>${viewer.submissions.length}건</span></div>
            <div id="submission-viewer-submissions" class="submission-viewer__submission-list">
              ${viewer.submissions.length
                ? viewer.submissions.map(submissionButton).join("")
                : '<div class="submission-viewer__empty">제출된 결과물이 없습니다.</div>'}
            </div>
          </section>
          <section class="submission-viewer__files-section">
            <div class="submission-viewer__section-title"><strong>파일</strong><span id="submission-viewer-file-count">0개</span></div>
            <div id="submission-viewer-files" class="submission-viewer__file-list"></div>
          </section>
        </aside>
        <section class="submission-viewer__workspace">
          <div id="submission-viewer-meta" class="submission-viewer__meta"></div>
          <div id="submission-viewer-toolbar" class="submission-viewer__toolbar" hidden></div>
          <div id="submission-viewer-stage" class="submission-viewer__stage" aria-live="polite">
            <div class="submission-viewer__loading"><span></span><p>제출본을 불러오는 중입니다.</p></div>
          </div>
        </section>
      </div>`;
  }

  function submissionButton(item) {
    const label = item.memberName || displayName(item.uploader) || item.uploader || "제출자 미확인";
    return `
      <button class="submission-viewer__submission" type="button" data-submission-id="${escapeHtml(item.submissionId || "")}">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(formatDate(item.uploadedAt))}</span>
        <small>${escapeHtml(item.summary || submissionTypeLabels[item.type] || "제출본")}</small>
      </button>`;
  }

  function bindShellEvents() {
    root.querySelector("#submission-viewer-close")?.addEventListener("click", closeViewer);
    root.querySelectorAll("[data-submission-id]").forEach((button) => {
      button.addEventListener("click", () => selectSubmission(button.dataset.submissionId));
    });
  }

  async function selectSubmission(submissionId) {
    const requestId = ++viewer.submissionRequestId;
    const item = viewer.submissions.find((entry) => String(entry.submissionId) === String(submissionId));
    if (!item) return;
    viewer.submission = item;
    viewer.manifest = null;
    viewer.file = null;
    viewer.imageScale = 1;
    viewer.imageFit = true;
    revokeObjectUrl();
    root.querySelectorAll(".submission-viewer__submission").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.submissionId === String(submissionId));
    });
    renderMeta(item);
    renderLoading("제출본 파일 목록을 불러오는 중입니다.");

    if (item.type === "server" || (!item.files?.length && item.serverPath)) {
      viewer.manifest = { submission: item, files: [] };
      renderFileList([]);
      renderServerSubmission(item);
      return;
    }

    try {
      const query = `?outputId=${encodeURIComponent(viewer.output.id)}`;
      const manifest = await apiFetch(`/api/submissions/${encodeURIComponent(item.submissionId)}/manifest${query}`);
      if (requestId !== viewer.submissionRequestId) return;
      viewer.manifest = manifest;
      renderMeta({ ...item, ...manifest.submission });
      renderFileList(manifest.files || []);
      const first = preferredInitialFile(manifest.files || []);
      if (first) await selectFile(first.id);
      else renderNoFiles(manifest.submission || item);
    } catch (error) {
      renderApiError(item, error);
    }
  }

  function renderMeta(item) {
    const meta = root.querySelector("#submission-viewer-meta");
    if (!meta) return;
    const deleteButton = typeof submissionDeleteButton === "function" ? submissionDeleteButton(item) : "";
    meta.innerHTML = `
      <div>
        <strong>${escapeHtml(item.memberName || displayName(item.uploader) || item.uploader || "제출자 미확인")}</strong>
        <span>${escapeHtml(submissionTypeLabels[item.type] ?? item.type ?? "파일 제출")} · ${escapeHtml(formatDate(item.uploadedAt))}</span>
        <p>${escapeHtml(item.summary || "제출본")}</p>
      </div>
      <div class="submission-viewer__meta-actions">
        <a class="btn btn--small" href="${escapeHtml(item.folderUrl || "#")}" target="_blank" rel="noreferrer">GitHub 제출 폴더</a>
        ${deleteButton}
      </div>`;
    meta.querySelector(".submission-delete-button")?.addEventListener("click", async (event) => {
      const before = (viewer.output.submissions ?? []).length;
      await deleteSubmissionRecord(event.currentTarget, viewer.output);
      const after = (viewer.output.submissions ?? []).length;
      if (after < before) closeViewer();
    });
  }

  function preferredInitialFile(files) {
    return files.find((file) => file.previewSupported && file.kind === CODE_KIND)
      || files.find((file) => file.previewSupported && file.kind === IMAGE_KIND)
      || files.find((file) => file.previewSupported)
      || files[0]
      || null;
  }

  function renderFileList(files) {
    const list = root.querySelector("#submission-viewer-files");
    const count = root.querySelector("#submission-viewer-file-count");
    if (count) count.textContent = `${files.length}개`;
    if (!list) return;
    list.innerHTML = files.length
      ? files.map((file) => `
          <button class="submission-viewer__file" type="button" data-file-id="${escapeHtml(file.id)}" data-kind="${escapeHtml(file.kind)}">
            <span class="submission-viewer__file-icon" aria-hidden="true">${fileIcon(file)}</span>
            <span><strong>${escapeHtml(file.name)}</strong><small>${escapeHtml(fileLabel(file))} · ${escapeHtml(formatBytes(file.size))}</small></span>
          </button>`).join("")
      : '<div class="submission-viewer__empty">등록된 파일이 없습니다.</div>';
    list.querySelectorAll("[data-file-id]").forEach((button) => {
      button.addEventListener("click", () => selectFile(button.dataset.fileId));
    });
  }

  async function selectFile(fileId) {
    const requestId = ++viewer.fileRequestId;
    const file = viewer.manifest?.files?.find((entry) => entry.id === fileId);
    if (!file) return;
    viewer.file = file;
    viewer.searchMatches = [];
    viewer.searchIndex = -1;
    viewer.imageScale = 1;
    viewer.imageFit = true;
    revokeObjectUrl();
    root.querySelectorAll(".submission-viewer__file").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.fileId === fileId);
    });
    renderToolbar(file);
    if (!file.previewSupported) {
      renderUnsupported(file);
      return;
    }
    renderLoading(`${file.name} 파일을 불러오는 중입니다.`, false);
    try {
      if (PREVIEWABLE_TEXT.has(file.kind)) {
        const text = await loadTextFile(file);
        if (requestId !== viewer.fileRequestId) return;
        if (file.kind === CODE_KIND) renderCode(file, text);
        else if (file.kind === "json") renderJson(file, text);
        else if (file.kind === "markdown") renderMarkdown(file, text);
        else renderPlainText(file, text);
      } else if (file.kind === IMAGE_KIND) renderImage(file);
      else if (file.kind === "pdf") renderPdf(file);
      else renderUnsupported(file);
    } catch (error) {
      if (requestId === viewer.fileRequestId) renderFileError(file, error);
    }
  }

  function renderToolbar(file) {
    const toolbar = root.querySelector("#submission-viewer-toolbar");
    if (!toolbar) return;
    toolbar.hidden = false;
    const codeFiles = (viewer.manifest?.files || []).filter((item) => item.kind === CODE_KIND);
    const codeTabs = file.kind === CODE_KIND && codeFiles.length
      ? `<div class="submission-viewer__code-tabs" role="tablist">${codeFiles.map((item) => `
          <button type="button" role="tab" data-code-file-id="${escapeHtml(item.id)}" class="${item.id === file.id ? "is-active" : ""}">${escapeHtml(item.name)}</button>`).join("")}</div>`
      : "";
    toolbar.innerHTML = `
      ${codeTabs}
      <div class="submission-viewer__toolbar-main">
        <div class="submission-viewer__file-heading"><strong>${escapeHtml(file.name)}</strong><span>${escapeHtml(fileLabel(file))} · ${escapeHtml(formatBytes(file.size))}</span></div>
        <div class="submission-viewer__toolbar-actions">
          <a class="btn btn--small" href="${escapeHtml(file.githubUrl)}" target="_blank" rel="noreferrer">GitHub 원본</a>
          <a class="btn btn--small btn--primary" href="${escapeHtml(file.downloadUrl)}">다운로드</a>
        </div>
      </div>`;
    toolbar.querySelectorAll("[data-code-file-id]").forEach((button) => {
      button.addEventListener("click", () => selectFile(button.dataset.codeFileId));
    });
  }

  async function loadTextFile(file) {
    let text = viewer.textCache.get(cacheKey(file));
    if (text !== undefined) return text;
    const response = await viewerFetch(file.previewUrl);
    if (!response.ok) throw await responseError(response);
    text = await response.text();
    viewer.textCache.set(cacheKey(file), text);
    return text;
  }

  function renderCode(file, text) {
    viewer.code = text;
    const stage = root.querySelector("#submission-viewer-stage");
    const lines = normalizeNewlines(text).split("\n");
    stage.innerHTML = `
      <div class="submission-viewer__code-tools">
        <label class="submission-viewer__search"><span class="sr-only">코드 검색</span><input id="viewer-code-search" type="search" placeholder="코드 검색"><button id="viewer-search-prev" type="button" aria-label="이전 검색 결과">↑</button><button id="viewer-search-next" type="button" aria-label="다음 검색 결과">↓</button><small id="viewer-search-count">0/0</small></label>
        <label class="submission-viewer__line-jump"><span>줄</span><input id="viewer-line-number" type="number" min="1" max="${lines.length}" inputmode="numeric"><button id="viewer-line-jump" type="button">이동</button></label>
        <button id="viewer-copy-code" class="btn btn--small" type="button">코드 복사</button>
      </div>
      <div class="submission-viewer__editor-shell">
        <pre id="viewer-line-numbers" class="submission-viewer__line-numbers" aria-hidden="true">${lines.map((_, index) => index + 1).join("\n")}</pre>
        <pre id="viewer-code-scroll" class="submission-viewer__code-scroll" tabindex="0"><code id="viewer-code-content" data-language="${escapeHtml(file.language || "text")}">${lines.map((line, index) => `<span class="submission-viewer__code-line" data-line="${index + 1}">${highlightLine(line, file.language) || " "}</span>`).join("")}</code></pre>
        <div id="viewer-code-minimap" class="submission-viewer__minimap" aria-label="코드 미니맵"></div>
      </div>`;
    bindCodeEvents(lines);
    renderMinimap(lines);
  }

  function bindCodeEvents(lines) {
    const search = root.querySelector("#viewer-code-search");
    const next = root.querySelector("#viewer-search-next");
    const previous = root.querySelector("#viewer-search-prev");
    const lineInput = root.querySelector("#viewer-line-number");
    search?.addEventListener("input", () => updateSearch(search.value));
    search?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      moveSearch(event.shiftKey ? -1 : 1);
    });
    next?.addEventListener("click", () => moveSearch(1));
    previous?.addEventListener("click", () => moveSearch(-1));
    root.querySelector("#viewer-line-jump")?.addEventListener("click", () => jumpToLine(Number(lineInput?.value)));
    lineInput?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") jumpToLine(Number(lineInput.value));
    });
    root.querySelector("#viewer-copy-code")?.addEventListener("click", async (event) => {
      try {
        await copyText(viewer.code);
        event.currentTarget.textContent = "복사됨";
        setTimeout(() => { event.currentTarget.textContent = "코드 복사"; }, 1200);
      } catch {
        showToast("코드를 복사하지 못했습니다.");
      }
    });
    const scroll = root.querySelector("#viewer-code-scroll");
    const numbers = root.querySelector("#viewer-line-numbers");
    scroll?.addEventListener("scroll", () => {
      if (numbers) numbers.scrollTop = scroll.scrollTop;
      syncMinimap();
    });
    if (lines.length) jumpToLine(1, false);
  }

  function updateSearch(query) {
    const normalized = String(query || "").trim().toLocaleLowerCase();
    viewer.searchMatches = [];
    viewer.searchIndex = -1;
    root.querySelectorAll(".submission-viewer__code-line").forEach((line) => line.classList.remove("is-search-hit"));
    if (normalized) {
      normalizeNewlines(viewer.code).split("\n").forEach((line, index) => {
        if (line.toLocaleLowerCase().includes(normalized)) viewer.searchMatches.push(index + 1);
      });
    }
    if (viewer.searchMatches.length) {
      viewer.searchIndex = 0;
      revealSearchMatch();
    }
    updateSearchCount();
  }

  function moveSearch(direction) {
    if (!viewer.searchMatches.length) return;
    viewer.searchIndex = (viewer.searchIndex + direction + viewer.searchMatches.length) % viewer.searchMatches.length;
    revealSearchMatch();
    updateSearchCount();
  }

  function revealSearchMatch() {
    root.querySelectorAll(".submission-viewer__code-line.is-search-hit").forEach((line) => line.classList.remove("is-search-hit"));
    const lineNumber = viewer.searchMatches[viewer.searchIndex];
    const line = root.querySelector(`.submission-viewer__code-line[data-line="${lineNumber}"]`);
    line?.classList.add("is-search-hit");
    jumpToLine(lineNumber, false);
  }

  function updateSearchCount() {
    const count = root.querySelector("#viewer-search-count");
    if (!count) return;
    count.textContent = viewer.searchMatches.length ? `${viewer.searchIndex + 1}/${viewer.searchMatches.length}` : "0/0";
  }

  function jumpToLine(lineNumber, focus = true) {
    if (!Number.isFinite(lineNumber) || lineNumber < 1) return;
    const target = root.querySelector(`.submission-viewer__code-line[data-line="${Math.floor(lineNumber)}"]`);
    const scroll = root.querySelector("#viewer-code-scroll");
    if (!target || !scroll) return;
    const top = Math.max(0, target.offsetTop - scroll.clientHeight * 0.32);
    scroll.scrollTo({ top, behavior: focus ? "smooth" : "auto" });
    if (focus) scroll.focus({ preventScroll: true });
  }

  function renderMinimap(lines) {
    const minimap = root.querySelector("#viewer-code-minimap");
    if (!minimap) return;
    viewer.minimap = minimap;
    minimap.innerHTML = `<div class="submission-viewer__minimap-lines">${lines.map((line, index) => {
      const width = Math.max(8, Math.min(96, line.trim().length * 1.5));
      const top = lines.length > 1 ? (index / (lines.length - 1)) * 100 : 0;
      const className = /^\s*#/.test(line) || /^\s*\/\//.test(line) ? "is-comment" : /^\s*(deposit|etch|mask|implant|diffuse|struct|contact|region|init|line|solve|physics|electrode|file)\b/i.test(line) ? "is-command" : "";
      return `<span class="${className}" style="top:${top}%;width:${width}%"></span>`;
    }).join("")}</div><div class="submission-viewer__minimap-viewport"></div>`;
    minimap.addEventListener("pointerdown", minimapPointerDown);
    minimap.addEventListener("pointermove", minimapPointerMove);
    minimap.addEventListener("pointerup", minimapPointerUp);
    minimap.addEventListener("pointercancel", minimapPointerUp);
    requestAnimationFrame(syncMinimap);
  }

  function syncMinimap() {
    const minimap = viewer.minimap;
    const viewport = minimap?.querySelector(".submission-viewer__minimap-viewport");
    const scroll = root.querySelector("#viewer-code-scroll");
    if (!minimap || !viewport || !scroll) return;
    const height = minimap.clientHeight;
    const maxScroll = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
    const viewportHeight = maxScroll ? Math.max(30, height * scroll.clientHeight / scroll.scrollHeight) : height;
    const maxTop = Math.max(0, height - viewportHeight);
    viewport.style.height = `${viewportHeight}px`;
    viewport.style.top = `${maxScroll ? maxTop * scroll.scrollTop / maxScroll : 0}px`;
  }

  function minimapPointerDown(event) {
    const viewport = viewer.minimap?.querySelector(".submission-viewer__minimap-viewport");
    if (!viewport) return;
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    viewer.minimapOffset = event.clientY >= rect.top && event.clientY <= rect.bottom ? event.clientY - rect.top : viewport.offsetHeight / 2;
    viewer.draggingMinimap = true;
    viewer.minimap?.setPointerCapture?.(event.pointerId);
    scrollFromMinimap(event.clientY);
  }

  function minimapPointerMove(event) {
    if (!viewer.draggingMinimap) return;
    event.preventDefault();
    scrollFromMinimap(event.clientY);
  }

  function minimapPointerUp(event) {
    viewer.draggingMinimap = false;
    viewer.minimap?.releasePointerCapture?.(event.pointerId);
  }

  function scrollFromMinimap(clientY) {
    const minimap = viewer.minimap;
    const viewport = minimap?.querySelector(".submission-viewer__minimap-viewport");
    const scroll = root.querySelector("#viewer-code-scroll");
    if (!minimap || !viewport || !scroll) return;
    const rect = minimap.getBoundingClientRect();
    const maxTop = Math.max(0, rect.height - viewport.offsetHeight);
    const top = Math.max(0, Math.min(maxTop, clientY - rect.top - viewer.minimapOffset));
    const maxScroll = Math.max(0, scroll.scrollHeight - scroll.clientHeight);
    scroll.scrollTop = maxTop ? top / maxTop * maxScroll : 0;
  }

  function renderImage(file) {
    const images = (viewer.manifest?.files || []).filter((item) => item.kind === IMAGE_KIND);
    const currentIndex = images.findIndex((item) => item.id === file.id);
    const stage = root.querySelector("#submission-viewer-stage");
    stage.innerHTML = `
      <div class="submission-viewer__image-tools">
        <div><button id="viewer-image-prev" type="button" ${images.length < 2 ? "disabled" : ""}>이전</button><span>${currentIndex + 1}/${images.length}</span><button id="viewer-image-next" type="button" ${images.length < 2 ? "disabled" : ""}>다음</button></div>
        <div><button id="viewer-image-zoom-out" type="button" aria-label="축소">−</button><span id="viewer-image-scale">맞춤</span><button id="viewer-image-zoom-in" type="button" aria-label="확대">＋</button><button id="viewer-image-fit" type="button">화면 맞춤</button></div>
      </div>
      <div class="submission-viewer__image-canvas" id="viewer-image-canvas">
        <img id="viewer-image" src="${escapeHtml(file.previewUrl)}" alt="${escapeHtml(file.name)}">
      </div>
      ${images.length > 1 ? `<div class="submission-viewer__thumbnails">${images.map((item) => `<button type="button" data-image-id="${escapeHtml(item.id)}" class="${item.id === file.id ? "is-active" : ""}"><img src="${escapeHtml(item.previewUrl)}" alt="${escapeHtml(item.name)} 썸네일"><span>${escapeHtml(item.name)}</span></button>`).join("")}</div>` : ""}`;
    const image = root.querySelector("#viewer-image");
    image?.addEventListener("error", () => renderFileError(file, new Error("이미지를 표시하지 못했습니다.")));
    root.querySelector("#viewer-image-prev")?.addEventListener("click", () => selectFile(images[(currentIndex - 1 + images.length) % images.length].id));
    root.querySelector("#viewer-image-next")?.addEventListener("click", () => selectFile(images[(currentIndex + 1) % images.length].id));
    root.querySelector("#viewer-image-zoom-in")?.addEventListener("click", () => setImageScale(Math.min(4, viewer.imageScale + 0.25), false));
    root.querySelector("#viewer-image-zoom-out")?.addEventListener("click", () => setImageScale(Math.max(0.25, viewer.imageScale - 0.25), false));
    root.querySelector("#viewer-image-fit")?.addEventListener("click", () => setImageScale(1, true));
    root.querySelectorAll("[data-image-id]").forEach((button) => button.addEventListener("click", () => selectFile(button.dataset.imageId)));
    setImageScale(1, true);
  }

  function setImageScale(scale, fit) {
    viewer.imageScale = scale;
    viewer.imageFit = fit;
    const image = root.querySelector("#viewer-image");
    const label = root.querySelector("#viewer-image-scale");
    if (!image || !label) return;
    image.classList.toggle("is-fit", fit);
    image.style.transform = fit ? "none" : `scale(${scale})`;
    label.textContent = fit ? "맞춤" : `${Math.round(scale * 100)}%`;
  }

  function renderPdf(file) {
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__pdf">
        <iframe src="${escapeHtml(file.previewUrl)}#view=FitH" title="${escapeHtml(file.name)} PDF 미리보기"></iframe>
        <p>브라우저에서 PDF가 표시되지 않으면 다운로드 버튼을 이용해 주세요.</p>
      </div>`;
  }

  function renderJson(file, text) {
    let formatted = text;
    try { formatted = JSON.stringify(JSON.parse(text), null, 2); } catch { /* raw fallback */ }
    renderPlainText(file, formatted, "JSON");
  }

  function renderMarkdown(file, text) {
    const stage = root.querySelector("#submission-viewer-stage");
    stage.innerHTML = `
      <div class="submission-viewer__text-tools"><button id="viewer-copy-text" class="btn btn--small" type="button">내용 복사</button></div>
      <article class="submission-viewer__markdown">${markdownToSafeHtml(text)}</article>`;
    bindTextCopy(text);
  }

  function renderPlainText(file, text, label = "텍스트") {
    const stage = root.querySelector("#submission-viewer-stage");
    stage.innerHTML = `
      <div class="submission-viewer__text-tools"><span>${escapeHtml(label)} 미리보기</span><button id="viewer-copy-text" class="btn btn--small" type="button">내용 복사</button></div>
      <pre class="submission-viewer__plain-text">${escapeHtml(text)}</pre>`;
    bindTextCopy(text);
  }

  function bindTextCopy(text) {
    root.querySelector("#viewer-copy-text")?.addEventListener("click", async (event) => {
      try {
        await copyText(text);
        event.currentTarget.textContent = "복사됨";
        setTimeout(() => { event.currentTarget.textContent = "내용 복사"; }, 1200);
      } catch { showToast("내용을 복사하지 못했습니다."); }
    });
  }

  function renderUnsupported(file) {
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__unsupported">
        <span class="submission-viewer__unsupported-icon" aria-hidden="true">${fileIcon(file)}</span>
        <h3>${escapeHtml(file.name)}</h3>
        <p>이 파일 형식은 브라우저 내부 미리보기를 지원하지 않습니다.</p>
        <dl><div><dt>형식</dt><dd>${escapeHtml(file.extension ? `.${file.extension}` : "확장자 없음")}</dd></div><div><dt>크기</dt><dd>${escapeHtml(formatBytes(file.size))}</dd></div><div><dt>분류</dt><dd>${escapeHtml(fileLabel(file))}</dd></div></dl>
        <div><a class="btn" href="${escapeHtml(file.githubUrl)}" target="_blank" rel="noreferrer">GitHub 원본 보기</a><a class="btn btn--primary" href="${escapeHtml(file.downloadUrl)}">파일 다운로드</a></div>
      </div>`;
  }

  function renderServerSubmission(item) {
    const toolbar = root.querySelector("#submission-viewer-toolbar");
    if (toolbar) toolbar.hidden = true;
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__unsupported">
        <span class="submission-viewer__unsupported-icon" aria-hidden="true">⌁</span>
        <h3>연구실 서버 경로</h3>
        <p>대용량 TCAD 원본은 GitHub에 업로드하지 않고 서버 경로로 관리합니다.</p>
        <code>${escapeHtml(item.serverPath || "서버 경로가 기록되지 않았습니다.")}</code>
        <div><a class="btn" href="${escapeHtml(item.folderUrl || "#")}" target="_blank" rel="noreferrer">GitHub 제출 기록</a></div>
      </div>`;
  }

  function renderNoFiles(item) {
    const toolbar = root.querySelector("#submission-viewer-toolbar");
    if (toolbar) toolbar.hidden = true;
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__unsupported">
        <span class="submission-viewer__unsupported-icon" aria-hidden="true">∅</span>
        <h3>미리볼 파일이 없습니다.</h3>
        <p>${escapeHtml(item.summary || "이 제출본에는 파일이 등록되지 않았습니다.")}</p>
        <div><a class="btn" href="${escapeHtml(item.folderUrl || "#")}" target="_blank" rel="noreferrer">GitHub 제출 폴더</a></div>
      </div>`;
  }

  function renderApiError(item, error) {
    renderFileList(item.files || []);
    const toolbar = root.querySelector("#submission-viewer-toolbar");
    if (toolbar) toolbar.hidden = true;
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__error">
        <h3>웹 내부 뷰어를 열지 못했습니다.</h3>
        <p>${escapeHtml(error.message || "파일 API를 사용할 수 없습니다.")}</p>
        <p>Worker v8 배포 전이거나 일시적인 GitHub API 오류일 수 있습니다.</p>
        <a class="btn" href="${escapeHtml(item.folderUrl || "#")}" target="_blank" rel="noreferrer">GitHub 제출 폴더로 이동</a>
      </div>`;
  }

  function renderFileError(file, error) {
    root.querySelector("#submission-viewer-stage").innerHTML = `
      <div class="submission-viewer__error"><h3>파일을 표시하지 못했습니다.</h3><p>${escapeHtml(error.message || "파일을 불러오지 못했습니다.")}</p><div><a class="btn" href="${escapeHtml(file.githubUrl)}" target="_blank" rel="noreferrer">GitHub 원본</a><a class="btn btn--primary" href="${escapeHtml(file.downloadUrl)}">다운로드</a></div></div>`;
  }

  function renderLoading(message, hideToolbar = true) {
    const toolbar = root.querySelector("#submission-viewer-toolbar");
    if (toolbar && hideToolbar) toolbar.hidden = true;
    root.querySelector("#submission-viewer-stage").innerHTML = `<div class="submission-viewer__loading"><span></span><p>${escapeHtml(message)}</p></div>`;
  }

  async function viewerFetch(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (sessionToken) headers.set("Authorization", `Bearer ${sessionToken}`);
    return fetch(url, { ...options, headers, cache: "no-store" });
  }

  async function responseError(response) {
    const payload = await response.json().catch(() => ({}));
    return new Error(payload.message || `파일 요청 실패 (${response.status})`);
  }

  const codeKeywordTokens = new Set([
    "set", "proc", "foreach", "for", "if", "elseif", "else", "return", "puts", "file", "electrode",
    "physics", "mobility", "recombination", "math", "solve", "coupled", "quasistationary", "goal", "plot",
    "current", "output", "def", "class", "import", "from", "async", "await", "function", "const", "let",
    "var", "switch", "case", "break", "continue", "while", "try", "catch", "finally", "throw", "new"
  ]);
  const codeCommandTokens = new Set([
    "deposit", "etch", "mask", "implant", "diffuse", "struct", "contact", "region", "init", "line", "pdbset",
    "layers", "create_plot", "select_plots", "load_file", "create_curve", "set_curve_prop", "ft_scalar"
  ]);
  const codeTokenPattern = /"[^"\n]*"|'[^'\n]*'|@[A-Za-z0-9_|]+@|\$[A-Za-z_][A-Za-z0-9_]*|\b(?:0x[0-9A-Fa-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\b[A-Za-z_][A-Za-z0-9_]*\b/g;

  function highlightLine(line, language) {
    if (!line) return "";
    const commentMarker = ["javascript", "typescript", "c", "cpp", "java", "go", "rust", "verilog", "systemverilog", "vhdl"].includes(language) ? "//" : "#";
    const commentIndex = findCommentIndex(line, commentMarker);
    const codePart = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
    const commentPart = commentIndex >= 0 ? line.slice(commentIndex) : "";
    return `${highlightCodePart(codePart)}${commentPart ? `<span class="tok-comment">${escapeHtml(commentPart)}</span>` : ""}`;
  }

  function highlightCodePart(value) {
    let html = "";
    let cursor = 0;
    for (const match of value.matchAll(codeTokenPattern)) {
      const index = match.index ?? 0;
      const token = match[0];
      html += escapeHtml(value.slice(cursor, index));
      const className = codeTokenClass(token);
      html += className ? `<span class="${className}">${escapeHtml(token)}</span>` : escapeHtml(token);
      cursor = index + token.length;
    }
    return html + escapeHtml(value.slice(cursor));
  }

  function codeTokenClass(token) {
    if (token.startsWith('"') || token.startsWith("'")) return "tok-string";
    if (token.startsWith("@") || token.startsWith("$")) return "tok-variable";
    if (/^(?:0x[0-9A-Fa-f]+|\d)/.test(token)) return "tok-number";
    const normalized = token.toLowerCase();
    if (codeKeywordTokens.has(normalized)) return "tok-keyword";
    if (codeCommandTokens.has(normalized)) return "tok-command";
    return "";
  }

  function findCommentIndex(line, marker) {
    let quoted = "";
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if ((character === '"' || character === "'") && line[index - 1] !== "\\") quoted = quoted === character ? "" : (quoted || character);
      if (!quoted && line.slice(index, index + marker.length) === marker) return index;
    }
    return -1;
  }

  function markdownToSafeHtml(markdown) {
    const lines = normalizeNewlines(markdown).split("\n");
    const output = [];
    let inCode = false;
    let code = [];
    let listOpen = false;
    const closeList = () => { if (listOpen) { output.push("</ul>"); listOpen = false; } };
    for (const raw of lines) {
      if (/^```/.test(raw.trim())) {
        if (inCode) { output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`); code = []; inCode = false; }
        else { closeList(); inCode = true; }
        continue;
      }
      if (inCode) { code.push(raw); continue; }
      const heading = raw.match(/^(#{1,4})\s+(.+)$/);
      if (heading) { closeList(); const level = heading[1].length; output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`); continue; }
      const list = raw.match(/^\s*[-*]\s+(.+)$/);
      if (list) { if (!listOpen) { output.push("<ul>"); listOpen = true; } output.push(`<li>${inlineMarkdown(list[1])}</li>`); continue; }
      closeList();
      if (/^>\s?/.test(raw)) output.push(`<blockquote>${inlineMarkdown(raw.replace(/^>\s?/, ""))}</blockquote>`);
      else if (raw.trim()) output.push(`<p>${inlineMarkdown(raw)}</p>`);
      else output.push("<br>");
    }
    closeList();
    if (inCode) output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    return output.join("");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  }

  function fileIcon(file) {
    return { code: "</>", image: "▧", pdf: "PDF", json: "{}", markdown: "MD", text: "TXT", unsupported: "FILE" }[file.kind] || "FILE";
  }

  function fileLabel(file) {
    return { code: "코드", image: "이미지", pdf: "PDF", json: "JSON", markdown: "Markdown", text: "텍스트", unsupported: "일반 파일" }[file.kind] || "일반 파일";
  }

  function formatBytes(value) {
    const bytes = Number(value || 0);
    if (!bytes) return "크기 미확인";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  }

  function normalizeNewlines(value) {
    return String(value || "").replace(/\r\n?/g, "\n");
  }

  function cacheKey(file) {
    return `${viewer.submission?.submissionId || ""}:${file.id}`;
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
    const area = document.createElement("textarea");
    area.value = value;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }

  function revokeObjectUrl() {
    if (viewer.activeObjectUrl) URL.revokeObjectURL(viewer.activeObjectUrl);
    viewer.activeObjectUrl = null;
  }

  function closeViewer() {
    revokeObjectUrl();
    viewer.output = null;
    viewer.manifest = null;
    viewer.file = null;
    dialog.close();
  }

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeViewer();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeViewer();
  });
  window.addEventListener("keydown", (event) => {
    if (!dialog.open || viewer.file?.kind !== IMAGE_KIND) return;
    const images = (viewer.manifest?.files || []).filter((item) => item.kind === IMAGE_KIND);
    if (images.length < 2 || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const index = images.findIndex((item) => item.id === viewer.file.id);
    const next = event.key === "ArrowRight" ? (index + 1) % images.length : (index - 1 + images.length) % images.length;
    selectFile(images[next].id);
  });
})();
