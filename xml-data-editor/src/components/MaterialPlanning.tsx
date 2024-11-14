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
import { MaterialPlanningData, MaterialRowData } from '../types/WorkflowTypes';

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
  
  const getInitialData = (productId: string): MaterialRowData[] => {
    const productData = {
      'P1': [
        { id: 'P1', name: 'P1', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '100', warteschlange: '0', laufend: '0', produktion: '200' },
        { id: 'E261', name: 'E261', auftrag: '200', vorherige: '0', sicherheit: '100', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        // ... andere Artikel für P1
      ],
      'P2': [
        { id: 'P2', name: 'P2', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '100', warteschlange: '0', laufend: '0', produktion: '100' },
        { id: 'E262', name: 'E262', auftrag: '150', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '200' },
        // ... andere Artikel für P2
      ],
      'P3': [
        { id: 'P3', name: 'P3', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '250' },
        { id: 'E263', name: 'E263', auftrag: '250', vorherige: '0', sicherheit: '50', lager: '50', warteschlange: '0', laufend: '0', produktion: '300' },
        // ... andere Artikel für P3
      ]
    };

    return productData[productId as keyof typeof productData] || [];
  };

  const [p1Data, setP1Data] = useState(getInitialData('P1'));
  const [p2Data, setP2Data] = useState(getInitialData('P2'));
  const [p3Data, setP3Data] = useState(getInitialData('P3'));

  useEffect(() => {
    const allData: MaterialPlanningData = {
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
