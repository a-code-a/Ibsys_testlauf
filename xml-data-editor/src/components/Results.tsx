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
  Typography
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { ResultsData } from '../types/WorkflowTypes';

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

  const [productionProgram, setProductionProgram] = useState<any[]>([
    { artikel: 'P1', produktionsmenge: '200', direktverkauf: '0', verkaufsmenge: '200', verkaufspreis: '100', strafe: '0' },
    { artikel: 'P2', produktionsmenge: '150', direktverkauf: '0', verkaufsmenge: '150', verkaufspreis: '100', strafe: '0' },
    { artikel: 'P3', produktionsmenge: '250', direktverkauf: '0', verkaufsmenge: '250', verkaufspreis: '100', strafe: '0' }
  ]);

  const [orders, setOrders] = useState<any[]>([
    { artikel: 'P1', menge: '200', modus: 'Normal' },
    { artikel: 'P2', menge: '150', modus: 'Normal' },
    { artikel: 'P3', menge: '250', modus: 'Normal' }
  ]);

  const [productionPlanning, setProductionPlanning] = useState<any[]>([
    { artikel: '16', menge: '130' },
    { artikel: '17', menge: '450' },
    { artikel: '26', menge: '270' },
    { artikel: '8', menge: '50' },
    { artikel: '14', menge: '40' },
    { artikel: '19', menge: '80' },
    { artikel: '4', menge: '200' }
  ]);

  const [capacityPlanning, setCapacityPlanning] = useState<any[]>([
    { station: '1', uberstunden: '72', schicht: '1' },
    { station: '2', uberstunden: '0', schicht: '1' },
    { station: '3', uberstunden: '32', schicht: '1' },
    { station: '4', uberstunden: '128', schicht: '1' },
    { station: '5', uberstunden: '0', schicht: '0' },
    { station: '6', uberstunden: '126', schicht: '1' },
    { station: '7', uberstunden: '0', schicht: '3' },
    { station: '8', uberstunden: '0', schicht: '3' },
    { station: '9', uberstunden: '0', schicht: '3' },
    { station: '10', uberstunden: '0', schicht: '2' },
    { station: '11', uberstunden: '0', schicht: '2' },
    { station: '12', uberstunden: '0', schicht: '2' },
    { station: '13', uberstunden: '32', schicht: '1' },
    { station: '14', uberstunden: '0', schicht: '1' },
    { station: '15', uberstunden: '234', schicht: '1' }
  ]);

  useEffect(() => {
    const data: ResultsData = {
      productionProgram,
      orders,
      productionPlanning,
      capacityPlanning
    };
    console.log('Setze Results Daten:', data);
    setResultsData(data);
  }, [productionProgram, orders, productionPlanning, capacityPlanning, setResultsData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderTable = (data: any[], columns: string[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{t(column)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex}>{value as string}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={t('ErgebnisseProduktionsprogramm')} />
          <Tab label={t('ErgebnisseBestellungen')} />
          <Tab label={t('ErgebnisseProduktionsplanung')} />
          <Tab label={t('ErgebnisseKapazitätsplanung')} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderTable(productionProgram, ['Artikel', 'Produktionsmenge', 'Direktverkauf', 'Verkaufsmenge', 'Verkaufspreis', 'Strafe'])}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {renderTable(orders, ['Artikel', 'Menge', 'Bestelltyp'])}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {renderTable(productionPlanning, ['Artikel', 'Menge'])}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {renderTable(capacityPlanning, ['Station', 'Überstunden', 'Schicht'])}
      </TabPanel>
    </Paper>
  );
};

export default Results;
