/* Adds current-file and cached ZIP download choices without changing the core viewer. */
(() => {
  const root = document.querySelector("#submission-viewer-content");
  if (!root) return;

  let scheduled = false;
  const scheduleEnhancement = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceToolbar();
    });
  };

  function enhanceToolbar() {
    const actions = root.querySelector(".submission-viewer__toolbar-actions");
    if (!actions || actions.querySelector(".submission-viewer__download-menu")) return;

    const currentDownload = [...actions.querySelectorAll("a[href]")].find((link) => {
      try {
        return /\/api\/submissions\/[^/]+\/files\/f\d+\/download$/.test(new URL(link.href, location.href).pathname);
      } catch {
        return false;
      }
    });
    if (!currentDownload) return;

    const archiveUrl = archiveUrlFrom(currentDownload.href);
    if (!archiveUrl) return;
    const fileCount = root.querySelectorAll("#submission-viewer-files [data-file-id]").length;
    const menu = buildDownloadMenu(currentDownload.href, archiveUrl, fileCount);
    currentDownload.replaceWith(menu);
  }

  function buildDownloadMenu(currentUrl, archiveUrl, fileCount) {
    const wrapper = document.createElement("div");
    wrapper.className = "submission-viewer__download-menu";
    wrapper.innerHTML = `
      <button class="btn btn--small btn--primary submission-viewer__download-toggle" type="button" aria-haspopup="menu" aria-expanded="false">
        <span data-download-label>다운로드</span><span class="submission-viewer__download-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="submission-viewer__download-options" role="menu" hidden>
        <a class="submission-viewer__download-option" role="menuitem" href="${escapeAttribute(currentUrl)}">
          <strong>현재 파일 다운로드</strong><small>지금 보고 있는 원본 파일 1개</small>
        </a>
        ${fileCount > 1 ? `
          <button class="submission-viewer__download-option" type="button" role="menuitem" data-download-all>
            <strong>전체 파일 다운로드</strong><small>${fileCount}개 파일 · ZIP</small>
          </button>` : ""}
      </div>`;

    const toggle = wrapper.querySelector(".submission-viewer__download-toggle");
    const options = wrapper.querySelector(".submission-viewer__download-options");
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = options.hidden;
      closeAllMenus(wrapper);
      options.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) options.querySelector("[role='menuitem']")?.focus();
    });
    wrapper.querySelector("a[role='menuitem']")?.addEventListener("click", () => closeMenu(wrapper));
    wrapper.querySelector("[data-download-all]")?.addEventListener("click", () => downloadArchive(wrapper, archiveUrl, fileCount));
    return wrapper;
  }

  async function downloadArchive(wrapper, archiveUrl, fileCount) {
    if (wrapper.dataset.busy === "true") return;
    const actions = wrapper.closest(".submission-viewer__toolbar-actions");
    setBusy(wrapper, true);
    setStatus(actions, "전체 파일 준비 중…", "loading");
    closeMenu(wrapper);

    try {
      const response = await fetch(archiveUrl, { method: "GET", cache: "no-store", credentials: "omit" });
      if (!response.ok) throw await downloadError(response);
      const blob = await response.blob();
      if (!blob.size) throw new Error("다운로드 파일이 비어 있습니다.");
      const filename = responseFilename(response.headers.get("Content-Disposition")) || fallbackFilename(archiveUrl);
      triggerBlobDownload(blob, filename);
      setStatus(actions, `다운로드 시작됨 · ${fileCount}개`, "success");
      announce(`전체 제출 파일 ${fileCount}개의 다운로드를 시작했습니다.`);
    } catch (error) {
      const message = friendlyError(error);
      setStatus(actions, "다운로드 실패 · 다시 시도", "error", message);
      announce(message, true);
    } finally {
      setBusy(wrapper, false);
    }
  }

  function setBusy(wrapper, busy) {
    wrapper.dataset.busy = String(busy);
    const toggle = wrapper.querySelector(".submission-viewer__download-toggle");
    const label = wrapper.querySelector("[data-download-label]");
    if (toggle) toggle.disabled = busy;
    if (label) label.textContent = busy ? "전체 파일 준비 중…" : "다운로드";
  }

  function setStatus(actions, text, state, title = "") {
    if (!actions) return;
    let status = actions.querySelector(".submission-viewer__download-status");
    if (!status) {
      status = document.createElement("span");
      status.className = "submission-viewer__download-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      actions.prepend(status);
    }
    status.textContent = text;
    status.dataset.state = state;
    status.title = title;
    if (state === "success") {
      setTimeout(() => {
        if (status.isConnected && status.dataset.state === "success") status.remove();
      }, 2200);
    }
  }

  function archiveUrlFrom(currentUrl) {
    try {
      const url = new URL(currentUrl, location.href);
      const match = url.pathname.match(/^(\/api\/submissions\/[^/]+)\/files\/f\d+\/download$/);
      if (!match) return null;
      url.pathname = `${match[1]}/archive`;
      return url.toString();
    } catch {
      return null;
    }
  }

  function responseFilename(disposition) {
    const value = String(disposition || "");
    const utf8 = value.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8) {
      try { return decodeURIComponent(utf8[1].trim()); } catch { /* use fallback */ }
    }
    const quoted = value.match(/filename="([^"]+)"/i);
    return quoted?.[1] || null;
  }

  function fallbackFilename(archiveUrl) {
    const outputId = new URL(archiveUrl).searchParams.get("outputId") || "submission";
    return `${outputId}_전체제출물.zip`;
  }

  function triggerBlobDownload(blob, filename) {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
  }

  async function downloadError(response) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.message || `전체 파일 요청 실패 (${response.status})`);
    error.code = payload.code || "";
    error.status = response.status;
    return error;
  }

  function friendlyError(error) {
    if (error?.code === "ARCHIVE_EMPTY" || error?.status === 404) return "다운로드할 파일이 없습니다.";
    if (error?.status === 401 || error?.status === 403) return "접근 권한이 없습니다.";
    if (error?.code === "STATIC_NOT_FOUND" || error?.code === "FILE_NOT_FOUND") return "일부 원본 파일을 찾을 수 없습니다.";
    return error?.message || "전체 파일을 준비하지 못했습니다. 다시 시도해 주세요.";
  }

  function announce(message, isError = false) {
    if (typeof showToast === "function") {
      showToast(message, isError ? "error" : undefined);
      return;
    }
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function closeMenu(wrapper) {
    const options = wrapper?.querySelector(".submission-viewer__download-options");
    const toggle = wrapper?.querySelector(".submission-viewer__download-toggle");
    if (options) options.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
  }

  function closeAllMenus(except = null) {
    root.querySelectorAll(".submission-viewer__download-menu").forEach((menu) => {
      if (menu !== except) closeMenu(menu);
    });
  }

  function escapeAttribute(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".submission-viewer__download-menu")) closeAllMenus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAllMenus();
  });

  new MutationObserver(scheduleEnhancement).observe(root, { childList: true, subtree: true });
  scheduleEnhancement();
})();
