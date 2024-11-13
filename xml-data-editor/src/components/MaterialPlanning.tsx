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
  const { t } = useTranslation();
  const { setMaterialPlanningData } = useWorkflowStore();
  const [tabValue, setTabValue] = useState(0);
  
  const getInitialData = (productId: string): MaterialRowData[] => {
    const productData = {
      'P1': [
        { id: 'P1', name: 'P1', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E261', name: 'E261', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E51', name: 'E51', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E161', name: 'E161', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E171', name: 'E171', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E50', name: 'E50', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E4', name: 'E4', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E10', name: 'E10', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E49', name: 'E49', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E7', name: 'E7', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E13', name: 'E13', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E18', name: 'E18', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' }
      ],
      'P2': [
        { id: 'P2', name: 'P2', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E262', name: 'E262', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E56', name: 'E56', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E162', name: 'E162', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E172', name: 'E172', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E55', name: 'E55', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E5', name: 'E5', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E11', name: 'E11', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E54', name: 'E54', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '0' },
        { id: 'E8', name: 'E8', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E14', name: 'E14', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E19', name: 'E19', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' }
      ],
      'P3': [
        { id: 'P3', name: 'P3', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E263', name: 'E263', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E31', name: 'E31', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E163', name: 'E163', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E173', name: 'E173', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E30', name: 'E30', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E6', name: 'E6', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E12', name: 'E12', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E29', name: 'E29', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '150', warteschlange: '0', laufend: '0', produktion: '150' },
        { id: 'E9', name: 'E9', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E15', name: 'E15', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        { id: 'E20', name: 'E20', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' }
      ]
    };

    return productData[productId as keyof typeof productData] || [];
  };

  const [p1Data, setP1Data] = useState(getInitialData('P1'));
  const [p2Data, setP2Data] = useState(getInitialData('P2'));
  const [p3Data, setP3Data] = useState(getInitialData('P3'));

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
    </Paper>
  );
}
