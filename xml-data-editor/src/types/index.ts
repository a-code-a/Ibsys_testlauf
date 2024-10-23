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
}

export interface XMLData {
  results: Results;
}
