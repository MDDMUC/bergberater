"""OSRM drive times from Bad Tölz vs Munich to alpine trailheads."""
import json
import time
import urllib.request

MUC = (11.5755, 48.1374)
TOELZ = (11.5589, 47.7611)

PTS = {
    "Benediktenwand Jachenau P": (11.4335, 47.6068),
    "Tutzinger Huette road": (11.4656, 47.6528),
    "Lenggries Brauneckbahn": (11.5738, 47.6806),
    "Alpspitzbahn Garmisch": (11.0498, 47.4512),
    "Mittenwald Ferchensee": (11.2550, 47.4400),
    "Halblech Geiselstein": (10.8250, 47.6300),
    "Ehrwald Seeben": (10.9170, 47.4000),
    "Maurach Rofanbahn": (11.7580, 47.4300),
    "Steinberg Guffert": (11.7850, 47.5150),
    "Aschau Kampenwand": (12.3230, 47.7650),
    "Kufstein Kaiserlift": (12.1700, 47.5900),
    "Sparchen Kufstein": (12.1870, 47.5926),
    "Vorderkaiserfelden": (12.2186, 47.5984),
    "Ruhpolding Seehaus": (12.6080, 47.7160),
    "Kreuth Rossstein": (11.7450, 47.6400),
    "Tegernsee Predigtstuhl": (11.7580, 47.7120),
    "Vorderriss Karwendel": (11.4350, 47.5580),
    "Kruen Soiern": (11.2790, 47.5050),
    "Kochel Herzogstand": (11.3680, 47.6530),
    "Walchensee Jochberg": (11.3450, 47.5950),
    "Bayrischzell Wendelstein": (12.0150, 47.6750),
    "Spitzingsee Rotwand": (11.8880, 47.6650),
    "Schwangau Tegelberg": (10.7560, 47.5700),
    "Untersberg Berchtesgaden": (12.9730, 47.6300),
    "Ellmau Wilder Kaiser": (12.3030, 47.5130),
    "Achenkirch Unnuetz": (11.7060, 47.5270),
    "Pertisau Karwendel": (11.6950, 47.4400),
    "Mittenwald Karwendelbahn": (11.2760, 47.4300),
    "Grainau Höllental": (11.0240, 47.4750),
    "Oberammergau Laber": (11.0640, 47.5970),
}


def mins(origin, dest):
    url = (
        "http://router.project-osrm.org/route/v1/driving/"
        f"{origin[0]},{origin[1]};{dest[0]},{dest[1]}?overview=false"
    )
    try:
        with urllib.request.urlopen(url, timeout=25) as r:
            data = json.loads(r.read().decode())
        if data.get("code") != "Ok":
            return None
        sec = data["routes"][0]["duration"]
        km = data["routes"][0]["distance"] / 1000
        return sec / 60.0, km
    except Exception as exc:
        return str(exc)


print(f"{'area':36} {'Tölz':>9} {'Munich':>9} {'Δmin':>7} {'km T':>6}")
rows = []
for name, dest in PTS.items():
    t = mins(TOELZ, dest)
    time.sleep(0.2)
    m = mins(MUC, dest)
    time.sleep(0.2)
    if isinstance(t, tuple) and isinstance(m, tuple):
        delta = t[0] - m[0]
        print(f"{name:36} {t[0]:6.0f} min {m[0]:6.0f} min {delta:+6.0f} {t[1]:6.0f}")
        rows.append((name, t[0], m[0], delta, t[1]))
    else:
        print(name, "FAIL", t, m)

print("\n--- sorted by Tölz time ---")
for name, t, m, d, km in sorted(rows, key=lambda x: x[1]):
    print(f"{t:5.0f} min  {name:36}  (Munich {m:4.0f}, Δ{d:+.0f}, {km:.0f} km)")
