# Session Protocol — READ FIRST

> **Rule #1 for every assistant, every session.** Read this file before any Bergberater work.  
> Do not skip even if the user jumps straight into "where should we go."

---

## 1. Session START (mandatory read order)

Read these **in order** before deep answers or file writes:

| Step | File | Why |
|------|------|-----|
| 1 | **This file** (`memory/SESSION_PROTOCOL.md`) | How we work |
| 2 | [`SESSION_LOG.md`](SESSION_LOG.md) | Recent sessions — last 3–5 entries |
| 3 | [`SESSION_HANDOFF.md`](SESSION_HANDOFF.md) | Current focus — where we left off |
| 4 | [`PROJECT.md`](../PROJECT.md) | Hub + folder map |
| 5 | [`PROJECT_MEMORY.md`](PROJECT_MEMORY.md) | Durable project state |
| 6 | [`DECISIONS.md`](DECISIONS.md) | Locks — never contradict |
| 7 | [`profile/climber.md`](../profile/climber.md) | Home, grades, gear |
| 8 | [`destinations/INDEX.md`](../destinations/INDEX.md) | Areas we track |

**Then by task type:**

| Task | Also read / do |
|------|----------------|
| Where to go | `knowledge/ASPECT-AND-HEAT.md`, `DRIVE-TIMES.md`; live weather if trip is soon |
| Weather | `knowledge/WEEKEND-PROTOCOL.md`; live DAV + bergfex / DWD |
| Named routes | `routes/` card + area file + live theCrag / bergsteigen / Climbers Paradise |
| Weekend brief | `knowledge/WEEKEND-PROTOCOL.md` + `templates/trip.md` |
| Safety call | `knowledge/SAFETY.md` |

**Then load skill:** `/bergberater` or the task-specific skill from `AGENTS.md`.

Also search Grok memory for "bergberater", destination names, trip dates if memory tools are available.

---

## 2. Current project state (pointers)

Do not guess — read live files:

| Area | Status file |
|------|-------------|
| Who we plan for | `profile/climber.md` |
| Areas we track | `destinations/INDEX.md` |
| Open focus | `SESSION_HANDOFF.md` |
| Locked prefs | `DECISIONS.md` |
| Written briefs | `trips/` |

---

## 3. How we do things

### Trip brief

```
User asks where to climb / "this weekend"
  → read profile (grade, gear, drive, aspect)
  → live weather if dates are within a few days
  → filter destinations/INDEX.md
  → pick 1 primary + 1–2 backups with named routes
  → label each line plaisir vs alpine
  → write trips/YYYY-MM-DD-<slug>.md
  → give abort rule (storms, last lift, heat)
```

Never recommend a south face for a declared heat weekend.

### Live-first facts

Weather, lift hours, "is it dry", and current route grades/bolts come from the web on the day. Dated snapshots in the trip file are orientation, not truth next month.

### Memory dual-write

When something durable changes (grades, gear, home, "never again" areas):

1. Update repo memory files (`profile/climber.md`, `PROJECT_MEMORY.md`, `DECISIONS.md`)
2. Update Grok memory if tools available
3. Mention briefly in session end log

---

## 4. Session END (mandatory)

Before ending (user says bye / "that's all" / long idle with completed work):

1. **Append** a short entry to [`SESSION_LOG.md`](SESSION_LOG.md):
   - Date
   - What we did
   - Trip briefs written
   - Open threads
2. **Rewrite** [`SESSION_HANDOFF.md`](SESSION_HANDOFF.md) so the next session knows current focus
3. Update [`PROJECT_MEMORY.md`](PROJECT_MEMORY.md) if durable state changed
4. Update [`DECISIONS.md`](DECISIONS.md) if something was locked

Do not skip the handoff rewrite even for short sessions that changed focus.

---

## 5. Safety & honesty

- Never invent protection quality or call an alpine classic "well bolted"
- Never copy guidebook topos into the repo
- Abort-friendly: say when Sunday storms or last gondola make a plan dumb
- If grade is only assumed, say so in the recommendation
