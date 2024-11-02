# Supply Chain Management Tool

Ein Workflow-basiertes Tool zur Verwaltung der Supply Chain mit verschiedenen Planungsschritten.

## Funktionen

- Schrittweiser Workflow durch verschiedene Planungsphasen
- Validierung der Eingaben in jedem Schritt
- Zentrale Datenverwaltung
- XML Import/Export

## Workflow-Schritte

1. **Produktionsprogramm**
   - Planung der Produktionsmengen
   - Prognosen für verschiedene Perioden

2. **Materialplanung**
   - Verwaltung von Lagerbeständen
   - Berechnung von Produktionsaufträgen

3. **Kapazitätsplanung**
   - Workstation-Auslastung
   - Überstundenplanung

4. **Beschaffungsplanung**
   - Bestellmengen
   - Lieferzeiten

5. **Produktionsplanung**
   - Auftragsreihenfolge
   - Produktionsmengen

6. **Ergebnisse**
   - Übersicht aller Planungsergebnisse
   - Exportmöglichkeit

## Technische Details

### Datenvalidierung

Jeder Schritt verwendet Zod-Schemas zur Validierung der Eingaben:
- Numerische Werte werden auf Gültigkeit geprüft
- Pflichtfelder werden überprüft
- Bereichsvalidierung für spezifische Werte

### Datenverwaltung

Die Daten werden zentral mit Zustand verwaltet:
- Jeder Schritt hat seinen eigenen Datenzustand
- Daten werden zwischen Schritten weitergegeben
- Änderungen werden sofort gespeichert

### Navigation

- Vor- und Zurück-Navigation zwischen Schritten
- Validierung vor dem Fortschreiten
- Fehleranzeige bei ungültigen Daten

## Verwendung

1. XML-Datei hochladen
2. Durch die Planungsschritte navigieren
3. Daten in jedem Schritt eingeben/anpassen
4. Validierung der Eingaben
5. Zum nächsten Schritt weitergehen
6. Am Ende die Ergebnisse exportieren

## Entwicklung

### Installation

```bash
npm install
```

### Entwicklungsserver starten

```bash
npm start
```

### Neue Komponente hinzufügen

1. Komponente in `src/components` erstellen
2. Schema in `src/schemas` definieren
3. Typen in `src/types` hinzufügen
4. In den Workflow in `WorkflowContainer.tsx` integrieren

### Validierung erweitern

1. Schema in `validationSchemas.ts` definieren
2. In `WorkflowContainer.tsx` zur Validierungslogik hinzufügen
3. Fehlermeldungen anpassen

## Projektstruktur

```
src/
  ├── components/     # React-Komponenten
  ├── schemas/       # Zod Validierungsschemas
  ├── store/         # Zustand Store
  ├── types/         # TypeScript Typen
  ├── utils/         # Hilfsfunktionen
  └── workflow/      # Workflow-Komponenten
