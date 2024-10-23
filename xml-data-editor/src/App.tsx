import React, { useState } from 'react';
import { Box, Container, Paper, Button, Typography, TextField } from '@mui/material';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { XMLData } from './types';

function App() {
  const [xmlData, setXmlData] = useState<XMLData | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xml = e.target?.result as string;
        const parser = new XMLParser({
          ignoreAttributes: true,
          attributeNamePrefix: "_",
          parseAttributeValue: false
        });
        try {
          const result = parser.parse(xml);
          setXmlData(result);
          console.log('Parsed XML:', result);
        } catch (err) {
          console.error('Fehler beim Parsen der XML:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (xmlData) {
      const builder = new XMLBuilder({
        ignoreAttributes: true,
        attributeNamePrefix: "_",
        format: true
      });
      const xml = builder.build(xmlData);
      const blob = new Blob([xml], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'updated_data.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDataChange = (path: (string | number)[], value: string) => {
    if (xmlData) {
      const newData = JSON.parse(JSON.stringify(xmlData));
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      setXmlData(newData);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          XML Daten Editor
        </Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Button variant="contained" component="label" sx={{ mr: 2 }}>
            XML Datei hochladen
            <input type="file" hidden accept=".xml" onChange={handleFileUpload} />
          </Button>
          
          {xmlData && (
            <Button variant="contained" onClick={handleDownload}>
              XML herunterladen
            </Button>
          )}
        </Paper>

        {xmlData && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Spiel: {xmlData.results._game}, Gruppe: {xmlData.results._group}, Periode: {xmlData.results._period}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Prognose
              </Typography>
              <TextField
                label="P1"
                value={xmlData.results.forecast._p1}
                onChange={(e) => handleDataChange(['results', 'forecast', '_p1'], e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                label="P2"
                value={xmlData.results.forecast._p2}
                onChange={(e) => handleDataChange(['results', 'forecast', '_p2'], e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                label="P3"
                value={xmlData.results.forecast._p3}
                onChange={(e) => handleDataChange(['results', 'forecast', '_p3'], e.target.value)}
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Lagerbestand
            </Typography>
            <Box sx={{ mb: 2 }}>
              {xmlData.results.warehousestock.article.map((article, index) => (
                <Box key={article._id} sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
                    Artikel {article._id}:
                  </Typography>
                  <TextField
                    label="Menge"
                    value={article._amount}
                    onChange={(e) => handleDataChange(['results', 'warehousestock', 'article', index, '_amount'], e.target.value)}
                    sx={{ width: '120px' }}
                  />
                  <TextField
                    label="Startmenge"
                    value={article._startamount}
                    onChange={(e) => handleDataChange(['results', 'warehousestock', 'article', index, '_startamount'], e.target.value)}
                    sx={{ width: '120px' }}
                  />
                  <TextField
                    label="Prozent"
                    value={article._pct}
                    onChange={(e) => handleDataChange(['results', 'warehousestock', 'article', index, '_pct'], e.target.value)}
                    sx={{ width: '120px' }}
                  />
                  <TextField
                    label="Preis"
                    value={article._price}
                    onChange={(e) => handleDataChange(['results', 'warehousestock', 'article', index, '_price'], e.target.value)}
                    sx={{ width: '120px' }}
                  />
                  <TextField
                    label="Lagerwert"
                    value={article._stockvalue}
                    onChange={(e) => handleDataChange(['results', 'warehousestock', 'article', index, '_stockvalue'], e.target.value)}
                    sx={{ width: '120px' }}
                  />
                </Box>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Gesamtlagerwert: {xmlData.results.warehousestock.totalstockvalue}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
