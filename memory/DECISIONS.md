# Decisions — Strawberry Express

Locks. Do not contradict without an explicit user override.

## 2026-08-14 — Brand

- Product name: **Strawberry Express** (not Bergberater).
- Repo / Vercel slug stays `bergberater` so deploys do not break.
- Logo: laughing strawberry. CTA: neon leaf green `#c8ff3a`.

## 2026-08-14 — Project shape

- Markdown + skills assistant **and** a public site.
- Home **Bad Tölz** (corrected 2026-08-14 — the first lock said Munich and was wrong). Default radius **~2 hours drive**.
- Chat in English unless asked for German.
- **Live-first** for weather, lifts, dryness, current bolts/grades.
- **No copied topos** from paid guidebooks.

## 2026-08-14 — Planning filters (user)

- Multi-pitch over single-pitch.
- Well protected (plaisir / sport) over adventure.
- **North / NW / NE** when it is hot.
- Moderate difficulty: **max UIAA 6**, and only a few pitches at 6 (locked 2026-08-14).
- 6+ / 7− obligatory lines stay in the catalog but are labeled **over grade** and must not be the default pick.
- Shade > length > summit.

## 2026-08-14 — Honesty labels

- `plaisir` = modern bolts, rappel-ready stands, no mandatory trad.
- `alpine` = mixed or runout, route-finding, maybe a small rack.
- `via-ferrata` = not a multi-pitch sport answer.
- South / SW / SE faces are **rejects** on heat weekends, even if famous.

## 2026-08-14 — Weekend pairing rule

- Bigger / higher / more alpine day on the **stable** day (here: Saturday).
- **Sunday** = **short / morning**. Prefer east of Tölz if storms come from the west. New default: Buchstein Nordkante (35 min), not Kampenwand.

## 2026-08-14 — Origin is Bad Tölz

- The first 30-route set was measured from **Munich**. That was wrong.
- Recast from Bad Tölz (OSRM 2026-08-14). Benediktenwand −46 min, Rofan/Achenpass −46 min, Buchstein −22 min. Kaiser/Kampenwand unchanged.
- **Sat default:** Rampen-Rippe (Benediktenwand). **Sun default:** Buchstein Nordkante.
- Hörndlwand (~1:54) dropped from the 30. Do not rank from Munich again.

## 2026-08-14 — 100-route pool, show top matches

- Catalog is **100** named options from Bad Tölz.
- Home list shows only the **top 12** by match % to the locked parameters (north/shade, max UIAA 6, well-protected multi-pitch, ≤2 h).
- Saturday / Sunday / Due north chips re-rank that slice. **All 100** is explicit browse.
- Over-grade lines stay in the pool and score low. They are not in Top matches.

## 2026-08-14 — Max 10 pitches

- No **recommendation** may have more than **10 pitches**. Locked.
- Longer classics (Rampen-Rippe 13, Ostler 16, Nordwandliebe ~14, Silenzio 15, Herzogweg 17, Höllentorkopf 14) stay in All 100, tagged **Over 10 pitches**.
- **Sat default** is now *Hosentöter* (3 pitches). *Rampen-Rippe* is too long for the new lock.

## 2026-08-14 — E-bike + parking GPS

- Each route has a **recommended parking lot** and a **route-start** GPS (hub-shared by wall).
- Two Maps buttons: drive to parking, walk/navigate to route start.
- E-bike is scored when a forest road cuts a long walk (Benediktenwand, Buchstein, Plankenstein, Ferchensee, Geiselstein, Kaiser hut, Gramai). Bahn approaches get no bonus.
- Badge **E-bike cuts the walk** on cards that save ~20+ minutes.

## 2026-08-14 — No paywalled bergsteigen topos

- bergsteigen.com drawn topos are now **BERGSTEIGEN PRO** blurs. Do not show them.
- If the only stored topo is that blur, use a **public wall overview** from another source (geiselstein.com, Stadler, Climbers Paradise, Deichjodler). Never invent a pitch-by-pitch drawing.
- If no honest public topo exists for that wall, show **no topo** rather than a blur or the wrong mountain.
- Blocklist lives in `web/media-map.js` (`PAYWALL_BLUR` + `resolveMedia`).
