# Strawberry Express — Project Hub

Local AI assistant and public site for **planning mountaineering and climbing days from Munich**. Cute name. Honest grades.

## Vision

```
You:  "hot weekend, north-facing multi-pitch, 2 hours, moderate"
  →  read profile (grades, gear, home)
  →  live weather + DAV conditions
  →  filter destinations (drive, aspect, protection, grade)
  →  named routes with honest bolt / alpine labels
  →  ranked weekend brief + abort rule
  →  remember what you climbed / rejected
```

## Primary goal

**Get the user on the right wall for the weather.** Shade and protection beat famous names.

## Defaults

| Field | Value |
|-------|-------|
| Home | Munich |
| Radius | ~2 hours drive |
| Style default | Multi-pitch sport / plaisir |
| Language | English in chat unless user asks German |
| Guidebooks | Cite; never paste topos |

## Folder map

| Path | Purpose |
|------|---------|
| `profile/` | Climber source of truth (home, grades, gear) |
| `destinations/` | Areas we track (`INDEX.md`, `areas/`) |
| `routes/` | One card per named line (`INDEX.md`, `01`–`10`) |
| `web/` | Public site (`index.html`, tokens, logo) |
| `design-system/` | Brand tokens, principles, logo |
| `trips/` | Dated weekend / day briefs |
| `knowledge/` | Method, resources, safety, drive times |
| `templates/` | Area + trip templates |
| `memory/` | Session protocol, handoff, decisions, project memory |
| `.grok/skills/` | Project skills (`/bergberater*`) |

## Skills

| Command | What it does |
|---------|----------------|
| `/bergberater` | Orient: status, next steps, routing |
| `/bergberater-destinations` | Filter areas by drive, aspect, grade, protection |
| `/bergberater-weather` | Live heat / storm / conditions check |
| `/bergberater-routes` | Named routes, grades, bolts, descent |
| `/bergberater-plan` | Ranked day or weekend brief |

## Setup status

See [`memory/PROJECT_MEMORY.md`](memory/PROJECT_MEMORY.md) and [`memory/SESSION_HANDOFF.md`](memory/SESSION_HANDOFF.md).

## Workflow (standard)

1. **Orient** — `/bergberater` (profile + handoff)
2. **Weather** — `/bergberater-weather` if the trip is soon
3. **Filter** — `/bergberater-destinations`
4. **Routes** — `/bergberater-routes` for the shortlist
5. **Brief** — `/bergberater-plan` → `trips/`
6. **After the trip** — note what was climbed, conditions, whether the pick was right

## Live resources (start here)

- [DAV Bergbericht](https://www.alpenverein.de)
- [bergfex](https://www.bergfex.de) / [DWD](https://www.dwd.de)
- [theCrag](https://www.thecrag.com)
- [Climbers Paradise Tirol](https://www.climbers-paradise.com)
- [bergsteigen.com](https://www.bergsteigen.com)
- [alpenvereinaktiv](https://www.alpenvereinaktiv.com)

Full index: [`knowledge/RESOURCES.md`](knowledge/RESOURCES.md).
