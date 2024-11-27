import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
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
import { 
  ResultsData, 
  ProductionProgramResult,
  OrderResult,
  ProductionPlanningResult,
  CapacityPlanningResult
} from '../types/WorkflowTypes';
import { ApiService } from '../services/apiService';
import RefreshIcon from '@mui/icons-material/Refresh';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Results: React.FC = () => {
  const { t } = useTranslation();
  const { setResultsData } = useWorkflowStore();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [productionProgram, setProductionProgram] = useState<ProductionProgramResult[]>([]);
  const [orders, setOrders] = useState<OrderResult[]>([]);
  const [productionPlanning, setProductionPlanning] = useState<ProductionPlanningResult[]>([]);
  const [capacityPlanning, setCapacityPlanning] = useState<CapacityPlanningResult[]>([]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getResults();
      
      setProductionProgram(data.productionProgram || []);
      setOrders(data.orders || []);
      setProductionPlanning(data.productionPlanning || []);
      setCapacityPlanning(data.capacityPlanning || []);
      
      setLoading(false);
    } catch (err) {
      console.error('Fehler beim Laden der Ergebnisse:', err);
      setError(t('FehlerBeimLadenDerErgebnisse'));
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await ApiService.refreshResults({});
      await fetchResults();
      setSuccessMessage(t('ErgebnisseErfolgreichAktualisiert'));
      setRefreshing(false);
    } catch (err) {
      console.error('Fehler beim Aktualisieren der Ergebnisse:', err);
      setError(t('FehlerBeimAktualisierenDerErgebnisse'));
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    const data: ResultsData = {
      productionProgram,
      orders,
      productionPlanning,
      capacityPlanning
    };
    setResultsData(data);
  }, [productionProgram, orders, productionPlanning, capacityPlanning, setResultsData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderProductionProgramTable = (data: ProductionProgramResult[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Artikel')}</TableCell>
            <TableCell>{t('AktuelleProduktion')}</TableCell>
            <TableCell>{t('ProduktionN1')}</TableCell>
            <TableCell>{t('ProduktionN2')}</TableCell>
            <TableCell>{t('ProduktionN3')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.article}</TableCell>
              <TableCell>{row.pn}</TableCell>
              <TableCell>{row.pnplus_one}</TableCell>
              <TableCell>{row.pnplus_two}</TableCell>
              <TableCell>{row.pnplus_three}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderOrdersTable = (data: OrderResult[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Artikel')}</TableCell>
            <TableCell>{t('ArtikelNummer')}</TableCell>
            <TableCell>{t('Menge')}</TableCell>
            <TableCell>{t('Bestelltyp')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.article}</TableCell>
              <TableCell>{row.article_id}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.order_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProductionPlanningTable = (data: ProductionPlanningResult[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('Artikel')}</TableCell>
            <TableCell>{t('Menge')}</TableCell>
            <TableCell>{t('Arbeitsplatz')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.article}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.workplace_fk}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCapacityPlanningTable = (data: CapacityPlanningResult[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('ArbeitsplatzNummer')}</TableCell>
            <TableCell>{t('Schichten')}</TableCell>
            <TableCell>{t('ÜberstundenTag')}</TableCell>
            <TableCell>{t('ÜberstundenWoche')}</TableCell>
            <TableCell>{t('Rüstzeit')}</TableCell>
            <TableCell>{t('Kapazitätsbedarf')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.workplace_number}</TableCell>
              <TableCell>{row.shifts}</TableCell>
              <TableCell>{row.overtime_day}</TableCell>
              <TableCell>{row.overtime_week}</TableCell>
              <TableCell>{row.setup_time}</TableCell>
              <TableCell>{row.capacity_requirement}</TableCell>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={t('ErgebnisseProduktionsprogramm')} />
          <Tab label={t('ErgebnisseBestellungen')} />
          <Tab label={t('ErgebnisseProduktionsplanung')} />
          <Tab label={t('ErgebnisseKapazitätsplanung')} />
        </Tabs>
        <Button
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{ mr: 2 }}
        >
          {refreshing ? t('Aktualisiere...') : t('Aktualisieren')}
        </Button>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderProductionProgramTable(productionProgram)}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderOrdersTable(orders)}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderProductionPlanningTable(productionPlanning)}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {renderCapacityPlanningTable(capacityPlanning)}
      </TabPanel>

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
};

export default Results;
