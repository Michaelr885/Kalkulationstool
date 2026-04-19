const APP_CONFIG = {
  "rohrklassen": [
    {
      "id": "edelstahl_v4a",
      "name": "Edelstahl V4A (geschweißt)",
      "dimensionen": ["DN 15", "DN 20", "DN 25", "DN 32", "DN 40", "DN 50", "DN 65", "DN 80", "DN 100"],
      "bauteile": [
        {
          "id": "rohr",
          "bezeichnung": "Rohrleitung montieren",
          "rib_nummer": "1.1.1",
          "zeit_in_minuten": 12.0,
          "einheit": "m",
          "eingabe_art": "eingabe"
        },
        {
          "id": "bogen_90",
          "bezeichnung": "Bogen 90°",
          "rib_nummer": "1.1.2",
          "zeit_in_minuten": 8.5,
          "einheit": "Stk",
          "eingabe_art": "klick"
        },
        {
          "id": "t_stueck",
          "bezeichnung": "T-Stück",
          "rib_nummer": "1.1.3",
          "zeit_in_minuten": 15.0,
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "gueltige_kombinationen": {
            "DN 15": ["DN 15"],
            "DN 20": ["DN 20", "DN 15"],
            "DN 25": ["DN 25", "DN 20", "DN 15"],
            "DN 32": ["DN 32", "DN 25", "DN 20"],
            "DN 40": ["DN 40", "DN 32", "DN 25"],
            "DN 50": ["DN 50", "DN 40", "DN 32", "DN 25"],
            "DN 65": ["DN 65", "DN 50", "DN 40"],
            "DN 80": ["DN 80", "DN 65", "DN 50"],
            "DN 100": ["DN 100", "DN 80", "DN 65"]
          }
        },
        {
          "id": "schweissnaht",
          "bezeichnung": "Schweißnaht",
          "rib_nummer": "1.1.4",
          "zeit_in_minuten": 25.0,
          "einheit": "Stk",
          "eingabe_art": "klick"
        },
        {
          "id": "reduzierung",
          "bezeichnung": "Reduzierung",
          "rib_nummer": "1.1.5",
          "zeit_in_minuten": 10.0,
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "gueltige_kombinationen": {
            "DN 20": ["DN 15"],
            "DN 25": ["DN 20", "DN 15"],
            "DN 32": ["DN 25", "DN 20"],
            "DN 40": ["DN 32", "DN 25"],
            "DN 50": ["DN 40", "DN 32", "DN 25"],
            "DN 65": ["DN 50", "DN 40"],
            "DN 80": ["DN 65", "DN 50"],
            "DN 100": ["DN 80", "DN 65"]
          }
        },
        {
          "id": "flansch",
          "bezeichnung": "Vorschweißflansch",
          "rib_nummer": "1.1.6",
          "zeit_in_minuten": 18.0,
          "einheit": "Stk",
          "eingabe_art": "klick",
          "erlaubte_dns": ["DN 25", "DN 32", "DN 40", "DN 50", "DN 65", "DN 80", "DN 100"]
        }
      ]
    },
    {
      "id": "c_stahl_press",
      "name": "C-Stahl (Presssystem)",
      "dimensionen": ["15 mm", "18 mm", "22 mm", "28 mm", "35 mm", "42 mm", "54 mm"],
      "bauteile": [
        {
          "id": "rohr",
          "bezeichnung": "Rohrleitung (Press)",
          "rib_nummer": "2.1.1",
          "zeit_in_minuten": 5.0,
          "einheit": "m",
          "eingabe_art": "eingabe"
        },
        {
          "id": "bogen_90",
          "bezeichnung": "Pressbogen 90°",
          "rib_nummer": "2.1.2",
          "zeit_in_minuten": 3.0,
          "einheit": "Stk",
          "eingabe_art": "klick"
        },
        {
          "id": "t_stueck",
          "bezeichnung": "Press-T-Stück",
          "rib_nummer": "2.1.3",
          "zeit_in_minuten": 6.0,
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "gueltige_kombinationen": {
            "15 mm": ["15 mm"],
            "18 mm": ["18 mm", "15 mm"],
            "22 mm": ["22 mm", "18 mm", "15 mm"],
            "28 mm": ["28 mm", "22 mm", "18 mm"],
            "35 mm": ["35 mm", "28 mm", "22 mm"],
            "42 mm": ["42 mm", "35 mm", "28 mm"],
            "54 mm": ["54 mm", "42 mm", "35 mm"]
          }
        },
        {
          "id": "reduzierung",
          "bezeichnung": "Press-Reduzierung",
          "rib_nummer": "2.1.4",
          "zeit_in_minuten": 4.0,
          "einheit": "Stk",
          "zweite_dn_auswahl": true,
          "eingabe_art": "zweite_dn_auswahl",
          "gueltige_kombinationen": {
            "18 mm": ["15 mm"],
            "22 mm": ["18 mm", "15 mm"],
            "28 mm": ["22 mm", "18 mm"],
            "35 mm": ["28 mm", "22 mm"],
            "42 mm": ["35 mm", "28 mm"],
            "54 mm": ["42 mm", "35 mm"]
          }
        }
      ]
    }
  ],
  "sonderleistungen": [
    {
      "id": "freigabe",
      "bezeichnung": "Freigabe / Einweisung",
      "rib_nummer": "S-01",
      "zeit_in_minuten": 30.0,
      "einheit": "Stk",
      "eingabe_art": "klick"
    },
    {
      "id": "druckprobe",
      "bezeichnung": "Druckprobe durchführen",
      "rib_nummer": "S-02",
      "zeit_in_minuten": 60.0,
      "einheit": "Stk",
      "eingabe_art": "klick"
    }
  ],
  "zeitfaktoren": [
    { "id": "standard", "name": "Standard", "faktor": 1.0 },
    { "id": "zwangslage", "name": "Zwangslage", "faktor": 1.5 },
    { "id": "ueberkopf", "name": "Überkopf", "faktor": 1.2 }
  ]
};
