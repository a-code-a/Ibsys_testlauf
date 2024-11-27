export interface Results {
  _game?: string;
  _group?: string;
  _period?: string;
  forecast: {
    _p1: string;
    _p2: string;
    _p3: string;
  };
  warehousestock: {
    article: Array<{
      _id: string;
      _amount: string;
      _startamount: string;
      _pct?: string;
      _price?: string;
      _stockvalue?: string;
    }>;
    totalstockvalue: string;
  };
  inwardstockmovement?: {
    order: Array<{
      orderperiod?: string;
      id?: string;
      mode?: string;
      article?: string;
      amount?: string;
      time?: string;
      materialcosts?: string;
      ordercosts?: string;
      entirecosts?: string;
      piececosts?: string;
    }>;
  };
  futureinwardstockmovement?: {
    order: Array<{
      orderperiod?: string;
      id?: string;
      mode?: string;
      article?: string;
      amount?: string;
    }>;
  };
  idletimecosts?: string;
  waitinglistworkstations?: {
    workplace?: Array<{
      waitinglist?: Array<string> | string;
    }>;
  };
  waitingliststock?: {
    missingpart?: Array<{
      workplace?: {
        waitinglist?: string;
      };
    }>;
  };
  ordersinwork?: {
    workplace?: Array<string>;
  };
  completedorders?: {
    order?: Array<{
      batch?: Array<string>;
    }>;
  };
  cycletimes?: {
    order?: Array<string>;
  };
  result?: {
    general?: {
      capacity?: string;
      possiblecapacity?: string;
      relpossiblenormalcapacity?: string;
      productivetime?: string;
      effiency?: string;
      sellwish?: string;
      salesquantity?: string;
      deliveryreliability?: string;
      idletime?: string;
      idletimecosts?: string;
      storevalue?: string;
      storagecosts?: string;
    };
    defectivegoods?: {
      quantity?: string;
      costs?: string;
    };
    normalsale?: {
      salesprice?: string;
      profit?: string;
      profitperunit?: string;
    };
    directsale?: {
      profit?: string;
      contractpenalty?: string;
    };
    marketplacesale?: {
      profit?: string;
    };
    summary?: {
      profit?: string;
    };
  };
}

export interface XMLData {
  results: Results;
}
