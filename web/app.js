(function () {
  const grid = document.getElementById("grid");
  const detail = document.getElementById("detail");
  const list = document.getElementById("list");
  const pair = document.getElementById("home-pair");
  const mapBox = document.getElementById("map-box");
  const mast = document.getElementById("home-mast");
  const picksEl = document.getElementById("picks");
  const chips = () => document.querySelectorAll(".chip[data-filter]");
  const PICKS_KEY = "sx-picks-v2";
  const WHO_KEY = "sx-who";
  const PEOPLE = ["martin", "antonia"];
  const NAMES = { martin: "Martin", antonia: "Antonia" };
  let who = localStorage.getItem(WHO_KEY) === "antonia" ? "antonia" : "martin";
  let party = {
    martin: { liked: [], rejected: [] },
    antonia: { liked: [], rejected: [] }
  };
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

  function emptyPerson() {
    return { liked: [], rejected: [] };
  }

  function normalizeParty(raw) {
    const next = { martin: emptyPerson(), antonia: emptyPerson() };
    for (const person of PEOPLE) {
      const block = (raw && raw[person]) || {};
      next[person] = {
        liked: Array.isArray(block.liked) ? block.liked.filter(Boolean) : [],
        rejected: Array.isArray(block.rejected) ? block.rejected.filter(Boolean) : []
      };
    }
    return next;
  }

  function cacheParty() {
    localStorage.setItem(PICKS_KEY, JSON.stringify(party));
  }

  function likedUnion() {
    return [...new Set([...party.martin.liked, ...party.antonia.liked])];
  }

  function rejectedUnion() {
    return [...new Set([...party.martin.rejected, ...party.antonia.rejected])];
  }

  function whoLiked(id) {
    return PEOPLE.filter((person) => party[person].liked.includes(id));
  }

  function whoRejected(id) {
    return PEOPLE.filter((person) => party[person].rejected.includes(id));
  }

  function getPicks() {
    return party[who];
  }

  function voteOf(id) {
    const p = getPicks();
    if (p.liked.includes(id)) return "like";
    if (p.rejected.includes(id)) return "reject";
    return null;
  }

  async function pullParty() {
    try {
      const res = await fetch("/api/picks", { cache: "no-store" });
      if (!res.ok) throw new Error("picks " + res.status);
      party = normalizeParty(await res.json());
      cacheParty();
    } catch {
      try {
        party = normalizeParty(JSON.parse(localStorage.getItem(PICKS_KEY) || "{}"));
      } catch {
        party = normalizeParty(null);
      }
    }
    paintLikesNav();
  }

  async function setVote(id, vote) {
    const p = party[who];
    p.liked = p.liked.filter((x) => x !== id);
    p.rejected = p.rejected.filter((x) => x !== id);
    if (vote === "like") p.liked.push(id);
    if (vote === "reject") p.rejected.push(id);
    cacheParty();
    paintLikesNav();
    try {
      const res = await fetch("/api/picks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ person: who, route_id: id, vote })
      });
      if (res.ok) {
        party = normalizeParty(await res.json());
        cacheParty();
        paintLikesNav();
      }
    } catch {
      /* local cache still holds this device's vote */
    }
  }

  function toggleVote(id, vote) {
    return setVote(id, voteOf(id) === vote ? null : vote);
  }

  function paintWho() {
    document.querySelectorAll("[data-who]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.who === who));
    });
  }

  function paintLikesNav() {
    const ui = t();
    const n = likedUnion().length;
    const label = document.getElementById("likes-nav-label");
    const count = document.getElementById("likes-count");
    const nav = document.getElementById("likes-nav");
    if (label) label.textContent = ui.likesNav;
    if (count) {
      count.textContent = String(n);
      count.hidden = n === 0;
    }
    if (nav) {
      nav.setAttribute("aria-label", `${ui.likesNav} (${n})`);
      nav.setAttribute("aria-current", location.hash.replace(/^#\/?/, "") === "likes" ? "page" : "false");
    }
  }

  function voteButtons(id) {
    const ui = t();
    const v = voteOf(id);
    return `
      <div class="vote" role="group" aria-label="${ui.voteGroup}">
        <button type="button" class="vote-btn vote-like${v === "like" ? " on" : ""}" data-vote="like" data-id="${id}" aria-pressed="${v === "like"}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.4s-7.2-4.5-9.3-8.2C1 9.3 2.2 6 5.6 5.4c2-.4 3.5.5 4.4 1.8.9-1.3 2.4-2.2 4.4-1.8 3.4.6 4.6 3.9 2.9 6.8-2.1 3.7-9.3 8.2-9.3 8.2z"/></svg>
          ${v === "like" ? ui.liked : ui.like}
        </button>
        <button type="button" class="vote-btn vote-no${v === "reject" ? " on" : ""}" data-vote="reject" data-id="${id}" aria-pressed="${v === "reject"}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5.7 12 12l-6.3-6.3-1 1L11 13l-6.3 6.3 1 1L12 14l6.3 6.3 1-1L13 13l6.3-6.3z"/></svg>
          ${v === "reject" ? ui.rejected : ui.reject}
        </button>
      </div>`;
  }

  function paintVoteButtons(root) {
    const ui = t();
    root.querySelectorAll("[data-vote]").forEach((btn) => {
      const v = voteOf(btn.dataset.id);
      const on = v === btn.dataset.vote;
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", String(on));
      const svg = btn.querySelector("svg");
      btn.textContent = "";
      if (svg) btn.appendChild(svg);
      const label =
        btn.dataset.vote === "like" ? (on ? ui.liked : ui.like) : on ? ui.rejected : ui.reject;
      btn.appendChild(document.createTextNode(label));
    });
  }

  function bindVotes(root, after) {
    root.querySelectorAll("[data-vote]").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleVote(btn.dataset.id, btn.dataset.vote);
        if (after) after();
        else paintVoteButtons(root);
      });
    });
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

  function peopleChips(id) {
    const fans = whoLiked(id);
    if (!fans.length) return "";
    return `<div class="people">${fans.map((p) => `<span class="who-chip ${p}">${NAMES[p]}</span>`).join("")}</div>`;
  }

  function cardHTML(raw, withPeople) {
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
        ${withPeople ? peopleChips(raw.id) : ""}
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
          ${voteButtons(raw.id)}
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
    const whoSwitch = document.getElementById("who-switch");
    if (whoSwitch) whoSwitch.setAttribute("aria-label", ui.whoAria);
    paintLikesNav();
    paintWho();
  }

  function showList() {
    list.classList.remove("hidden");
    pair.classList.remove("hidden");
    mapBox.classList.remove("hidden");
    mast.classList.remove("hidden");
    detail.classList.remove("open");
    detail.hidden = true;
    picksEl.hidden = true;
    document.title = t().title;
    applyChrome();
    renderGrid();
    setTimeout(() => map && map.invalidateSize(), 100);
    window.scrollTo(0, 0);
  }

  function bindPdf(root, id) {
    root.querySelectorAll("[data-pdf]").forEach((pdfBtn) => {
      pdfBtn.addEventListener("click", async () => {
        pdfBtn.disabled = true;
        try {
          await window.downloadRoutePdf(id);
        } finally {
          pdfBtn.disabled = false;
        }
      });
    });
  }

  function mountDetail(r) {
    detail.innerHTML = detailHTML(r);
    bindPdf(detail, r.id);
    bindVotes(detail);
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
    picksEl.hidden = true;
    detail.hidden = false;
    detail.classList.add("open");
    applyChrome();
    pullParty().then(() => {
      mountDetail(r);
      paintMiniMap(id);
    });
    window.scrollTo(0, 0);
    document.title = `${r.name} · Strawberry Express`;
  }

  function picksHTML() {
    const ui = t();
    const byId = Object.fromEntries(window.ROUTES.map((r) => [r.id, r]));
    const liked = likedUnion().map((id) => byId[id]).filter(Boolean);
    const rejected = rejectedUnion().map((id) => byId[id]).filter(Boolean);
    const likedCards = liked.length
      ? `<div class="grid">${liked.map((raw) => cardHTML(raw, true)).join("")}</div>`
      : `<p class="picks-empty">${ui.likesEmpty}</p>`;
    const rejectedCards = rejected.length
      ? `<ul class="picks-pass">${rejected
          .map((raw) => {
            const passers = whoRejected(raw.id).map((p) => NAMES[p]).join(" · ");
            return `<li><a href="#/${raw.id}">${raw.name}</a><span>${raw.grade} · ${passers}</span>${voteButtons(raw.id)}</li>`;
          })
          .join("")}</ul>`
      : `<p class="picks-empty">${ui.rejectedEmpty}</p>`;
    const allRows = window.ROUTES.map((raw) => {
      return `<li class="picks-row">
        <a href="#/${raw.id}">
          <strong>${raw.name}</strong>
          <span>${raw.wall} · ${raw.grade}</span>
          ${peopleChips(raw.id)}
        </a>
        ${voteButtons(raw.id)}
      </li>`;
    }).join("");
    return `
      <div class="picks-head">
        <p class="eyebrow">${ui.likesNav} · ${NAMES[who]}</p>
        <h1>${ui.likesTitle}</h1>
        <p class="lede">${ui.likesHint}</p>
        <a class="back" href="#/">${ui.back}</a>
      </div>
      ${likedCards}
      <h2>${ui.rejectedTitle}</h2>
      ${rejectedCards}
      <h2>${ui.likesAll}</h2>
      <ul class="picks-all">${allRows}</ul>`;
  }

  function showPicks() {
    list.classList.add("hidden");
    pair.classList.add("hidden");
    mapBox.classList.add("hidden");
    mast.classList.add("hidden");
    detail.hidden = true;
    detail.classList.remove("open");
    picksEl.hidden = false;
    applyChrome();
    function mountPicks() {
      picksEl.innerHTML = picksHTML();
      bindVotes(picksEl, mountPicks);
    }
    pullParty().then(mountPicks);
    document.title = `${t().likesTitle} · Strawberry Express`;
    window.scrollTo(0, 0);
  }

  function setWho(next) {
    if (!PEOPLE.includes(next)) return;
    who = next;
    localStorage.setItem(WHO_KEY, who);
    paintWho();
    route();
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    if (!hash || hash === "map") showList();
    else if (hash === "likes" || hash === "favorites") showPicks();
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

  document.getElementById("who-switch").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-who]");
    if (btn) setWho(btn.dataset.who);
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
  pullParty().then(route);
  setInterval(() => {
    pullParty().then(() => {
      if (location.hash.replace(/^#\/?/, "") === "likes") {
        const y = window.scrollY;
        picksEl.innerHTML = picksHTML();
        bindVotes(picksEl, async () => {
          await pullParty();
          picksEl.innerHTML = picksHTML();
        });
        window.scrollTo(0, y);
      } else {
        paintVoteButtons(document);
      }
    });
  }, 8000);
})();
