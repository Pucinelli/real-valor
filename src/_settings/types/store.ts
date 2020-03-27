import { InvestmentHistory } from './models';

export interface Store {
  investments: {
    _td: InvestmentHistory;
    btc: InvestmentHistory;
    eth: InvestmentHistory;
    bch: InvestmentHistory;
    xmr: InvestmentHistory;
    doge: InvestmentHistory;
  };
}
