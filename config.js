const APP_CONFIG = {
  "rohrklassen": [
    {
      "id": "edelstahl_v4a",
      "name": "Edelstahl V4A",
      "dimensionen": [
        "DN 15",
        "DN 20",
        "DN 25"
      ],
      "bauteile": [
        {
          "id": "rohr",
          "bezeichnung": "Rohrleitung",
          "typ": "material",
          "einheit": "m",
          "eingabe_art": "eingabe",
          "dimensionen_daten": {
            "DN 15": {
              "rib": "1.1.1.1",
              "zeit": 10,
              "bestellname": "Edelstahlrohr 18x1.0"
            },
            "DN 20": {
              "rib": "1.1.1.2",
              "zeit": 12,
              "bestellname": "Edelstahlrohr 22x1.2"
            },
            "DN 25": {
              "rib": "1.1.1.3",
              "zeit": 14.5,
              "bestellname": "Edelstahlrohr 28x1.2"
            }
          }
        },
        {
          "id": "bogen_90",
          "bezeichnung": "Bogen 90°",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "klick",
          "dimensionen_daten": {
            "DN 15": {
              "rib": "1.1.2.1",
              "zeit": 8,
              "bestellname": "Schweißbogen 90° DN15"
            },
            "DN 20": {
              "rib": "1.1.2.2",
              "zeit": 9.5,
              "bestellname": "Schweißbogen 90° DN20"
            }
          }
        },
        {
          "id": "t_stueck",
          "bezeichnung": "T-Stück",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "dimensionen_daten": {
            "DN 15 / DN 15": {
              "rib": "1.1.3.1",
              "zeit": 35,
              "bestellname": "V4A T-Stück egal DN 15"
            },
            "DN 20 / DN 15": {
              "rib": "1.1.3.2",
              "zeit": 32,
              "bestellname": "V4A T-Stück red. 20/15"
            }
          },
          "gueltige_kombinationen": {
            "DN 15": [
              "DN 15"
            ],
            "DN 20": [
              "DN 15"
            ]
          }
        },
        {
          "id": "reduzierung",
          "bezeichnung": "Reduzierung",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "zweite_dn_auswahl",
          "dimensionen_daten": {
            "DN 20 / DN 15": {
              "rib": "1.1.5.1",
              "zeit": 12,
              "bestellname": "V4A Reduzierung 22x18"
            }
          },
          "gueltige_kombinationen": {
            "DN 20": [
              "DN 15"
            ]
          }
        },
        {
          "id": "schweissnaht",
          "bezeichnung": "Schweißnaht",
          "typ": "material",
          "einheit": "Stk",
          "eingabe_art": "klick",
          "dimensionen_daten": {},
          "rib_nummer": "01.01.2004",
          "zeit_in_minuten": 25
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
      "zeit_in_minuten": 30,
      "einheit": "Stk",
      "eingabe_art": "klick"
    },
    {
      "id": "Test",
      "bezeichnung": "Testlauf",
      "typ": "leistung",
      "rib_nummer": "S-02",
      "zeit_in_minuten": 40,
      "einheit": "Stk",
      "eingabe_art": "klick"
    }
  ],
  "zeitfaktoren": [
    {
      "id": "standard",
      "name": "Standard",
      "faktor": 1
    },
    {
      "id": "zwangslage",
      "name": "Zwangslage",
      "faktor": 1.5
    }
  ]
};