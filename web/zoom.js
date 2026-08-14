/* On-page topo / photo inspector. Click to open, wheel/pinch/buttons to zoom, drag to pan. */
(function () {
  const MIN = 1;
  const MAX = 8;
  let overlay;
  let img;
  let stage;
  let caption;
  let counter;
  let items = [];
  let index = 0;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let drag = null;
  let pinch0 = null;

  function ui() {
    return (window.I18N && window.I18N[document.documentElement.lang]) || (window.I18N && window.I18N.en) || {};
  }

  function ensure() {
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.className = "zoom-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="zoom-bar">
        <p class="zoom-caption" id="zoom-caption"></p>
        <p class="zoom-count" id="zoom-count" hidden></p>
        <div class="zoom-tools">
          <button type="button" class="zoom-tool" data-z="out" aria-label="Zoom out">−</button>
          <button type="button" class="zoom-tool" data-z="in" aria-label="Zoom in">+</button>
          <button type="button" class="zoom-tool" data-z="reset">1×</button>
          <button type="button" class="zoom-tool" data-z="prev" aria-label="Previous">‹</button>
          <button type="button" class="zoom-tool" data-z="next" aria-label="Next">›</button>
          <button type="button" class="zoom-tool zoom-close" data-z="close" aria-label="Close">✕</button>
        </div>
      </div>
      <div class="zoom-stage" tabindex="0">
        <img class="zoom-img" alt="">
      </div>`;
    document.body.appendChild(overlay);
    img = overlay.querySelector(".zoom-img");
    stage = overlay.querySelector(".zoom-stage");
    caption = overlay.querySelector("#zoom-caption");
    counter = overlay.querySelector("#zoom-count");

    overlay.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-z]");
      if (btn) {
        act(btn.dataset.z);
        return;
      }
      if (e.target === overlay) close();
    });

    stage.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.14 : 1 / 1.14);
      },
      { passive: false }
    );

    stage.addEventListener("dblclick", (e) => {
      if (scale > 1.05) reset();
      else zoomAt(e.clientX, e.clientY, 2.6 / scale);
    });

    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      if (scale <= 1) return;
      drag = { x: e.clientX, y: e.clientY, tx, ty, id: e.pointerId };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("grabbing");
    });
    stage.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      tx = drag.tx + (e.clientX - drag.x);
      ty = drag.ty + (e.clientY - drag.y);
      paint();
    });
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    stage.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 2) {
          pinch0 = {
            dist: dist(e.touches[0], e.touches[1]),
            scale,
            cx: (e.touches[0].clientX + e.touches[1].clientX) / 2,
            cy: (e.touches[0].clientY + e.touches[1].clientY) / 2
          };
        } else if (e.touches.length === 1 && scale > 1) {
          drag = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx, ty, id: "touch" };
        }
      },
      { passive: true }
    );
    stage.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length === 2 && pinch0) {
          e.preventDefault();
          const d = dist(e.touches[0], e.touches[1]);
          const next = clamp((pinch0.scale * d) / pinch0.dist, MIN, MAX);
          const factor = next / scale;
          const rect = stage.getBoundingClientRect();
          const mx = pinch0.cx - rect.left - rect.width / 2;
          const my = pinch0.cy - rect.top - rect.height / 2;
          tx = mx - (mx - tx) * factor;
          ty = my - (my - ty) * factor;
          scale = next;
          if (scale <= 1.02) reset();
          else paint();
        } else if (e.touches.length === 1 && drag && drag.id === "touch") {
          e.preventDefault();
          tx = drag.tx + (e.touches[0].clientX - drag.x);
          ty = drag.ty + (e.touches[0].clientY - drag.y);
          paint();
        }
      },
      { passive: false }
    );
    stage.addEventListener("touchend", (e) => {
      if (e.touches.length < 2) pinch0 = null;
      if (e.touches.length === 0) {
        drag = null;
        stage.classList.remove("grabbing");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (overlay.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "+" || e.key === "=") act("in");
      else if (e.key === "-" || e.key === "_") act("out");
      else if (e.key === "0") reset();
      else if (e.key === "ArrowRight") act("next");
      else if (e.key === "ArrowLeft") act("prev");
    });

    return overlay;
  }

  function dist(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  }

  function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
  }

  function endDrag() {
    drag = null;
    if (stage) stage.classList.remove("grabbing");
  }

  function paint() {
    if (scale <= 1) {
      scale = 1;
      tx = 0;
      ty = 0;
    }
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    stage.style.cursor = scale > 1 ? "grab" : "zoom-in";
    const resetBtn = overlay.querySelector('[data-z="reset"]');
    if (resetBtn) resetBtn.textContent = `${scale.toFixed(1)}×`;
  }

  function zoomAt(cx, cy, factor) {
    const next = clamp(scale * factor, MIN, MAX);
    const rect = stage.getBoundingClientRect();
    const mx = cx - rect.left - rect.width / 2;
    const my = cy - rect.top - rect.height / 2;
    const k = next / scale;
    tx = mx - (mx - tx) * k;
    ty = my - (my - ty) * k;
    scale = next;
    if (scale <= 1.02) reset();
    else paint();
  }

  function reset() {
    scale = 1;
    tx = 0;
    ty = 0;
    paint();
  }

  function show(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.src;
    img.alt = item.alt || "";
    const labels = ui();
    caption.textContent = item.kind === "photo" ? labels.photos || "Photo" : labels.topo || "Topo";
    if (items.length > 1) {
      counter.hidden = false;
      counter.textContent = `${index + 1} / ${items.length}`;
    } else {
      counter.hidden = true;
    }
    overlay.querySelector('[data-z="prev"]').hidden = items.length < 2;
    overlay.querySelector('[data-z="next"]').hidden = items.length < 2;
    reset();
    overlay.hidden = false;
    document.body.classList.add("zoom-lock");
    stage.focus();
  }

  function act(kind) {
    if (kind === "close") close();
    else if (kind === "in") zoomAt(stage.clientWidth / 2 + stage.getBoundingClientRect().left, stage.clientHeight / 2 + stage.getBoundingClientRect().top, 1.28);
    else if (kind === "out") zoomAt(stage.clientWidth / 2 + stage.getBoundingClientRect().left, stage.clientHeight / 2 + stage.getBoundingClientRect().top, 1 / 1.28);
    else if (kind === "reset") reset();
    else if (kind === "next") show(index + 1);
    else if (kind === "prev") show(index - 1);
  }

  function openFrom(btn) {
    ensure();
    const root = btn.closest("[data-zoom-set]") || document;
    items = [...root.querySelectorAll("[data-zoom-src]")].map((el) => ({
      src: el.dataset.zoomSrc,
      alt: el.querySelector("img") ? el.querySelector("img").alt : "",
      kind: el.dataset.zoomKind || "topo"
    }));
    const start = items.findIndex((it) => it.src === btn.dataset.zoomSrc);
    show(start < 0 ? 0 : start);
  }

  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove("zoom-lock");
    img.removeAttribute("src");
    items = [];
    reset();
  }

  function bind(root) {
    ensure();
    if (!root) return;
    root.querySelectorAll("[data-zoom-src]").forEach((btn) => {
      btn.addEventListener("click", () => openFrom(btn));
    });
  }

  window.SXZoom = { bind, close, openFrom };
})();
