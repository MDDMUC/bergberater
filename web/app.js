(function () {
  const grid = document.getElementById("grid");
  const detail = document.getElementById("detail");
  const list = document.getElementById("list");
  const pair = document.getElementById("home-pair");
  const chips = document.querySelectorAll(".chip");

  function protClass(p) {
    if (p.includes("plaisir") && !p.includes("alpine")) return "plaisir";
    if (p.includes("alpine")) return "alpine";
    return "";
  }

  function cardHTML(r) {
    return `
      <a class="card" href="#/${r.id}" data-day="${r.day}" data-prot="${r.protection}" data-aspect="${r.aspect}">
        <span class="rank">${String(r.rank).padStart(2, "0")}</span>
        <div class="meta">
          <span class="tag ${r.day}">${r.dayLabel}</span>
          <span class="tag n">${r.aspect}</span>
          <span class="tag ${protClass(r.protection)}">${r.protection}</span>
          ${r.overGrade === true ? '<span class="tag over">Over grade</span>' : r.overGrade === "partial" ? '<span class="tag over">Partial 6+</span>' : ""}
        </div>
        <h3>${r.name}</h3>
        <p class="wall">${r.wall} · ${r.massif}</p>
        <dl class="stats">
          <div><dt>Drive</dt><dd>${r.drive}</dd></div>
          <div><dt>Grade</dt><dd>${r.grade}</dd></div>
          <div><dt>Pitches</dt><dd>${r.pitches}</dd></div>
          <div><dt>Day</dt><dd>${r.day === "sat" ? "Saturday" : "Sunday"}</dd></div>
        </dl>
      </a>`;
  }

  function renderGrid(filter) {
    const rows = window.ROUTES.filter((r) => {
      if (filter === "fits") return r.overGrade !== true;
      if (filter === "sat") return r.day === "sat" && r.overGrade !== true;
      if (filter === "sun") return r.day === "sun" && r.overGrade !== true;
      if (filter === "n") return r.aspect === "N" && r.overGrade !== true;
      return true;
    });
    grid.innerHTML = rows.map(cardHTML).join("");
  }

  function detailHTML(r) {
    const imgs = [r.wallImg, r.topoImg].filter(Boolean);
    return `
      <div class="detail-head">
        <div>
          <p class="eyebrow">#${String(r.rank).padStart(2, "0")} · ${r.dayLabel}</p>
          <h1>${r.name}</h1>
          <p class="lede">${r.wall} · ${r.massif}</p>
        </div>
        <a class="back" href="#/">← All ten</a>
      </div>
      <dl class="factgrid">
        <div class="fact"><dt>Drive from Munich</dt><dd>${r.drive}</dd></div>
        <div class="fact"><dt>Via</dt><dd>${r.via}</dd></div>
        <div class="fact"><dt>Aspect</dt><dd>${r.aspect}</dd></div>
        <div class="fact"><dt>Grade</dt><dd>${r.grade}</dd></div>
        <div class="fact"><dt>Pitches / height</dt><dd>${r.pitches}</dd></div>
        <div class="fact"><dt>Protection</dt><dd>${r.protection}</dd></div>
      </dl>
      <div class="cols">
        <div>
          <section class="block"><h2>Why this line</h2><p>${r.why}</p></section>
          <section class="block"><h2>Grade note</h2><p>${r.gradeNote}</p></section>
          <section class="block"><h2>Approach</h2><p>${r.approach}</p></section>
          <section class="block"><h2>Descent</h2><p>${r.descent}</p></section>
          <section class="block"><h2>This weekend</h2><p>${r.weekend}</p></section>
          <section class="block dont"><h2>Do not</h2><ul>${r.dont.map((d) => `<li>${d}</li>`).join("")}</ul></section>
        </div>
        <aside>
          <section class="block"><h2>Gear</h2><ul class="gear">${r.gear.map((g) => `<li>${g}</li>`).join("")}</ul></section>
          <section class="block"><h2>Protection</h2><p>${r.protectionNote}</p></section>
          <section class="block"><h2>Also</h2><p>${r.neighbor}</p></section>
          <section class="block media">
            <h2>Topo / wall</h2>
            ${imgs.length ? imgs.map((src) => `<img src="${src}" alt="Topo or wall photo for ${r.name}" loading="lazy">`).join("") : "<p>No free drawn topo online. See the linked report or guidebook.</p>"}
            <div class="links">
              <a href="${r.topoPage}" target="_blank" rel="noopener">Topo page</a>
              <a href="${r.map}" target="_blank" rel="noopener">Open map</a>
            </div>
          </section>
        </aside>
      </div>`;
  }

  function showList() {
    list.classList.remove("hidden");
    pair.classList.remove("hidden");
    detail.classList.remove("open");
    detail.hidden = true;
    document.title = "Strawberry Express — weekend walls";
  }

  function showDetail(id) {
    const r = window.ROUTES.find((x) => x.id === id);
    if (!r) {
      showList();
      return;
    }
    list.classList.add("hidden");
    pair.classList.add("hidden");
    detail.hidden = false;
    detail.classList.add("open");
    detail.innerHTML = detailHTML(r);
    detail.scrollIntoView({ behavior: "instant", block: "start" });
    document.title = `${r.name} · Strawberry Express`;
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (!hash) showList();
    else showDetail(hash);
  }

  chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === btn)));
      renderGrid(btn.dataset.filter);
    });
  });

  window.addEventListener("hashchange", route);
  renderGrid("fits");
  route();
})();
