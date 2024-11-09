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
  const { setProductionProgramData } = useWorkflowStore();
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

  // Initialisiere die Daten, wenn xmlData sich ändert
  useEffect(() => {
    if (xmlData?.results?.forecast) {
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

      console.log('Setze initiale Produktionsprogramm-Daten:', initialProductionProgram);
      setProductionProgramData(initialProductionProgram);
    }
  }, [xmlData, setProductionProgramData]);

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
