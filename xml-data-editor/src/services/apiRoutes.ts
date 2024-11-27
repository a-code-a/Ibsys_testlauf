export class ApiRoutes {
    // Prognose
    static readonly FORECAST = '/forecast';

    // Lagerbestände
    static readonly WAREHOUSE_STOCK = '/warehouse_stock';

    // Articles
    static readonly ARTICLES = '/articles';

    // Orders
    static readonly ORDERS = '/orders';

    // Work places
    static readonly WORK_PLACES = '/work_places';

    // Waiting lists
    static readonly WAITING_LISTS = '/waiting_lists';

    // Batches
    static readonly BATCHES = '/batches';

    // New Paths - Angepasst an Backend-Konvention
    static readonly SALE_AND_PRODUCTION_PROGRAM = '/sale_and_production_program';
    static readonly PRODUCTION_ORDERS = '/production_orders';
    static readonly IMPORT = '/import';
    static readonly CAPACITY_PLAN = '/capacity_plan';
    static readonly CAPACITY_PLAN_SUM_UP = '/capacity_plan_sum_up';
    static readonly DB_CONFIG = '/db_config';
    static readonly MATERIAL_PLAN = '/material_plan';
    static readonly PROCUREMENT_PLANNING = '/procurement_planning';
    static readonly RESULTS = '/results';
    static readonly RESULTS_REFRESH = '/results/refresh';
}
