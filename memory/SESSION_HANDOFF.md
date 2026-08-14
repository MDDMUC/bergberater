# Session handoff

**Current focus:** Heat weekend **Sat 15 + Sun 16 August 2026**. Home **Bad Tölz**. Grade lock: max UIAA 6, only a few pitches at 6. Recommendations: **max 10 pitches**.

## Tell the user first

Default pair (after the 10-pitch lock):

- **Saturday:** Rotspitz *Hosentöter* (true north, 5b, 3 pitches, ~50 min). Easier: *Nebelgespenst* (5 × 4).
- **Sunday:** Buchstein *Nordkante* (3 pitches, 5, 35 min). Abort by 13:00.
- **Your pick (landing tile):** Alpspitze *Dacherl Weg* — user-selected, star icon. Grade/pitches not locked from a public topo.

Kaiser *Nordwandliebe* and Kampenwand stay in the pool but are no closer than from Munich.

6+ lines (*Tirol Plaisir*, *Alpspitz-Plaisir*, *Möwe Jonathan*) stay as **over grade**.

Site: https://strawberry-express.vercel.app — **101 routes**, home shows **top matches by %** plus pinned user picks. Favorites: Martin / Antonia via `/api/picks` + Vercel Blob.

## Topos

bergsteigen.com drawn topos are **BERGSTEIGEN PRO** blurs. Do not show them.

Public replacements are wired (geiselstein, Stadler). Nodlsuppn uses the Wetterstein Bergführer public PDF drawing. If no honest public topo exists, the tile is empty.

**Coverage (before Dacherl):** 56 / 100 had a tile. Nodlsuppn now has one. Nebelgespenst and Buchstein Nordkante still empty.

Blocklist: `web/media-map.js` → `PAYWALL_BLUR` + `resolveMedia`.

## User-selected routes

Flag: `userSelected: true` on the route object. Renders a leaf-green star on the landing pair, list cards, and detail title. Always pinned to the top of the list. Current: `dacherl-weg` only.

## If they message next

1. Confirm live after deploy — Nodlsuppn tile, Dacherl landing star, Rampen-Rippe / Ostler / Silenzio / BW3 still sharp.
2. Lock Dacherl Weg grade + pitches if they have a book.
3. Confirm lead grade — it splits Seebenwände / Alpspitz-Plaisir vs BW3 / Geiselstein / Hosentöter.
4. Re-check Sunday morning weather. Alpspitze: last Bahn, B13 / Walchensee.

## Do not

- Rank from Munich.
- Show a bergsteigen paywall blur as a topo.
- Invent a Dacherl pitch list.
- Put a Benediktenwand overview on Buchstein / Brauneck / compact cards.
- Suggest Leonhardstein, Ruchenköpfe, Steinplatte, Geierwand Haiming, Guffert south, or Hörndlwand (1:54) for this heat.
- Call Adamplatte or Benediktenwand classics "well protected sport."
- Copy paid guidebook topos into the repo.
