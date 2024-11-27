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
import { ProcurementPlanningData, ProcurementItem } from '../types/WorkflowTypes';
import { ApiService } from '../services/apiService';

const getTrafficLightColor = (lagerbestand: string | undefined, bedarf: string | undefined): string => {
  const lagerbestandNum = parseFloat(lagerbestand || '0');
  const bedarfNum = parseFloat(bedarf || '0');
  
  if (isNaN(lagerbestandNum) || isNaN(bedarfNum)) return 'gray';
  
  const ratio = lagerbestandNum / bedarfNum;
  
  if (ratio > 1.5) return 'green';
  if (ratio > 0.5) return 'yellow';
  return 'red';
};

export default function ProcurementPlanning() {
  const { t } = useTranslation();
  const { setProcurementPlanningData } = useWorkflowStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [procurementItems, setProcurementItems] = useState<ProcurementItem[]>([]);

  useEffect(() => {
    const fetchProcurementPlan = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProcurementPlan();
        setProcurementItems(data.items || []);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Beschaffungsplanung:', err);
        setError(t('FehlerBeimLadenDerBeschaffungsplanung'));
        setLoading(false);
      }
    };

    fetchProcurementPlan();
  }, [t]);

  useEffect(() => {
    const data: ProcurementPlanningData = { 
      items: procurementItems 
    };
    setProcurementPlanningData(data);
  }, [procurementItems, setProcurementPlanningData]);

  const handleValueChange = (index: number, field: keyof ProcurementItem, value: string) => {
    const newItems = [...procurementItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setProcurementItems(newItems);
  };

  const handleSave = async () => {
    try {
      // Konvertiere die Daten in das Backend-Format
      const backendData = procurementItems.map(item => ({
        delivery_time_fast: parseFloat(item.lieferzeit) || 0,
        delivery_time_jit_with_deviation: parseFloat(item.abweichung) || 0,
        delivery_time_with_deviation: parseFloat(item.abweichung) || 0,
        discount_quantity: parseInt(item.rabattMenge) || 0,
        future_period_amount: parseInt(item.bestellmenge) || 0,
        future_period_arrival: parseFloat(item.lieferzeit) || 0,
        initial_stock: parseInt(item.lagerbestand) || 0,
        item_number: parseInt(item.produkt.replace(/[^\d]/g, '')) || 0,
        order_quantity: parseInt(item.bestellmenge) || 0,
        order_type: parseInt(item.bestelltyp) || 0,
        requirement_n: parseInt(item.bedarfPeriodeX) || 0,
        requirement_n_plus_one: parseInt(item.bedarfPeriodeX1) || 0,
        requirement_n_plus_two: parseInt(item.bedarfPeriodeX2) || 0,
        requirement_n_plus_three: parseInt(item.bedarfPeriodeX3) || 0
      }));

      await ApiService.saveProcurementPlan(backendData);
      setSuccessMessage(t('BeschaffungsplanungErfolgreichGespeichert'));
    } catch (err) {
      console.error('Fehler beim Speichern der Beschaffungsplanung:', err);
      setError(t('FehlerBeimSpeichernDerBeschaffungsplanung'));
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
              <TableCell>{t('Produkt')}</TableCell>
              <TableCell>{t('Lieferzeit')}</TableCell>
              <TableCell>{t('Abweichung')}</TableCell>
              <TableCell>{t('AnzahlP1')}</TableCell>
              <TableCell>{t('AnzahlP2')}</TableCell>
              <TableCell>{t('AnzahlP3')}</TableCell>
              <TableCell>{t('RabattMenge')}</TableCell>
              <TableCell>{t('Lagerüberbestand')}</TableCell>
              <TableCell>{t('BedarfPeriodeX')}</TableCell>
              <TableCell>{t('BedarfPeriodeX1')}</TableCell>
              <TableCell>{t('BedarfPeriodeX2')}</TableCell>
              <TableCell>{t('BedarfPeriodeX3')}</TableCell>
              <TableCell>{t('Bestellmenge')}</TableCell>
              <TableCell>{t('Bestelltyp')}</TableCell>
              <TableCell>{t('AusstehendeBestellung')}</TableCell>
              <TableCell>{t('Dringlichkeit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {procurementItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.produkt}</TableCell>
                <TableCell>
                  <TextField
                    value={item.lieferzeit || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'lieferzeit', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.abweichung || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'abweichung', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP1 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'anzahlP1', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP2 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'anzahlP2', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP3 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'anzahlP3', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.rabattMenge || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'rabattMenge', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.lagerbestand || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'lagerbestand', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bedarfPeriodeX', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX1 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bedarfPeriodeX1', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX2 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bedarfPeriodeX2', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX3 || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bedarfPeriodeX3', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bestellmenge || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bestellmenge', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bestelltyp || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'bestelltyp', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.ausstehendeBestellung || ''}
                    size="small"
                    onChange={(e) => handleValueChange(index, 'ausstehendeBestellung', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Box 
                    sx={{ 
                      width: 30, 
                      height: 30, 
                      borderRadius: '50%', 
                      backgroundColor: getTrafficLightColor(item.lagerbestand, item.bedarfPeriodeX),
                      margin: 'auto'
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
