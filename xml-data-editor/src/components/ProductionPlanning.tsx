import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Radio,
  IconButton,
  Box
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useWorkflowStore } from '../store/workflowStore';
import { useTranslation } from 'react-i18next';

interface OrderItem {
  id: string;
  articleNumber: string;
  amount: number;
  selected: boolean;
}

export default function ProductionPlanning() {
  const { t } = useTranslation();
  const { setProductionPlanningData } = useWorkflowStore();
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: '1', articleNumber: '16', amount: 130, selected: false },
    { id: '2', articleNumber: '17', amount: 450, selected: false },
    { id: '3', articleNumber: '26', amount: 270, selected: false },
    { id: '4', articleNumber: '8', amount: 50, selected: false },
    { id: '5', articleNumber: '14', amount: 40, selected: false },
    { id: '6', articleNumber: '19', amount: 80, selected: false },
    { id: '7', articleNumber: '4', amount: 200, selected: false },
    { id: '8', articleNumber: '10', amount: 150, selected: false },
    { id: '9', articleNumber: '49', amount: 200, selected: false },
    { id: '10', articleNumber: '5', amount: 150, selected: false },
    { id: '11', articleNumber: '11', amount: 60, selected: false },
    { id: '12', articleNumber: '54', amount: 150, selected: false },
    { id: '13', articleNumber: '6', amount: 40, selected: false },
    { id: '14', articleNumber: '29', amount: 100, selected: false }
  ]);

  // Aktualisiere die Daten im Store
  useEffect(() => {
    const data = { orders };
    console.log('Setze Production Planning Daten:', data);
    setProductionPlanningData(data);
  }, [orders, setProductionPlanningData]);

  const handleSplitOrder = () => {
    const newOrders = orders.flatMap(order => {
      if (order.selected) {
        const halfAmount = Math.floor(order.amount / 2);
        return [
          { ...order, amount: halfAmount, selected: false },
          { ...order, id: order.id + '_split', amount: order.amount - halfAmount, selected: false }
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

  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <Box sx={{ p: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSplitOrder}
          sx={{ 
           
            '&:hover': {
             
            }
          }}
        >
          {t('BestellungAufteilen')}
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
                        selected: o.id === order.id ? !o.selected : o.selected
                      }));
                      setOrders(newOrders);
                    }}
                  />
                </TableCell>
                <TableCell>{order.articleNumber}</TableCell>
                <TableCell>{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
