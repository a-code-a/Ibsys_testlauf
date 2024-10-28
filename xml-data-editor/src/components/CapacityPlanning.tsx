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
  Box
} from '@mui/material';

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
    },
    {
      bezeichnung: "Hinterrad",
      finalesProdukt: "P3",
      artikelnummer: "E6",
      produktionsmenge: "100",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Forderrad",
      finalesProdukt: "P1",
      artikelnummer: "E7",
      produktionsmenge: "200",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Forderrad",
      finalesProdukt: "P2",
      artikelnummer: "E8",
      produktionsmenge: "150",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Forderrad",
      finalesProdukt: "P3",
      artikelnummer: "E9",
      produktionsmenge: "100",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Schutzblech hinten",
      finalesProdukt: "P1",
      artikelnummer: "E10",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 7: "400", 8: "200"}
    },
    {
      bezeichnung: "Schutzblech hinten",
      finalesProdukt: "P2",
      artikelnummer: "E11",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 7: "300", 8: "150"}
    },
    {
      bezeichnung: "Schutzblech hinten",
      finalesProdukt: "P3",
      artikelnummer: "E12",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 7: "200", 8: "100"}
    },
    {
      bezeichnung: "Schutzblech vorne",
      finalesProdukt: "P1",
      artikelnummer: "E13",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 7: "400", 8: "200"}
    },
    {
      bezeichnung: "Schutzblech vorne",
      finalesProdukt: "P2",
      artikelnummer: "E14",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 7: "300", 8: "150"}
    },
    {
      bezeichnung: "Schutzblech vorne",
      finalesProdukt: "P3",
      artikelnummer: "E15",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 7: "200", 8: "100"}
    },
    {
      bezeichnung: "Lenker",
      finalesProdukt: "P1/P2/P",
      artikelnummer: "E16",
      produktionsmenge: "450",
      workstations: {...initWorkstations(), 6: "900"}
    },
    {
      bezeichnung: "Sattel",
      finalesProdukt: "P1/P2/P",
      artikelnummer: "E17",
      produktionsmenge: "450",
      workstations: {...initWorkstations()}
    },
    {
      bezeichnung: "Rahmen",
      finalesProdukt: "P1",
      artikelnummer: "E18",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 6: "600", 7: "400", 8: "600"}
    },
    {
      bezeichnung: "Rahmen",
      finalesProdukt: "P2",
      artikelnummer: "E19",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 6: "450", 7: "300", 8: "450"}
    },
    {
      bezeichnung: "Rahmen",
      finalesProdukt: "P3",
      artikelnummer: "E20",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 6: "300", 7: "200", 8: "300"}
    },
    {
      bezeichnung: "Pedale",
      finalesProdukt: "P1/P2/P",
      artikelnummer: "E26",
      produktionsmenge: "450",
      workstations: {...initWorkstations(), 7: "900"}
    },
    {
      bezeichnung: "Vorderrad komplett",
      finalesProdukt: "P1",
      artikelnummer: "E49",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 1: "1200"}
    },
    {
      bezeichnung: "Vorderrad komplett",
      finalesProdukt: "P2",
      artikelnummer: "E54",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 1: "900"}
    },
    {
      bezeichnung: "Vorderrad komplett",
      finalesProdukt: "P3",
      artikelnummer: "E29",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 1: "600"}
    },
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P1",
      artikelnummer: "E50",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 2: "1000"}
    },
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P2",
      artikelnummer: "E55",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 2: "750"}
    },
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P3",
      artikelnummer: "E30",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 2: "500"}
    },
    {
      bezeichnung: "Fahrrad ohne Pedale",
      finalesProdukt: "P1",
      artikelnummer: "E51",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 3: "1000"}
    },
    {
      bezeichnung: "Fahrrad ohne Pedale",
      finalesProdukt: "P2",
      artikelnummer: "E56",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 3: "900"}
    },
    {
      bezeichnung: "Fahrrad ohne Pedale",
      finalesProdukt: "P3",
      artikelnummer: "E31",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 3: "600"}
    },
    {
      bezeichnung: "Fahrrad komplett",
      finalesProdukt: "P1",
      artikelnummer: "P1",
      produktionsmenge: "200",
      workstations: {...initWorkstations(), 4: "1200"}
    },
    {
      bezeichnung: "Fahrrad komplett",
      finalesProdukt: "P2",
      artikelnummer: "P2",
      produktionsmenge: "150",
      workstations: {...initWorkstations(), 4: "1050"}
    },
    {
      bezeichnung: "Fahrrad komplett",
      finalesProdukt: "P3",
      artikelnummer: "P3",
      produktionsmenge: "100",
      workstations: {...initWorkstations(), 4: "700"}
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
    },
    {
      id: 3,
      capacityRequirements: "2500",
      setupTimes: "60",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "2560",
      overtimes: "160",
      overtimePerDays: "32"
    },
    {
      id: 4,
      capacityRequirements: "2950",
      setupTimes: "90",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "3040",
      overtimes: "640",
      overtimePerDays: "128"
    },
    {
      id: 5,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 6,
      capacityRequirements: "2250",
      setupTimes: "60",
      capacityPreviousPeriods: "720",
      totalCapacityRequirements: "3030",
      overtimes: "630",
      overtimePerDays: "126"
    },
    {
      id: 7,
      capacityRequirements: "3600",
      setupTimes: "200",
      capacityPreviousPeriods: "3860",
      totalCapacityRequirements: "7660",
      overtimes: "5260",
      overtimePerDays: "1052"
    },
    {
      id: 8,
      capacityRequirements: "2250",
      setupTimes: "180",
      capacityPreviousPeriods: "4020",
      totalCapacityRequirements: "6450",
      overtimes: "4050",
      overtimePerDays: "810"
    },
    {
      id: 9,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 10,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 11,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 12,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 13,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 14,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 15,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    }
  ]);

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bezeichnung</TableCell>
              <TableCell>Finales Produkt</TableCell>
              <TableCell>Artikelnummer</TableCell>
              <TableCell>Produktionsmenge</TableCell>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                <TableCell key={station} align="center">
                  Workstation {station}
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
                    onChange={(e) => {
                      const newItems = [...productionItems];
                      newItems[index].produktionsmenge = e.target.value;
                      setProductionItems(newItems);
                    }}
                  />
                </TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={item.workstations[station]}
                      size="small"
                      onChange={(e) => {
                        const newItems = [...productionItems];
                        newItems[index].workstations[station] = e.target.value;
                        setProductionItems(newItems);
                      }}
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
                <TableCell>Kapazitätsberechnung</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station} align="center">
                    Workstation {station}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Capacity Requirements</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityRequirements || ""}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Setup Times</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.setupTimes || ""}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Capacity Previous Periods</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.capacityPreviousPeriods || ""}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Total Capacity Requirements</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.totalCapacityRequirements || ""}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Overtimes</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimes || ""}
                      size="small"
                    />
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>Overtime Per Days</TableCell>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((station) => (
                  <TableCell key={station}>
                    <TextField
                      value={workstationData.find(w => w.id === station)?.overtimePerDays || ""}
                      size="small"
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
