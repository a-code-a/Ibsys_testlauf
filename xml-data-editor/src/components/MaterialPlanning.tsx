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
  Box
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';

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
  const { setMaterialPlanningData } = useWorkflowStore();
  const [tabValue, setTabValue] = useState(0);
  
  const getInitialData = (productId: string): MaterialRowData[] => {
    if (productId === 'P1') {
      return [
        { id: 'P1', name: 'P1', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E26', name: 'E26*', auftrag: '200', vorherige: '0', sicherheit: '300', lager: '0', warteschlange: '280', laufend: '10', produktion: '210' },
        { id: 'E51', name: 'E51', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' }
      ];
    } else if (productId === 'P2') {
      return [
        { id: 'P2', name: 'P2', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E26', name: 'E26*', auftrag: '100', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E56', name: 'E56', auftrag: '100', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '0' }
      ];
    } else {
      return [
        { id: 'P3', name: 'P3', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E26', name: 'E26*', auftrag: '250', vorherige: '0', sicherheit: '0', lager: '0', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E31', name: 'E31', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '150' }
      ];
    }
  };

  const [p1Data, setP1Data] = useState(getInitialData('P1'));
  const [p2Data, setP2Data] = useState(getInitialData('P2'));
  const [p3Data, setP3Data] = useState(getInitialData('P3'));

  // Initialisiere die Daten im Store
  useEffect(() => {
    const allData = {
      items: [
        ...p1Data,
        ...p2Data,
        ...p3Data
      ]
    };
    console.log('Setze Material Planning Daten:', allData);
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

  const renderMaterialTable = (data: MaterialRowData[], setData: React.Dispatch<React.SetStateAction<MaterialRowData[]>>) => (
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
                  onChange={(e) => handleValueChange(data, setData, row.id, 'vorherige', e.target.value)}
                />
              </TableCell>
              <OperatorCell>+</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.sicherheit}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'sicherheit', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.lager}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'lager', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.warteschlange}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'warteschlange', e.target.value)}
                />
              </TableCell>
              <OperatorCell>-</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.laufend}
                  size="small"
                  onChange={(e) => handleValueChange(data, setData, row.id, 'laufend', e.target.value)}
                />
              </TableCell>
              <OperatorCell>=</OperatorCell>
              <TableCell>
                <TextField 
                  value={row.produktion}
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
        {renderMaterialTable(p1Data, setP1Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderMaterialTable(p2Data, setP2Data)}
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        {renderMaterialTable(p3Data, setP3Data)}
      </TabPanel>
    </Paper>
  );
}
