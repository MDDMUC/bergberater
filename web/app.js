(function () {
  const grid = document.getElementById("grid");
  const detail = document.getElementById("detail");
  const list = document.getElementById("list");
  const pair = document.getElementById("home-pair");
  const mapBox = document.getElementById("map-box");
  const mast = document.getElementById("home-mast");
  const chips = () => document.querySelectorAll(".chip[data-filter]");
  let filter = "fits";
  let lang = localStorage.getItem("sx-lang") === "de" ? "de" : "en";
  let map, markersLayer;

  function t() {
    return window.I18N[lang];
  }

  function localized(r) {
    const over = (window.ROUTE_I18N[lang] || {})[r.id] || {};
    return Object.assign({}, r, over);
  }

  function protClass(p) {
    if (p.includes("plaisir") && !p.includes("alpine")) return "plaisir";
    if (p.includes("alpine")) return "alpine";
    return "";
  }

  function protLabel(p) {
    return t().prot[p] || p;
  }

  function gmapsDir(id) {
    const c = window.ROUTE_COORDS[id];
    if (!c) return "";
    return `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}&travelmode=driving`;
  }

  function navButton(id) {
    const href = gmapsDir(id);
    if (!href) return "";
    return `<a class="nav-btn" href="${href}" target="_blank" rel="noopener">${t().navigate}</a>`;
  }

  function crowd(id) {
    return window.ROUTE_CROWD[id] || { sat: 2, sun: 1, jam: 30 };
  }

  function photos(id) {
    return window.ROUTE_PHOTOS[id] || [];
  }

  function jamLabel(pct) {
    const ui = t();
    if (pct >= 71) return ui.jamSold;
    if (pct >= 46) return ui.jamSticky;
    if (pct >= 21) return ui.jamSpoon;
    return ui.jamFresh;
  }

  function jamHTML(id) {
    const ui = t();
    const c = crowd(id);
    const dayKey = window.ROUTES.find((r) => r.id === id)?.day === "sun" ? "sun" : "sat";
    const parties = c[dayKey];
    const berries = Array.from({ length: 5 }, (_, i) =>
      `<span class="berry-dot${i < parties ? " on" : ""}"></span>`
    ).join("");
    return `
      <div class="forecast">
        <div class="jam">
          <div class="jam-meta">
            <strong>${ui.jamTitle}</strong>
            <span>${jamLabel(c.jam)} · ${c.jam}%</span>
          </div>
          <div class="jam-jar" aria-label="${c.jam}%">
            <span class="jam-fill" style="height:${c.jam}%"></span>
          </div>
          <p class="jam-hint">${ui.jamHint}</p>
        </div>
        <div class="traffic">
          <strong>${ui.traffic}</strong>
          <div class="berry-row">${berries}</div>
          <p class="jam-hint">${ui.trafficHint}: ${parties}/5</p>
        </div>
      </div>`;
  }

  function betaHTML(id) {
    const ui = t();
    const beta = window.ROUTE_BETA && window.ROUTE_BETA[id];
    if (!beta) return "";
    const overview = beta.overview[lang] || beta.overview.en;
    const pitches = (beta.pitches || [])
      .map((p) => {
        const body = p[lang] || p.en;
        return `<li>
          <div class="pitch-head">
            <span class="pitch-n">${ui.pitch} ${p.n}</span>
            ${p.grade ? `<span class="pitch-g">${p.grade}</span>` : ""}
            ${p.m ? `<span class="pitch-m">${p.m} m</span>` : ""}
          </div>
          <p>${body}</p>
        </li>`;
      })
      .join("");
    return `
      <details class="beta-box">
        <summary>${ui.fullRoute}</summary>
        <p class="beta-overview">${overview}</p>
        <p class="beta-source">${ui.betaSource}: ${beta.sources}</p>
        <ol class="pitch-list">${pitches}</ol>
      </details>`;
  }

  function galleryHTML(id, name) {
    const ui = t();
    const shots = photos(id);
    if (!shots.length) return `<p>${ui.noPhoto}</p>`;
    return `<div class="gallery">${shots.map((src) => `<img src="${src}" alt="${name}" loading="lazy">`).join("")}</div>`;
  }

  function visibleRoutes() {
    return window.ROUTES.filter((r) => {
      if (filter === "fits") return r.overGrade !== true;
      if (filter === "sat") return r.day === "sat" && r.overGrade !== true;
      if (filter === "sun") return r.day === "sun" && r.overGrade !== true;
      if (filter === "n") return r.aspect === "N" && r.overGrade !== true;
      return true;
    });
  }

  function cardHTML(raw) {
    const r = localized(raw);
    const ui = t();
    const over =
      raw.overGrade === true
        ? `<span class="tag over">${ui.over}</span>`
        : raw.overGrade === "partial"
          ? `<span class="tag over">${ui.partial}</span>`
          : "";
    return `
      <a class="card" href="#/${raw.id}">
        <span class="rank">${String(raw.rank).padStart(2, "0")}</span>
        <div class="meta">
          <span class="tag ${raw.day}">${r.dayLabel}</span>
          <span class="tag n">${raw.aspect}</span>
          <span class="tag ${protClass(raw.protection)}">${protLabel(raw.protection)}</span>
          ${over}
        </div>
        <h3>${raw.name}</h3>
        <p class="wall">${raw.wall} · ${raw.massif}</p>
        <dl class="stats">
          <div><dt>${ui.drive}</dt><dd>${raw.drive}</dd></div>
          <div><dt>${ui.grade}</dt><dd>${raw.grade}</dd></div>
          <div><dt>${ui.pitches}</dt><dd>${raw.pitches}</dd></div>
          <div><dt>${ui.day}</dt><dd>${raw.day === "sat" ? ui.saturday : ui.sunday}</dd></div>
        </dl>
      </a>`;
  }

  function renderGrid() {
    grid.innerHTML = visibleRoutes().map(cardHTML).join("");
    syncMap();
  }

  function detailHTML(raw) {
    const r = localized(raw);
    const ui = t();
    const imgs = [raw.wallImg, raw.topoImg].filter(Boolean);
    return `
      <div class="detail-head">
        <div>
          <p class="eyebrow">#${String(raw.rank).padStart(2, "0")} · ${r.dayLabel}</p>
          <h1>${raw.name}</h1>
          <p class="lede">${raw.wall} · ${raw.massif}</p>
        </div>
        <div class="detail-actions">
          ${navButton(raw.id)}
          <button type="button" class="pdf-btn" data-pdf="${raw.id}">${ui.pdf}</button>
          <a class="back" href="#/">${ui.back}</a>
        </div>
      </div>
      <div id="detail-map" class="map-frame map-frame-sm" role="region"></div>
      ${jamHTML(raw.id)}
      ${betaHTML(raw.id)}
      <section class="block media">
        <h2>${ui.photos}</h2>
        ${galleryHTML(raw.id, raw.name)}
      </section>
      <dl class="factgrid">
        <div class="fact"><dt>${ui.driveFrom}</dt><dd>${raw.drive}</dd></div>
        <div class="fact"><dt>${ui.via}</dt><dd>${r.via || raw.via}</dd></div>
        <div class="fact"><dt>${ui.aspect}</dt><dd>${raw.aspect}</dd></div>
        <div class="fact"><dt>${ui.grade}</dt><dd>${raw.grade}</dd></div>
        <div class="fact"><dt>${ui.pitchesH}</dt><dd>${raw.pitches}</dd></div>
        <div class="fact"><dt>${ui.protection}</dt><dd>${protLabel(raw.protection)}</dd></div>
      </dl>
      <div class="cols">
        <div>
          <section class="block"><h2>${ui.why}</h2><p>${r.why}</p></section>
          <section class="block"><h2>${ui.gradeNote}</h2><p>${r.gradeNote}</p></section>
          <section class="block"><h2>${ui.approach}</h2><p>${r.approach}</p></section>
          <section class="block"><h2>${ui.descent}</h2><p>${r.descent}</p></section>
          <section class="block"><h2>${ui.weekend}</h2><p>${r.weekend}</p></section>
          <section class="block dont"><h2>${ui.dont}</h2><ul>${r.dont.map((d) => `<li>${d}</li>`).join("")}</ul></section>
        </div>
        <aside>
          <section class="block"><h2>${ui.gear}</h2><ul class="gear">${r.gear.map((g) => `<li>${g}</li>`).join("")}</ul></section>
          <section class="block"><h2>${ui.protection}</h2><p>${r.protectionNote}</p></section>
          <section class="block"><h2>${ui.also}</h2><p>${r.neighbor}</p></section>
          <section class="block media">
            <h2>${ui.topo}</h2>
            ${imgs.length ? imgs.map((src) => `<img src="${src}" alt="${raw.name}" loading="lazy">`).join("") : `<p>${ui.noTopo}</p>`}
            <div class="links">
              ${navButton(raw.id)}
              <button type="button" class="pdf-btn" data-pdf="${raw.id}">${ui.pdf}</button>
              <a href="${raw.topoPage}" target="_blank" rel="noopener">${ui.topoPage}</a>
              <a href="${raw.map}" target="_blank" rel="noopener">${ui.openMap}</a>
            </div>
          </section>
        </aside>
      </div>`;
  }

  function berryIcon() {
    return L.divIcon({
      className: "berry-pin",
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -12]
    });
  }

  function ensureMap() {
    if (map || !window.L) return;
    map = L.map("map", { scrollWheelZoom: false, tap: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 18
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
    map.setView([47.55, 11.6], 8);
  }

  function syncMap() {
    if (!map || !markersLayer) return;
    markersLayer.clearLayers();
    const ui = t();
    const pts = [];
    visibleRoutes().forEach((raw) => {
      const c = window.ROUTE_COORDS[raw.id];
      if (!c) return;
      const r = localized(raw);
      pts.push([c.lat, c.lng]);
      const m = L.marker([c.lat, c.lng], { icon: berryIcon() }).addTo(markersLayer);
      m.bindPopup(
        `<strong>${raw.name}</strong><br>${raw.wall}<br>${raw.grade}<br><a href="#/${raw.id}">${ui.openRoute}</a>`
      );
      m.on("click", () => m.openPopup());
    });
    if (pts.length) map.fitBounds(pts, { padding: [28, 28], maxZoom: 10 });
    setTimeout(() => map.invalidateSize(), 80);
  }

  function paintMiniMap(id) {
    const el = document.getElementById("detail-map");
    const c = window.ROUTE_COORDS[id];
    if (!el || !c || !window.L) return;
    const mini = L.map(el, { scrollWheelZoom: false, zoomControl: false, attributionControl: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 16 }).addTo(mini);
    L.marker([c.lat, c.lng], { icon: berryIcon() }).addTo(mini);
    mini.setView([c.lat, c.lng], 12);
    setTimeout(() => mini.invalidateSize(), 80);
  }

  function applyChrome() {
    const ui = t();
    document.documentElement.lang = ui.htmlLang;
    document.title = ui.title;
    document.getElementById("brand-home").setAttribute("aria-label", ui.homeAria);
    document.getElementById("eyebrow").textContent = ui.eyebrow;
    document.getElementById("h1a").textContent = ui.h1a;
    document.getElementById("h1b").textContent = ui.h1b;
    document.getElementById("lede").innerHTML = ui.lede;
    document.getElementById("weather-kicker").textContent = ui.weatherKicker;
    document.getElementById("weather-p1").textContent = ui.weatherP1;
    document.getElementById("weather-p2").textContent = ui.weatherP2;
    document.getElementById("sat-kicker").textContent = ui.satKicker;
    document.getElementById("sat-blurb").textContent = ui.satBlurb;
    document.getElementById("sun-kicker").textContent = ui.sunKicker;
    document.getElementById("sun-blurb").textContent = ui.sunBlurb;
    document.getElementById("map-title").textContent = ui.mapTitle;
    document.getElementById("map-hint").textContent = ui.mapHint;
    document.getElementById("footer").textContent = ui.footer;
    document.getElementById("filters").setAttribute("aria-label", ui.filterAria);
    chips().forEach((btn) => {
      btn.textContent = ui.filters[btn.dataset.filter];
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
    });
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  }

  function showList() {
    list.classList.remove("hidden");
    pair.classList.remove("hidden");
    mapBox.classList.remove("hidden");
    mast.classList.remove("hidden");
    detail.classList.remove("open");
    detail.hidden = true;
    document.title = t().title;
    applyChrome();
    renderGrid();
    setTimeout(() => map && map.invalidateSize(), 100);
    window.scrollTo(0, 0);
  }

  function showDetail(id) {
    const r = window.ROUTES.find((x) => x.id === id);
    if (!r) {
      showList();
      return;
    }
    list.classList.add("hidden");
    pair.classList.add("hidden");
    mapBox.classList.add("hidden");
    mast.classList.add("hidden");
    detail.hidden = false;
    detail.classList.add("open");
    applyChrome();
    detail.innerHTML = detailHTML(r);
    detail.querySelectorAll("[data-pdf]").forEach((pdfBtn) => {
      pdfBtn.addEventListener("click", async () => {
        pdfBtn.disabled = true;
        try {
          await window.downloadRoutePdf(r.id);
        } finally {
          pdfBtn.disabled = false;
        }
      });
    });
    paintMiniMap(id);
    window.scrollTo(0, 0);
    document.title = `${r.name} · Strawberry Express`;
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (!hash || hash === "map") showList();
    else showDetail(hash);
  }

  function setLang(next) {
    lang = next;
    localStorage.setItem("sx-lang", lang);
    route();
  }

  document.getElementById("lang-switch").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (btn) setLang(btn.dataset.lang);
  });

  document.getElementById("filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter;
    chips().forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === filter)));
    renderGrid();
  });

  window.addEventListener("hashchange", route);
  applyChrome();
  ensureMap();
  route();
})();
