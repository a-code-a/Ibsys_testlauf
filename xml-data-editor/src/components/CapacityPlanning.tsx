import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { CapacityPlanningData, ProductionItem, WorkstationData } from '../types/WorkflowTypes';
import { ApiService } from '../services/apiService';

export default function CapacityPlanning() {
  const { t } = useTranslation();
  const { setCapacityPlanningData } = useWorkflowStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initWorkstations = () => {
    const ws: {[key: number]: string} = {};
    for (let i = 1; i <= 15; i++) {
      ws[i] = "0";
    }
    return ws;
  };

  const [productionItems, setProductionItems] = useState<ProductionItem[]>([]);
  const [workstationData, setWorkstationData] = useState<WorkstationData[]>([]);

  useEffect(() => {
    const fetchCapacityPlan = async () => {
      try {
        setLoading(true);
        const [capacityData, sumUpData] = await Promise.all([
          ApiService.getCapacityPlan(),
          ApiService.getCapacityPlanSumUp()
        ]);

        if (capacityData?.productionItems) {
          setProductionItems(capacityData.productionItems);
        }
        if (sumUpData?.workstationData) {
          setWorkstationData(sumUpData.workstationData);
        }

        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Kapazitätsplanung:', err);
        setError(t('FehlerBeimLadenDerKapazitaetsplanung'));
        setLoading(false);
      }
    };

    fetchCapacityPlan();
  }, [t]);

  useEffect(() => {
    const data: CapacityPlanningData = {
      productionItems,
      workstationData
    };
    setCapacityPlanningData(data);
  }, [productionItems, workstationData, setCapacityPlanningData]);

  const handleProductionItemChange = (index: number, field: keyof ProductionItem, value: string) => {
    const newItems = [...productionItems];
    if (field === 'produktionsmenge') {
      newItems[index].produktionsmenge = value;
    }
    setProductionItems(newItems);
  };

  const handleWorkstationChange = (itemIndex: number, stationId: number, value: string) => {
    const newItems = [...productionItems];
    newItems[itemIndex].workstations[stationId] = value;
    setProductionItems(newItems);
  };

  const handleWorkstationDataChange = (stationId: number, field: keyof WorkstationData, value: string) => {
    const newData = workstationData.map(station => {
      if (station.id === stationId) {
        return { ...station, [field]: value };
      }
      return station;
    });
    setWorkstationData(newData);
  };

  const handleSave = async () => {
    try {
      // Konvertiere Produktionsdaten in das Backend-Format
      const capacityPlanData = productionItems.map(item => ({
        article: item.bezeichnung,
        article_number: parseInt(item.artikelnummer),
        quantity: parseInt(item.produktionsmenge),
        workplace1: parseInt(item.workstations[1] || "0"),
        workplace2: parseInt(item.workstations[2] || "0"),
        workplace3: parseInt(item.workstations[3] || "0"),
        workplace4: parseInt(item.workstations[4] || "0"),
        workplace6: parseInt(item.workstations[6] || "0"),
        workplace7: parseInt(item.workstations[7] || "0"),
        workplace8: parseInt(item.workstations[8] || "0"),
        workplace9: parseInt(item.workstations[9] || "0"),
        workplace10: parseInt(item.workstations[10] || "0"),
        workplace11: parseInt(item.workstations[11] || "0"),
        workplace12: parseInt(item.workstations[12] || "0"),
        workplace13: parseInt(item.workstations[13] || "0"),
        workplace14: parseInt(item.workstations[14] || "0"),
        workplace15: parseInt(item.workstations[15] || "0")
      }));

      // Konvertiere Arbeitsplatzdaten in das Backend-Format
      const capacityPlanSumUpData = workstationData.map(station => ({
        work_place_number: station.id,
        capacity_requirement: parseInt(station.capacityRequirements),
        capacity_requirement_backlog_prev_period: parseInt(station.capacityPreviousPeriods),
        overtime_day: parseInt(station.overtimePerDays),
        overtime_week: parseInt(station.overtimes),
        setup_time: parseInt(station.setupTimes),
        setup_time_backlog_prev_period: 0, // Default-Wert
        shifts: 1, // Default-Wert
        total_capacity_requirements: parseInt(station.totalCapacityRequirements)
      }));

      await Promise.all([
        ApiService.saveCapacityPlan(capacityPlanData),
        ApiService.saveCapacityPlanSumUp(capacityPlanSumUpData)
      ]);
      
      setSuccessMessage(t('KapazitaetsplanungErfolgreichGespeichert'));
    } catch (err) {
      console.error('Fehler beim Speichern der Kapazitätsplanung:', err);
      setError(t('FehlerBeimSpeichernDerKapazitaetsplanung'));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('Bezeichnung')}</TableCell>
              <TableCell>{t('FinalesProdukt')}</TableCell>
              <TableCell>{t('Artikelnummer')}</TableCell>
              <TableCell>{t('Produktionsmenge')}</TableCell>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                <TableCell key={station} align="center">
                  {t('Arbeitsplatz')} {station}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productionItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.bezeichnung}</TableCell>
                <TableCell>{item.finalesProdukt}</TableCell>
                <TableCell>{item.artikelnummer}</TableCell>
                <TableCell>
                  <TextField
                    value={item.produktionsmenge}
                    size="small"
                    onChange={(e) => handleProductionItemChange(index, 'produktionsmenge', e.target.value)}
                  />
                </TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={item.workstations[station]}
                      size="small"
                      onChange={(e) => handleWorkstationChange(index, station, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Kapazitätsberechnung')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station} align="center">
                    {t('Arbeitsplatz')} {station}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{t('Kapazitätsbedarf')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityRequirements || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'capacityRequirements', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('Rüstzeiten')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.setupTimes || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'setupTimes', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('KapazitätVorperioden')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityPreviousPeriods || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'capacityPreviousPeriods', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('GesamtKapazitätsbedarf')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.totalCapacityRequirements || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'totalCapacityRequirements', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('Überstunden')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimes || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'overtimes', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('ÜberstundenProTag')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimePerDays || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'overtimePerDays', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
        >
          {t('Speichern')}
        </Button>
      </Box>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage(null)}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
