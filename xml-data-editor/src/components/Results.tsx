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
  Box
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';

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

const Results: React.FC = () => {
  const { t } = useTranslation();
  const { setResultsData } = useWorkflowStore();
  const [tabValue, setTabValue] = useState(0);

  const [productionProgram] = useState([
    { artikel: 'P1', produktionsmenge: '200', direktverkauf: '0', verkaufsmenge: '0', verkaufspreis: '0', strafe: '0' },
    { artikel: 'P2', produktionsmenge: '150', direktverkauf: '0', verkaufsmenge: '0', verkaufspreis: '0', strafe: '0' },
    { artikel: 'P3', produktionsmenge: '100', direktverkauf: '0', verkaufsmenge: '0', verkaufspreis: '0', strafe: '0' }
  ]);

  const [orders] = useState([
    { artikel: 'Nothing to order', menge: '', modus: '' }
  ]);

  const [productionPlanning] = useState([
    { artikel: '16', menge: '130' },
    { artikel: '17', menge: '450' },
    { artikel: '26', menge: '270' },
    { artikel: '8', menge: '50' },
    { artikel: '14', menge: '40' },
    { artikel: '19', menge: '80' },
    { artikel: '4', menge: '200' }
  ]);

  const [capacityPlanning] = useState([
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
    const data = {
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
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Artikel')}</TableCell>
                <TableCell>{t('Produktionsmenge')}</TableCell>
                <TableCell>{t('Direktverkauf')}</TableCell>
                <TableCell>{t('Verkaufsmenge')}</TableCell>
                <TableCell>{t('Verkaufspreis')}</TableCell>
                <TableCell>{t('Strafe')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionProgram.map((row) => (
                <TableRow key={row.artikel}>
                  <TableCell>{row.artikel}</TableCell>
                  <TableCell>{row.produktionsmenge}</TableCell>
                  <TableCell>{row.direktverkauf}</TableCell>
                  <TableCell>{row.verkaufsmenge}</TableCell>
                  <TableCell>{row.verkaufspreis}</TableCell>
                  <TableCell>{row.strafe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Artikel')}</TableCell>
                <TableCell>{t('Menge')}</TableCell>
                <TableCell>{t('Bestelltyp')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.artikel}>
                  <TableCell>{row.artikel}</TableCell>
                  <TableCell>{row.menge}</TableCell>
                  <TableCell>{row.modus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Artikel')}</TableCell>
                <TableCell>{t('Menge')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productionPlanning.map((row) => (
                <TableRow key={row.artikel}>
                  <TableCell>{row.artikel}</TableCell>
                  <TableCell>{row.menge}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Station')}</TableCell>
                <TableCell>{t('Überstunden')}</TableCell>
                <TableCell>{t('Schicht')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {capacityPlanning.map((row) => (
                <TableRow key={row.station}>
                  <TableCell>{row.station}</TableCell>
                  <TableCell>{row.uberstunden}</TableCell>
                  <TableCell>{row.schicht}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Paper>
  );
};

export default Results;
