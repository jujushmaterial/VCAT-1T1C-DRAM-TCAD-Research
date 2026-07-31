/* Submission comment popover and explicit copy feedback. */
(() => {
  const root = document.querySelector("#submission-viewer-content");
  const dialog = document.querySelector("#submission-viewer-dialog");
  if (!root || !dialog) return;

  const manifestComments = new Map();
  const nativeFetch = window.fetch.bind(window);
  let activePopover = null;
  let scheduled = false;

  window.fetch = async (...args) => {
    const response = await nativeFetch(...args);
    try {
      const requestUrl = typeof args[0] === "string" ? args[0] : args[0]?.url;
      const url = new URL(requestUrl, location.href);
      const match = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/);
      if (match && response.ok) {
        const payload = await response.clone().json();
        manifestComments.set(match[1], {
          comment: String(payload?.submission?.comment || ""),
          commentLabel: String(payload?.submission?.commentLabel || "제출 설명")
        });
      }
    } catch (error) {
      console.warn("Submission comment capture failed", error);
    }
    return response;
  };

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhanceToolbar();
    });
  }

  function enhanceToolbar() {
    const toolbarMain = root.querySelector(".submission-viewer__toolbar-main");
    const actions = toolbarMain?.querySelector(".submission-viewer__toolbar-actions");
    if (!toolbarMain || !actions || actions.querySelector("[data-viewer-comment-button]")) return;

    const activeSubmission = root.querySelector(".submission-viewer__submission.is-active");
    const submissionId = activeSubmission?.dataset.submissionId || "";
    const details = manifestComments.get(submissionId) || {
      comment: "",
      commentLabel: "제출 설명"
    };

    toolbarMain.classList.add("has-comment-popover");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn--small submission-viewer__comment-button";
    button.dataset.viewerCommentButton = "true";
    button.setAttribute("aria-expanded", "false");
    button.textContent = "설명 보기";

    const popover = document.createElement("section");
    popover.className = "submission-viewer__comment-popover";
    popover.hidden = true;
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-label", details.commentLabel || "제출 설명");

    const heading = document.createElement("div");
    heading.className = "submission-viewer__comment-heading";
    const title = document.createElement("strong");
    title.textContent = details.commentLabel || "제출 설명";
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "설명 닫기");
    close.textContent = "×";
    heading.append(title, close);

    const body = document.createElement("div");
    body.className = "submission-viewer__comment-body";
    body.textContent = details.comment.trim() || "등록된 설명이 없습니다.";
    popover.append(heading, body);

    actions.insertBefore(button, actions.firstChild);
    toolbarMain.append(popover);

    const closePopover = () => {
      popover.hidden = true;
      button.setAttribute("aria-expanded", "false");
      if (activePopover === popover) activePopover = null;
    };
    const openPopover = () => {
      closeActivePopover();
      popover.hidden = false;
      button.setAttribute("aria-expanded", "true");
      activePopover = popover;
    };

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (popover.hidden) openPopover();
      else closePopover();
    });
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closePopover();
      button.focus();
    });
    popover.addEventListener("click", (event) => event.stopPropagation());
  }

  function closeActivePopover() {
    if (!activePopover) return;
    activePopover.hidden = true;
    const button = activePopover.parentElement?.querySelector("[data-viewer-comment-button]");
    button?.setAttribute("aria-expanded", "false");
    activePopover = null;
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("clipboard unavailable");
  }

  function setCopyFeedback(button, success) {
    clearTimeout(button._viewerCopyTimer);
    button.classList.remove("is-copy-success", "is-copy-error");
    button.classList.add(success ? "is-copy-success" : "is-copy-error");
    button.textContent = success ? "✓ 복사됨" : "복사 실패";
    button.setAttribute("aria-live", "polite");
    button.setAttribute("aria-label", success ? "코드 복사 완료" : "코드 복사 실패");
    button._viewerCopyTimer = setTimeout(() => {
      if (!button.isConnected) return;
      button.classList.remove("is-copy-success", "is-copy-error");
      button.textContent = "코드 복사";
      button.setAttribute("aria-label", "코드 복사");
    }, 1600);
  }

  root.addEventListener("click", async (event) => {
    const button = event.target.closest("#viewer-copy-code");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const lines = [...root.querySelectorAll(".submission-viewer__code-line")];
    const code = lines.map((line) => line.textContent || "").join("\n");
    try {
      await copyText(code);
      setCopyFeedback(button, true);
      if (typeof showToast === "function") showToast("코드를 클립보드에 복사했습니다.");
    } catch (error) {
      console.error(error);
      setCopyFeedback(button, false);
      if (typeof showToast === "function") showToast("코드를 복사하지 못했습니다.");
    }
  }, true);

  document.addEventListener("click", closeActivePopover);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activePopover) {
      event.stopPropagation();
      closeActivePopover();
    }
  });

  dialog.addEventListener("close", closeActivePopover);

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(root, { childList: true, subtree: true });
  scheduleEnhance();
})();
