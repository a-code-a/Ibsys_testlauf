import { create } from 'zustand';
import { 
  WorkflowState,
  ProductionProgramData,
  MaterialPlanningData,
  CapacityPlanningData,
  ProcurementPlanningData,
  ProductionPlanningData,
  ResultsData
} from '../types/WorkflowTypes';

export const useWorkflowStore = create<WorkflowState>((set) => ({
  currentStep: 0,
  productionProgramData: null,
  materialPlanningData: null,
  capacityPlanningData: null,
  procurementPlanningData: null,
  productionPlanningData: null,
  resultsData: null,

  setCurrentStep: (step: number) => set({ currentStep: step }),
  setProductionProgramData: (data: ProductionProgramData) => 
    set({ productionProgramData: data }),
  setMaterialPlanningData: (data: MaterialPlanningData) => 
    set({ materialPlanningData: data }),
  setCapacityPlanningData: (data: CapacityPlanningData) => 
    set({ capacityPlanningData: data }),
  setProcurementPlanningData: (data: ProcurementPlanningData) => 
    set({ procurementPlanningData: data }),
  setProductionPlanningData: (data: ProductionPlanningData) => 
    set({ productionPlanningData: data }),
  setResultsData: (data: ResultsData) => 
    set({ resultsData: data }),
}));
