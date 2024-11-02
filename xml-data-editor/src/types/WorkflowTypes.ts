export interface ProductionProgramData {
  products: Array<{
    id: string;
    name: string;
    periods: {
      [key: string]: {
        sales: string;
        production: string;
      };
    };
  }>;
}

export interface MaterialPlanningData {
  items: Array<{
    id: string;
    name: string;
    auftrag: string;
    vorherige: string;
    sicherheit: string;
    lager: string;
    warteschlange: string;
    laufend: string;
    produktion: string;
  }>;
}

export interface CapacityPlanningData {
  productionItems: Array<{
    bezeichnung: string;
    finalesProdukt: string;
    artikelnummer: string;
    produktionsmenge: string;
    workstations: { [key: number]: string };
  }>;
  workstationData: Array<{
    id: number;
    capacityRequirements: string;
    setupTimes: string;
    capacityPreviousPeriods: string;
    totalCapacityRequirements: string;
    overtimes: string;
    overtimePerDays: string;
  }>;
}

export interface ProcurementPlanningData {
  items: Array<{
    produkt: string;
    lieferzeit: string;
    abweichung: string;
    anzahlP1: string;
    anzahlP2: string;
    anzahlP3: string;
    rabattMenge: string;
    lagerbestand: string;
    bedarfPeriodeX: string;
    bedarfPeriodeX1: string;
    bedarfPeriodeX2: string;
    bedarfPeriodeX3: string;
    bestellmenge: string;
    bestelltyp: string;
    ausstehendeBestellung: string;
  }>;
}

export interface ProductionPlanningData {
  orders: Array<{
    id: string;
    articleNumber: string;
    amount: number;
    selected: boolean;
  }>;
}

export interface ResultsData {
  productionProgram: Array<{
    artikel: string;
    produktionsmenge: string;
    direktverkauf: string;
    verkaufsmenge: string;
    verkaufspreis: string;
    strafe: string;
  }>;
  orders: Array<{
    artikel: string;
    menge: string;
    modus: string;
  }>;
  productionPlanning: Array<{
    artikel: string;
    menge: string;
  }>;
  capacityPlanning: Array<{
    station: string;
    uberstunden: string;
    schicht: string;
  }>;
}

export interface WorkflowState {
  currentStep: number;
  productionProgramData: ProductionProgramData | null;
  materialPlanningData: MaterialPlanningData | null;
  capacityPlanningData: CapacityPlanningData | null;
  procurementPlanningData: ProcurementPlanningData | null;
  productionPlanningData: ProductionPlanningData | null;
  resultsData: ResultsData | null;
  setCurrentStep: (step: number) => void;
  setProductionProgramData: (data: ProductionProgramData) => void;
  setMaterialPlanningData: (data: MaterialPlanningData) => void;
  setCapacityPlanningData: (data: CapacityPlanningData) => void;
  setProcurementPlanningData: (data: ProcurementPlanningData) => void;
  setProductionPlanningData: (data: ProductionPlanningData) => void;
  setResultsData: (data: ResultsData) => void;
}
