/* Parking, route-start GPS, and e-bike approach for every line.
   Hubs are shared by walls. Times are typical summer, e-bike assist on
   legal forest roads. Last metres to a north wall are almost always on foot.
   Verify barriers, bike bans, and last-ride rules on the day. */
window.APPROACH_HUBS = {
  bene: {
    parking: { name: "Alpenwarmbad Benediktbeuern", lat: 47.7064, lng: 11.4069 },
    start: { name: "Tutzinger Hütte / Nordwand", lat: 47.6532, lng: 11.4658 },
    ebike: {
      kind: "forest",
      walk: "1:30–2:00",
      ride: "0:45–1:00",
      saveMin: 50,
      depot: "Materialbahn or just below the hut",
      en: "The forest road from the Alpenwarmbad is the classic e-bike approach. Ride to the material lift / last flat, lock the bikes, 20–30 min walk to the hut and the entries. On foot this is a long day before you even rope up.",
      de: "Forststraße vom Alpenwarmbad ist der klassische E-Bike-Zustieg. Radl bis Materialbahn / letztes Flachstück, 20–30 Min. zur Hütte. Zu Fuß ist das ein langer Tag vor dem Seil."
    }
  },
  jachenau: {
    parking: { name: "Jachenau / Lainbach", lat: 47.6068, lng: 11.4335 },
    start: { name: "Tutzinger Hütte / Nordwand", lat: 47.6532, lng: 11.4658 },
    ebike: {
      kind: "forest",
      walk: "1:20–1:50",
      ride: "0:40–0:55",
      saveMin: 45,
      depot: "Near Tutzinger Hütte / materialbahn",
      en: "From Jachenau the valley road is rideable. Same hut, same north wall. Bike cuts the long walk.",
      de: "Aus der Jachenau ist die Talstraße fahrbar. Dieselbe Hütte, dieselbe Nordwand."
    }
  },
  buch: {
    parking: { name: "Parkplatz Klamm / Schwarzentenn", lat: 47.6382, lng: 11.7478 },
    start: { name: "Tegernseer Hütte / Buchstein Nord", lat: 47.6264, lng: 11.8012 },
    ebike: {
      kind: "forest",
      walk: "1:15–1:45",
      ride: "0:25–0:40",
      saveMin: 50,
      depot: "Buchsteinhütte — you cannot ride the last steep bit to the Tegernseer Hütte",
      en: "Ride the forest road from Klamm to the Buchsteinhütte (~8.5 km). Lock there. Last 20–30 min on foot to the hut and the north entries. This is the difference between “too much walking” and a Sunday north face.",
      de: "Forstweg von Klamm zur Buchsteinhütte (~8,5 km). Dort Depot. Letzte 20–30 Min. zu Fuß zur Hütte und zu den Nordeinstiegen."
    }
  },
  plank: {
    parking: { name: "Kistenwinterstube / Sutten maut", lat: 47.6745, lng: 11.8153 },
    start: { name: "Plankenstein Nordwand / Ostgrat-Sattel", lat: 47.6412, lng: 11.804 },
    ebike: {
      kind: "forest",
      walk: "1:20–1:50",
      ride: "0:25–0:40",
      saveMin: 50,
      depot: "Blankensteinalm (north) or Rötensteinalm (east/south)",
      en: "Tar then gravel to the alms. 20–30 min walk from the bike cache to the north wall; a bit more to the east ridge. Stadler: the bike is the time saver.",
      de: "Teer, dann Schotter zu den Almen. 20–30 Min. vom Depot zur Nordwand; etwas mehr zum Ostgrat."
    }
  },
  rofan: {
    parking: { name: "Rofanbahn Maurach", lat: 47.43, lng: 11.758 },
    start: { name: "Rotspitz / Rofan high cluster", lat: 47.4418, lng: 11.7618 },
    ebike: {
      kind: "bahn",
      walk: "0:45–1:00 from the Bergstation",
      ride: "—",
      saveMin: 0,
      depot: "Leave bikes at the valley station",
      en: "The cable car does the height. An e-bike does not replace the Bahn or the walk to Rotspitz. Park at the valley station.",
      de: "Die Bahn macht die Höhe. E-Bike ersetzt weder Bahn noch den Zustieg zur Rotspitz. Parken an der Talstation."
    }
  },
  guffert: {
    parking: { name: "Steinberg am Rofan", lat: 47.515, lng: 11.785 },
    start: { name: "Guffert trailhead / north or south", lat: 47.518, lng: 11.782 },
    ebike: {
      kind: "none",
      walk: "1:45–2:15",
      ride: "road only to the village",
      saveMin: 5,
      depot: "Steinberg",
      en: "After the village it is steep pines and latschen. E-bike does not reach the wall.",
      de: "Ab dem Dorf steile Latschen. E-Bike kommt nicht an die Wand."
    }
  },
  alpspitz: {
    parking: { name: "Alpspitzbahn / Osterfelder valley", lat: 47.4512, lng: 11.0498 },
    start: { name: "Osterfelderkopf / Nodlwand / Nordwandsteig", lat: 47.4268, lng: 11.0512 },
    ebike: {
      kind: "bahn",
      walk: "0:15–0:30 from the Bergstation",
      ride: "—",
      saveMin: 0,
      depot: "Valley station",
      en: "Take the Alpspitzbahn. An e-bike does not help the high walls.",
      de: "Alpspitzbahn. E-Bike hilft an den hohen Wänden nicht."
    }
  },
  ferchen: {
    parking: { name: "Mittenwald / Lautersee–Ferchensee P", lat: 47.4415, lng: 11.2638 },
    start: { name: "Gamsanger / Obere Wettersteinspitze kar", lat: 47.4398, lng: 11.2486 },
    ebike: {
      kind: "forest",
      walk: "1:20–1:50",
      ride: "0:25–0:40",
      saveMin: 50,
      depot: "~1260 m toward Schachen / Ferchensee",
      en: "This is an e-bike line. Ride toward Ferchensee/Schachen, cache the bikes, 30 min into the kar. Walking the whole valley is a grind.",
      de: "Klassische E-Bike-Linie. Richtung Ferchensee/Schachen, Depot, 30 Min. ins Kar. Das ganze Tal zu Fuß ist zäh."
    }
  },
  geisel: {
    parking: { name: "Halblech / Kenzenstraße", lat: 47.6302, lng: 10.8248 },
    start: { name: "Geiselstein Nordwand / Wankerfleck", lat: 47.5752, lng: 10.8084 },
    ebike: {
      kind: "forest",
      walk: "1:30–2:00",
      ride: "0:35–0:50",
      saveMin: 55,
      depot: "Wankerfleck",
      en: "Park Halblech, ride toward Kenzenhütte, leave bikes at Wankerfleck, 10 min under the north face. Without a bike this is a very long Saturday.",
      de: "Parken Halblech, Radl Richtung Kenzenhütte, Depot Wankerfleck, 10 Min. unter die Nordwand. Ohne Radl ein sehr langer Samstag."
    }
  },
  kampen: {
    parking: { name: "Kampenwandbahn Aschau", lat: 47.7678, lng: 12.3248 },
    start: { name: "Kampenwand Bergstation / Kaisersäle", lat: 47.7542, lng: 12.3668 },
    ebike: {
      kind: "bahn",
      walk: "0:15–0:25 from the Bergstation",
      ride: "—",
      saveMin: 0,
      depot: "Valley station",
      en: "Bahn is the approach. You can walk from Hintergschwendt; an e-bike only helps that longer walk, not the north entries themselves.",
      de: "Bahn ist der Zustieg. Von Hintergschwendt zu Fuß länger; E-Bike hilft nur diesem Weg, nicht den Nordeinstiegen."
    }
  },
  kaiser: {
    parking: { name: "Kaiserlift Kufstein / Kaisertal barrier", lat: 47.5902, lng: 12.1704 },
    start: { name: "Kaindlhütte / Scheffauer Nordwand", lat: 47.5574, lng: 12.1782 },
    ebike: {
      kind: "hut",
      walk: "1:30–2:00 without the lift",
      ride: "0:35–0:55 to the Kaindlhütte",
      saveMin: 50,
      depot: "Kaindlhütte",
      en: "E-bike or Kaiserlift to the Kaindlhütte, then 40–50 min on foot to the north-face entries. The bike is a real option if the lift queue is ugly.",
      de: "E-Bike oder Kaiserlift zur Kaindlhütte, dann 40–50 Min. zu Fuß zu den Nordeinstiegen. Radl ist echt, wenn der Lift voll ist."
    }
  },
  sparchen: {
    parking: { name: "Kaisertalstraße barrier / Sparchen", lat: 47.5926, lng: 12.1868 },
    start: { name: "Schanzer Wände Sector A", lat: 47.5928, lng: 12.1862 },
    ebike: {
      kind: "skip",
      walk: "0:02–0:05",
      ride: "—",
      saveMin: 0,
      depot: "Parking is the start",
      en: "Two to five minutes. Leave the bikes on the car.",
      de: "Zwei bis fünf Minuten. Räder am Auto lassen."
    }
  },
  hoerndl: {
    parking: { name: "Seehaus / Ruhpolding", lat: 47.716, lng: 12.608 },
    start: { name: "Hörndlwand sockel", lat: 47.6848, lng: 12.6364 },
    ebike: {
      kind: "hut",
      walk: "1:30–2:00",
      ride: "0:35–0:50 toward Hörndlalm",
      saveMin: 45,
      depot: "Hörndlalm if the road is open / legal",
      en: "Long east approach. A bike toward the Hörndlalm cuts a lot of forest-road walking. Confirm the current ban / maut.",
      de: "Langer Ost-Zustieg. Radl Richtung Hörndlalm spart Forststraße. Maut/Verbot am Tag prüfen."
    }
  },
  ellmau: {
    parking: { name: "Wochenbrunner Alm / Ellmau", lat: 47.546, lng: 12.31 },
    start: { name: "Ellmauer Tor / Grutten", lat: 47.5668, lng: 12.3028 },
    ebike: {
      kind: "hut",
      walk: "1:15–1:45",
      ride: "0:25–0:40 on the alm road",
      saveMin: 40,
      depot: "Near Grutten / last allowed gate",
      en: "Alm road is rideable a long way. Helps the Sunday-east logistics.",
      de: "Almstraße lange fahrbar. Hilft der Sonntag-Ost-Logistik."
    }
  },
  seeben: {
    parking: { name: "Ehrwald / Ehrwalder Almbahn", lat: 47.3998, lng: 10.9168 },
    start: { name: "Seebenwände / waterfall", lat: 47.4214, lng: 10.9562 },
    ebike: {
      kind: "bahn",
      walk: "0:30–0:40 from the Alm",
      ride: "—",
      saveMin: 0,
      depot: "Valley or Alm",
      en: "Bahn to the Alm, then a short walk. E-bike is optional for the valley only.",
      de: "Bahn zur Alm, dann kurz zu Fuß. E-Bike nur im Tal optional."
    }
  },
  brauneck: {
    parking: { name: "Brauneckbahn Lenggries", lat: 47.6806, lng: 11.5738 },
    start: { name: "Brauneck crags / Stie-Alm", lat: 47.681, lng: 11.574 },
    ebike: {
      kind: "skip",
      walk: "0:10–0:25",
      ride: "short service roads only",
      saveMin: 5,
      depot: "Valley or mid-station",
      en: "Already next door. Bahn or a short walk. E-bike is not why you come here.",
      de: "Schon vor der Tür. Bahn oder kurzer Weg. E-Bike ist nicht der Grund."
    }
  },
  gramai: {
    parking: { name: "Pertisau / Gramai", lat: 47.44, lng: 11.695 },
    start: { name: "Gramai / Lamsen walls", lat: 47.392, lng: 11.592 },
    ebike: {
      kind: "forest",
      walk: "1:20–1:50",
      ride: "0:30–0:50",
      saveMin: 45,
      depot: "End of the valley road / Gramai hut area",
      en: "Achenpass side. Valley roads are the e-bike win; the last bit to Lamsen is on foot.",
      de: "Achenpass-Seite. Talstraßen sind der E-Bike-Gewinn; zuletzt zu Fuß."
    }
  },
  unnuetz: {
    parking: { name: "Achenkirch", lat: 47.5268, lng: 11.7058 },
    start: { name: "Unnütz north flanks", lat: 47.527, lng: 11.706 },
    ebike: {
      kind: "hut",
      walk: "0:50–1:20",
      ride: "0:15–0:30 on valley tracks",
      saveMin: 30,
      depot: "Highest legal forest road",
      en: "Close from Tölz. Ride the valley tracks, walk the last steep bit. Thin card — confirm the named line.",
      de: "Nah ab Tölz. Talwege fahren, steiles Ende zu Fuß. Dünne Karte — Linie prüfen."
    }
  },
  soiern: {
    parking: { name: "Krün / Vorderriß", lat: 47.505, lng: 11.279 },
    start: { name: "Soierngruppe", lat: 47.505, lng: 11.279 },
    ebike: {
      kind: "forest",
      walk: "1:30–2:00",
      ride: "0:35–0:55",
      saveMin: 50,
      depot: "Soiernhaus approach road",
      en: "Long forest approach. E-bike is why this is sane as a day trip from Tölz.",
      de: "Langer Forst-Zustieg. E-Bike macht den Tag ab Tölz sinnvoll."
    }
  },
  local: {
    parking: { name: "Local lot (Tölzer Land)", lat: 47.72, lng: 11.5 },
    start: { name: "Crag", lat: 47.72, lng: 11.5 },
    ebike: {
      kind: "skip",
      walk: "0:05–0:20",
      ride: "optional",
      saveMin: 5,
      depot: "Parking",
      en: "Short local walk. E-bike is optional, not a reason to pick the crag.",
      de: "Kurzer lokaler Zustieg. E-Bike optional, kein Auswahlgrund."
    }
  },
  seehaus_far: {
    parking: { name: "Seehaus / Ruhpolding", lat: 47.716, lng: 12.608 },
    start: { name: "Hörndlwand", lat: 47.685, lng: 12.635 },
    ebike: {
      kind: "hut",
      walk: "1:30–2:00",
      ride: "0:35–0:50",
      saveMin: 45,
      depot: "Hörndlalm",
      en: "Same as Hörndl: bike the forest road if it is open.",
      de: "Wie Hörndl: Forststraße fahren, wenn offen."
    }
  },
  wendel: {
    parking: { name: "Bayrischzell / Wendelsteinbahn", lat: 47.675, lng: 12.015 },
    start: { name: "Wendelstein", lat: 47.703, lng: 12.012 },
    ebike: { kind: "bahn", walk: "Bahn + short", ride: "—", saveMin: 0, depot: "Valley", en: "Bahn approach.", de: "Bahn-Zustieg." }
  },
  spitzing: {
    parking: { name: "Spitzingsee", lat: 47.665, lng: 11.888 },
    start: { name: "Rotwand / Ruchenköpfe", lat: 47.665, lng: 11.888 },
    ebike: { kind: "hut", walk: "0:50–1:20", ride: "0:15–0:30", saveMin: 25, depot: "Service roads", en: "Some forest roads. Last bit on foot.", de: "Einige Forstwege. Zuletzt zu Fuß." }
  },
  laber: {
    parking: { name: "Oberammergau / Laber", lat: 47.597, lng: 11.064 },
    start: { name: "Laber crag", lat: 47.597, lng: 11.064 },
    ebike: { kind: "skip", walk: "0:10–0:25", ride: "—", saveMin: 5, depot: "Parking", en: "Short.", de: "Kurz." }
  },
  krotten: {
    parking: { name: "Oberau / Esterberg", lat: 47.53, lng: 11.16 },
    start: { name: "Krottenkopf", lat: 47.53, lng: 11.16 },
    ebike: { kind: "forest", walk: "1:20–1:50", ride: "0:30–0:45", saveMin: 40, depot: "Esterberg", en: "Forest road helps.", de: "Forststraße hilft." }
  },
  tegel: {
    parking: { name: "Tegelbergbahn Schwangau", lat: 47.57, lng: 10.756 },
    start: { name: "Tegelberg", lat: 47.57, lng: 10.756 },
    ebike: { kind: "bahn", walk: "Bahn", ride: "—", saveMin: 0, depot: "Valley", en: "Bahn / via ferrata. Not an e-bike wall.", de: "Bahn / Klettersteig." }
  },
  karwendelbahn: {
    parking: { name: "Karwendelbahn Mittenwald", lat: 47.43, lng: 11.276 },
    start: { name: "Westliche Karwendelspitze", lat: 47.43, lng: 11.276 },
    ebike: { kind: "bahn", walk: "from Bergstation", ride: "—", saveMin: 0, depot: "Valley", en: "Bahn.", de: "Bahn." }
  },
  hoellental: {
    parking: { name: "Grainau / Höllental", lat: 47.475, lng: 11.024 },
    start: { name: "Höllental walls", lat: 47.475, lng: 11.024 },
    ebike: { kind: "none", walk: "1:00–1:40", ride: "road to the valley head only", saveMin: 10, depot: "Valley", en: "Steep valley path. E-bike barely helps.", de: "Steiler Talweg. E-Bike kaum." }
  },
  steinplatte: {
    parking: { name: "Waidring / Steinplatte", lat: 47.63, lng: 12.57 },
    start: { name: "Steinplatte", lat: 47.63, lng: 12.57 },
    ebike: { kind: "bahn", walk: "short", ride: "—", saveMin: 0, depot: "Valley", en: "Lift area.", de: "Liftgebiet." }
  },
  untersberg: {
    parking: { name: "Berchtesgaden / Untersbergbahn", lat: 47.63, lng: 12.973 },
    start: { name: "Untersberg", lat: 47.63, lng: 12.973 },
    ebike: { kind: "bahn", walk: "from Bergstation", ride: "—", saveMin: 0, depot: "Valley", en: "Far, and a Bahn. E-bike is not the story.", de: "Weit, und Bahn." }
  },
  multer: {
    parking: { name: "Scheffau / Jägerwirt", lat: 47.529, lng: 12.251 },
    start: { name: "Multerkarwand", lat: 47.5553, lng: 12.2054 },
    ebike: {
      kind: "hut",
      walk: "1:00–1:30",
      ride: "0:20–0:35",
      saveMin: 35,
      depot: "Hochalm / last gate",
      en: "e-bike friendly alm road. Still a sun-side wall.",
      de: "E-Bike-taugliche Almstraße. Trotzdem Sonnenseite."
    }
  }
};

window.ROUTE_HUB = {
  benediktenwand: "bene",
  maximiliansweg: "bene",
  "meiser-wuelfert": "bene",
  winklerfuehre: "bene",
  hoehlenweg: "bene",
  "ostpfeiler-bene": "bene",
  "kamine-steilschlucht": "bene",
  rotoehrlpfeiler: "bene",
  "lebe-deinen-traum": "bene",
  cavemen: "bene",
  "direkte-rippe": "bene",
  "buchstein-nordkante": "buch",
  zauberrippe: "buch",
  simplinella: "buch",
  "rossnadel-westgrat": "buch",
  vronerl: "buch",
  huehnerleiter: "buch",
  "westpfeiler-ross": "buch",
  zwergerlrutschbahn: "buch",
  "suedwand-schmankerl": "buch",
  "mann-oder-memme": "buch",
  "via-weissbier": "buch",
  "plankenstein-ostgrat": "plank",
  "plankenstein-suedwand-reibn": "plank",
  "plankenstein-hitzefrei": "plank",
  risserkogel: "plank",
  rotspitz: "rofan",
  rebitschkante: "rofan",
  "schmid-mueller": "rofan",
  mitteldurchstieg: "rofan",
  "nurnberger-weg": "rofan",
  "hochiss-issplatten": "rofan",
  lichtenluecke: "rofan",
  "klobenjoch-6": "rofan",
  "guffert-suedkante": "guffert",
  "raetische-zeichen": "guffert",
  nebelgespenst: "alpspitz",
  alpspitze: "alpspitz",
  hoellentorkopf: "alpspitz",
  nodlsuppn: "alpspitz",
  "kg-weg": "alpspitz",
  nordwandgesicht: "alpspitz",
  adamplatte: "alpspitz",
  "alpspitz-plaisir": "alpspitz",
  "dacherl-weg": "alpspitz",
  rabnhoamat: "ferchen",
  "ferchensee-sektor": "ferchen",
  "schachen-msl": "ferchen",
  geiselstein: "geisel",
  "geiselstein-ballisto": "geisel",
  "kenzen-nord": "geisel",
  kampenwand: "kampen",
  mechanikerkante: "kampen",
  "kampen-ueberschreitung": "kampen",
  "kampen-torweg": "kampen",
  "kampen-ostwand": "kampen",
  "kampen-sued": "kampen",
  silenzio: "kaiser",
  nordwandliebe: "kaiser",
  ostlerfuehre: "kaiser",
  leuchsfuehre: "kaiser",
  "zettenkaiser-ost": "kaiser",
  bumerang: "kaiser",
  "scheffauer-west": "kaiser",
  sparchen: "sparchen",
  "sparchen-5plus": "sparchen",
  "moewe-jonathan": "sparchen",
  "zahmer-kaiser": "sparchen",
  vorderkaiserfelden: "kaiser",
  "gnadenlosen-drei": "hoerndl",
  schmidkunzweg: "hoerndl",
  "ellmauer-tor": "ellmau",
  "multerkar-abenteurer": "multer",
  "tirol-plaisir": "seeben",
  "seeben-sektor": "seeben",
  "brauneck-msl": "brauneck",
  "gramai-msl": "gramai",
  lamsenspitze: "gramai",
  "unnuetz-nord": "unnuetz",
  "soiern-grat": "soiern",
  "wendelstein-ost": "wendel",
  "rotwand-spitzing": "spitzing",
  "ruchenkoepfe-sued": "spitzing",
  "laber-ammergau": "laber",
  krottenkopf: "krotten",
  "tegelberg-vf": "tegel",
  "karwendelbahn-msl": "karwendelbahn",
  "hollental-msl": "hoellental",
  "steinplatte-sued": "steinplatte",
  untersberg: "untersberg",
  glaswand: "local",
  hohenburg: "local",
  daffensteine: "jachenau",
  "jachenau-crag": "jachenau",
  schreistein: "local",
  "leonhardstein-sued": "buch",
  predigerstuhl: "local",
  seekarkreuz: "brauneck",
  "herzogstand-fels": "local",
  "jochberg-fels": "local",
  probstenwand: "local"
};

window.routeLogistics = function routeLogistics(id) {
  const key = window.ROUTE_HUB[id] || "local";
  const hub = window.APPROACH_HUBS[key];
  if (!hub) return null;
  const start = Object.assign({}, hub.start);
  const wall = window.ROUTE_COORDS && window.ROUTE_COORDS[id];
  if (wall && wall.lat && wall.lng) {
    start.lat = wall.lat;
    start.lng = wall.lng;
  }
  return {
    hub: key,
    parking: hub.parking,
    start,
    ebike: hub.ebike
  };
};

window.ebikeHelps = function ebikeHelps(id) {
  const L = window.routeLogistics(id);
  if (!L || !L.ebike) return false;
  return (L.ebike.kind === "forest" || L.ebike.kind === "hut") && (L.ebike.saveMin || 0) >= 40;
};
