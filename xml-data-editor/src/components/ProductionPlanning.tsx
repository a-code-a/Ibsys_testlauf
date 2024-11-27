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
  Button,
  Radio,
  IconButton,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';
import { ProductionPlanningData, OrderItem, OrderResult } from '../types/WorkflowTypes';
import { ApiService } from '../services/apiService';

export default function ProductionPlanning() {
  const { t } = useTranslation();
  const { setProductionPlanningData } = useWorkflowStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchProductionOrders = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getProductionOrders();
        
        // Konvertiere Backend-Daten in Frontend-Format
        const frontendOrders: OrderItem[] = (data.orders || []).map((order: OrderResult) => ({
          id: order.id,
          articleNumber: order.article,
          amount: order.amount,
          selected: false,
          firstBatch: 1,
          lastBatch: 1,
          period: 1,
          timeNeed: 0,
          workplaceId: 1
        }));

        setOrders(frontendOrders);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Laden der Produktionsaufträge:', err);
        setError(t('FehlerBeimLadenDerProduktionsauftraege'));
        setLoading(false);
      }
    };

    fetchProductionOrders();
  }, [t]);

  useEffect(() => {
    const data: ProductionPlanningData = { orders };
    setProductionPlanningData(data);
  }, [orders, setProductionPlanningData]);

  const handleSplitOrder = () => {
    const newOrders = orders.flatMap(order => {
      if (order.selected) {
        const halfAmount = Math.floor(order.amount / 2);
        return [
          { 
            ...order, 
            amount: halfAmount, 
            selected: false,
            id: `${order.id}_1`
          },
          { 
            ...order, 
            id: `${order.id}_2`, 
            amount: order.amount - halfAmount, 
            selected: false 
          }
        ];
      }
      return [order];
    });
    setOrders(newOrders);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    const newOrders = [...orders];
    if (direction === 'up' && index > 0) {
      [newOrders[index], newOrders[index - 1]] = [newOrders[index - 1], newOrders[index]];
    } else if (direction === 'down' && index < orders.length - 1) {
      [newOrders[index], newOrders[index + 1]] = [newOrders[index + 1], newOrders[index]];
    }
    setOrders(newOrders);
  };

  const handleSave = async () => {
    try {
      // Konvertiere Frontend-Daten in Backend-Format
      const backendData = orders.map((order, index) => ({
        amount: order.amount,
        firstbatch: order.firstBatch || 1,
        item: parseInt(order.articleNumber.replace(/\D/g, '')) || 0,
        lastbatch: order.lastBatch || 1,
        order_number: index + 1,
        period: order.period || 1,
        timeneed: order.timeNeed || 0,
        workplace_fk: order.workplaceId || 1
      }));

      await ApiService.saveProductionOrders(backendData);
      setSuccessMessage(t('ProduktionsauftraegeErfolgreichGespeichert'));
    } catch (err) {
      console.error('Fehler beim Speichern der Produktionsaufträge:', err);
      setError(t('FehlerBeimSpeichernDerProduktionsauftraege'));
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
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSplitOrder}
          disabled={!orders.some(order => order.selected)}
        >
          {t('BestellungAufteilen')}
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave}
        >
          {t('Speichern')}
        </Button>
      </Box>
      
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="80px">{t('Verschieben')}</TableCell>
              <TableCell width="50px">{t('Auswählen')}</TableCell>
              <TableCell>{t('Artikelnummer')}</TableCell>
              <TableCell>{t('Menge')}</TableCell>
              <TableCell>{t('ErsterBatch')}</TableCell>
              <TableCell>{t('LetzterBatch')}</TableCell>
              <TableCell>{t('Periode')}</TableCell>
              <TableCell>{t('Zeitbedarf')}</TableCell>
              <TableCell>{t('Arbeitsplatz')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order.id}
                sx={{
                  backgroundColor: order.selected ? 'rgba(0, 123, 255, 0.1)' : 'inherit',
                  '& td': { borderBottom: 'none' }
                }}
              >
                <TableCell width="80px">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => moveOrder(index, 'up')}
                      disabled={index === 0}
                    >
                      <KeyboardArrowUpIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => moveOrder(index, 'down')}
                      disabled={index === orders.length - 1}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell width="50px">
                  <Radio
                    checked={order.selected}
                    onChange={() => {
                      const newOrders = orders.map(o => ({
                        ...o,
                        selected: o.id === order.id ? !o.selected : false
                      }));
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>{order.articleNumber}</TableCell>
                <TableCell>
                  <TextField
                    value={order.amount}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        amount: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={order.firstBatch}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        firstBatch: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={order.lastBatch}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        lastBatch: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={order.period}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        period: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={order.timeNeed}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        timeNeed: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={order.workplaceId}
                    size="small"
                    type="number"
                    onChange={(e) => {
                      const newOrders = [...orders];
                      const index = newOrders.findIndex(o => o.id === order.id);
                      newOrders[index] = {
                        ...newOrders[index],
                        workplaceId: Number(e.target.value)
                      };
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage(null)}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
