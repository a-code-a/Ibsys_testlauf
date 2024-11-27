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
  Tabs,
  Tab,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { MaterialPlanningData, MaterialRowData } from '../types/WorkflowTypes';
import { ApiService } from '../services/apiService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface MaterialPlanningProps {
  forecast: {
    _p1: string;
    _p2: string;
    _p3: string;
  };
  warehousestock: any;
}

const OperatorCell = ({ children }: { children: React.ReactNode }) => (
  <TableCell 
    align="center" 
    sx={{ 
      width: '30px', 
      padding: '0',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#666'
    }}
  >
    {children}
  </TableCell>
);

export default function MaterialPlanning({ forecast, warehousestock }: MaterialPlanningProps) {
  const { t } = useTranslation();
  const { setMaterialPlanningData } = useWorkflowStore();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const [p1Data, setP1Data] = useState<MaterialRowData[]>([]);
  const [p2Data, setP2Data] = useState<MaterialRowData[]>([]);
  const [p3Data, setP3Data] = useState<MaterialRowData[]>([]);

  useEffect(() => {
    const fetchMaterialPlan = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getMaterialPlan();
        
        // Daten nach Produkten aufteilen
        const p1Items = data.filter((item: MaterialRowData) => item.id.startsWith('P1') || item.id === 'E261');
        const p2Items = data.filter((item: MaterialRowData) => item.id.startsWith('P2') || item.id === 'E262');
        const p3Items = data.filter((item: MaterialRowData) => item.id.startsWith('P3') || item.id === 'E263');

        setP1Data(p1Items);
        setP2Data(p2Items);
        setP3Data(p3Items);
        
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Materialplanung:', err);
        setError(t('FehlerBeimLadenDerMaterialplanung'));
        setLoading(false);
      }
    };

    fetchMaterialPlan();
  }, [t]);

  useEffect(() => {
    const allData: MaterialPlanningData = {
      items: [
        ...p1Data,
        ...p2Data,
        ...p3Data
      ]
    };
    setMaterialPlanningData(allData);
  }, [p1Data, p2Data, p3Data, setMaterialPlanningData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleValueChange = (data: MaterialRowData[], setData: React.Dispatch<React.SetStateAction<MaterialRowData[]>>, rowId: string, field: keyof MaterialRowData, value: string) => {
    const newData = data.map(row => {
      if (row.id === rowId) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setData(newData);
  };

  const handleSave = async () => {
    try {
      // Konvertiere die Daten in das Backend-Format
      const backendData = [...p1Data, ...p2Data, ...p3Data].map(item => ({
        delivery_time_fast: parseFloat(item.auftrag) || 0,
        delivery_time_jit_with_deviation: 0, // Default-Wert
        delivery_time_with_deviation: 0, // Default-Wert
        discount_quantity: parseInt(item.sicherheit) || 0,
        future_period_amount: parseInt(item.lager) || 0,
        future_period_arrival: parseFloat(item.warteschlange) || 0,
        initial_stock: parseInt(item.laufend) || 0,
        item_number: parseInt(item.id.replace(/[^\d]/g, '')) || 0,
        order_quantity: parseInt(item.produktion) || 0,
        order_type: 0, // Default-Wert
        requirement_n: parseInt(item.auftrag) || 0,
        requirement_n_plus_one: parseInt(item.vorherige) || 0,
        requirement_n_plus_two: parseInt(item.sicherheit) || 0,
        requirement_n_plus_three: parseInt(item.lager) || 0
      }));

      await ApiService.saveMaterialPlan(backendData);
      setSuccessMessage(t('MaterialplanungErfolgreichGespeichert'));
    } catch (err) {
      console.error('Fehler beim Speichern der Materialplanung:', err);
      setError(t('FehlerBeimSpeichernDerMaterialplanung'));
    }
  };

  const renderMaterialTable = (data: MaterialRowData[], setData: React.Dispatch<React.SetStateAction<MaterialRowData[]>>) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Produkt')}</TableCell>
            <TableCell>{t('Auftrag')}</TableCell>
            <OperatorCell>+</OperatorCell>
            <TableCell>{t('VorherigeWarteschlange')}</TableCell>
            <OperatorCell>+</OperatorCell>
            <TableCell>{t('Sicherheitsbestand')}</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>{t('Lagerbestand')}</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>{t('Warteschlange')}</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>{t('LaufendeArbeiten')}</TableCell>
            <OperatorCell>=</OperatorCell>
            <TableCell>{t('Produktionsauftraege')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <TextField 
                  value={row.auftrag || ''}
                  size="small"
                  disabled
                />
              </TableCell>
              <OperatorCell>+</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.vorherige || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'vorherige', e.target.value)}
                />
              </TableCell>
              <OperatorCell>+</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.sicherheit || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'sicherheit', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.lager || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'lager', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.warteschlange || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'warteschlange', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.laufend || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'laufend', e.target.value)}
                />
              </TableCell>
              <OperatorCell>=</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.produktion || ''}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'produktion', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={t('KinderradTab')} />
          <Tab label={t('DamenradTab')} />
          <Tab label={t('HerrenradTab')} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderMaterialTable(p1Data, setP1Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderMaterialTable(p2Data, setP2Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderMaterialTable(p3Data, setP3Data)}
      </TabPanel>

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
