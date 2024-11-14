import React, { useEffect, useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography
} from '@mui/material';
import { ApiService } from '../services/apiService';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { ProductionProgramData, ProductItem, ForecastData } from '../types/WorkflowTypes';

interface ProductionProgramProps {
    forecast?: ForecastData;
}

const ProductionProgram: React.FC<ProductionProgramProps> = ({ forecast }) => {
    const { t } = useTranslation();
    const [productionProgramData, setLocalProductionProgramData] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Zugriff auf den Workflow-Store
    const { setProductionProgramData } = useWorkflowStore();

    useEffect(() => {
        const fetchProductionProgram = async () => {
            try {
                // Beispiel-Aufruf des ApiService
                const data = await ApiService.getSaleAndProductionProgram();
                
                // Daten im lokalen State speichern
                setLocalProductionProgramData(data || []);
                
                // Daten im Workflow-Store speichern
                setProductionProgramData({ products: data || [] });
                
                setLoading(false);
            } catch (err) {
                setError(t('FehlerBeimLadenDesProgramms'));
                setLoading(false);
                console.error(err);
            }
        };

        // Wenn Forecast vorhanden, generiere Standarddaten
        if (forecast) {
            const defaultProducts: ProductItem[] = [
                {
                    id: "P1",
                    name: t('Kinderrad'),
                    periods: {
                        "5": { sales: forecast._p1, production: forecast._p1 },
                        "6": { sales: "0", production: "0" },
                        "7": { sales: "0", production: "0" },
                        "8": { sales: "0", production: "0" }
                    }
                },
                {
                    id: "P2",
                    name: t('Damenrad'),
                    periods: {
                        "5": { sales: forecast._p2, production: forecast._p2 },
                        "6": { sales: "0", production: "0" },
                        "7": { sales: "0", production: "0" },
                        "8": { sales: "0", production: "0" }
                    }
                },
                {
                    id: "P3",
                    name: t('Herrenrad'),
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

    if (loading) return <Typography>{t('Laden')}</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productionProgramData.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.periods?.["5"]?.sales || "0"}</TableCell>
                                <TableCell>{product.periods?.["5"]?.production || "0"}</TableCell>
                                <TableCell>{product.periods?.["6"]?.sales || "0"}</TableCell>
                                <TableCell>{product.periods?.["6"]?.production || "0"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProductionProgram;
