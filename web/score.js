/* Match % against the locked selection parameters (Bad Tölz, heat
   weekend, max UIAA 6, north shade, well-protected multi-pitch). */
window.SELECTION = {
  home: "Bad Tölz",
  maxDriveMin: 120,
  sweetDriveMin: 40,
  maxGrade: 6,
  preferGradeLo: 4,
  preferGradeHi: 5.5,
  heat: true,
  topN: 12,
  weights: {
    aspect: 26,
    grade: 22,
    drive: 20,
    protection: 14,
    style: 13,
    day: 5
  }
};

(function () {
  const W = window.SELECTION.weights;

  function parseDriveMin(drive) {
    if (!drive) return 90;
    const nums = String(drive).match(/(\d+):(\d+)/g);
    if (!nums || !nums.length) return 90;
    const mins = nums.map((p) => {
      const [h, m] = p.split(":").map(Number);
      return h * 60 + m;
    });
    return mins.reduce((a, b) => a + b, 0) / mins.length;
  }

  function parseUiaa(grade) {
    if (!grade) return 5;
    const s = String(grade);
    const fr = s.match(/\b([4-8])([abc])\+?\b/i);
    if (fr && !/UIAA/i.test(s)) {
      const n = Number(fr[1]);
      const letter = fr[2].toLowerCase();
      const bump = letter === "a" ? 0 : letter === "b" ? 0.33 : 0.67;
      return n + bump + (s.includes("+") ? 0.15 : 0);
    }
    const parts = [...s.matchAll(/(\d)([+\-−])?/g)].map((m) => {
      const n = Number(m[1]);
      if (m[2] === "+") return n + 0.33;
      if (m[2] === "-" || m[2] === "−") return n - 0.33;
      return n;
    });
    if (!parts.length) return 5;
    return Math.max(...parts);
  }

  function parsePitches(pitches) {
    const s = String(pitches || "");
    const n = s.match(/(\d+)/);
    if (/scramble|hike|via.?ferrata|klettersteig/i.test(s)) return 1;
    if (n) return Number(n[1]);
    if (/several|lang|long/i.test(s)) return 8;
    if (/short|kurz/i.test(s)) return 2;
    return 4;
  }

  function parseHeight(pitches) {
    const m = String(pitches || "").match(/(\d{2,4})\s*m/i);
    return m ? Number(m[1]) : 0;
  }

  function aspectKey(aspect) {
    return String(aspect || "")
      .toUpperCase()
      .replace(/\s+/g, "")
      .replace(/NORD/g, "N")
      .replace(/OST/g, "E")
      .replace(/SÜD|SUED/g, "S")
      .replace(/WEST/g, "W");
  }

  function aspectScore(aspect) {
    const a = aspectKey(aspect);
    if (a === "N") return 100;
    if (a === "NW" || a === "NE" || a === "N/NE" || a === "N/NW") return 88;
    if (a.includes("N") && !a.includes("S")) return 80;
    if (a === "E" || a === "W") return 48;
    if (a === "MIXED" || a.includes("/")) return 42;
    if (a === "S" || a === "SW" || a === "SE" || a.includes("S")) return 8;
    return 40;
  }

  function gradeScore(r, uiaa) {
    if (r.overGrade === true) return 8;
    if (uiaa > window.SELECTION.maxGrade + 0.05) return 12;
    if (r.overGrade === "partial") return 55;
    const lo = window.SELECTION.preferGradeLo;
    const hi = window.SELECTION.preferGradeHi;
    if (uiaa >= lo && uiaa <= hi) return 100;
    if (uiaa < lo) return 78 - Math.min(24, (lo - uiaa) * 14);
    if (uiaa <= window.SELECTION.maxGrade) return 86 - (uiaa - hi) * 18;
    return 20;
  }

  function driveScore(min) {
    const cap = window.SELECTION.maxDriveMin;
    const sweet = window.SELECTION.sweetDriveMin;
    if (min <= sweet) return 100;
    if (min <= 70) return 100 - ((min - sweet) / (70 - sweet)) * 24;
    if (min <= cap) return Math.max(32, 76 - ((min - 70) / (cap - 70)) * 44);
    return Math.max(8, 28 - (min - cap) / 4);
  }

  function protScore(p) {
    const key = String(p || "").toLowerCase();
    if (key === "plaisir") return 100;
    if (key === "alpine-bolted") return 84;
    if (key === "plaisir + alpine") return 78;
    if (key === "mixed") return 56;
    if (key === "via-ferrata") return 18;
    if (key === "alpine") return 40;
    return 50;
  }

  function styleScore(r, pitchN) {
    if (String(r.protection).includes("via-ferrata")) return 10;
    if (pitchN >= 3) return 100;
    if (pitchN === 2) return 78;
    return 28;
  }

  function dayScore(r, pitchN, height) {
    const long = pitchN >= 8 || height >= 280;
    const short = pitchN <= 4 || (height > 0 && height <= 120);
    if (r.day === "sat") return long ? 100 : short ? 62 : 84;
    if (r.day === "sun") return short ? 100 : long ? 38 : 70;
    return 70;
  }

  function weighted(parts) {
    let sum = 0;
    let wsum = 0;
    Object.keys(W).forEach((k) => {
      sum += (parts[k] / 100) * W[k];
      wsum += W[k];
    });
    return Math.round((sum / wsum) * 100);
  }

  window.matchScore = function matchScore(r) {
    const min = r.driveMin || parseDriveMin(r.drive);
    const uiaa = r.gradeUiaa || parseUiaa(r.grade);
    const pitchN = parsePitches(r.pitches);
    const height = parseHeight(r.pitches);
    const parts = {
      aspect: aspectScore(r.aspect),
      grade: gradeScore(r, uiaa),
      drive: driveScore(min),
      protection: protScore(r.protection),
      style: styleScore(r, pitchN),
      day: dayScore(r, pitchN, height)
    };
    let total = weighted(parts);
    if (window.SELECTION.heat && aspectScore(r.aspect) <= 10) total = Math.min(total, 38);
    if (r.overGrade === true) total = Math.min(total, 42);
    return { total, parts, driveMin: Math.round(min), uiaa: Math.round(uiaa * 10) / 10, pitches: pitchN };
  };

  window.scoreAll = function scoreAll(routes) {
    return (routes || window.ROUTES)
      .map((r) => {
        const match = window.matchScore(r);
        return { r, match };
      })
      .sort((a, b) => b.match.total - a.match.total || (a.r.rank || 99) - (b.r.rank || 99));
  };
})();
