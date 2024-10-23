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
  const [productionItems, setProductionItems] = useState<ProductionItem[]>([
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P1",
      artikelnummer: "E50",
      produktionsmenge: "200",
      workstations: {
        1: "1000", 2: "0", 3: "0", 4: "0", 5: "0", 6: "0", 7: "0", 8: "0",
        9: "0", 10: "0", 11: "0", 12: "0", 13: "0", 14: "0", 15: "0"
      }
    },
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P2",
      artikelnummer: "E55",
      produktionsmenge: "150",
      workstations: {
        1: "750", 2: "0", 3: "0", 4: "0", 5: "0", 6: "0", 7: "0", 8: "0",
        9: "0", 10: "0", 11: "0", 12: "0", 13: "0", 14: "0", 15: "0"
      }
    },
    {
      bezeichnung: "Rahmen und Räder",
      finalesProdukt: "P3",
      artikelnummer: "E30",
      produktionsmenge: "100",
      workstations: {
        1: "500", 2: "0", 3: "0", 4: "0", 5: "0", 6: "0", 7: "0", 8: "0",
        9: "0", 10: "0", 11: "0", 12: "0", 13: "0", 14: "0", 15: "0"
      }
    }
  ]);

  const [workstationData, setWorkstationData] = useState<WorkstationData[]>([
    {
      id: 1,
      capacityRequirements: "2950",
      setupTimes: "90",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "3040",
      overtimes: "640",
      overtimePerDays: "128"
    },
    {
      id: 2,
      capacityRequirements: "0",
      setupTimes: "0",
      capacityPreviousPeriods: "0",
      totalCapacityRequirements: "0",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 3,
      capacityRequirements: "2250",
      setupTimes: "60",
      capacityPreviousPeriods: "720",
      totalCapacityRequirements: "3030",
      overtimes: "630",
      overtimePerDays: "126"
    },
    {
      id: 4,
      capacityRequirements: "3600",
      setupTimes: "200",
      capacityPreviousPeriods: "3860",
      totalCapacityRequirements: "7660",
      overtimes: "5260",
      overtimePerDays: "1052"
    },
    {
      id: 5,
      capacityRequirements: "2250",
      setupTimes: "180",
      capacityPreviousPeriods: "4020",
      totalCapacityRequirements: "6450",
      overtimes: "4050",
      overtimePerDays: "810"
    },
    {
      id: 6,
      capacityRequirements: "3600",
      setupTimes: "135",
      capacityPreviousPeriods: "5100",
      totalCapacityRequirements: "8835",
      overtimes: "6435",
      overtimePerDays: "1287"
    },
    {
      id: 7,
      capacityRequirements: "3600",
      setupTimes: "120",
      capacityPreviousPeriods: "360",
      totalCapacityRequirements: "4080",
      overtimes: "1680",
      overtimePerDays: "336"
    },
    {
      id: 8,
      capacityRequirements: "2700",
      setupTimes: "120",
      capacityPreviousPeriods: "1770",
      totalCapacityRequirements: "4590",
      overtimes: "2190",
      overtimePerDays: "438"
    },
    {
      id: 9,
      capacityRequirements: "2700",
      setupTimes: "0",
      capacityPreviousPeriods: "2040",
      totalCapacityRequirements: "4740",
      overtimes: "2340",
      overtimePerDays: "468"
    },
    {
      id: 10,
      capacityRequirements: "1800",
      setupTimes: "0",
      capacityPreviousPeriods: "760",
      totalCapacityRequirements: "2560",
      overtimes: "160",
      overtimePerDays: "32"
    },
    {
      id: 11,
      capacityRequirements: "1350",
      setupTimes: "0",
      capacityPreviousPeriods: "180",
      totalCapacityRequirements: "1530",
      overtimes: "0",
      overtimePerDays: "0"
    },
    {
      id: 12,
      capacityRequirements: "2700",
      setupTimes: "30",
      capacityPreviousPeriods: "840",
      totalCapacityRequirements: "3570",
      overtimes: "1170",
      overtimePerDays: "234"
    },
    {
      id: 13,
      capacityRequirements: "2700",
      setupTimes: "30",
      capacityPreviousPeriods: "840",
      totalCapacityRequirements: "3570",
      overtimes: "1170",
      overtimePerDays: "234"
    },
    {
      id: 14,
      capacityRequirements: "2700",
      setupTimes: "30",
      capacityPreviousPeriods: "840",
      totalCapacityRequirements: "3570",
      overtimes: "1170",
      overtimePerDays: "234"
    },
    {
      id: 15,
      capacityRequirements: "2700",
      setupTimes: "30",
      capacityPreviousPeriods: "840",
      totalCapacityRequirements: "3570",
      overtimes: "1170",
      overtimePerDays: "234"
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
