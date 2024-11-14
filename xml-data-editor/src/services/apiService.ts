import axios from 'axios';
import { ApiRoutes } from './apiRoutes';

const BASE_URL = 'http://localhost:8080/api'; // Passen Sie die URL an Ihre Backend-Konfiguration an

export const ApiService = {
    // Generische Methode für GET-Anfragen
    async get(route: string, params?: any) {
        try {
            const response = await axios.get(`${BASE_URL}${route}`, { params });
            return response.data;
        } catch (error) {
            console.error(`Fehler bei GET-Anfrage zu ${route}:`, error);
            throw error;
        }
    },

    // Generische Methode für POST-Anfragen
    async post(route: string, data: any) {
        try {
            const response = await axios.post(`${BASE_URL}${route}`, data);
            return response.data;
        } catch (error) {
            console.error(`Fehler bei POST-Anfrage zu ${route}:`, error);
            throw error;
        }
    },

    // Spezifische Methoden für verschiedene Routen
    async getForecast(params?: any) {
        return this.get(ApiRoutes.FORECAST, params);
    },

    async getWarehouseStocks(params?: any) {
        return this.get(ApiRoutes.WAREHOUSE_STOCK, params);
    },

    async getArticles(params?: any) {
        return this.get(ApiRoutes.ARTICLES, params);
    },

    async getOrders(params?: any) {
        return this.get(ApiRoutes.ORDERS, params);
    },

    async getWorkPlaces(params?: any) {
        return this.get(ApiRoutes.WORK_PLACES, params);
    },

    async getWaitingLists(params?: any) {
        return this.get(ApiRoutes.WAITING_LISTS, params);
    },

    async getBatches(params?: any) {
        return this.get(ApiRoutes.BATCHES, params);
    },

    // Neue Routen
    async getSaleAndProductionProgram(params?: any) {
        return this.get(ApiRoutes.SALE_AND_PRODUCTION_PROGRAM, params);
    },

    async getProductionOrders(params?: any) {
        return this.get(ApiRoutes.PRODUCTION_ORDERS, params);
    },

    async importData(data: any) {
        return this.post(ApiRoutes.IMPORT, data);
    },

    async getCapacityPlan(params?: any) {
        return this.get(ApiRoutes.CAPACITY_PLAN, params);
    },

    async getCapacityPlanSumUp(params?: any) {
        return this.get(ApiRoutes.CAPACITY_PLAN_SUM_UP, params);
    },

    async getDatabaseConfig(params?: any) {
        return this.get(ApiRoutes.DB_CONFIG, params);
    },

    async getMaterialPlan(params?: any) {
        return this.get(ApiRoutes.MATERIAL_PLAN, params);
    }
};
