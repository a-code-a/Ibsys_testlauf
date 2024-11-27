import axios, { AxiosError } from 'axios';
import { XMLData } from '../types';
import config from '../config';

// Umfassende Datenbereinigung und Validierung
const sanitizeXmlData = (data: XMLData): XMLData => {
  // Hilfsfunktion zur Bereinigung von Arrays und Objekten
  const cleanValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value.filter(item => 
        item !== null && 
        item !== undefined && 
        item !== '' && 
        (typeof item !== 'object' || Object.keys(item).length > 0)
      ).map(cleanValue);
    }
    
    if (typeof value === 'object' && value !== null) {
      const cleanedObj: any = {};
      Object.keys(value).forEach(key => {
        const cleanedValue = cleanValue(value[key]);
        if (cleanedValue !== null && cleanedValue !== undefined && 
            (typeof cleanedValue !== 'object' || Object.keys(cleanedValue).length > 0)) {
          cleanedObj[key] = cleanedValue;
        }
      });
      return Object.keys(cleanedObj).length > 0 ? cleanedObj : null;
    }
    
    return value;
  };

  // Tiefe Bereinigung der gesamten Datenstruktur
  const sanitizedResults = cleanValue({
    ...data.results,
    forecast: data.results.forecast || { _p1: '0', _p2: '0', _p3: '0' },
    warehousestock: {
      article: data.results.warehousestock?.article || [],
      totalstockvalue: data.results.warehousestock?.totalstockvalue || '0'
    }
  });

  // Fallback für den Fall, dass alles entfernt wurde
  return { 
    results: sanitizedResults || {
      forecast: { _p1: '0', _p2: '0', _p3: '0' },
      warehousestock: { 
        article: [], 
        totalstockvalue: '0' 
      }
    }
  };
};

// Konfiguriere Axios mit zusätzlichen Optionen
const apiClient = axios.create({
  baseURL: config.backendUrl,
  timeout: 15000, // Erhöhter Timeout auf 15 Sekunden
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor für umfassende Fehlerprotokollierung
apiClient.interceptors.request.use(
  config => {
    // Stelle sicher, dass Daten als JSON-String serialisiert werden
    if (config.data) {
      config.data = JSON.stringify(config.data);
    }
    console.log('API Request Config:', {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data ? JSON.parse(config.data) : null
    });
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Detaillierter API-Fehler:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message,
      config: {
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data ? JSON.parse(error.config.data) : null
      }
    });
    return Promise.reject(error);
  }
);

export const ApiService = {
  // Forecast Endpoint
  getForecast: async () => {
    try {
      const response = await apiClient.get('/forecast');
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Prognose:', error);
      throw error;
    }
  },

  // Warehouse Stock Endpoint
  getWarehouseStock: async () => {
    try {
      const response = await apiClient.get('/warehousestocks');
      return response.data;
    } catch (error) {
      console.error('Warehouse Stock Fehler:', error);
      throw error;
    }
  },

  // Import XML Data
  importXmlData: async (xmlData: XMLData) => {
    try {
      // Bereinige die XML-Daten vor dem Import mit umfassender Validierung
      const sanitizedData = sanitizeXmlData(xmlData);
      
      console.log('Bereinigte XML-Daten für Import:', JSON.stringify(sanitizedData, null, 2));
      
      const response = await apiClient.post('/import', sanitizedData);
      return response.data;
    } catch (error) {
      console.error('Fehler beim Importieren der XML-Daten:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Detaillierter Import-Fehler:', {
          status: axiosError.response?.status,
          data: axiosError.response?.data,
          headers: axiosError.response?.headers,
          message: axiosError.message
        });
      }
      
      throw error;
    }
  },

  // Weitere Methoden bleiben unverändert...
  getSaleAndProductionProgram: async () => {
    try {
      const response = await apiClient.get('/sale-and-production-program');
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen des Verkaufs- und Produktionsprogramms:', error);
      throw error;
    }
  },

  getMaterialPlan: async () => {
    try {
      const response = await apiClient.get('/material-plan');
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen des Materialplans:', error);
      throw error;
    }
  },

  getCapacityPlan: async () => {
    try {
      const response = await apiClient.get('/capacity-plan');
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen des Kapazitätsplans:', error);
      throw error;
    }
  },

  getProductionOrders: async () => {
    try {
      const response = await apiClient.get('/production-orders');
      return response.data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Produktionsaufträge:', error);
      throw error;
    }
  },

  // Debugging-Methode für generische API-Anfragen
  debugApiCall: async (endpoint: string) => {
    try {
      const response = await apiClient.get(endpoint);
      console.log(`Debug-Antwort für ${endpoint}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Debug-Fehler für ${endpoint}:`, error);
      throw error;
    }
  }
};
