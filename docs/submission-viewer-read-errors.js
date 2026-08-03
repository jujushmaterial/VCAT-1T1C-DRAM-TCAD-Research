/* Friendly retry UI for raw GitHub read failures. */
(() => {
  const root = document.querySelector("#submission-viewer-content");
  if (!root) return;

  function enhanceErrors() {
    root.querySelectorAll(".submission-viewer__error").forEach((panel) => {
      if (panel.dataset.rawReadEnhanced === "true") return;
      panel.dataset.rawReadEnhanced = "true";
      panel.setAttribute("aria-live", "polite");

      panel.querySelectorAll("p").forEach((paragraph) => {
        if (/Worker v8 배포 전|GitHub API 오류/.test(paragraph.textContent || "")) paragraph.remove();
      });

      const safety = document.createElement("p");
      safety.className = "submission-viewer__read-safety";
      safety.textContent = "기존 제출 파일과 검토 기록은 변경되지 않았습니다. 잠시 후 다시 시도하거나 GitHub 원본을 이용해 주세요.";
      const actionHost = panel.querySelector("div") || panel;
      panel.insertBefore(safety, actionHost);

      if (!panel.querySelector("[data-viewer-read-retry]")) {
        const retry = document.createElement("button");
        retry.type = "button";
        retry.className = "btn btn--small";
        retry.dataset.viewerReadRetry = "true";
        retry.textContent = "다시 시도";
        retry.addEventListener("click", () => {
          const activeFile = root.querySelector(".submission-viewer__file.is-active");
          const activeSubmission = root.querySelector(".submission-viewer__submission.is-active");
          (activeFile || activeSubmission)?.click();
        });
        actionHost.insertBefore(retry, actionHost.firstChild);
      }
    });
  }

  new MutationObserver(enhanceErrors).observe(root, { childList: true, subtree: true });
  enhanceErrors();
})();
