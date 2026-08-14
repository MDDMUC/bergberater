/* Extra routes 21–30, photos, and jam/crowd forecasts.
   Crowd = expected parties on the wall that day (1–5).
   Jam = chance the first pitches are occupied if you arrive ~10:00
   on the day we would send you. Forecast, not a live count.
   Drive times from Bad Tölz, OSRM 2026-08-14. */

window.ROUTES = window.ROUTES.concat([
  {
    id: "simplinella",
    rank: 21,
    overGrade: false,
    name: "Simplinella",
    wall: "Buchstein Nordwestwand",
    massif: "Bayerische Voralpen / Tegernsee",
    day: "sun",
    dayLabel: "Sun · practice 4",
    drive: "0:35–0:50",
    via: "B13 / Kreuth / Tegernseer Hütte",
    aspect: "NW",
    grade: "UIAA 4",
    gradeNote: "Hut page lists Simplinella as a 4 practice line on the NW wall, next to Vronerl (5−).",
    pitches: "1–2 / short",
    protection: "alpine-bolted",
    protectionNote: "Used for courses. Better bolted than Nordkante, still alpine spacing.",
    why: "Sunday-close, north-west, easy. Good if 5 on Nordkante is more than you want.",
    approach: "Tegernseer Hütte, NW wall below the terrace. Minutes.",
    descent: "Walk to the normal route / hut.",
    gear: ["60 m rope", "8 draws", "Helmet"],
    weekend: "Sunday morning warm-up or backup.",
    dont: ["Call it a long multi-pitch", "Wander onto Herr der Fliegen (7)"],
    neighbor: "Vronerl is the 5− next to it. Nordkante is the real 3-pitch 5.",
    topoPage: "https://tegernseerhuette.de/bewegen",
    topoImg: "",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=16/47.626/11.801"
  },
  {
    id: "rossnadel-westgrat",
    rank: 22,
    overGrade: false,
    name: "Westgrat",
    wall: "Roßsteinnadel",
    massif: "Bayerische Voralpen / Tegernsee",
    day: "sun",
    dayLabel: "Sun · needle 3",
    drive: "0:35–0:50",
    via: "B13 / Kreuth / Tegernseer Hütte",
    aspect: "W",
    grade: "UIAA 3",
    gradeNote: "One long pitch or two short ones to the summit cross. Airy 3. 60 m to rappel north.",
    pitches: "1–2 / ~60 m",
    protection: "alpine",
    protectionNote: "Ring bolts and a pin or two. Stand at the cross.",
    why: "The needle you see from the hut terrace. Short, famous, 35 minutes from Tölz.",
    approach: "South from the hut down the mini via ferrata. Left through the gap to the needle arena. Entry at a ring belay under the lowest gap.",
    descent: "North rappel from a red sling stand. 60 m. Do not rap south.",
    gear: ["60 m rope", "Draws", "Helmet"],
    weekend: "Sunday short. West = afternoon sun — go early if it's hot.",
    dont: ["Rappel the south face", "Skip the 60 m rope"],
    neighbor: "Buchstein Nordkante is the true-north alternative.",
    topoPage: "https://tegernseerhuette.de/bewegen",
    topoImg: "",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=16/47.625/11.799"
  },
  {
    id: "plankenstein-ostgrat",
    rank: 23,
    overGrade: false,
    name: "Direkter Ostgrat",
    wall: "Plankenstein",
    massif: "Bayerische Voralpen / Tegernsee",
    day: "sun",
    dayLabel: "Sun · east ridge 4+",
    drive: "0:40–0:55",
    via: "Tegernsee / Sutten / Kistenwinterstube",
    aspect: "E",
    grade: "UIAA 4+",
    gradeNote: "One 4+ crux (bolt at belly height); rest easier. ~140 m. Well bolted for a ridge.",
    pitches: "~140 m",
    protection: "alpine-bolted",
    protectionNote: "Pins + bolts. No nuts needed. Descent chimney is slick when wet.",
    why: "Tölz-local ridge, east, moderate. Stadler: the north wall is the summer shade wall; this ridge is the public classic.",
    approach: "Kistenwinterstube → Sieblialm / Riedereck saddle → under the south faces to the col between Plankenstein and the east needles. Bike shortens it.",
    descent: "West to a slick chimney (rap bolts), then left gully (I–II). Dangerous when wet.",
    gear: ["50 m rope", "6 draws", "Helmet"],
    weekend: "Sunday early. East = morning sun. For all-day shade pick the Plankenstein north baseclimbs (Panico Band 3).",
    dont: ["Descend the wet chimney casually", "Call the south face a heat-weekend plan"],
    neighbor: "The north wall has modern 4–6 baseclimbs — take Stadler / Panico Band 3.",
    topoPage: "https://www.bergsteigen.com/touren/klettern/direkter-ostgrat-plankenstein/",
    topoImg: "assets/media/3280077b40fb.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.641/11.804"
  },
  {
    id: "mechanikerkante",
    rank: 24,
    overGrade: false,
    name: "Mechanikerkante",
    wall: "Kampenwand Nordgipfel",
    massif: "Chiemgauer Alpen",
    day: "sun",
    dayLabel: "Sun short · 5+",
    drive: "1:00–1:20",
    via: "B472 / A8 / Kampenwandbahn",
    aspect: "N",
    grade: "UIAA 5+",
    gradeNote: "Two pitches / ~70 m. Still under 6.",
    pitches: "2 / 70 m",
    protection: "alpine",
    protectionNote: "Bolts and fixed threads.",
    why: "True north, short, Sunday-east. A step up from the Zeller Nordwand. Same drive as from Munich.",
    approach: "Bahn or Steinlingalm, left under the Kaisersäle.",
    descent: "Rap toward Kaisersäle.",
    gear: ["60 m rope", "Draws", "Helmet"],
    weekend: "Sunday morning if you drive east.",
    dont: ["Wander onto the south faces"],
    neighbor: "Zeller Nordwand is the easier 5−.",
    topoPage: "https://sebastian-steude.de/klettern/routen/kampenwand-nordgipfel-nordwand/",
    topoImg: "assets/topos/kampenwand.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.757/12.367"
  },
  {
    id: "sparchen",
    rank: 25,
    overGrade: "partial",
    name: "Sparchen garden",
    wall: "Schanzer Wände",
    massif: "Zahmer Kaiser / Inntal",
    day: "sun",
    dayLabel: "Sun AM · garden only",
    drive: "1:05–1:20",
    via: "B472 / A8 / A93 → Kufstein",
    aspect: "NW",
    grade: "5–6",
    gradeNote: "Use easier MSL / sport. Möwe Jonathan is 7+ — over grade.",
    pitches: "1–several",
    protection: "plaisir",
    protectionNote: "Fully bolted. Shade until ~14:00.",
    why: "Best Sunday logistics if you already drive to Kufstein. Stay in the garden. Do not force Jonathan.",
    approach: "Kaisertalstraße barrier. 2–5 min to Sector A.",
    descent: "Rappel. 60 m free-hanging option exists.",
    gear: ["60 m double or 50 m single", "14 draws", "Helmet"],
    weekend: "Sunday morning. Off by 13:00.",
    dont: ["Climb Möwe Jonathan (7+)", "Drop stones on Sector B"],
    neighbor: "Alt start 5+ exists if you only want the first pitch of Jonathan.",
    topoPage: "https://www.stadler-markus.de/alpinklettern/wilder-kaiser/kletterroute/moewe-jonathan.html",
    topoImg: "assets/media/3b8e389f4251.png",
    wallImg: "assets/media/151acbe92553.jpg",
    map: "https://www.openstreetmap.org/#map=16/47.592/12.185"
  },
  {
    id: "nordwandgesicht",
    rank: 26,
    overGrade: false,
    name: "Nordwandgesicht",
    wall: "Alpspitze NO-Wand",
    massif: "Wetterstein",
    day: "sat",
    dayLabel: "Sat · high alpine 5",
    drive: "0:55–1:15",
    via: "B13 / Walchensee / Alpspitzbahn",
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
    topoImg: "assets/topos/alpspitze-overview.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.425/11.049"
  },
  {
    id: "hoehlenweg",
    rank: 27,
    overGrade: false,
    name: "Höhlenweg",
    wall: "Benediktenwand Nord",
    massif: "Bayerische Voralpen",
    day: "sat",
    dayLabel: "Sat · cave 3",
    drive: "0:20–0:35",
    via: "B472 / Tutzinger Hütte",
    aspect: "N",
    grade: "UIAA 3",
    gradeNote: "200 m trad. FA Emil Kokatt, 1914. Historic line in the Rampe sector.",
    pitches: "~200 m",
    protection: "alpine",
    protectionNote: "Old alpine. Sparse.",
    why: "Another Tölz-doorstep 3 if you want more than Maximiliansweg and less than Rampe-Rippe.",
    approach: "Tutzinger Hütte, Rampe-Rippe sector.",
    descent: "Walk-off / hut.",
    gear: ["Rope", "Slings, nuts", "Helmet"],
    weekend: "Saturday easy-north filler.",
    dont: ["Expect bolts", "Treat 1914 terrain as a via ferrata"],
    neighbor: "Winklerführe is the 3+ in the same sector.",
    topoPage: "https://www.thecrag.com/en/climbing/germany/route/4024450785",
    topoImg: "assets/topos/rampen-rippe-overview.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.654/11.462"
  },
  {
    id: "bumerang",
    rank: 28,
    overGrade: false,
    name: "Bumerang",
    wall: "Scheffauer Nordwand",
    massif: "Kaisergebirge",
    day: "sat",
    dayLabel: "Sat · 5 on the Ostlerplatte",
    drive: "1:00–1:20",
    via: "B472 / A8 / A93 / Kaindlhütte",
    aspect: "N",
    grade: "UIAA 5",
    gradeNote: "Variant through the arched crack on the Ostlerplatte, about 5. Rest like Ostler/Silenzio.",
    pitchCount: 12,
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
    topoImg: "assets/media/f902c2b4a4b8.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=14/47.557/12.178"
  },
  {
    id: "kampen-ueberschreitung",
    rank: 29,
    overGrade: false,
    name: "Kampenwand-Überschreitung",
    wall: "Kampenwand ridge",
    massif: "Chiemgauer Alpen",
    day: "sun",
    dayLabel: "Sun · ridge classic",
    drive: "1:00–1:20",
    via: "B472 / A8 / Kampenwandbahn",
    aspect: "mixed",
    grade: "UIAA 3+ / 4+",
    gradeNote: "Easiest ridge 3+. With Torweg + NW-Verschneidung, 4+ obligatory. Not all north.",
    pitchCount: 12,
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
    id: "tirol-plaisir",
    rank: 30,
    overGrade: true,
    name: "Tirol Plaisir",
    wall: "Seebenwände",
    massif: "Mieminger / Zugspitz Arena",
    day: "sat",
    dayLabel: "Over grade",
    drive: "1:10–1:25",
    via: "B13 / Garmisch / B23 / Ehrwald",
    aspect: "N",
    grade: "UIAA 6+",
    gradeNote: "Crux pitches 3–4 are 6+. Over the cap.",
    pitchCount: 6,
    pitches: "6 / ~150–200 m",
    protection: "plaisir",
    protectionNote: "Modern bolts, rappel-ready stands. The protection is perfect; the grade is not.",
    why: "Still the best north plaisir wall — but the easiest line is 6+. Twenty minutes closer than from Munich. Listed last under the lock.",
    approach: "Ehrwalder Alm → Seeben waterfall, 30–40 min.",
    descent: "Rappel the route.",
    gear: ["60 m double / twin", "12 draws", "Helmet"],
    weekend: "Skip unless the cap is lifted.",
    dont: ["Default to this after the 6+ lock"],
    neighbor: "There is no easier Seebenwände line.",
    topoPage: "https://www.bergprofi.com/versteckte-unterseiten/topos/tirol-plaisier/",
    topoImg: "assets/media/3fc434eb8721.jpg",
    wallImg: "assets/media/32f35e1122fe.jpg",
    map: "https://www.openstreetmap.org/#map=16/47.421/10.956"
  },
  {
    id: "dacherl-weg",
    rank: 0,
    userSelected: true,
    overGrade: false,
    name: "Dacherl Weg",
    wall: "Alpspitze",
    massif: "Wetterstein",
    day: "sat",
    dayLabel: "Sat · your pick",
    drive: "0:55–1:15",
    via: "B13 / Walchensee / Alpspitzbahn",
    aspect: "N / NE",
    grade: "confirm on the wall",
    gradeNote: "User-selected Alpspitze line. No free public topo lists a solid UIAA split for this name — confirm grade and bolts before you leave.",
    pitches: "confirm / Alpspitze multi-pitch",
    protection: "alpine-bolted",
    protectionNote: "Treat as alpine-bolted Wetterstein until you have the guidebook or a live topo in hand. Not sold as plaisir.",
    why: "You picked this one. Same Bahn and high cool air as BW3 / Nodlwand. It sits on the landing page and at the top of the list so it does not get buried by match %.",
    approach: "Alpspitzbahn to Osterfelderkopf, then the Nordwandsteig / wall paths toward the Alpspitze entries. Same parking as the other Osterfelder lines.",
    descent: "Ostgrat + Nordwandsteig, or rappel if the line is set up for it. Last Bahn 17:30 Jul–Sep.",
    gear: ["60 m rope", "12 draws", "Helmet", "Small rack until the topo is confirmed"],
    weekend: "Saturday. Sunday is Bahn + storms.",
    dont: ["Treat an unconfirmed Alpspitze name as a gym grid", "Miss the last Bahn"],
    neighbor: "BW3, KG-Weg, Nordwandgesicht, Nodlsuppn and Nebelgespenst share the same lift.",
    topoPage: "https://www.thecrag.com/de/klettern/germany/area/403966290",
    topoImg: "assets/topos/alpspitze-overview.jpg",
    wallImg: "",
    map: "https://www.openstreetmap.org/#map=15/47.426/11.050"
  }
]);

Object.assign(window.ROUTE_COORDS, {
  simplinella: { lat: 47.6262, lng: 11.8006 },
  "rossnadel-westgrat": { lat: 47.6251, lng: 11.7988 },
  "plankenstein-ostgrat": { lat: 47.6405, lng: 11.8038 },
  mechanikerkante: { lat: 47.7548, lng: 12.3654 },
  sparchen: { lat: 47.5926, lng: 12.1868 },
  nordwandgesicht: { lat: 47.4248, lng: 11.0476 },
  hoehlenweg: { lat: 47.6538, lng: 11.4620 },
  bumerang: { lat: 47.5571, lng: 12.1804 },
  "kampen-ueberschreitung": { lat: 47.7534, lng: 12.3684 },
  "tirol-plaisir": { lat: 47.4214, lng: 10.9562 },
  "dacherl-weg": { lat: 47.4258, lng: 11.0496 }
});

window.ROUTE_PHOTOS = {
  benediktenwand: [
    "assets/topos/rampen-rippe-overview.jpg"
  ],
  rotspitz: [
    "assets/media/897d6bd95769.jpg",
    "assets/media/c087ed9c263f.jpg",
    "assets/media/083e297df734.jpg"
  ],
  maximiliansweg: [
    "assets/topos/rampen-rippe-overview.jpg"
  ],
  nebelgespenst: [
    "assets/topos/alpspitze-nordwand.jpg"
  ],
  "buchstein-nordkante": [],
  rabnhoamat: [
    "assets/media/00681ef024f2.jpg",
    "assets/media/63a777fa7e91.jpg",
    "assets/media/6194a39bf3c6.jpg"
  ],
  alpspitze: [
    "assets/topos/alpspitze-overview.jpg",
    "assets/media/1dceb52edc1b.jpg"
  ],
  geiselstein: [
    "assets/media/6a69a05f82d8.jpg",
    "assets/media/af79d5874f23.jpg",
    "assets/media/676ff234c716.jpg"
  ],
  rebitschkante: [
    "assets/media/5e8c47ef9ff1.jpg",
    "assets/media/6d781ca8e718.jpg"
  ],
  zauberrippe: [],
  "meiser-wuelfert": [
    "assets/topos/rampen-rippe-overview.jpg"
  ],
  hoellentorkopf: [
    "assets/media/71165d0d2a10.jpg"
  ],
  kampenwand: [
    "assets/media/be9b23a777cd.webp"
  ],
  winklerfuehre: [
    "assets/topos/rampen-rippe-overview.jpg"
  ],
  "schmid-mueller": [
    "assets/media/c087ed9c263f.jpg"
  ],
  silenzio: [
    "assets/media/f902c2b4a4b8.jpg",
    "assets/media/deeace60e3ef.jpg"
  ],
  nordwandliebe: [
    "assets/media/dbd960058724.jpg",
    "assets/media/f96d62b619b7.jpg",
    "assets/media/af328e7d3292.jpg"
  ],
  ostlerfuehre: [
    "assets/topos/ostler-overview.jpg",
    "assets/media/6a0e199e9a04.jpg",
    "assets/media/e2159cca5920.jpg"
  ],
  nodlsuppn: [
    "assets/topos/nodlsuppn-topo.jpg"
  ],
  "kg-weg": [
    "assets/topos/alpspitze-overview.jpg"
  ],
  simplinella: [],
  "rossnadel-westgrat": [],
  "plankenstein-ostgrat": [
    "assets/media/3280077b40fb.jpg"
  ],
  mechanikerkante: [
    "assets/media/be9b23a777cd.webp"
  ],
  sparchen: [
    "assets/media/151acbe92553.jpg",
    "assets/media/637c99b7f2b8.jpg",
    "assets/media/2431532711f2.jpg"
  ],
  nordwandgesicht: [
    "assets/topos/alpspitze-overview.jpg"
  ],
  hoehlenweg: [
    "assets/topos/rampen-rippe-overview.jpg"
  ],
  bumerang: [
    "assets/media/f902c2b4a4b8.jpg"
  ],
  "kampen-ueberschreitung": [
    "assets/media/be9b23a777cd.webp"
  ],
  "tirol-plaisir": [
    "assets/media/32f35e1122fe.jpg",
    "assets/media/3fc434eb8721.jpg"
  ],
  "dacherl-weg": [
    "assets/topos/alpspitze-overview.jpg"
  ]
};

window.ROUTE_CROWD = {
  benediktenwand: { sat: 3, sun: 1, jam: 45 },
  rotspitz: { sat: 2, sun: 1, jam: 25 },
  maximiliansweg: { sat: 2, sun: 1, jam: 20 },
  nebelgespenst: { sat: 3, sun: 1, jam: 45 },
  "buchstein-nordkante": { sat: 3, sun: 2, jam: 40 },
  rabnhoamat: { sat: 2, sun: 1, jam: 28 },
  alpspitze: { sat: 5, sun: 2, jam: 80 },
  geiselstein: { sat: 2, sun: 1, jam: 30 },
  rebitschkante: { sat: 3, sun: 1, jam: 40 },
  zauberrippe: { sat: 2, sun: 2, jam: 35 },
  "meiser-wuelfert": { sat: 1, sun: 1, jam: 15 },
  hoellentorkopf: { sat: 2, sun: 1, jam: 25 },
  kampenwand: { sat: 4, sun: 3, jam: 60 },
  winklerfuehre: { sat: 1, sun: 1, jam: 12 },
  "schmid-mueller": { sat: 3, sun: 1, jam: 48 },
  silenzio: { sat: 2, sun: 1, jam: 35 },
  nordwandliebe: { sat: 4, sun: 2, jam: 70 },
  ostlerfuehre: { sat: 4, sun: 2, jam: 65 },
  nodlsuppn: { sat: 3, sun: 1, jam: 42 },
  "kg-weg": { sat: 3, sun: 1, jam: 40 },
  simplinella: { sat: 2, sun: 2, jam: 25 },
  "rossnadel-westgrat": { sat: 3, sun: 3, jam: 50 },
  "plankenstein-ostgrat": { sat: 2, sun: 2, jam: 30 },
  mechanikerkante: { sat: 3, sun: 2, jam: 45 },
  sparchen: { sat: 5, sun: 3, jam: 75 },
  nordwandgesicht: { sat: 3, sun: 1, jam: 50 },
  hoehlenweg: { sat: 1, sun: 1, jam: 10 },
  bumerang: { sat: 2, sun: 1, jam: 38 },
  "kampen-ueberschreitung": { sat: 5, sun: 4, jam: 78 },
  "tirol-plaisir": { sat: 5, sun: 2, jam: 85 },
  "dacherl-weg": { sat: 3, sun: 1, jam: 40 }
};
