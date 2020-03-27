import moment from 'moment';

export interface InvestmentHistoryRecord {
  value: number;
  date: moment.Moment;
}

export interface InvestmentHistory {
  [isoDate: string]: InvestmentHistoryRecord;
}

export interface InvestmentCurrenciesHistory {
  [currency: string]: InvestmentHistory;
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

export interface ChartTooltipPayload {
  dataKey: string;
  name: string;
  color: string;
  payload: ChartData['x'];
}

export interface ApiResponseDataRecord {
  open: number;
  close: number;
  time: number;
}

export interface ApiResponseData {
  Data: {
    Data: ApiResponseDataRecord[];
  };
}
