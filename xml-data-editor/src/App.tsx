import React, { useState } from 'react';
import { Box, Container, Paper, Button, Typography, TextField, Tabs, Tab } from '@mui/material';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { XMLData } from './types';
import ProductionProgram from './components/ProductionProgram';
import MaterialPlanning from './components/MaterialPlanning';
import CapacityPlanning from './components/CapacityPlanning';

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
                <Tab label="Kapazitätsplanung" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Paper sx={{ p: 2 }}>
                {/* XML Editor Content */}
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

            <TabPanel value={tabValue} index={3}>
              <CapacityPlanning />
            </TabPanel>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
