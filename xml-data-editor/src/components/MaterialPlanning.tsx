import React, { useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Typography,
  Tabs,
  Tab,
  Box
} from '@mui/material';

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

interface MaterialRowData {
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
  const [tabValue, setTabValue] = useState(0);
  
  const getInitialData = (productId: string): MaterialRowData[] => {
    const baseValue = productId === 'P1' ? forecast._p1 : 
                     productId === 'P2' ? forecast._p2 :
                     forecast._p3;
    
    if (productId === 'P1') {
      return [
        { id: 'P1', name: 'P1', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E26', name: 'E26*', auftrag: '200', vorherige: '0', sicherheit: '300', lager: '0', warteschlange: '280', laufend: '10', produktion: '210' },
        { id: 'E51', name: 'E51', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E16', name: 'E16*', auftrag: '250', vorherige: '0', sicherheit: '300', lager: '40', warteschlange: '100', laufend: '10', produktion: '400' },
        { id: 'E17', name: 'E17*', auftrag: '250', vorherige: '0', sicherheit: '300', lager: '150', warteschlange: '0', laufend: '0', produktion: '400' },
        { id: 'E50', name: 'E50', auftrag: '250', vorherige: '0', sicherheit: '100', lager: '0', warteschlange: '50', laufend: '0', produktion: '300' },
        { id: 'E4', name: 'E4', auftrag: '300', vorherige: '50', sicherheit: '100', lager: '250', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E10', name: 'E10', auftrag: '300', vorherige: '50', sicherheit: '100', lager: '0', warteschlange: '390', laufend: '10', produktion: '50' },
        { id: 'E49', name: 'E49', auftrag: '300', vorherige: '50', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '350' },
        { id: 'E7', name: 'E7', auftrag: '350', vorherige: '0', sicherheit: '100', lager: '0', warteschlange: '400', laufend: '0', produktion: '50' },
        { id: 'E13', name: 'E13', auftrag: '350', vorherige: '0', sicherheit: '100', lager: '20', warteschlange: '250', laufend: '0', produktion: '180' },
        { id: 'E18', name: 'E18', auftrag: '350', vorherige: '0', sicherheit: '100', lager: '150', warteschlange: '250', laufend: '0', produktion: '50' }
      ];
    } else if (productId === 'P2') {
      return [
        { id: 'P2', name: 'P2', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E26', name: 'E26*', auftrag: '100', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E56', name: 'E56', auftrag: '100', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E16', name: 'E16*', auftrag: '0', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E17', name: 'E17*', auftrag: '0', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E55', name: 'E55', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E5', name: 'E5', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E11', name: 'E11', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '0', warteschlange: '430', laufend: '10', produktion: '0' },
        { id: 'E54', name: 'E54', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E8', name: 'E8', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '0', warteschlange: '100', laufend: '0', produktion: '0' },
        { id: 'E14', name: 'E14', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '230', warteschlange: '120', laufend: '10', produktion: '0' },
        { id: 'E19', name: 'E19', auftrag: '0', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '90', laufend: '10', produktion: '0' }
      ];
    } else {
      return [
        { id: 'P3', name: 'P3', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E26', name: 'E26*', auftrag: '250', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E31', name: 'E31', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E16', name: 'E16*', auftrag: '150', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E17', name: 'E17*', auftrag: '150', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E30', name: 'E30', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E6', name: 'E6', auftrag: '100', vorherige: '0', sicherheit: '50', lager: '40', warteschlange: '50', laufend: '10', produktion: '50' },
        { id: 'E12', name: 'E12', auftrag: '100', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '250', laufend: '0', produktion: '0' },
        { id: 'E29', name: 'E29', auftrag: '100', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '50' },
        { id: 'E9', name: 'E9', auftrag: '50', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '190', laufend: '10', produktion: '0' },
        { id: 'E15', name: 'E15', auftrag: '50', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '330', laufend: '10', produktion: '0' },
        { id: 'E20', name: 'E20', auftrag: '50', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '200', laufend: '0', produktion: '0' }
      ];
    }
  };

  const [p1Data, setP1Data] = useState(getInitialData('P1'));
  const [p2Data, setP2Data] = useState(getInitialData('P2'));
  const [p3Data, setP3Data] = useState(getInitialData('P3'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderMaterialTable = (data: MaterialRowData[]) => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Produkt</TableCell>
            <TableCell>Auftrag</TableCell>
            <OperatorCell>+</OperatorCell>
            <TableCell>Vorherige Warteschlange</TableCell>
            <OperatorCell>+</OperatorCell>
            <TableCell>Sicherheitsbestand</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>Lagerbestand</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>Warteschlange</TableCell>
            <OperatorCell>-</OperatorCell>
            <TableCell>Laufende Arbeiten</TableCell>
            <OperatorCell>=</OperatorCell>
            <TableCell>Produktionsaufträge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <TextField 
                  value={row.auftrag}
                  size="small"
                  disabled
                />
              </TableCell>
              <OperatorCell>+</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.vorherige}
                  size="small"
                />
              </TableCell>
              <OperatorCell>+</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.sicherheit}
                  size="small"
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.lager}
                  size="small"
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.warteschlange}
                  size="small"
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.laufend}
                  size="small"
                />
              </TableCell>
              <OperatorCell>=</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.produktion}
                  size="small"
                />
              </TableCell>
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
          <Tab label="P1 - Kinderrad" />
          <Tab label="P2 - Damenrad" />
          <Tab label="P3 - Herrenrad" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {renderMaterialTable(p1Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderMaterialTable(p2Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderMaterialTable(p3Data)}
      </TabPanel>
    </Paper>
  );
}
