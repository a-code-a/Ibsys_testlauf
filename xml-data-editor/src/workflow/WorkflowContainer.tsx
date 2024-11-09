import React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Alert } from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import ProductionProgram from '../components/ProductionProgram';
import MaterialPlanning from '../components/MaterialPlanning';
import CapacityPlanning from '../components/CapacityPlanning';
import ProcurementPlanning from '../components/ProcurementPlanning';
import ProductionPlanning from '../components/ProductionPlanning';
import Results from '../components/Results';
import { useTranslation } from 'react-i18next';
import {
  productionProgramSchema,
  materialPlanningSchema,
  capacityPlanningSchema,
  procurementPlanningSchema,
  productionPlanningSchema
} from '../schemas/validationSchemas';

const defaultForecast = {
  _p1: "200",
  _p2: "150",
  _p3: "100"
};

export const WorkflowContainer: React.FC = () => {
  const { t } = useTranslation();
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const { 
    currentStep, 
    setCurrentStep,
    productionProgramData,
    materialPlanningData,
    capacityPlanningData,
    procurementPlanningData,
    productionPlanningData
  } = useWorkflowStore();

  const steps = [
    t('Produktionsprogramm'),
    t('Materialplanung'),
    t('Kapazitätsplanung'),
    t('Beschaffungsplanung'),
    t('Produktionsplanung'),
    t('Ergebnisse')
  ];

  const handleNext = () => {
    setValidationError(null);
    console.log('Validiere Schritt', currentStep, 'mit Daten:', getCurrentStepData());
    if (validateCurrentStep()) {
      console.log('Validierung erfolgreich, gehe zu Schritt', currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Validierung fehlgeschlagen');
    }
  };

  const handleBack = () => {
    setValidationError(null);
    setCurrentStep(currentStep - 1);
  };

  const getCurrentStepData = () => {
    switch (currentStep) {
      case 0:
        return productionProgramData;
      case 1:
        return materialPlanningData;
      case 2:
        return capacityPlanningData;
      case 3:
        return procurementPlanningData;
      case 4:
        return productionPlanningData;
      default:
        return null;
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentData = getCurrentStepData();
    console.log('Aktuelle Daten für Validierung:', currentData);
    
    if (!currentData) {
      setValidationError('Keine Daten für diesen Schritt vorhanden');
      return false;
    }

    try {
      switch (currentStep) {
        case 0:
          productionProgramSchema.parse(currentData);
          break;
        case 1:
          materialPlanningSchema.parse(currentData);
          break;
        case 2:
          capacityPlanningSchema.parse(currentData);
          break;
        case 3:
          procurementPlanningSchema.parse(currentData);
          break;
        case 4:
          productionPlanningSchema.parse(currentData);
          break;
        default:
          return true;
      }
      return true;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Validierungsfehler:', error);
        setValidationError(error.message);
      } else {
        console.error('Unbekannter Validierungsfehler:', error);
        setValidationError('Ein Validierungsfehler ist aufgetreten');
      }
      return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProductionProgram 
            forecast={defaultForecast}
          />
        );
      case 1:
        return (
          <MaterialPlanning 
            forecast={defaultForecast}
            warehousestock={{}}
          />
        );
      case 2:
        return <CapacityPlanning />;
      case 3:
        return <ProcurementPlanning />;
      case 4:
        return <ProductionPlanning />;
      case 5:
        return <Results />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {validationError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {validationError}
        </Alert>
      )}

      <Box sx={{ mt: 2, mb: 2 }}>
        {renderStepContent()}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {currentStep > 0 && (
          <Button
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {t('Zurück')}
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ 
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293'
              }
            }}
          >
            {t('Weiter')}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              console.log('Workflow abgeschlossen', {
                productionProgramData,
                materialPlanningData,
                capacityPlanningData,
                procurementPlanningData,
                productionPlanningData
              });
            }}
            sx={{ 
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#1b5e20'
              }
            }}
          >
            {t('Abschließen')}
          </Button>
        )}
      </Box>
    </Box>
  );
};
