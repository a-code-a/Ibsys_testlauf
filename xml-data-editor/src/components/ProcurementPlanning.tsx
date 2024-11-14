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
  Box
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { ProcurementPlanningData, ProcurementItem } from '../types/WorkflowTypes';

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
  const [procurementItems, setProcurementItems] = useState<ProcurementItem[]>([
    {
      produkt: "P1",
      lieferzeit: "1.8",
      abweichung: "0.4",
      anzahlP1: "1",
      anzahlP2: "0",
      anzahlP3: "0",
      rabattMenge: "300",
      lagerbestand: "100",
      bedarfPeriodeX: "200",
      bedarfPeriodeX1: "0",
      bedarfPeriodeX2: "0",
      bedarfPeriodeX3: "0",
      bestellmenge: "300",
      bestelltyp: "Normal",
      ausstehendeBestellung: "0"
    },
    {
      produkt: "P2",
      lieferzeit: "1.8",
      abweichung: "0.4",
      anzahlP1: "0",
      anzahlP2: "1",
      anzahlP3: "0",
      rabattMenge: "300",
      lagerbestand: "50",
      bedarfPeriodeX: "150",
      bedarfPeriodeX1: "0",
      bedarfPeriodeX2: "0",
      bedarfPeriodeX3: "0",
      bestellmenge: "300",
      bestelltyp: "Normal",
      ausstehendeBestellung: "0"
    },
    {
      produkt: "P3",
      lieferzeit: "1.8",
      abweichung: "0.4",
      anzahlP1: "0",
      anzahlP2: "0",
      anzahlP3: "1",
      rabattMenge: "300",
      lagerbestand: "50",
      bedarfPeriodeX: "100",
      bedarfPeriodeX1: "0",
      bedarfPeriodeX2: "0",
      bedarfPeriodeX3: "0",
      bestellmenge: "300",
      bestelltyp: "Normal",
      ausstehendeBestellung: "0"
    }
  ]);

  useEffect(() => {
    const data: ProcurementPlanningData = { 
      items: procurementItems 
    };
    console.log('Setze Procurement Planning Daten:', data);
    setProcurementPlanningData(data);
  }, [procurementItems, setProcurementPlanningData]);

  const handleValueChange = (index: number, field: keyof ProcurementItem, value: string) => {
    const newItems = [...procurementItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setProcurementItems(newItems);
  };

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
    </Paper>
  );
}
