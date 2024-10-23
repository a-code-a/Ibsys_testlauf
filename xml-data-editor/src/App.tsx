import React, { useState } from 'react';
import { Box, Container, Paper, Button, Typography, TextField, Tabs, Tab } from '@mui/material';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { XMLData } from './types';
import ProductionProgram from './components/ProductionProgram';
import MaterialPlanning from './components/MaterialPlanning';

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

function App() {
  const [xmlData, setXmlData] = useState<XMLData | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Produktionsplanung
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
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="XML Editor" />
                <Tab label="Produktionsprogramm" />
                <Tab label="Materialplanung" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
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
                    onChange={(e) => {
                      const newData = { ...xmlData };
                      newData.results.forecast._p1 = e.target.value;
                      setXmlData(newData);
                    }}
                    sx={{ mr: 2 }}
                  />
                  <TextField
                    label="P2"
                    value={xmlData.results.forecast._p2}
                    onChange={(e) => {
                      const newData = { ...xmlData };
                      newData.results.forecast._p2 = e.target.value;
                      setXmlData(newData);
                    }}
                    sx={{ mr: 2 }}
                  />
                  <TextField
                    label="P3"
                    value={xmlData.results.forecast._p3}
                    onChange={(e) => {
                      const newData = { ...xmlData };
                      newData.results.forecast._p3 = e.target.value;
                      setXmlData(newData);
                    }}
                  />
                </Box>

                <Typography variant="h6" gutterBottom>
                  Lagerbestand
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {xmlData.results.warehousestock.article.map((article: any, index: number) => (
                    <Box key={article._id} sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ minWidth: '100px' }}>
                        Artikel {article._id}:
                      </Typography>
                      <TextField
                        label="Menge"
                        value={article._amount}
                        onChange={(e) => {
                          const newData = { ...xmlData };
                          newData.results.warehousestock.article[index]._amount = e.target.value;
                          setXmlData(newData);
                        }}
                        sx={{ width: '120px' }}
                      />
                      <TextField
                        label="Startmenge"
                        value={article._startamount}
                        onChange={(e) => {
                          const newData = { ...xmlData };
                          newData.results.warehousestock.article[index]._startamount = e.target.value;
                          setXmlData(newData);
                        }}
                        sx={{ width: '120px' }}
                      />
                      <TextField
                        label="Prozent"
                        value={article._pct}
                        onChange={(e) => {
                          const newData = { ...xmlData };
                          newData.results.warehousestock.article[index]._pct = e.target.value;
                          setXmlData(newData);
                        }}
                        sx={{ width: '120px' }}
                      />
                      <TextField
                        label="Preis"
                        value={article._price}
                        onChange={(e) => {
                          const newData = { ...xmlData };
                          newData.results.warehousestock.article[index]._price = e.target.value;
                          setXmlData(newData);
                        }}
                        sx={{ width: '120px' }}
                      />
                      <TextField
                        label="Lagerwert"
                        value={article._stockvalue}
                        onChange={(e) => {
                          const newData = { ...xmlData };
                          newData.results.warehousestock.article[index]._stockvalue = e.target.value;
                          setXmlData(newData);
                        }}
                        sx={{ width: '120px' }}
                      />
                    </Box>
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom>
                  Gesamtlagerwert: {xmlData.results.warehousestock.totalstockvalue}
                </Typography>
              </Paper>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <ProductionProgram forecast={xmlData.results.forecast} />
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <MaterialPlanning 
                forecast={xmlData.results.forecast}
                warehousestock={xmlData.results.warehousestock}
              />
            </TabPanel>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
