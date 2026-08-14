# Bergberater

Personal climbing trip planner from **Munich**. Multi-pitch first. Weather and aspect before romance.

## Quick start (for the human)

1. Open this folder in Grok Build.
2. Say **`/bergberater`** for status and the current weekend focus.
3. Ask for a trip: dates, grade, shade, drive time, protection.
4. Correct `profile/climber.md` if the assumed grades or gear are wrong.

## Quick start (for the assistant)

Read `AGENTS.md` → follow `memory/SESSION_PROTOCOL.md` session start → load `/bergberater`.

## Skills

| Slash | Use for |
|-------|---------|
| `/bergberater` | Orient / what next |
| `/bergberater-destinations` | Where to go |
| `/bergberater-weather` | Heat, storms, conditions |
| `/bergberater-routes` | Named lines, bolts, grades |
| `/bergberater-plan` | Weekend / day brief |

## This weekend (seeded 2026-08-14)

Heat spike. Saturday stable, Sunday storms from the afternoon.

**Default pick:** Saturday **Scheffauer *Nordwandliebe*** (true north, UIAA 5−). Sunday **Kampenwand Nordwand** (2 pitches, 5−). Grade lock: max UIAA 6.

Full ranking: [`routes/INDEX.md`](routes/INDEX.md).  
Weekend brief: [`trips/2026-08-15-heat-weekend.md`](trips/2026-08-15-heat-weekend.md).  
Site: [`web/`](web/) — `python -m http.server 8765` then open http://127.0.0.1:8765/web/

Repo: https://github.com/MDDMUC/bergberater

## Deploy

Static site in `web/`. Vercel `outputDirectory` is `web` (see `vercel.json`). Production deploys from `main`.
