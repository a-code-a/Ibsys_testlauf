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

interface WorkstationData {
  id: number;
  capacityRequirements: string;
  setupTimes: string;
  capacityPreviousPeriods: string;
  totalCapacityRequirements: string;
  overtimes: string;
  overtimePerDays: string;
}

interface ProductionItem {
  bezeichnung: string;
  finalesProdukt: string;
  artikelnummer: string;
  produktionsmenge: string;
  workstations: {[key: number]: string};
}

export default function CapacityPlanning() {
  const { t } = useTranslation();
  const { setCapacityPlanningData } = useWorkflowStore();

  const initWorkstations = () => {
    const ws: {[key: number]: string} = {};
    for (let i = 1; i <= 15; i++) {
      ws[i] = "0";
    }
    return ws;
  };

  const [productionItems, setProductionItems] = useState<ProductionItem[]>([
    {
      bezeichnung: "Hinterrad",
      finalesProdukt: "P1",
      artikelnummer: "E4",
      produktionsmenge: "200",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Hinterrad",
      finalesProdukt: "P2",
      artikelnummer: "E5",
      produktionsmenge: "150",
      workstations: {...initWorkstations()}
    }
  ]);

  const [workstationData, setWorkstationData] = useState<WorkstationData[]>([
    {
      id: 1,
      capacityRequirements: "2700",
      setupTimes: "60",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "2760",
      overtimes: "360",
      overtimePerDays: "72"
    },
    {
      id: 2,
      capacityRequirements: "2250",
      setupTimes: "90",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "2340",
      overtimes: "0",
      overtimePerDays: "0"
    }
  ]);

  useEffect(() => {
    const data = {
      productionItems,
      workstationData
    };
    console.log('Setze Capacity Planning Daten:', data);
    setCapacityPlanningData(data);
  }, [productionItems, workstationData, setCapacityPlanningData]);

  const handleProductionItemChange = (index: number, field: keyof ProductionItem, value: string) => {
    const newItems = [...productionItems];
    if (field === 'produktionsmenge') {
      newItems[index].produktionsmenge = value;
    }
    setProductionItems(newItems);
  };

  const handleWorkstationChange = (itemIndex: number, stationId: number, value: string) => {
    const newItems = [...productionItems];
    newItems[itemIndex].workstations[stationId] = value;
    setProductionItems(newItems);
  };

  const handleWorkstationDataChange = (stationId: number, field: keyof WorkstationData, value: string) => {
    const newData = workstationData.map(station => {
      if (station.id === stationId) {
        return { ...station, [field]: value };
      }
      return station;
    });
    setWorkstationData(newData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('Bezeichnung')}</TableCell>
              <TableCell>{t('FinalesProdukt')}</TableCell>
              <TableCell>{t('Artikelnummer')}</TableCell>
              <TableCell>{t('Produktionsmenge')}</TableCell>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                <TableCell key={station} align="center">
                  {t('Arbeitsplatz')} {station}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productionItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.bezeichnung}</TableCell>
                <TableCell>{item.finalesProdukt}</TableCell>
                <TableCell>{item.artikelnummer}</TableCell>
                <TableCell>
                  <TextField
                    value={item.produktionsmenge}
                    size="small"
                    onChange={(e) => handleProductionItemChange(index, 'produktionsmenge', e.target.value)}
                  />
                </TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={item.workstations[station]}
                      size="small"
                      onChange={(e) => handleWorkstationChange(index, station, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 4 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('Kapazitätsberechnung')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station} align="center">
                    {t('Arbeitsplatz')} {station}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{t('Kapazitätsbedarf')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityRequirements || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'capacityRequirements', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('Rüstzeiten')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.setupTimes || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'setupTimes', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('KapazitätVorperioden')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityPreviousPeriods || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'capacityPreviousPeriods', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('GesamtKapazitätsbedarf')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.totalCapacityRequirements || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'totalCapacityRequirements', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('Überstunden')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimes || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'overtimes', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>{t('ÜberstundenProTag')}</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimePerDays || "0"}
                      size="small"
                      onChange={(e) => handleWorkstationDataChange(station, 'overtimePerDays', e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
