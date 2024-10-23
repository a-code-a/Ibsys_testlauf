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

interface ProcurementItem {
  produkt: string;
  lieferzeit: string;
  abweichung: string;
  anzahlP1: string;
  anzahlP2: string;
  anzahlP3: string;
  rabattMenge: string;
  lagerbestand: string;
  bedarfPeriodeX: string;
  bedarfPeriodeX1: string;
  bedarfPeriodeX2: string;
  bedarfPeriodeX3: string;
  bestellmenge: string;
  bestelltyp: string;
  ausstehendeBestellung: string;
}

export default function ProcurementPlanning() {
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

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Produkt</TableCell>
              <TableCell>Lieferzeit</TableCell>
              <TableCell>Abweichung</TableCell>
              <TableCell>Anzahl P1</TableCell>
              <TableCell>Anzahl P2</TableCell>
              <TableCell>Anzahl P3</TableCell>
              <TableCell>Rabatt Menge</TableCell>
              <TableCell>Lagerüberbestand</TableCell>
              <TableCell>Bedarf für Periode x</TableCell>
              <TableCell>Bedarf für Periode x+1</TableCell>
              <TableCell>Bedarf für Periode x+2</TableCell>
              <TableCell>Bedarf für Periode x+3</TableCell>
              <TableCell>Bestellmenge</TableCell>
              <TableCell>Bestelltyp</TableCell>
              <TableCell>Ausstehende Bestellung von Periode</TableCell>
              <TableCell>Ausstehende Bestellmenge</TableCell>
              <TableCell>Bestelltyp ausstehende Bestellung</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {procurementItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.produkt}</TableCell>
                <TableCell>
                  <TextField
                    value={item.lieferzeit}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].lieferzeit = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.abweichung}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].abweichung = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP1}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].anzahlP1 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP2}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].anzahlP2 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.anzahlP3}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].anzahlP3 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.rabattMenge}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].rabattMenge = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.lagerbestand}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].lagerbestand = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bedarfPeriodeX = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX1}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bedarfPeriodeX1 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX2}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bedarfPeriodeX2 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bedarfPeriodeX3}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bedarfPeriodeX3 = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bestellmenge}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bestellmenge = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.bestelltyp}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].bestelltyp = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={item.ausstehendeBestellung}
                    size="small"
                    onChange={(e) => {
                      const newItems = [...procurementItems];
                      newItems[index].ausstehendeBestellung = e.target.value;
                      setProcurementItems(newItems);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value="0"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value="-"
                    size="small"
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
