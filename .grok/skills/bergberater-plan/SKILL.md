---
name: bergberater-plan
description: >
  Build a ranked day or weekend climbing brief from Munich. Weather plus
  destinations plus named routes. Use when the user wants a weekend plan,
  top picks, itinerary, or runs /bergberater-plan.
---

# /bergberater-plan — Trip brief

## Steps

1. Read `knowledge/WEEKEND-PROTOCOL.md` and `templates/trip.md`.
2. Confirm dates, constraints (aspect, grade, drive, protection) from the user + `profile/climber.md`.
3. Run the weather check (same steps as `/bergberater-weather`) if the trip is soon.
4. Filter `destinations/INDEX.md`; open area files for the shortlist.
5. Rank **for these dates**, not "best walls forever."
6. Write `trips/YYYY-MM-DD-<slug>.md` with:
   - Weather block + lookup date
   - Ranked picks (primary + backups)
   - Named route per pick
   - Protection label
   - Abort rule
   - Pack notes (water, last lift, 60 m vs doubles)
7. Chat: lead with the pick and the abort rule, then the table.

## Pairing rule

- Stable day = longer / higher / more alpine.
- Storm day = shorter, preferably **east** of Munich if the front comes from the west.
- Heat = N / NW / NE only.

## Do not

- Dump ten areas without a default Sat/Sun pair
- Hide assumed grades
- Recommend a south face "because it's classic" on a heat weekend
