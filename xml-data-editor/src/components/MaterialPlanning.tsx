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

export default function MaterialPlanning({ forecast, warehousestock }: MaterialPlanningProps) {
  const [tabValue, setTabValue] = useState(0);
  
  const getInitialData = (productId: string): MaterialRowData[] => {
    const baseValue = productId === 'P1' ? forecast._p1 : 
                     productId === 'P2' ? forecast._p2 : 
                     forecast._p3;
    
    if (productId === 'P1') {
      return [
        { id: 'P1', name: 'P1', auftrag: baseValue, vorherige: '0', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E26', name: 'E26', auftrag: baseValue, vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '40', laufend: '20', produktion: '140' },
        { id: 'E51', name: 'E51', auftrag: baseValue, vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        // ... weitere Zeilen für P1
      ];
    } else if (productId === 'P2') {
      return [
        { id: 'P2', name: 'P2', auftrag: baseValue, vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E26', name: 'E26', auftrag: baseValue, vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '40', laufend: '20', produktion: '90' },
        // ... weitere Zeilen für P2
      ];
    } else {
      return [
        { id: 'P3', name: 'P3', auftrag: baseValue, vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E26', name: 'E26', auftrag: baseValue, vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '40', laufend: '20', produktion: '40' },
        // ... weitere Zeilen für P3
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
            <TableCell>Vorherige Warteschlange</TableCell>
            <TableCell>Sicherheitsbestand</TableCell>
            <TableCell>Lagerbestand</TableCell>
            <TableCell>Warteschlange</TableCell>
            <TableCell>Laufende Arbeiten</TableCell>
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
              <TableCell>
                <TextField 
                  value={row.vorherige}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField 
                  value={row.sicherheit}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField 
                  value={row.lager}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField 
                  value={row.warteschlange}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <TextField 
                  value={row.laufend}
                  size="small"
                />
              </TableCell>
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
