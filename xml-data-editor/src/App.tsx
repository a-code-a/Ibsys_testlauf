import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Button, Typography, TextField, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { XMLData } from './types';
import { WorkflowContainer } from './workflow/WorkflowContainer';
import { useWorkflowStore } from './store/workflowStore';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import { ApiService } from './services/apiService';
import { WarehouseStock } from './types/WorkflowTypes';

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
  const [backendTestResult, setBackendTestResult] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDebugDialog, setOpenDebugDialog] = useState(false);
  const [debugDetails, setDebugDetails] = useState<any>(null);

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
      try {
        // Forecast setzen
        const forecast = {
          _p1: xmlData.results.forecast?._p1 || '0',
          _p2: xmlData.results.forecast?._p2 || '0',
          _p3: xmlData.results.forecast?._p3 || '0'
        };
        setForecast(forecast);

        // Warehousestock setzen mit Fallback-Werten
        const warehouseStock: WarehouseStock = {
          article: (xmlData.results.warehousestock?.article || []).map(article => ({
            _id: article._id || '',
            _amount: article._amount || '0',
            _startamount: article._startamount || '0',
            _pct: article._pct || '0',
            _price: article._price || '0',
            _stockvalue: article._stockvalue || '0'
          })),
          totalstockvalue: xmlData.results.warehousestock?.totalstockvalue || '0'
        };
        setWarehousestock(warehouseStock);

        // Restliche Workflow-Initialisierung
        const initialProductionProgram = {
          products: [
            {
              id: "P1",
              name: "Kinderrad",
              periods: {
                "5": { sales: forecast._p1, production: forecast._p1 },
                "6": { sales: "0", production: "0" },
                "7": { sales: "0", production: "0" },
                "8": { sales: "0", production: "0" }
              }
            },
            {
              id: "P2",
              name: "Damenrad",
              periods: {
                "5": { sales: forecast._p2, production: forecast._p2 },
                "6": { sales: "0", production: "0" },
                "7": { sales: "0", production: "0" },
                "8": { sales: "0", production: "0" }
              }
            },
            {
              id: "P3",
              name: "Herrenrad",
              periods: {
                "5": { sales: forecast._p3, production: forecast._p3 },
                "6": { sales: "0", production: "0" },
                "7": { sales: "0", production: "0" },
                "8": { sales: "0", production: "0" }
              }
            }
          ]
        };
        setProductionProgramData(initialProductionProgram);

        const initialMaterialPlanning = {
          items: warehouseStock.article.map(article => ({
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

      } catch (initError) {
        console.error('Fehler bei der Workflow-Initialisierung:', initError);
        setBackendTestResult('Fehler bei der Dateninitialisierung');
        setDebugDetails(initError);
        setOpenSnackbar(true);
        setOpenDebugDialog(true);
      }
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

  const testBackendCommunication = async () => {
    try {
      // Umfassende Backend-Kommunikationstests
      const testEndpoints = [
        { name: 'Forecast', method: ApiService.getForecast },
        { name: 'Warehouse Stock', method: ApiService.getWarehouseStock, optional: true },
        { name: 'Sale and Production Program', method: ApiService.getSaleAndProductionProgram },
        { name: 'Material Plan', method: ApiService.getMaterialPlan },
        { name: 'Capacity Plan', method: ApiService.getCapacityPlan },
        { name: 'Production Orders', method: ApiService.getProductionOrders }
      ];

      const testResults = [];

      for (const endpoint of testEndpoints) {
        try {
          const result = await endpoint.method();
          testResults.push(`${endpoint.name}: Erfolgreich`);
          console.log(`${endpoint.name} Test Result:`, result);
        } catch (endpointError) {
          if (!endpoint.optional) {
            testResults.push(`${endpoint.name}: Fehler`);
          } else {
            testResults.push(`${endpoint.name}: Optional-Fehler`);
          }
          console.error(`${endpoint.name} Test Error:`, endpointError);
        }
      }
      
      // Wenn XML-Daten vorhanden sind, importiere sie
      if (xmlData) {
        try {
          await ApiService.importXmlData(xmlData);
          testResults.push('XML Import: Erfolgreich');
        } catch (importError) {
          testResults.push('XML Import: Fehler');
          console.error('XML Import Error:', importError);
        }
      }

      // Zusammenfassende Ergebnismeldung
      const successfulTests = testResults.filter(result => 
        result.includes('Erfolgreich') || result.includes('Optional-Fehler')
      ).length;
      const totalTests = testResults.length;
      
      const resultMessage = `Backend-Test: ${successfulTests}/${totalTests} Endpunkte erfolgreich`;
      
      setBackendTestResult(resultMessage);
      setDebugDetails(testResults);
      setOpenSnackbar(true);
      
      // Öffne Debug-Dialog nur bei kritischen Fehlern
      const criticalFailures = testResults.filter(result => 
        result.includes('Fehler') && !result.includes('Optional-Fehler')
      );
      
      if (criticalFailures.length > 0) {
        setOpenDebugDialog(true);
      }

    } catch (err) {
      console.error('Umfassender Backend-Kommunikationsfehler:', err);
      setBackendTestResult('Schwerwiegender Fehler bei der Backend-Kommunikation');
      setDebugDetails(err);
      setOpenSnackbar(true);
      setOpenDebugDialog(true);
    }
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDebugDialogClose = () => {
    setOpenDebugDialog(false);
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
            <>
              <Button variant="contained" onClick={handleDownload} sx={{ mr: 2 }}>
                {t('XMLHerunterladen')}
              </Button>
              <Button variant="contained" color="secondary" onClick={testBackendCommunication}>
                Backend testen
              </Button>
            </>
          )}
        </Paper>

        {xmlData && (
          <WorkflowContainer />
        )}

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={backendTestResult?.includes('Fehler') ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {backendTestResult}
          </Alert>
        </Snackbar>

        <Dialog
          open={openDebugDialog}
          onClose={handleDebugDialogClose}
          aria-labelledby="debug-dialog-title"
          aria-describedby="debug-dialog-description"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle id="debug-dialog-title">{"Backend Kommunikationsfehler"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="debug-dialog-description">
              <Typography variant="body2" color="error" component="div">
                Detaillierte Fehlerinformationen:
              </Typography>
              <Box component="pre" sx={{ 
                backgroundColor: '#f0f0f0', 
                padding: '10px', 
                borderRadius: '5px', 
                overflowX: 'auto',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {typeof debugDetails === 'object' 
                  ? JSON.stringify(debugDetails, null, 2) 
                  : debugDetails}
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDebugDialogClose} color="primary" autoFocus>
              Schließen
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default App;
