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
          "typ": "material",
          "einheit": "m",
          "eingabe_art": "eingabe",
          "dimensionen_daten": {
            "DN 15": { "rib": "1.1.1.1", "zeit": 10.0, "bestellname": "Edelstahlrohr V4A 1.4404 18x1.0mm" },
            "DN 20": { "rib": "1.1.1.2", "zeit": 12.0, "bestellname": "Edelstahlrohr V4A 1.4404 22x1.2mm" },
            "DN 25": { "rib": "1.1.1.3", "zeit": 14.5, "bestellname": "Edelstahlrohr V4A 1.4404 28x1.2mm" }
          }
        },
        {
          "id": "bogen_90",
          "bezeichnung": "Bogen 90°",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "klick",
          "dimensionen_daten": {
            "DN 15": { "rib": "1.1.2.1", "zeit": 8.0, "bestellname": "V4A Schweißbogen 90° DN 15" },
            "DN 20": { "rib": "1.1.2.2", "zeit": 9.5, "bestellname": "V4A Schweißbogen 90° DN 20" },
            "DN 25": { "rib": "1.1.2.3", "zeit": 12.0, "bestellname": "V4A Schweißbogen 90° DN 25" }
          }
        },
        {
          "id": "t_stueck",
          "bezeichnung": "T-Stück",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "gueltige_kombinationen": {
            "DN 50": ["DN 50", "DN 40", "DN 32"]
          },
          "dimensionen_daten": {
            "DN 50 / DN 50": { "rib": "1.1.3.1", "zeit": 35.0, "bestellname": "V4A T-Stück egal DN 50" },
            "DN 50 / DN 40": { "rib": "1.1.3.2", "zeit": 32.0, "bestellname": "V4A T-Stück red. 50/40/50" }
          }
        },
        {
          "id": "schweissnaht",
          "bezeichnung": "Schweißnaht",
          "typ": "leistung",
          "rib_nummer": "1.1.4",
          "zeit_in_minuten": 25.0,
          "einheit": "Stk",
          "eingabe_art": "klick"
        }
      ]
    }
  ],
  "sonderleistungen": [
    {
      "id": "freigabe",
      "bezeichnung": "Freigabe / Einweisung",
      "typ": "leistung",
      "rib_nummer": "S-01",
      "zeit_in_minuten": 30.0,
      "einheit": "Stk",
      "eingabe_art": "klick"
    }
  ],
  "zeitfaktoren": [
    { "id": "standard", "name": "Standard", "faktor": 1.0 },
    { "id": "zwangslage", "name": "Zwangslage", "faktor": 1.5 }
  ]
};
