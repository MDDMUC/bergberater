/* Extra routes 21–30, photos, and jam/crowd forecasts.
   Crowd = expected parties on the wall that day (1–5).
   Jam = chance the first pitches are occupied if you arrive ~10:00
   on the day we would send you. Forecast, not a live count. */

window.ROUTES = window.ROUTES.concat([
  {
    id: "rabnhoamat",
    rank: 21,
    overGrade: false,
    name: "Rabnhoamat",
    wall: "Obere Wettersteinspitze / Gamsanger",
    massif: "Wetterstein",
    day: "sat",
    dayLabel: "Sat · north 6−",
    drive: "1:30–1:45",
    via: "Mittenwald / Ferchensee",
    aspect: "N",
    grade: "UIAA 6−",
    gradeNote: "A few 6− bits; rest easier stepped wall. Fits the cap.",
    pitches: "~250 m",
    protection: "alpine-bolted",
    protectionNote: "Enough bolts; stands rappel-ready. Small nuts + slings useful.",
    why: "True north, well bolted alpine, lake swim after. Quieter than Osterfelder.",
    approach: "Bike toward Ferchensee/Schachen, depot ~1260 m, then 30 min into the kar. Or bus to Ferchensee + hike.",
    descent: "Rappel the route (60 m doubles).",
    gear: ["60 m double", "10 draws", "Small nuts", "Slings", "Helmet"],
    weekend: "Saturday. Combine with a dip in Ferchensee. Less Bahn-circus than Alpspitze.",
    dont: ["Treat the 6− as a gym 6− — it's alpine", "Leave the doubles at home"],
    neighbor: "Swim + hut food at Ferchensee / Lautersee.",
    topoPage: "https://www.bergsteigen.com/touren/klettern/rabnhoamat/",
    topoImg: "assets/media/6194a39bf3c6.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=14/47.435/11.256"
  },
  {
    id: "nodlsuppn",
    rank: 22,
    overGrade: false,
    name: "Nodlsuppn",
    wall: "Nodlwand / Alpspitze",
    massif: "Wetterstein",
    day: "sat",
    dayLabel: "Sat · high 6−",
    drive: "1:20–1:35",
    via: "Alpspitzbahn",
    aspect: "E",
    grade: "UIAA 6−",
    gradeNote: "5 short pitches, 6−. Harder sister of Nebelgespenst (4).",
    pitches: "5 / ~150 m",
    protection: "alpine-bolted",
    protectionNote: "Modern bolts, 60 m to rappel.",
    why: "Same cool high wall as Nebelgespenst, one notch harder, still under 6.",
    approach: "Osterfelderkopf, 15 min under the Nodlwand.",
    descent: "Rappel 60 m.",
    gear: ["60 m rope", "8 draws", "Helmet"],
    weekend: "Saturday. If 6− feels spicy, do Nebelgespenst instead.",
    dont: ["Sunday (Bahn + storms)", "Skip the 60 m rope"],
    neighbor: "Nebelgespenst is the 4 next door.",
    topoPage: "https://wetterstein-bergfuehrer.de/alpspitze-nodlwand-nodlsuppn/",
    topoImg: "assets/topos/alpspitze.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.427/11.051"
  },
  {
    id: "bumerang",
    rank: 23,
    overGrade: false,
    name: "Bumerang",
    wall: "Scheffauer Nordwand",
    massif: "Kaisergebirge",
    day: "sat",
    dayLabel: "Sat · 5 on the Ostlerplatte",
    drive: "1:30–1:45",
    via: "Kaindlhütte",
    aspect: "N",
    grade: "UIAA 5",
    gradeNote: "Variant through the arched crack on the Ostlerplatte, about 5. Rest like Ostler/Silenzio.",
    pitches: "joins Ostler upper pitches",
    protection: "alpine-bolted",
    protectionNote: "Old pins in the crack plus the Ostler bolt grid.",
    why: "Same north face, one nicer 5 on the famous slab, still under 6.",
    approach: "As Ostler / Silenzio. Climb into the Ostlerplatte and take the right-hand arched crack.",
    descent: "Widauersteig.",
    gear: ["50 m rope", "Draws", "Slings", "Helmet"],
    weekend: "Saturday. Good if Ostler feels too walking-heavy and you want one proper 5.",
    dont: ["Solo-wander onto the slab without the Ostler topo"],
    neighbor: "Silenzio and Ostler share the same exit.",
    topoPage: "https://www.stadler-markus.de/alpinklettern/wilder-kaiser/kletterroute/silenzio.html",
    topoImg: "assets/topos/silenzio.png",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=14/47.557/12.178"
  },
  {
    id: "schmid-mueller",
    rank: 24,
    overGrade: false,
    name: "Schmid/Müller",
    wall: "Rofanspitze Ostwand",
    massif: "Rofan / Achensee",
    day: "sat",
    dayLabel: "Sat · high east classic",
    drive: "1:30–1:50",
    via: "Rofanbahn",
    aspect: "E",
    grade: "UIAA 5",
    gradeNote: "First pitch often feels stiff 5; then mostly 2–4. About 4 pitches / 140 m.",
    pitches: "4 / ~140 m",
    protection: "mixed",
    protectionNote: "Sanierte, not plaisir. First pitch better bolted; then spaced.",
    why: "High, famous, moderate. Morning sun. Pair with Rotspitz Nord if you want shade after.",
    approach: "Rofanbahn, short walk to the east face.",
    descent: "Walk off or rap a bit lower in the shade.",
    gear: ["50–60 m rope", "Draws", "Nuts/friends", "Helmet"],
    weekend: "Saturday early. East wall cooks later.",
    dont: ["Call it plaisir", "Start at noon"],
    neighbor: "Hosentöter is the north shade option on Rotspitz.",
    topoPage: "https://www.bergsteigen.com/touren/klettern/rofanspitze-ostwand-schmidmueller/",
    topoImg: "assets/topos/rotspitz.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.447/11.764"
  },
  {
    id: "leuchsfuehre",
    rank: 25,
    overGrade: false,
    name: "Leuchsführe",
    wall: "Scheffauer Nordwand",
    massif: "Kaisergebirge",
    day: "sat",
    dayLabel: "Sat · old north 2–3",
    drive: "1:30–1:45",
    via: "Kaindlhütte",
    aspect: "N",
    grade: "UIAA 2–3",
    gradeNote: "Steep grass and schrofen. Almost no bolts. Serious for the grade.",
    pitches: "long alpine",
    protection: "alpine",
    protectionNote: "Two pins in the gully. Slings and nuts. Not a sport day.",
    why: "True north, easy climbing, historic. Only if you like old-school alpine, not bolts.",
    approach: "Kaindlhütte toward Großer Friedhof / Widauersteig, then the north face.",
    descent: "Widauersteig.",
    gear: ["50 m rope", "Slings", "Nuts", "Helmet"],
    weekend: "Saturday if you want solitude. Do not pick this for “well protected.”",
    dont: ["Do not treat UIAA 3 as gym 3", "No bolts-only party"],
    neighbor: "Ostlerführe is the bolted 4 on the same face.",
    topoPage: "https://www.alpenvereinaktiv.com/de/tour/scheffauer-nordwand-leuchsfuehre/102980180/",
    topoImg: "assets/topos/nordwandliebe.png",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=14/47.557/12.176"
  },
  {
    id: "kampen-ueberschreitung",
    rank: 26,
    overGrade: false,
    name: "Kampenwand-Überschreitung",
    wall: "Kampenwand ridge",
    massif: "Chiemgauer Alpen",
    day: "sun",
    dayLabel: "Sun · ridge classic",
    drive: "1:15–1:30",
    via: "Kampenwandbahn",
    aspect: "mixed",
    grade: "UIAA 3+ / 4+",
    gradeNote: "Easiest ridge 3+. With Torweg + NW-Verschneidung, 4+ obligatory. Not all north.",
    pitches: "long ridge, several short pitches",
    protection: "alpine",
    protectionNote: "Some bolts on classics; also walking and rappels. Not plaisir.",
    why: "Sunday-east, Bahn, famous. Mixed sun — go early. Grade fits.",
    approach: "Bahn to Bergstation, start west summit, eastbound.",
    descent: "East summit paths / Bahn.",
    gear: ["50–60 m rope", "Draws", "Slings", "Helmet"],
    weekend: "Sunday early, off by 13:00. Ridge is busy and mixed aspect.",
    dont: ["Expect all-day north shade", "Treat it as sport multi-pitch"],
    neighbor: "Nordgipfel Nordwand is the short true-north alternative.",
    topoPage: "https://www.bergsteigen.com/touren/klettern/kampenwand-ueberschreitung/",
    topoImg: "assets/topos/kampenwand.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.754/12.367"
  },
  {
    id: "multerkar-abenteurer",
    rank: 27,
    overGrade: false,
    name: "Tour für Abenteurer",
    wall: "Multerkarwand / Treffauer",
    massif: "Kaisergebirge",
    day: "sun",
    dayLabel: "Sun east · 6",
    drive: "1:30–1:45",
    via: "Scheffau / Jägerwirt, bike possible",
    aspect: "SW / W",
    grade: "UIAA 6 (5+/6− obl.)",
    gradeNote: "At the cap. A few harder bits, rest easier. Well bolted.",
    pitches: "several / ~200 m+",
    protection: "plaisir",
    protectionNote: "Good bolts. Rappel 50 m + 20 m.",
    why: "Kaiser east for Sunday. Bolted. SW — not a heat-shade pick; start very early or skip if you need north.",
    approach: "1–1.5 h from Jägerwirt / Hochalm. e-bike friendly.",
    descent: "Rappel the line.",
    gear: ["50 m rope", "12 draws", "Helmet"],
    weekend: "Sunday only if you accept sun. Better as a cool morning.",
    dont: ["Do not pick this for north shade", "Do not arrive at noon"],
    neighbor: "Multerkarwand has easier sport MSL in the 5s — check Climbers Paradise.",
    topoPage: "https://www.bergsteigen.com/touren/klettern/tour-fuer-abenteurer-multerkarwand/",
    topoImg: "assets/topos/nordwandliebe.png",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.555/12.205"
  },
  {
    id: "ellmauer-tor",
    rank: 28,
    overGrade: false,
    name: "Plaisir am Ellmauer Tor",
    wall: "Ellmauer Tor",
    massif: "Wilder Kaiser",
    day: "sun",
    dayLabel: "Sun · easy Kaiser",
    drive: "1:30–1:45",
    via: "Ellmau / Wochenbrunner Alm",
    aspect: "mixed",
    grade: "UIAA 3–4",
    gradeNote: "Mostly III; be solid in IV. Classic easy alpine.",
    pitches: "several",
    protection: "alpine",
    protectionNote: "Mixed; some bolts. Alpine sense required.",
    why: "Sunday-east, moderate, big scenery. Not a bolt grid.",
    approach: "Wochenbrunner Alm toward Gruttenhütte / Ellmauer Tor.",
    descent: "Marked alpine paths / hut.",
    gear: ["50 m rope", "Draws", "Slings", "Helmet"],
    weekend: "Sunday early. Popular hiking zone — start before the crowds.",
    dont: ["Do not treat III as a via ferrata", "Watch Sunday storms"],
    neighbor: "Gruttenhütte is the social hub.",
    topoPage: "https://www.via-ferrata.de/touren/gps/plaisir-kletterroute-ellmauer-tor-wilder-kaiser",
    topoImg: "assets/topos/nordwandliebe.png",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=14/47.567/12.303"
  },
  {
    id: "mitteldurchstieg",
    rank: 29,
    overGrade: false,
    name: "Mitteldurchstieg",
    wall: "Rotspitz Südwand",
    massif: "Rofan / Achensee",
    day: "sat",
    dayLabel: "Sat · high 4b · south",
    drive: "1:30–1:50",
    via: "Rofanbahn",
    aspect: "S",
    grade: "UIAA 4b / 4a obl.",
    gradeNote: "2 pitches, steep classic, retro-bolted. Easy grade, wrong aspect for heat.",
    pitches: "2 / 50 m",
    protection: "alpine-bolted",
    protectionNote: "Sanierte. Rappel or walk off.",
    why: "Only if you want a tiny high 4 after a north pitch. South — oven after 09:30.",
    approach: "Rofanbahn → Rotspitz south, 45 min.",
    descent: "Normalweg or rap the chimney 40 m.",
    gear: ["60 m double", "10 draws", "Helmet"],
    weekend: "Not a heat-weekend A-plan. 6:30 Munich if you insist.",
    dont: ["Do not pick this for shade", "Do not start late"],
    neighbor: "Hosentöter around the corner is the north line.",
    topoPage: "https://www.climbers-paradise.com/kletterregionen/achensee/mehrseillaengen/location/rotspitz/",
    topoImg: "assets/media/8ad570a58754.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.441/11.761"
  },
  {
    id: "nordwandgesicht",
    rank: 30,
    overGrade: false,
    name: "Nordwandgesicht",
    wall: "Alpspitze NO-Wand",
    massif: "Wetterstein",
    day: "sat",
    dayLabel: "Sat · high alpine 5",
    drive: "1:20–1:35",
    via: "Alpspitzbahn",
    aspect: "NE",
    grade: "UIAA 5",
    gradeNote: "Neighbor of Adamplatte. Mixed bolts; alpine in the easy bits.",
    pitches: "several, then terrain to the summit slabs",
    protection: "mixed",
    protectionNote: "Better than old Adamplatte, not Alpspitz-Plaisir tight.",
    why: "High, NE, moderate. Use if BW3 is queued and you still want this face.",
    approach: "Osterfelderkopf, Nordwandsteig.",
    descent: "Ostgrat + Nordwandsteig. Last Bahn 17:30.",
    gear: ["60 m rope", "Draws", "Slings", "Small rack", "Helmet"],
    weekend: "Saturday. Same lift circus as BW3.",
    dont: ["Do not continue into runout summit slabs without alpine skills", "Miss the Bahn"],
    neighbor: "BW3 is the bolt-friendlier sockel.",
    topoPage: "https://www.faszination-hochtouren.de/alpspitze-no-wand-nordwandgesicht-und-adamplatte/",
    topoImg: "assets/topos/alpspitze.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.425/11.049"
  }
]);

Object.assign(window.ROUTE_COORDS, {
  rabnhoamat: { lat: 47.4398, lng: 11.2486 },
  nodlsuppn: { lat: 47.4274, lng: 11.0520 },
  bumerang: { lat: 47.5571, lng: 12.1804 },
  "schmid-mueller": { lat: 47.4468, lng: 11.7662 },
  leuchsfuehre: { lat: 47.5562, lng: 12.1752 },
  "kampen-ueberschreitung": { lat: 47.7534, lng: 12.3684 },
  "multerkar-abenteurer": { lat: 47.5553, lng: 12.2054 },
  "ellmauer-tor": { lat: 47.5668, lng: 12.3028 },
  mitteldurchstieg: { lat: 47.4412, lng: 11.7604 },
  nordwandgesicht: { lat: 47.4248, lng: 11.0476 }
});

window.ROUTE_PHOTOS = {
  nordwandliebe: [
    "assets/media/dbd960058724.jpg",
    "assets/media/f96d62b619b7.jpg",
    "assets/media/af328e7d3292.jpg"
  ],
  nebelgespenst: [
    "assets/media/4b5a0b0a05c5.jpg",
    "assets/media/3e5f24fbd04e.jpg",
    "assets/media/c8716762dcb7.jpg"
  ],
  ostlerfuehre: [
    "assets/media/a9d0ec593244.jpg",
    "assets/media/6a0e199e9a04.jpg",
    "assets/media/e2159cca5920.jpg"
  ],
  geiselstein: [
    "assets/media/6a69a05f82d8.jpg",
    "assets/media/af79d5874f23.jpg",
    "assets/media/676ff234c716.jpg"
  ],
  rotspitz: [
    "assets/media/897d6bd95769.jpg",
    "assets/media/c087ed9c263f.jpg",
    "assets/media/083e297df734.jpg"
  ],
  alpspitze: [
    "assets/media/18040dfe7358.jpg",
    "assets/media/4b5a0b0a05c5.jpg",
    "assets/media/1dceb52edc1b.jpg"
  ],
  silenzio: [
    "assets/media/f902c2b4a4b8.jpg",
    "assets/media/deeace60e3ef.jpg"
  ],
  benediktenwand: [
    "assets/media/1b64a8879388.jpg",
    "assets/media/dbd960058724.jpg"
  ],
  kampenwand: [
    "assets/media/be9b23a777cd.webp"
  ],
  hoellentorkopf: [
    "assets/media/71165d0d2a10.jpg"
  ],
  "kg-weg": [
    "assets/media/4b5a0b0a05c5.jpg",
    "assets/media/18040dfe7358.jpg"
  ],
  rebitschkante: [
    "assets/media/5e8c47ef9ff1.jpg",
    "assets/media/6d781ca8e718.jpg"
  ],
  "gnadenlosen-drei": [
    "assets/media/3280077b40fb.jpg"
  ],
  schmidkunzweg: [
    "assets/media/3280077b40fb.jpg"
  ],
  maximiliansweg: [
    "assets/media/1b64a8879388.jpg"
  ],
  mechanikerkante: [
    "assets/media/be9b23a777cd.webp"
  ],
  sparchen: [
    "assets/media/151acbe92553.jpg",
    "assets/media/637c99b7f2b8.jpg",
    "assets/media/2431532711f2.jpg"
  ],
  "zahmer-kaiser": [
    "assets/media/151acbe92553.jpg"
  ],
  "zettenkaiser-ost": [
    "assets/media/a9d0ec593244.jpg"
  ],
  "tirol-plaisir": [
    "assets/media/32f35e1122fe.jpg",
    "assets/media/3fc434eb8721.jpg"
  ],
  rabnhoamat: [
    "assets/media/00681ef024f2.jpg",
    "assets/media/63a777fa7e91.jpg",
    "assets/media/6194a39bf3c6.jpg"
  ],
  nodlsuppn: [
    "assets/media/4b5a0b0a05c5.jpg",
    "assets/media/3e5f24fbd04e.jpg"
  ],
  bumerang: [
    "assets/media/f902c2b4a4b8.jpg"
  ],
  "schmid-mueller": [
    "assets/media/c087ed9c263f.jpg"
  ],
  leuchsfuehre: [
    "assets/media/a9d0ec593244.jpg"
  ],
  "kampen-ueberschreitung": [
    "assets/media/be9b23a777cd.webp"
  ],
  "multerkar-abenteurer": [
    "assets/media/dbd960058724.jpg"
  ],
  "ellmauer-tor": [
    "assets/media/a9d0ec593244.jpg"
  ],
  mitteldurchstieg: [
    "assets/media/8ad570a58754.jpg",
    "assets/media/a9adbbfe58e2.jpg"
  ],
  nordwandgesicht: [
    "assets/media/4b5a0b0a05c5.jpg",
    "assets/media/18040dfe7358.jpg"
  ]
};

window.ROUTE_CROWD = {
  nordwandliebe: { sat: 4, sun: 2, jam: 70 },
  nebelgespenst: { sat: 3, sun: 1, jam: 45 },
  ostlerfuehre: { sat: 4, sun: 2, jam: 65 },
  geiselstein: { sat: 2, sun: 1, jam: 30 },
  rotspitz: { sat: 2, sun: 1, jam: 25 },
  alpspitze: { sat: 5, sun: 2, jam: 80 },
  silenzio: { sat: 2, sun: 1, jam: 35 },
  benediktenwand: { sat: 3, sun: 1, jam: 50 },
  kampenwand: { sat: 4, sun: 3, jam: 60 },
  hoellentorkopf: { sat: 2, sun: 1, jam: 25 },
  "kg-weg": { sat: 3, sun: 1, jam: 40 },
  rebitschkante: { sat: 3, sun: 1, jam: 40 },
  "gnadenlosen-drei": { sat: 2, sun: 2, jam: 30 },
  schmidkunzweg: { sat: 3, sun: 2, jam: 35 },
  maximiliansweg: { sat: 2, sun: 1, jam: 20 },
  mechanikerkante: { sat: 3, sun: 2, jam: 45 },
  sparchen: { sat: 5, sun: 3, jam: 75 },
  "zahmer-kaiser": { sat: 2, sun: 1, jam: 20 },
  "zettenkaiser-ost": { sat: 1, sun: 1, jam: 15 },
  "tirol-plaisir": { sat: 5, sun: 2, jam: 85 },
  rabnhoamat: { sat: 2, sun: 1, jam: 28 },
  nodlsuppn: { sat: 3, sun: 1, jam: 42 },
  bumerang: { sat: 2, sun: 1, jam: 38 },
  "schmid-mueller": { sat: 3, sun: 1, jam: 48 },
  leuchsfuehre: { sat: 1, sun: 1, jam: 12 },
  "kampen-ueberschreitung": { sat: 5, sun: 4, jam: 78 },
  "multerkar-abenteurer": { sat: 2, sun: 2, jam: 32 },
  "ellmauer-tor": { sat: 3, sun: 3, jam: 40 },
  mitteldurchstieg: { sat: 3, sun: 1, jam: 35 },
  nordwandgesicht: { sat: 3, sun: 1, jam: 50 }
};
