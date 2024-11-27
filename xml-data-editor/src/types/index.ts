export interface Results {
  _game: string;
  _group: string;
  _period: string;
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
      _pct: string;
      _price: string;
      _stockvalue: string;
    }>;
    totalstockvalue: string;
  };
  inwardstockmovement?: {
    order: Array<{
      orderperiod: string;
      id: string;
      mode: string;
      article: string;
      amount: string;
      time: string;
      materialcosts: string;
      ordercosts: string;
      entirecosts: string;
      piececosts: string;
    }>;
  };
  futureinwardstockmovement?: {
    order: Array<{
      orderperiod: string;
      id: string;
      mode: string;
      article: string;
      amount: string;
    }>;
  };
  idletimecosts?: string;
}

export interface XMLData {
  results: Results;
}
