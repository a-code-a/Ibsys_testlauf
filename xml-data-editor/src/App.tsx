import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Button, Typography, TextField } from '@mui/material';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { XMLData } from './types';
import { WorkflowContainer } from './workflow/WorkflowContainer';
import { useWorkflowStore } from './store/workflowStore';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [xmlData, setXmlData] = useState<XMLData | null>(null);
  const { 
    setProductionProgramData, 
    setMaterialPlanningData, 
    setCapacityPlanningData, 
    setProcurementPlanningData, 
    setProductionPlanningData,
    setResultsData,
    setForecast,
    setWarehousestock 
  } = useWorkflowStore();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'p') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Falscher Benutzername oder Passwort');
    }
  };

  // Initialisiere alle Workflow-Daten, wenn xmlData sich ändert
  useEffect(() => {
    if (xmlData?.results) {
      // Forecast setzen
      const forecast = {
        _p1: xmlData.results.forecast._p1,
        _p2: xmlData.results.forecast._p2,
        _p3: xmlData.results.forecast._p3
      };
      setForecast(forecast);

      // Warehousestock setzen
      setWarehousestock(xmlData.results.warehousestock);

      // 1. Produktionsprogramm
      const initialProductionProgram = {
        products: [
          {
            id: "P1",
            name: "Kinderrad",
            periods: {
              "5": { sales: xmlData.results.forecast._p1, production: xmlData.results.forecast._p1 },
              "6": { sales: "0", production: "0" },
              "7": { sales: "0", production: "0" },
              "8": { sales: "0", production: "0" }
            }
          },
          {
            id: "P2",
            name: "Damenrad",
            periods: {
              "5": { sales: xmlData.results.forecast._p2, production: xmlData.results.forecast._p2 },
              "6": { sales: "0", production: "0" },
              "7": { sales: "0", production: "0" },
              "8": { sales: "0", production: "0" }
            }
          },
          {
            id: "P3",
            name: "Herrenrad",
            periods: {
              "5": { sales: xmlData.results.forecast._p3, production: xmlData.results.forecast._p3 },
              "6": { sales: "0", production: "0" },
              "7": { sales: "0", production: "0" },
              "8": { sales: "0", production: "0" }
            }
          }
        ]
      };
      setProductionProgramData(initialProductionProgram);

      // 2. Materialplanung
      const initialMaterialPlanning = {
        items: xmlData.results.warehousestock.article.map(article => ({
          id: article._id,
          name: `Artikel ${article._id}`,
          auftrag: "0",
          vorherige: article._startamount,
          sicherheit: "0",
          lager: article._amount,
          warteschlange: "0",
          laufend: "0",
          produktion: "0"
        }))
      };
      setMaterialPlanningData(initialMaterialPlanning);

      // 3. Kapazitätsplanung (Platzhalter-Daten)
      const initialCapacityPlanning = {
        productionItems: [
          {
            bezeichnung: "Kinderrad",
            finalesProdukt: "P1",
            artikelnummer: "1",
            produktionsmenge: xmlData.results.forecast._p1,
            workstations: { 1: "10", 2: "20" }
          },
          {
            bezeichnung: "Damenrad",
            finalesProdukt: "P2",
            artikelnummer: "2",
            produktionsmenge: xmlData.results.forecast._p2,
            workstations: { 1: "15", 2: "25" }
          },
          {
            bezeichnung: "Herrenrad",
            finalesProdukt: "P3",
            artikelnummer: "3",
            produktionsmenge: xmlData.results.forecast._p3,
            workstations: { 1: "12", 2: "22" }
          }
        ],
        workstationData: [
          {
            id: 1,
            capacityRequirements: "100",
            setupTimes: "20",
            capacityPreviousPeriods: "50",
            totalCapacityRequirements: "170",
            overtimes: "10",
            overtimePerDays: "2"
          },
          {
            id: 2,
            capacityRequirements: "120",
            setupTimes: "25",
            capacityPreviousPeriods: "60",
            totalCapacityRequirements: "205",
            overtimes: "15",
            overtimePerDays: "3"
          }
        ]
      };
      setCapacityPlanningData(initialCapacityPlanning);

      // 4. Beschaffungsplanung (Platzhalter-Daten)
      const initialProcurementPlanning = {
        items: xmlData.results.warehousestock.article.map(article => ({
          produkt: article._id,
          lieferzeit: "5",
          abweichung: "1",
          anzahlP1: "0",
          anzahlP2: "0",
          anzahlP3: "0",
          rabattMenge: "100",
          lagerbestand: article._amount,
          bedarfPeriodeX: "0",
          bedarfPeriodeX1: "0",
          bedarfPeriodeX2: "0",
          bedarfPeriodeX3: "0",
          bestellmenge: "0",
          bestelltyp: "0",
          ausstehendeBestellung: "0"
        }))
      };
      setProcurementPlanningData(initialProcurementPlanning);

      // 5. Produktionsplanung (Platzhalter-Daten)
      const initialProductionPlanning = {
        orders: [
          { id: "1", articleNumber: "P1", amount: parseInt(xmlData.results.forecast._p1), selected: false },
          { id: "2", articleNumber: "P2", amount: parseInt(xmlData.results.forecast._p2), selected: false },
          { id: "3", articleNumber: "P3", amount: parseInt(xmlData.results.forecast._p3), selected: false }
        ]
      };
      setProductionPlanningData(initialProductionPlanning);

      // 6. Ergebnisse (Platzhalter-Daten)
      const initialResults = {
        productionProgram: [
          {
            artikel: "P1",
            produktionsmenge: xmlData.results.forecast._p1,
            direktverkauf: "0",
            verkaufsmenge: xmlData.results.forecast._p1,
            verkaufspreis: "100",
            strafe: "0"
          },
          {
            artikel: "P2",
            produktionsmenge: xmlData.results.forecast._p2,
            direktverkauf: "0",
            verkaufsmenge: xmlData.results.forecast._p2,
            verkaufspreis: "150",
            strafe: "0"
          },
          {
            artikel: "P3",
            produktionsmenge: xmlData.results.forecast._p3,
            direktverkauf: "0",
            verkaufsmenge: xmlData.results.forecast._p3,
            verkaufspreis: "200",
            strafe: "0"
          }
        ],
        orders: [],
        productionPlanning: [],
        capacityPlanning: []
      };
      setResultsData(initialResults);
    }
  }, [
    xmlData, 
    setProductionProgramData, 
    setMaterialPlanningData, 
    setCapacityPlanningData, 
    setProcurementPlanningData, 
    setProductionPlanningData,
    setResultsData,
    setForecast,
    setWarehousestock
  ]);

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
          console.log('Geparste XML-Daten:', result);
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

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Login
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Benutzername"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Passwort"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleLogin}
              >
                Anmelden
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <LanguageSelector />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('SupplyChainManagement')}
        </Typography>
        
        <Paper sx={{ p: 2, mb: 2 }}>
          <Button variant="contained" component="label" sx={{ mr: 2 }}>
            {t('XMLDateiHochladen')}
            <input type="file" hidden accept=".xml" onChange={handleFileUpload} />
          </Button>
          
          {xmlData && (
            <Button variant="contained" onClick={handleDownload}>
              {t('XMLHerunterladen')}
            </Button>
          )}
        </Paper>

        {xmlData && (
          <WorkflowContainer />
        )}
      </Box>
    </Container>
  );
}

export default App;
