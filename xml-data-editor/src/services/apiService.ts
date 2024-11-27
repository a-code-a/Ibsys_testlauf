import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { ApiRoutes } from './apiRoutes';
import { 
    SaleAndProductionProgramItem,
    ProductionProgramResult,
    OrderResult,
    ProductionPlanningResult,
    CapacityPlanningResult
} from '../types/WorkflowTypes';
import { saleAndProductionProgramSchema } from '../schemas/validationSchemas';

const BASE_URL = 'http://localhost:8082/api';

// Erweiterte Netzwerk-Debugging-Funktion
function logNetworkError(error: any, context?: string) {
    console.group(`🔴 Netzwerk-Fehler: ${context || 'Unbekannter Kontext'}`);
    console.error('Fehler-Details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        config: {
            method: error.config?.method,
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            headers: error.config?.headers
        },
        request: error.request ? {
            method: error.request.method,
            path: error.request.path,
            host: error.request.host
        } : null,
        response: error.response ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        } : null
    });
    console.groupEnd();
}

// Konfiguriere Axios-Instanz mit erweiterten Debugging- und Fehlerbehandlungsoptionen
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 60000, // 60 Sekunden Timeout
        timeoutErrorMessage: 'Anfrage-Zeitüberschreitung. Bitte überprüfen Sie Ihre Netzwerkverbindung.',
        
        // Zusätzliche Netzwerk-Konfiguration
        proxy: false, // Proxy deaktivieren
        httpAgent: false, // HTTP-Agent deaktivieren
        httpsAgent: false, // HTTPS-Agent deaktivieren
        
        // Erweiterte Fehlerbehandlung
        validateStatus: function (status) {
            return status >= 200 && status < 600; // Akzeptiere erweiterten Statuscode-Bereich
        }
    });

    // Request-Interceptor für detailliertes Logging und Fehlerbehandlung
    instance.interceptors.request.use(
        config => {
            console.group(`🚀 API-Anfrage: ${config.method?.toUpperCase()} ${config.url}`);
            console.log('Anfrage-Details:', {
                method: config.method,
                url: config.url,
                baseURL: config.baseURL,
                headers: config.headers,
                data: config.data
            });
            console.groupEnd();
            return config;
        },
        error => {
            logNetworkError(error, 'Request-Interceptor');
            return Promise.reject(error);
        }
    );

    // Response-Interceptor für Fehlerbehandlung und Logging
    instance.interceptors.response.use(
        response => {
            console.group(`✅ API-Antwort: ${response.config.method?.toUpperCase()} ${response.config.url}`);
            console.log('Antwort-Details:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });
            console.groupEnd();
            return response;
        },
        (error: AxiosError) => {
            logNetworkError(error, 'Response-Interceptor');

            if (error.code === 'ECONNABORTED') {
                console.error('🕒 Zeitüberschreitung der Anfrage');
                throw new Error('Anfrage-Zeitüberschreitung. Bitte überprüfen Sie Ihre Netzwerkverbindung.');
            }

            if (!error.response) {
                console.error('🌐 Keine Serverantwort');
                throw new Error('Keine Antwort vom Server. Bitte überprüfen Sie Ihre Netzwerkverbindung und Servereinstellungen.');
            }

            // Spezifische Fehlerbehandlung
            switch (error.response.status) {
                case 400:
                    throw new Error('Ungültige Anfrage. Bitte überprüfen Sie Ihre Daten.');
                case 401:
                    throw new Error('Nicht autorisiert. Bitte melden Sie sich erneut an.');
                case 403:
                    throw new Error('Zugriff verweigert.');
                case 404:
                    throw new Error('Angeforderte Ressource nicht gefunden.');
                case 500:
                    throw new Error('Interner Serverfehler. Bitte kontaktieren Sie den Support.');
                default:
                    throw new Error(`Unerwarteter Fehler: ${error.response.status}`);
            }
        }
    );

    return instance;
};

const axiosInstance = createAxiosInstance();

export const ApiService = {
    // Generische Methoden mit verbesserter Fehlerbehandlung
    async get<T>(route: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.get(route, { ...config, params });
            return response.data;
        } catch (error) {
            console.error(`Fehler bei GET-Anfrage zu ${route}:`, error);
            throw error;
        }
    },

    async post<T>(route: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axiosInstance.post(route, data, config);
            return response.data;
        } catch (error) {
            console.error(`Fehler bei POST-Anfrage zu ${route}:`, error);
            throw error;
        }
    },

    // Restliche Methoden wie vorher...
    async getSaleAndProductionProgram(): Promise<SaleAndProductionProgramItem[]> {
        return this.get<SaleAndProductionProgramItem[]>(ApiRoutes.SALE_AND_PRODUCTION_PROGRAM);
    },

    async saveSaleAndProductionProgram(data: SaleAndProductionProgramItem[]): Promise<void> {
        // Validiere die Daten vor dem Senden
        const validationResult = saleAndProductionProgramSchema.safeParse(data);
        if (!validationResult.success) {
            throw new Error(`Validierungsfehler: ${validationResult.error.message}`);
        }
        return this.post(ApiRoutes.SALE_AND_PRODUCTION_PROGRAM, data);
    },

    // Weitere Methoden wie vorher...
    async getResults(): Promise<{
        productionProgram: ProductionProgramResult[];
        orders: OrderResult[];
        productionPlanning: ProductionPlanningResult[];
        capacityPlanning: CapacityPlanningResult[];
    }> {
        return this.get(ApiRoutes.RESULTS);
    },

    async refreshResults(data: any): Promise<void> {
        return this.post(ApiRoutes.RESULTS_REFRESH, data);
    }
};
