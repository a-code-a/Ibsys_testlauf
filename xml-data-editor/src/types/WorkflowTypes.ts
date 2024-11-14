export interface ForecastData {
    _p1: string;
    _p2: string;
    _p3: string;
}

export interface ProductItem {
    id: string;
    name: string;
    periods?: {
        [key: string]: {
            sales: string;
            production: string;
        }
    };
}

export interface ProductionItem {
    bezeichnung: string;
    finalesProdukt: string;
    artikelnummer: string;
    produktionsmenge: string;
    workstations: {[key: number]: string};
}

export interface WorkstationData {
    id: number;
    capacityRequirements: string;
    setupTimes: string;
    capacityPreviousPeriods: string;
    totalCapacityRequirements: string;
    overtimes: string;
    overtimePerDays: string;
}

export interface MaterialRowData {
    id: string;
    name: string;
    auftrag: string;
    vorherige: string;
    sicherheit: string;
    lager: string;
    warteschlange: string;
    laufend: string;
    produktion: string;
}

export interface OrderItem {
    id: string;
    articleNumber: string;
    amount: number;
    selected?: boolean;
    [key: string]: any;
}

export interface ProcurementItem {
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
}

export interface ProductionProgramData {
    products?: ProductItem[];
    [key: string]: any;
}

export interface MaterialPlanningData {
    items?: MaterialRowData[];
    [key: string]: any;
}

export interface CapacityPlanningData {
    productionItems?: ProductionItem[];
    workstationData?: WorkstationData[];
    [key: string]: any;
}

export interface ProcurementPlanningData {
    items?: ProcurementItem[];
    [key: string]: any;
}

export interface ProductionPlanningData {
    orders?: OrderItem[];
    [key: string]: any;
}

export interface ResultsData {
    productionProgram?: any[];
    orders?: any[];
    productionPlanning?: any[];
    capacityPlanning?: any[];
    [key: string]: any;
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
