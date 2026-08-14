# Strawberry Express — design system

Soft, modern, feminine. Sans-serif. Built so a girlfriend can browse weekend walls without feeling like she opened a DAV PDF.

## Voice

Cute and clear. Short labels. No alpine-bro tone. The strawberry laughs; the copy can smile, but grades stay honest.

## Logo

Laughing strawberry with neon-leaf calyx.

- App / header: `web/assets/logo.jpg`
- Squarer icon variant: `web/assets/icon.jpg`

Wordmark is **STRAWBERRY / EXPRESS** in Titan One, all caps, cream outline, berry gradient fill, leaf-neon fill on EXPRESS. Built in CSS (not a generated image) so the spelling stays exact. Lives in the site header next to the icon.

## Color

| Role | Token | Hex | Use |
|------|--------|-----|-----|
| Berry | `--berry-500` | `#e4456f` | Brand, ranks, Saturday |
| Blush | `--berry-50` / `--berry-100` | cream-pink | Canvas tints, chips |
| Cream | `--cream-100` | `#fff7f3` | Page background |
| Ink | `--ink-900` | `#2a2123` | Text |
| **Leaf neon** | `--leaf-400` | `#c8ff3a` | **CTA, selected filters, “go”** |
| Leaf ink | `--leaf-ink` | `#243000` | Text on neon |

Neon green is the only loud color. Berry is warm, not alarm-red. Over-grade uses berry-600, not traffic orange.

## Type

**Plus Jakarta Sans** for everything UI. IBM Plex Mono only for tiny meta (grades, drive times).

- Display: 600–700, tight tracking
- Body: 500, 16–17px, comfortable line-height
- No serifs on the site

## Shape

Large radii (`20–28px` cards, pill chips). Soft berry-tinted shadows. Plenty of air. Cards lift on hover; they do not go hard-edged or military.

## Components

- **Wordmark:** logo + “Strawberry Express”
- **CTA / selected chip:** neon fill, dark leaf ink
- **Route card:** white, blush rank, berry tags, green “open” cue
- **Default pair:** two blush tiles, neon kicker

Tokens live in `tokens.css`. The live site imports them from `web/styles.css`.

## Map & language

- Overview map: Leaflet + OSM, berry dots, same filters as the list.
- EN/DE toggle in the header. Choice stays in `localStorage`.
