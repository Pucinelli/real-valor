import React from 'react';
import Typography from '@material-ui/core/Typography';
import { InvestmentCurrency, ChartData } from '../../_settings/types/models';
import { CURRENCIES_LIST } from '../../_settings/consts';
import { moneyLabelFormatter, numberToMoneyString } from '../../_settings/util';

export interface ChartTooltipItemProps {
  investment: {
    dataKey: string;
    color: string;
    payload: ChartData['x'];
  };
  data: ChartData;
}

const ChartTooltipItem: React.FC<ChartTooltipItemProps> = ({ investment, data }) => {
  const initialDate = Object.keys(data)
    .filter(key => data[key][investment.dataKey])
    .sort()[0];
  const initialValue = data[initialDate][investment.dataKey];
  const getInvestmentName = (investment: any) =>
    investment.dataKey in CURRENCIES_LIST
      ? CURRENCIES_LIST[investment.dataKey as InvestmentCurrency].name
      : investment.name.toUppercase();
  const profitPct = (investment.payload[investment.dataKey] / initialValue - 1) * 100;

  return (
    <>
      <Typography variant="body1" style={{ color: investment.color }}>
        {getInvestmentName(investment)}
      </Typography>
      <Typography variant="body2" align="left" style={{ color: investment.color }}>
        R$ {moneyLabelFormatter(investment.payload[investment.dataKey])} (
        {numberToMoneyString(profitPct)}%)
      </Typography>
    </>
  );
};

export default ChartTooltipItem;
