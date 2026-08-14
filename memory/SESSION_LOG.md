# Session log

## 2026-08-14 — Install + heat-weekend research

- Empty workspace. Scaffolded Bergberater after TradGearSale pattern.
- Researched north-facing, well-protected, moderate multi-pitch within ~2 h of Munich for Sat 15 / Sun 16 Aug 2026.
- Weather: heat spike (Sat ~33–35 °C, Sun ~32 °C); DAV: Sat stable, Sun afternoon storms, stay east and short.
- Seeded 10 destinations + 4 heat-rejects. Wrote `trips/2026-08-15-heat-weekend.md`.
- Default pair: Sat Seebenwände *Tirol Plaisir*; Sun morning Sparchen / Kufstein.
- Open: confirm lead grade; 60 m single vs doubles.

## 2026-08-14 — Public topos

- Collected free topo/map links for all 10 heat-weekend picks into `knowledge/TOPOS.md`.
- Geiselstein and Zahmer Kaiser have no complete free drawn topo; guidebook / photo reports only.

## 2026-08-14 — Route folder

- Added `routes/` with INDEX + 10 self-contained cards (approach, descent, gear, topo, weekend notes).

## 2026-08-14 — Local briefing site

- `web/` field-guide page with all 10 routes. Served at http://127.0.0.1:8765/web/

## 2026-08-14 — Grade lock + 10 more

- User: max UIAA 6, only a few pitches at 6.
- Added routes 11–20. Re-ranked all 20. Over-grade: Tirol Plaisir, Alpspitz-Plaisir, Möwe Jonathan.
- New default: Sat Nordwandliebe · Sun Kampenwand Nordwand.
- Site updated (Fits grade filter default).

## 2026-08-14 — GitHub repo

- Initialized local git in `C:\Users\heyma\bergberater`.
- Public repo: https://github.com/MDDMUC/bergberater
- Pushed `main` (`7f37a4a`). Vercel later.

## 2026-08-14 — Vercel

- Used existing Vercel CLI login `hello-6738` / team `mddmucs-projects` (hello@martindrexler.com).
- Linked GitHub `MDDMUC/bergberater`. Production: https://bergberater.vercel.app
- `vercel.json` sets `outputDirectory` to `web`. Pushes to `main` auto-deploy.

## 2026-08-14 — Strawberry Express

- Renamed product to **Strawberry Express**.
- Laughing strawberry logo in `web/assets/`.
- Design system: berry + neon leaf CTA, Plus Jakarta Sans.
- Site restyled. GitHub/Vercel slugs stay `bergberater` for URLs.

## 2026-08-14 — Paywalled bergsteigen topos

**Why:** Stored “topos” from bergsteigen.com are the red **BERGSTEIGEN PRO** preview — drawing fully blurred. User asked: when it is behind that paywall, find a different public topo for that route.

**Confirmed blur files (do not show):**
- `assets/topos/benediktenwand.jpg`, `assets/media/1b64a8879388.jpg` — Rampen-Rippe drawn topo
- `assets/topos/ostlerfuehre.png`, `assets/media/7b371f962a85.png` — Ostlerführe drawn topo
- `assets/topos/alpspitze.jpg`, `assets/media/18040dfe7358.jpg` — BW3 / Adamplatte drawn topo
- `assets/topos/silenzio.png` — Silenzio drawn topo
- `assets/media/a9d0ec593244.jpg` — Scheffauer overview, also paywall-blurred

Those files stay on disk so old URLs 404-cleanly, but they are on `PAYWALL_BLUR` and no route points at them.

**Replacements (public wall overviews, not stolen pitch-by-pitch drawings):**

| Route / family | New file | Source |
|---|---|---|
| Rampen-Rippe + Benediktenwand north (Maximiliansweg, Höhlenweg, Winklerführe, Meiser-Wülfert, Ostpfeiler, Kamine, Rotöhrl, Direkte Rippe) | `assets/topos/rampen-rippe-overview.jpg` | geiselstein.com — Rampe / Rippe / Direkte Rippe labeled |
| Lebe deinen Traum, Cavemen | `assets/topos/lebe-deinen-traum-wall.jpg` | geiselstein.com — line labeled on the hut wall |
| Ostlerführe | `assets/topos/ostler-overview.jpg` | Stadler — red line + green Widauersteig |
| Silenzio, Bumerang | `assets/media/f902c2b4a4b8.jpg` | Stadler — red + magenta |
| BW3, Adamplatte, KG-Weg, Nordwandgesicht | `assets/topos/alpspitze-overview.jpg` | geiselstein.com Alpspitze NO — those lines labeled |
| Südwandschmankerl | `assets/topos/buchstein-south-overview.jpg` | geiselstein.com south wall photo |

**No honest public drawn topo found — tile empty, not a blur, not the wrong mountain:**
- Nebelgespenst / Nodlsuppn — Wetterstein Bergführer PNG is 403. Photo only: `alpspitze-nordwand.jpg` (scenic, not a line topo).
- Buchstein Nordkante, Zauberrippe, Simplinella, Vronerl, Hühnerleiter, Westpfeiler, Zwergerlrutschbahn — hut page is text, no free drawing.
- Brauneck, Probstenwand, Leonhardstein, Soiern, and the compact 70–100 cards — they had been sharing the Benediktenwand blur as a placeholder. Now empty.

**Code:**
- `web/media-map.js` — remaps old bergsteigen blur URLs to the public files; `PAYWALL_BLUR` + `resolveMedia()`.
- `web/app.js` `localSrc` and `web/pdf.js` use `resolveMedia`, so a leftover path cannot render in the UI or the PDF.
- Data rewired in `data.js`, `extras.js`, `more.js` (`BENE`/`ALP` constants now point at the clear overviews), `beta.js`.

**Checked:** node walk of all 100 routes — none still resolve a blur as topo or photo.

**Trip briefs written:** none.

**Open after this:**
- Live Vercel still has the old images until this commit deploys.
- Still no public drawn topo for Buchstein Nordkante or Nebelgespenst.
- Do not invent pitch-by-pitch drawings to fill those gaps.

## 2026-08-14 — Topo coverage check

User asked if every route now has a topo. **No. 56 of 100 have a public image; 44 do not.**

**Have a tile:** named lines with a real public overview (Rampen-Rippe family, Hosentöter, BW3 / Adamplatte / KG-Weg, Ostler, Silenzio, Nordwandliebe, Kampenwand Nordwand, Höllentorkopf, Sparchen, Tirol Plaisir, Lebe deinen Traum, etc.). Some of those 56 share a *wall* photo, not a pitch-by-pitch drawing of that exact line.

**Empty on purpose:**
- Sunday default Buchstein Nordkante, plus Zauberrippe, Simplinella, Vronerl, Hühnerleiter, Roßstein Westpfeiler / Zwergerlrutschbahn
- Nebelgespenst, Nodlsuppn (Wetterstein PNG still 403)
- Brauneck, Probstenwand, Leonhardstein, Soiern
- Compact ranks 70–100 (used to inherit the Benediktenwand blur)

Pushed earlier as `128c0eb`. This entry is the inventory only.

## 2026-08-14 — Nodlsuppn topo + Dacherl Weg user pick

**Nodlsuppn:** User pointed at the Wetterstein Bergführer page, then the official PDF  
`https://wetterstein-bergfuehrer.de/wp-content/uploads/2023/08/alpspitze_nodlwand_nodlsuppn_topo.pdf`.  
Live site 403s this environment. Used the same public PDF from Common Crawl, extracted the drawing (`web/assets/topos/nodlsuppn-topo.jpg`). Not a bergsteigen paywall scrape — first-ascent party’s own free download.  
`topoPage` for Nodlsuppn is that PDF. **Topo page** link now shows under every route’s topo tile.

Nebelgespenst still has no stored drawing (Wetterstein PNG still 403).

**Dacherl Weg (Alpspitze):** added as `dacherl-weg`, `userSelected: true`.
- Landing pair grows a third tile with a leaf-green star: **Your pick** / **Eure Wahl**.
- Same star + pill on list cards; card has a lime outline.
- Pinned at the top of every filter so match % cannot bury it.
- No public UIAA split found under that name — card says confirm live. Same Osterfelder / Alpspitzbahn hub as BW3.

Catalog is now 101 named cards.

**Trip briefs written:** none.

**Open:**
- Confirm Dacherl Weg grade, pitches, bolts when the user has a guidebook.
- Nebelgespenst still empty.
- Unused leftover `adamplatte-zugang.jpg` committed with this batch because the user asked to ship everything uncommitted.
