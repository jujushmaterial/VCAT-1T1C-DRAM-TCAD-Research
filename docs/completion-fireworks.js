(() => {
  "use strict";

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (reducedMotion) return;

  let launched = false;

  function isProjectComplete() {
    const progress = document.querySelector("#overall-progress")?.textContent?.trim();
    return progress === "100%";
  }

  function launchFireworks() {
    if (launched || !isProjectComplete()) return;
    launched = true;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "99999"
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const particles = [];
    const palette = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#9b5de5", "#f72585", "#ffffff"];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function burst(x, y, count = 72) {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.2 + Math.random() * 5.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.009 + Math.random() * 0.012,
          gravity: 0.045 + Math.random() * 0.025,
          size: 1.6 + Math.random() * 2.4,
          color: palette[Math.floor(Math.random() * palette.length)]
        });
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const burstSchedule = [
      [0, 0.18, 0.34, 86],
      [180, 0.82, 0.30, 86],
      [390, 0.50, 0.22, 104],
      [650, 0.30, 0.48, 82],
      [840, 0.70, 0.45, 82],
      [1120, 0.12, 0.58, 72],
      [1260, 0.88, 0.56, 72],
      [1540, 0.50, 0.40, 110]
    ];

    burstSchedule.forEach(([delay, x, y, count]) => {
      window.setTimeout(() => burst(width * x, height * y, count), delay);
    });

    const startedAt = performance.now();
    function frame(now) {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.vy += p.gravity;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (now - startedAt < 4300 || particles.length) {
        requestAnimationFrame(frame);
      } else {
        window.removeEventListener("resize", resize);
        canvas.remove();
      }
    }

    requestAnimationFrame(frame);
  }

  function watchProgress() {
    const target = document.querySelector("#overall-progress");
    if (!target) return;

    launchFireworks();
    if (launched) return;

    const observer = new MutationObserver(() => {
      launchFireworks();
      if (launched) observer.disconnect();
    });
    observer.observe(target, { childList: true, characterData: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchProgress, { once: true });
  } else {
    watchProgress();
  }
})();
