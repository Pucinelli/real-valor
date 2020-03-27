import moment from 'moment';

export interface InvestmentHistoryRecord {
  value: number;
  date: moment.Moment;
}

export interface InvestmentHistory {
  [isoDate: string]: InvestmentHistoryRecord;
}

export interface InvestmentDetails {
  initialDate: moment.Moment;
  initialTotalValue: number;
  currentTotalValue: number;
  accumulatedProfit: number;
}

export type InvestmentCurrency = '_td' | 'btc' | 'eth' | 'bch' | 'xmr' | 'doge';

export interface ChartData {
  [x: string]: {
    [y: string]: number;
  };
}
