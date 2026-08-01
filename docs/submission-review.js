/* Submission review controls: pending -> approve/hold, held -> admin approve. */
(() => {
  const root = document.querySelector("#submission-viewer-content");
  const dialog = document.querySelector("#submission-viewer-dialog");
  if (!root || !dialog) return;

  const manifestCache = new Map();
  const nativeFetch = window.fetch.bind(window);
  let scheduled = false;
  let activePopover = null;
  let requestSerial = 0;

  window.fetch = async (...args) => {
    const response = await nativeFetch(...args);
    try {
      const requestUrl = typeof args[0] === "string" ? args[0] : args[0]?.url;
      const url = new URL(requestUrl, location.href);
      const match = url.pathname.match(/^\/api\/submissions\/([A-Za-z0-9_-]+)\/manifest$/);
      if (match && response.ok) manifestCache.set(match[1], await response.clone().json());
    } catch (error) {
      console.warn("Submission review manifest capture failed", error);
    }
    return response;
  };

  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(async () => {
      scheduled = false;
      decorateKnownStatuses();
      await enhanceActiveToolbar();
    });
  }

  function activeContext() {
    const button = root.querySelector(".submission-viewer__submission.is-active");
    const toolbarMain = root.querySelector(".submission-viewer__toolbar-main");
    const actions = toolbarMain?.querySelector(".submission-viewer__toolbar-actions");
    const submissionId = button?.dataset.submissionId || button?.dataset.tableSubmission || "";
    const eyebrow = root.querySelector(".submission-viewer__eyebrow")?.textContent || "";
    const outputId = eyebrow.match(/P\d{2}-T\d{2}-O\d{2}/)?.[0]
      || (typeof submissionOutput !== "undefined" ? submissionOutput?.id : "")
      || "";
    return { button, toolbarMain, actions, submissionId, outputId };
  }

  async function ensureManifest(submissionId, outputId) {
    if (manifestCache.has(submissionId)) return manifestCache.get(submissionId);
    if (!submissionId || !outputId || typeof apiFetch !== "function") return null;
    const manifest = await apiFetch(`/api/submissions/${encodeURIComponent(submissionId)}/manifest?outputId=${encodeURIComponent(outputId)}`);
    manifestCache.set(submissionId, manifest);
    return manifest;
  }

  async function enhanceActiveToolbar() {
    const context = activeContext();
    if (!context.toolbarMain || !context.actions || !context.submissionId || !context.outputId) return;
    if (context.actions.querySelector(`[data-review-control="${cssEscape(context.submissionId)}"]`)) return;

    const serial = ++requestSerial;
    try {
      const manifest = await ensureManifest(context.submissionId, context.outputId);
      if (serial !== requestSerial || !manifest?.submission) return;
      const latest = activeContext();
      if (latest.submissionId !== context.submissionId) return;
      renderReviewControl(latest, manifest);
    } catch (error) {
      console.warn("Submission review status load failed", error);
    }
  }

  function renderReviewControl(context, manifest) {
    context.actions.querySelectorAll("[data-review-control]").forEach((node) => node.remove());
    context.toolbarMain.querySelectorAll(".submission-review__popover").forEach((node) => node.remove());

    const review = normalizeReview(manifest.submission.review);
    const permissions = manifest.submission.reviewPermissions || {};
    updateSubmissionBadge(context.button, review.status);
    updateLocalRecord(context.submissionId, review);
    if (review.status === "approved") return;

    context.toolbarMain.classList.add("has-review-popover");
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.reviewControl = context.submissionId;
    button.className = `btn btn--small submission-review__status is-${review.status}`;
    button.textContent = review.status === "held" ? "보류" : "검토 필요";
    button.setAttribute("aria-expanded", "false");
    context.actions.insertBefore(button, context.actions.firstChild);

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const existing = context.toolbarMain.querySelector(".submission-review__popover");
      if (existing && !existing.hidden) {
        closeActivePopover();
        return;
      }
      openReviewPopover({ context, manifest, button, review, permissions });
    });
  }

  function openReviewPopover({ context, manifest, button, review, permissions }) {
    closeActivePopover();
    const popover = document.createElement("section");
    popover.className = "submission-review__popover";
    popover.setAttribute("role", "dialog");
    popover.setAttribute("aria-label", review.status === "held" ? "보류 사유" : "제출본 검토");

    const heading = document.createElement("div");
    heading.className = "submission-review__heading";
    const title = document.createElement("strong");
    title.textContent = review.status === "held" ? "보류 사유" : "검토";
    const close = document.createElement("button");
    close.type = "button";
    close.setAttribute("aria-label", "검토 창 닫기");
    close.textContent = "×";
    heading.append(title, close);
    popover.append(heading);

    if (review.status === "pending") {
      renderPendingContent(popover, permissions);
    } else {
      renderHeldContent(popover, review, permissions);
    }

    context.toolbarMain.append(popover);
    activePopover = popover;
    button.setAttribute("aria-expanded", "true");
    popover.addEventListener("click", (event) => event.stopPropagation());
    close.addEventListener("click", () => {
      closeActivePopover();
      button.focus();
    });

    popover.querySelector("[data-review-approve]")?.addEventListener("click", () => submitReview({
      context,
      manifest,
      action: "approve",
      reason: popover.querySelector("[data-review-reason]")?.value || "",
      trigger: popover.querySelector("[data-review-approve]")
    }));
    popover.querySelector("[data-review-hold]")?.addEventListener("click", () => submitReview({
      context,
      manifest,
      action: "hold",
      reason: popover.querySelector("[data-review-reason]")?.value || "",
      trigger: popover.querySelector("[data-review-hold]")
    }));
  }

  function renderPendingContent(popover, permissions) {
    const body = document.createElement("div");
    body.className = "submission-review__body";
    if (permissions.canDecidePending) {
      body.innerHTML = `
        <label class="submission-review__reason-label">사유
          <textarea data-review-reason rows="5" maxlength="1000" placeholder="보류할 경우 사유를 5자 이상 입력해 주세요. 승인 시에는 비워도 됩니다."></textarea>
        </label>
        <div class="submission-review__actions">
          <button type="button" class="btn btn--small submission-review__approve" data-review-approve>승인</button>
          <button type="button" class="btn btn--small submission-review__hold" data-review-hold>보류</button>
        </div>`;
    } else {
      const message = permissions.isOwnSubmission && permissions.isPhaseAssignee
        ? "본인 제출본은 관리자가 검토합니다."
        : "현재 Phase 담당자 또는 관리자의 검토를 기다리고 있습니다.";
      body.innerHTML = `<p class="submission-review__readonly">${escapeHtml(message)}</p>`;
    }
    popover.append(body);
  }

  function renderHeldContent(popover, review, permissions) {
    const body = document.createElement("div");
    body.className = "submission-review__body";
    const reviewer = review.reviewer ? displayName(review.reviewer) : "검토자 미확인";
    body.innerHTML = `
      <div class="submission-review__held-reason">${escapeHtml(review.reason || "보류 사유가 기록되지 않았습니다.").replaceAll("\n", "<br>")}</div>
      <dl class="submission-review__meta">
        <div><dt>검토자</dt><dd>${escapeHtml(reviewer)}</dd></div>
        <div><dt>검토 시각</dt><dd>${escapeHtml(formatDate(review.reviewedAt))}</dd></div>
      </dl>
      ${permissions.canApproveHeld
        ? '<div class="submission-review__actions is-single"><button type="button" class="btn btn--small submission-review__approve" data-review-approve>승인</button></div>'
        : ""}`;
    popover.append(body);
  }

  async function submitReview({ context, manifest, action, reason, trigger }) {
    if (!trigger || trigger.disabled) return;
    if (action === "hold" && reason.trim().length < 5) {
      showToast("보류 사유를 5자 이상 입력해 주세요.");
      return;
    }
    const original = trigger.textContent;
    trigger.disabled = true;
    trigger.textContent = action === "hold" ? "보류 중" : "승인 중";
    try {
      const result = await apiFetch(`/api/submissions/${encodeURIComponent(context.submissionId)}/review`, {
        method: "PATCH",
        body: JSON.stringify({ outputId: context.outputId, action, reason: reason.trim() })
      });
      manifest.submission.review = result.review;
      manifest.submission.reviewPermissions = result.reviewPermissions;
      manifestCache.set(context.submissionId, manifest);
      updateLocalRecord(context.submissionId, result.review);
      closeActivePopover();
      context.actions.querySelectorAll("[data-review-control]").forEach((node) => node.remove());
      updateSubmissionBadge(context.button, result.review.status);
      renderReviewControl(activeContext(), manifest);
      showToast(action === "hold" ? "제출본을 보류했습니다." : "제출본 검토를 승인했습니다.");
      refreshPhaseState();
    } catch (error) {
      showToast(error.message);
      trigger.disabled = false;
      trigger.textContent = original;
    }
  }

  function updateLocalRecord(submissionId, review) {
    const apply = (records) => {
      if (!Array.isArray(records)) return;
      const record = records.find((item) => String(item?.submissionId) === String(submissionId));
      if (record) record.review = review;
    };
    if (typeof submissionOutput !== "undefined") apply(submissionOutput?.submissions);
    if (typeof allPhases !== "undefined") {
      for (const phase of allPhases || []) {
        for (const task of phase.tasks || []) for (const output of task.outputs || []) apply(output.submissions);
        for (const output of phase.outputs || []) apply(output.submissions);
      }
    }
  }

  function refreshPhaseState() {
    try {
      const phase = typeof getDialogPhase === "function" ? getDialogPhase() : null;
      if (phase && typeof fetchLiveIssue === "function") fetchLiveIssue(phase).catch(() => {});
    } catch (error) {
      console.warn("Review phase refresh failed", error);
    }
  }

  function decorateKnownStatuses() {
    root.querySelectorAll(".submission-viewer__submission").forEach((button) => {
      const submissionId = button.dataset.submissionId || button.dataset.tableSubmission;
      const record = findLocalRecord(submissionId);
      if (record?.review) updateSubmissionBadge(button, normalizeReview(record.review).status);
    });
  }

  function findLocalRecord(submissionId) {
    if (!submissionId) return null;
    const candidates = [];
    if (typeof submissionOutput !== "undefined") candidates.push(...(submissionOutput?.submissions || []));
    if (typeof allPhases !== "undefined") {
      for (const phase of allPhases || []) {
        for (const task of phase.tasks || []) for (const output of task.outputs || []) candidates.push(...(output.submissions || []));
      }
    }
    return candidates.find((item) => String(item?.submissionId) === String(submissionId)) || null;
  }

  function updateSubmissionBadge(button, status) {
    if (!button) return;
    button.querySelector(".submission-review__mini")?.remove();
    if (status === "approved") return;
    const badge = document.createElement("span");
    badge.className = `submission-review__mini is-${status}`;
    badge.textContent = status === "held" ? "보류" : "검토 필요";
    button.append(badge);
  }

  function normalizeReview(value) {
    if (value && ["pending", "approved", "held"].includes(String(value.status))) {
      return {
        status: String(value.status),
        reviewer: value.reviewer || null,
        reviewedAt: value.reviewedAt || null,
        reason: value.status === "held" ? String(value.reason || "") : null
      };
    }
    return { status: "approved", reviewer: "system-migration", reviewedAt: null, reason: null };
  }

  function closeActivePopover() {
    if (!activePopover) return;
    const toolbar = activePopover.parentElement;
    activePopover.remove();
    toolbar?.querySelector("[data-review-control]")?.setAttribute("aria-expanded", "false");
    activePopover = null;
  }

  function cssEscape(value) {
    return window.CSS?.escape ? CSS.escape(String(value)) : String(value).replace(/[^A-Za-z0-9_-]/g, "\\$&");
  }

  document.addEventListener("click", closeActivePopover);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activePopover) {
      event.stopPropagation();
      closeActivePopover();
    }
  });
  dialog.addEventListener("close", closeActivePopover);

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  scheduleEnhance();
})();
