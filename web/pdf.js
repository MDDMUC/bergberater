/* Branded route PDF: summary + pitch beta + topo. No impression photos. */
(function () {
  const BERRY = [228, 69, 111];
  const LEAF = [200, 255, 58];
  const INK = [42, 33, 35];
  const MUTED = [90, 74, 78];
  const CREAM = [255, 247, 243];

  function loadDataUrl(src) {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          c.getContext("2d").drawImage(img, 0, 0);
          const type = src.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
          resolve({ data: c.toDataURL(type, 0.86), w: img.naturalWidth, h: img.naturalHeight, type: type === "image/png" ? "PNG" : "JPEG" });
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function wrap(doc, text, x, y, maxW, lineH) {
    const lines = doc.splitTextToSize(String(text || ""), maxW);
    doc.text(lines, x, y);
    return y + lines.length * lineH;
  }

  function ensure(doc, y, need) {
    if (y + need < 282) return y;
    doc.addPage();
    return 18;
  }

  window.downloadRoutePdf = async function (id) {
    const raw = (window.ROUTES || []).find((r) => r.id === id);
    if (!raw || !window.jspdf) return;
    const lang = localStorage.getItem("sx-lang") === "de" ? "de" : "en";
    const ui = window.I18N[lang];
    const over = (window.ROUTE_I18N[lang] || {})[id] || {};
    const r = Object.assign({}, raw, over);
    const beta = (window.ROUTE_BETA || {})[id];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const left = 16;
    const maxW = pageW - 32;

    const topoSrc = (beta && beta.topo) || raw.topoImg || "";
    const localTopo = topoSrc && !/^https?:/i.test(topoSrc) ? topoSrc : "";
    const [logo, topo] = await Promise.all([
      loadDataUrl("assets/logo.png"),
      loadDataUrl(localTopo)
    ]);

    doc.setFillColor(CREAM[0], CREAM[1], CREAM[2]);
    doc.rect(0, 0, pageW, 297, "F");
    doc.setFillColor(BERRY[0], BERRY[1], BERRY[2]);
    doc.rect(0, 0, pageW, 28, "F");
    if (logo) {
      doc.addImage(logo.data, logo.type, 8, 4, 12, 13, undefined, "FAST");
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("STRAWBERRY EXPRESS", 24, 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(lang === "de" ? "Wochenendwände · Bad Tölz · kein Führerersatz" : "weekend walls · Bad Tölz · not a guidebook", 24, 19);

    doc.setFillColor(LEAF[0], LEAF[1], LEAF[2]);
    doc.rect(0, 28, pageW, 3, "F");

    let y = 40;
    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    y = wrap(doc, raw.name, left, y, maxW, 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(BERRY[0], BERRY[1], BERRY[2]);
    y = wrap(doc, `${raw.wall} · ${raw.massif}`, left, y + 3, maxW, 5.5);

    doc.setTextColor(INK[0], INK[1], INK[2]);
    doc.setFontSize(9);
    const facts = [
      [`${ui.grade}`, raw.grade],
      [`${ui.pitchesH}`, raw.pitches],
      [`${ui.aspect}`, raw.aspect],
      [`${ui.protection}`, (ui.prot && ui.prot[raw.protection]) || raw.protection],
      [`${ui.driveFrom}`, raw.drive],
      [`${ui.via}`, r.via || raw.via]
    ];
    y += 6;
    facts.forEach(([k, v]) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text(String(k).toUpperCase(), left, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(INK[0], INK[1], INK[2]);
      y = wrap(doc, v, left + 42, y, maxW - 42, 4.4);
      y += 2.2;
    });

    const blocks = [
      [ui.why, r.why],
      [ui.gradeNote, r.gradeNote],
      [ui.approach, r.approach],
      [ui.descent, r.descent],
      [ui.weekend, r.weekend],
      [ui.protection, r.protectionNote],
      [ui.also, r.neighbor]
    ];
    blocks.forEach(([title, body]) => {
      if (!body) return;
      y = ensure(doc, y, 16);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(BERRY[0], BERRY[1], BERRY[2]);
      y += 4;
      doc.text(String(title).toUpperCase(), left, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(INK[0], INK[1], INK[2]);
      y = wrap(doc, body, left, y, maxW, 4.4);
    });

    y = ensure(doc, y, 16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(BERRY[0], BERRY[1], BERRY[2]);
    y += 5;
    doc.text(String(ui.gear).toUpperCase(), left, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    (r.gear || raw.gear || []).forEach((g) => {
      y = ensure(doc, y, 6);
      y = wrap(doc, "• " + g, left, y, maxW, 4.4);
    });

    y = ensure(doc, y, 16);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(BERRY[0], BERRY[1], BERRY[2]);
    y += 5;
    doc.text(String(ui.dont).toUpperCase(), left, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(INK[0], INK[1], INK[2]);
    (r.dont || []).forEach((d) => {
      y = ensure(doc, y, 6);
      y = wrap(doc, "• " + d, left, y, maxW, 4.4);
    });

    if (beta) {
      doc.addPage();
      y = 18;
      doc.setFillColor(BERRY[0], BERRY[1], BERRY[2]);
      doc.rect(0, 0, pageW, 14, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(ui.fullRoute, 16, 9);
      y = 22;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(INK[0], INK[1], INK[2]);
      y = wrap(doc, beta.overview[lang] || beta.overview.en, left, y, maxW, 4.4);
      y += 4;
      doc.setFontSize(8);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      y = wrap(doc, (ui.betaSource || "Sources") + ": " + beta.sources, left, y, maxW, 3.8);
      y += 4;
      (beta.pitches || []).forEach((p) => {
        const body = p[lang] || p.en;
        y = ensure(doc, y, 16);
        doc.setFillColor(255, 228, 234);
        doc.roundedRect(left, y - 3.5, maxW, 7, 1.5, 1.5, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(BERRY[0], BERRY[1], BERRY[2]);
        const label = `${ui.pitch} ${p.n}` + (p.grade ? `  ·  ${p.grade}` : "") + (p.m ? `  ·  ${p.m} m` : "");
        doc.text(label, left + 2, y + 1);
        y += 8;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(INK[0], INK[1], INK[2]);
        y = wrap(doc, body, left, y, maxW, 4.3);
        y += 3;
      });
    }

    doc.addPage();
    doc.setFillColor(BERRY[0], BERRY[1], BERRY[2]);
    doc.rect(0, 0, pageW, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(ui.topo, 16, 9);
    if (topo) {
      const boxW = 178;
      const boxH = 230;
      const scale = Math.min(boxW / (topo.w * 0.26458), boxH / (topo.h * 0.26458), boxW / 80);
      const mmW = Math.min(boxW, topo.w * 0.084);
      const mmH = mmW * (topo.h / topo.w);
      const drawW = Math.min(boxW, mmW);
      const drawH = drawW * (topo.h / topo.w);
      const fitH = Math.min(drawH, boxH);
      const fitW = fitH * (topo.w / topo.h);
      doc.addImage(topo.data, topo.type, (pageW - fitW) / 2, 22, fitW, fitH, undefined, "FAST");
    } else {
      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.text(ui.noTopo, 16, 30);
    }
    if (!topo) {
      doc.setFontSize(8);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text(ui.noTopo || "", 16, 276, { maxWidth: maxW });
    }

    const pages = doc.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(MUTED[0], MUTED[1], MUTED[2]);
      doc.text("Strawberry Express  ·  " + raw.name + "  ·  " + i + "/" + pages, 16, 291);
      doc.setFillColor(LEAF[0], LEAF[1], LEAF[2]);
      doc.rect(0, 294, pageW, 3, "F");
    }

    const slug = raw.name.replace(/[^\w]+/g, "-").replace(/^-|-$/g, "");
    doc.save(`Strawberry-Express-${slug}.pdf`);
  };
})();
