import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';

interface ProductionProgramProps {
  forecast: {
    _p1: string;
    _p2: string;
    _p3: string;
  };
}

interface ProductData {
  id: string;
  name: string;
  periods: {
    [key: string]: {
      sales: string;
      production: string;
    };
  };
}

export default function ProductionProgram({ forecast }: ProductionProgramProps) {
  const { t } = useTranslation();
  const { setProductionProgramData } = useWorkflowStore();
  const [products, setProducts] = useState<ProductData[]>([
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
  ]);

  useEffect(() => {
    console.log('Aktualisiere Produktionsprogramm-Daten:', { products });
    setProductionProgramData({ products });
  }, [products, setProductionProgramData]);

  const handleValueChange = (
    productId: string,
    period: string,
    field: 'sales' | 'production',
    value: string
  ) => {
    setProducts(prevProducts => {
      const newProducts = prevProducts.map(product => {
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
      return newProducts;
    });
  };

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {t('Produktionsprogramm')}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Produkt')} \ {t('Periode')}</TableCell>
              <TableCell align="center" colSpan={2}>5 ({t('Auftrag')})</TableCell>
              <TableCell align="center" colSpan={2}>6 ({t('Vorhersage')})</TableCell>
              <TableCell align="center" colSpan={2}>7 ({t('Vorhersage')})</TableCell>
              <TableCell align="center" colSpan={2}>8 ({t('Vorhersage')})</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">{t('Verkauf')}</TableCell>
              <TableCell align="center">{t('Produktion')}</TableCell>
              <TableCell align="center">{t('Verkauf')}</TableCell>
              <TableCell align="center">{t('Produktion')}</TableCell>
              <TableCell align="center">{t('Verkauf')}</TableCell>
              <TableCell align="center">{t('Produktion')}</TableCell>
              <TableCell align="center">{t('Verkauf')}</TableCell>
              <TableCell align="center">{t('Produktion')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{t(product.name)}</TableCell>
                {["5", "6", "7", "8"].map((period) => (
                  <React.Fragment key={period}>
                    <TableCell>
                      <TextField
                        value={product.periods[period].sales}
                        onChange={(e) => handleValueChange(product.id, period, 'sales', e.target.value)}
                        variant="outlined"
                        size="small"
                        type="number"
                        disabled={period === "5"}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={product.periods[period].production}
                        onChange={(e) => handleValueChange(product.id, period, 'production', e.target.value)}
                        variant="outlined"
                        size="small"
                        type="number"
                      />
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
