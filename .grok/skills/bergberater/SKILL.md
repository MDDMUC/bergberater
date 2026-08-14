---
name: bergberater
description: >
  Orient and route work in Strawberry Express, the Munich climbing trip planner.
  Use when the user asks for status, what to do next, onboarding, "where
  should we climb", or runs /bergberater. Reads session protocol, handoff,
  and profile; points to destinations, weather, routes, or plan skills.
---

# /bergberater — Project orient

## Steps

1. Read `memory/SESSION_PROTOCOL.md`, `memory/SESSION_HANDOFF.md`, last entries of `memory/SESSION_LOG.md`, `memory/PROJECT_MEMORY.md`, `memory/DECISIONS.md`, `profile/climber.md`, and `destinations/INDEX.md`.
2. Summarize in chat (short):
   - Home / radius / assumed vs confirmed grades
   - Current focus from handoff
   - Latest trip file if any
   - Open threads
3. Route:
   - Dates + "where" / weekend → `/bergberater-weather` then `/bergberater-plan`
   - Filter areas only → `/bergberater-destinations`
   - Named route / bolts / grade → `/bergberater-routes`
   - Heat / storms / "is it safe" → `/bergberater-weather`
4. If user is ending the session, run the Session END checklist from `SESSION_PROTOCOL.md`.

## Do not

- Skip the handoff / profile read
- Invent a lead grade; if assumed, say so
- Recommend a south face on a declared heat weekend
