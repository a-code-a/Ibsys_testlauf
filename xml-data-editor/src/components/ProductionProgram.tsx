import React, { useEffect, useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { ApiService } from '../services/apiService';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { 
  ProductionProgramData, 
  ProductItem, 
  ForecastData,
  SaleAndProductionProgramItem 
} from '../types/WorkflowTypes';
import { v4 as uuidv4 } from 'uuid';

interface ProductionProgramProps {
    forecast?: ForecastData;
}

const ProductionProgram: React.FC<ProductionProgramProps> = ({ forecast }) => {
    const { t } = useTranslation();
    const [productionProgramData, setLocalProductionProgramData] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    const { setProductionProgramData } = useWorkflowStore();

    useEffect(() => {
        const fetchProductionProgram = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getSaleAndProductionProgram();
                
                if (Array.isArray(data)) {
                    // Konvertiere Backend-Daten in Frontend-Format
                    const frontendData = data.map((item: SaleAndProductionProgramItem) => ({
                        id: item.id || uuidv4(),
                        name: item.article,
                        periods: {
                            "5": { 
                                sales: item.pn.toString(),
                                production: item.pn.toString()
                            },
                            "6": { 
                                sales: item.pnplus_one.toString(),
                                production: item.pnplus_one.toString()
                            },
                            "7": { 
                                sales: item.pnplus_two.toString(),
                                production: item.pnplus_two.toString()
                            },
                            "8": { 
                                sales: item.pnplus_three.toString(),
                                production: item.pnplus_three.toString()
                            }
                        }
                    }));
                    
                    setLocalProductionProgramData(frontendData);
                    setProductionProgramData({ products: frontendData });
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Fehler beim Laden:', err);
                setError(t('FehlerBeimLadenDesProgramms'));
                setLoading(false);
            }
        };

        if (forecast) {
            const defaultProducts: ProductItem[] = [
                {
                    id: uuidv4(),
                    name: "P1",
                    periods: {
                        "5": { sales: forecast._p1, production: forecast._p1 },
                        "6": { sales: "0", production: "0" },
                        "7": { sales: "0", production: "0" },
                        "8": { sales: "0", production: "0" }
                    }
                },
                {
                    id: uuidv4(),
                    name: "P2",
                    periods: {
                        "5": { sales: forecast._p2, production: forecast._p2 },
                        "6": { sales: "0", production: "0" },
                        "7": { sales: "0", production: "0" },
                        "8": { sales: "0", production: "0" }
                    }
                },
                {
                    id: uuidv4(),
                    name: "P3",
                    periods: {
                        "5": { sales: forecast._p3, production: forecast._p3 },
                        "6": { sales: "0", production: "0" },
                        "7": { sales: "0", production: "0" },
                        "8": { sales: "0", production: "0" }
                    }
                }
            ];
            
            setLocalProductionProgramData(defaultProducts);
            setProductionProgramData({ products: defaultProducts });
            setLoading(false);
        } else {
            fetchProductionProgram();
        }
    }, [forecast, setProductionProgramData, t]);

    const handleValueChange = (productId: string, period: string, field: 'sales' | 'production', value: string) => {
        const updatedData = productionProgramData.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    periods: {
                        ...product.periods,
                        [period]: {
                            ...product.periods[period],
                            [field]: value
                        }
                    }
                };
            }
            return product;
        });

        setLocalProductionProgramData(updatedData);
        setProductionProgramData({ products: updatedData });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            // Konvertiere die Daten in das Backend-Format
            const backendData: SaleAndProductionProgramItem[] = productionProgramData.map(product => ({
                id: product.id,
                article: product.name,
                pn: parseInt(product.periods["5"].production) || 0,
                pnplus_one: parseInt(product.periods["6"].production) || 0,
                pnplus_two: parseInt(product.periods["7"].production) || 0,
                pnplus_three: parseInt(product.periods["8"].production) || 0
            }));

            console.log('Sende Daten ans Backend:', backendData);
            await ApiService.saveSaleAndProductionProgram(backendData);
            setSuccessMessage(t('DatenErfolgreichGespeichert'));
            setSaving(false);
        } catch (err) {
            console.error('Fehler beim Speichern:', err);
            if (err instanceof Error) {
                setError(`${t('FehlerBeimSpeichernDerDaten')}: ${err.message}`);
            } else {
                setError(t('FehlerBeimSpeichernDerDaten'));
            }
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
            <Typography variant="h6" sx={{ p: 2 }}>{t('Produktionsprogramm')}</Typography>
            
            {forecast && (
                <Typography sx={{ p: 2 }}>
                    {t('Prognose')}: P1 = {forecast._p1}, P2 = {forecast._p2}, P3 = {forecast._p3}
                </Typography>
            )}

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('Produkt')}</TableCell>
                            <TableCell>{t('Periode5Verkauf')}</TableCell>
                            <TableCell>{t('Periode5Produktion')}</TableCell>
                            <TableCell>{t('Periode6Verkauf')}</TableCell>
                            <TableCell>{t('Periode6Produktion')}</TableCell>
                            <TableCell>{t('Periode7Verkauf')}</TableCell>
                            <TableCell>{t('Periode7Produktion')}</TableCell>
                            <TableCell>{t('Periode8Verkauf')}</TableCell>
                            <TableCell>{t('Periode8Produktion')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productionProgramData.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                {["5", "6", "7", "8"].map((period) => (
                                    <React.Fragment key={period}>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                type="number"
                                                value={product.periods[period].sales}
                                                onChange={(e) => handleValueChange(product.id, period, "sales", e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                type="number"
                                                value={product.periods[period].production}
                                                onChange={(e) => handleValueChange(product.id, period, "production", e.target.value)}
                                            />
                                        </TableCell>
                                    </React.Fragment>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? t('Speichern...') : t('Speichern')}
                </Button>
            </Box>

            <Snackbar 
                open={!!successMessage} 
                autoHideDuration={6000} 
                onClose={() => setSuccessMessage(null)}
            >
                <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ProductionProgram;
