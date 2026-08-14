---
name: bergberater-weather
description: >
  Live mountain weather and conditions for climbing days from Bad Tölz.
  Heat, thunderstorms, DAV Bergbericht, bergfex, DWD. Use when the user
  asks if this weekend is go, storms, heat, conditions, or runs
  /bergberater-weather.
---

# /bergberater-weather — Live conditions

## Steps

1. Read `knowledge/WEEKEND-PROTOCOL.md` and `knowledge/SAFETY.md`.
2. **Live lookup (required):**
   - DAV Bergbericht for the weekend
   - Regional forecast: bergfex or DWD for the candidate valleys (not only Munich city)
   - If using a lift: operator hours / last descent
3. Report:
   - Sat / Sun (or the asked dates): sun, max temp valley + relevant summit, storm timing, wind
   - Zero-degree line / snow only if it matters (usually not in August foothills)
   - **Planning implication:** which day is the long day; whether to stay east; abort hour
4. Date every source. Write a weather block into the trip file if one exists or is being written.

## Output shape

```
### Weather (lookup DATE)
Sat: …
Sun: …
Implication: long day = …; Sunday = east/short; abort if …
Sources: …
```

## Do not

- Use yesterday's trip file as this week's forecast
- Send a long alpine day on the storm day
- Ignore last-gondola when the pick uses a Bahn
