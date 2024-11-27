export interface ForecastData {
    _p1: string;
    _p2: string;
    _p3: string;
}

export interface ProductItem {
    id: string;
    name: string;
    periods: {
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

// Aktualisierte OrderResult und OrderItem Interfaces
export interface OrderResult {
    id: string;
    article: string;
    article_id: number;
    amount: number;
    order_type: number;
}

export interface OrderItem {
    id: string;
    articleNumber: string;
    amount: number;
    selected?: boolean;
    firstBatch?: number;
    lastBatch?: number;
    period?: number;
    timeNeed?: number;
    workplaceId?: number;
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

export interface SaleAndProductionProgramItem {
    id: string;
    article: string;
    pn: number;
    pnplus_one: number;
    pnplus_two: number;
    pnplus_three: number;
}

export interface ProductionProgramData {
    products: ProductItem[];
}

export interface MaterialPlanningData {
    items?: MaterialRowData[];
}

export interface CapacityPlanningData {
    productionItems?: ProductionItem[];
    workstationData?: WorkstationData[];
}

export interface ProcurementPlanningData {
    items?: ProcurementItem[];
}

export interface ProductionPlanningData {
    orders?: OrderItem[];
}

export interface ProductionProgramResult {
    article: string;
    pn: number;
    pnplus_one: number;
    pnplus_three: number;
    pnplus_two: number;
    id: string;
}

export interface ProductionPlanningResult {
    article: string;
    amount: number;
    workplace_fk: number;
}

export interface CapacityPlanningResult {
    workplace_number: number;
    shifts: number;
    overtime_day: number;
    overtime_week: number;
    setup_time: number;
    capacity_requirement: number;
}

export interface ResultsData {
    productionProgram?: ProductionProgramResult[];
    orders?: OrderResult[];
    productionPlanning?: ProductionPlanningResult[];
    capacityPlanning?: CapacityPlanningResult[];
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
