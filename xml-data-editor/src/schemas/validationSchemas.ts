import { z } from 'zod';

export const productionProgramSchema = z.object({
  products: z.array(z.object({
    id: z.string(),
    name: z.string(),
    periods: z.record(z.object({
      sales: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
      production: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
    }))
  }))
});

export const materialPlanningSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    auftrag: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    vorherige: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    sicherheit: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    lager: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    warteschlange: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    laufend: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    produktion: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  }))
});

export const capacityPlanningSchema = z.object({
  productionItems: z.array(z.object({
    bezeichnung: z.string(),
    finalesProdukt: z.string(),
    artikelnummer: z.string(),
    produktionsmenge: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    workstations: z.record(z.string().regex(/^\d+$/, "Muss eine Zahl sein"))
  })),
  workstationData: z.array(z.object({
    id: z.number(),
    capacityRequirements: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    setupTimes: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    capacityPreviousPeriods: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    totalCapacityRequirements: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    overtimes: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    overtimePerDays: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  }))
});

export const procurementPlanningSchema = z.object({
  items: z.array(z.object({
    produkt: z.string(),
    lieferzeit: z.string().regex(/^\d+(\.\d+)?$/, "Muss eine Zahl oder Dezimalzahl sein"),
    abweichung: z.string().regex(/^\d+(\.\d+)?$/, "Muss eine Zahl oder Dezimalzahl sein"),
    anzahlP1: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    anzahlP2: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    anzahlP3: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    rabattMenge: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    lagerbestand: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bedarfPeriodeX: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bedarfPeriodeX1: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bedarfPeriodeX2: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bedarfPeriodeX3: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bestellmenge: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    bestelltyp: z.string(),
    ausstehendeBestellung: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  }))
});

export const productionPlanningSchema = z.object({
  orders: z.array(z.object({
    id: z.string(),
    articleNumber: z.string(),
    amount: z.number().min(0, "Muss eine positive Zahl sein"),
    selected: z.boolean()
  }))
});

export const resultsSchema = z.object({
  productionProgram: z.array(z.object({
    artikel: z.string(),
    produktionsmenge: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    direktverkauf: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    verkaufsmenge: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    verkaufspreis: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    strafe: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  })),
  orders: z.array(z.object({
    artikel: z.string(),
    menge: z.string(),
    modus: z.string()
  })),
  productionPlanning: z.array(z.object({
    artikel: z.string(),
    menge: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  })),
  capacityPlanning: z.array(z.object({
    station: z.string(),
    uberstunden: z.string().regex(/^\d+$/, "Muss eine Zahl sein"),
    schicht: z.string().regex(/^\d+$/, "Muss eine Zahl sein")
  }))
});
