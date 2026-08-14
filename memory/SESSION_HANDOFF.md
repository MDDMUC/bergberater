# Session handoff

**Current focus:** Heat weekend **Sat 15 + Sun 16 August 2026**. Home **Bad Tölz**. Grade lock: max UIAA 6, only a few pitches at 6. Recommendations: **max 10 pitches**.

## Tell the user first

Default pair (after the 10-pitch lock):

- **Saturday:** Rotspitz *Hosentöter* (true north, 5b, 3 pitches, ~50 min). Easier: *Nebelgespenst* (5 × 4).
- **Sunday:** Buchstein *Nordkante* (3 pitches, 5, 35 min). Abort by 13:00.

Kaiser *Nordwandliebe* and Kampenwand stay in the pool but are no closer than from Munich.

6+ lines (*Tirol Plaisir*, *Alpspitz-Plaisir*, *Möwe Jonathan*) stay as **over grade**.

Site: https://strawberry-express.vercel.app — **100 routes**, home shows **top 12 by match %**. After the paywall-topo commit, Vercel should pick up the new images automatically.

Favorites: Martin / Antonia via `/api/picks` + Vercel Blob.

## Topos

bergsteigen.com drawn topos are **BERGSTEIGEN PRO** blurs. Do not show them.

Public replacements are wired (geiselstein wall overviews, Stadler line photos). If no honest public topo exists for that wall, the tile is empty.

Blocklist: `web/media-map.js` → `PAYWALL_BLUR` + `resolveMedia`. Still no public drawing for **Buchstein Nordkante** or **Nebelgespenst** (Wetterstein PNG 403). Do not invent one.

## If they message next

1. Confirm the live site after deploy — open Rampen-Rippe, Ostler, Silenzio, BW3 and check the tiles are sharp.
2. Confirm lead grade — it splits Seebenwände / Alpspitz-Plaisir vs BW3 / Geiselstein / Hosentöter.
3. Re-check Sunday morning weather (DAV + bergfex Benediktenwand vs Buchstein vs Kaiser).
4. If they pick Alpspitze: last Alpspitzbahn descent. Drive via B13 / Walchensee.

## Do not

- Rank from Munich.
- Show a bergsteigen paywall blur as a topo.
- Put a Benediktenwand overview on Buchstein / Brauneck / compact cards.
- Suggest Leonhardstein, Ruchenköpfe, Steinplatte, Geierwand Haiming, Guffert south, or Hörndlwand (1:54) for this heat.
- Call Adamplatte or Benediktenwand classics "well protected sport."
- Copy paid guidebook topos into the repo.
