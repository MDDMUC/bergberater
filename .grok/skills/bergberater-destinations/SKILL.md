---
name: bergberater-destinations
description: >
  Filter climbing areas from Bad Tölz by drive time, aspect, grade, and
  protection. Use when the user asks where to go, wants a shortlist of
  crags or mountains, north-facing walls, or runs /bergberater-destinations.
---

# /bergberater-destinations — Filter areas

## Steps

1. Read `profile/climber.md` and `destinations/INDEX.md`.
2. Read `knowledge/ASPECT-AND-HEAT.md` and `knowledge/DRIVE-TIMES.md`.
3. Apply filters in order:
   - Drive ≤ stated radius (default 2 h). Flag anything over.
   - Aspect if heat or user asked shade: N / NW / NE only.
   - Protection: plaisir vs alpine vs via-ferrata (see `DECISIONS.md`).
   - Grade vs profile (honor **assumed** vs confirmed).
4. Open the matching `destinations/areas/<slug>.md` files for the shortlist.
5. Return 3–10 areas with: drive, aspect, protection label, why / why not, best day if weather is known.
6. If the trip is within a few days, say weather is still required (`/bergberater-weather`) before a go.

## Do not

- Promote a heat-reject area without saying it fails the shade filter
- Treat INDEX snapshots as live bolt/dryness truth
- Invent new areas without a live source and an area file
