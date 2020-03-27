import React from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { InvestmentCurrency, ChartData } from '../../_settings/types/models';
import { CURRENCIES_LIST } from '../../_settings/consts';
import { moneyLabelFormatter } from '../../_settings/util';
import ChartTooltip, { ChartTooltipProps } from '../chart-tooltip';

export interface InvestmentChartProps {
  width?: number;
  height?: number;
  startOpacity?: number;
  startOffset?: string;
  endOpacity?: number;
  endOffset?: string;
  interval?: number;
  visibleData: ChartData;
  data: ChartData;
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({
  width = 256,
  height = 256,
  startOpacity = 0.7,
  startOffset = '0%',
  endOpacity = 0.0,
  endOffset = '90%',
  interval = 10,
  visibleData,
  data,
}) => {
  const investments = Object.keys(CURRENCIES_LIST);
  const dataset = Object.keys(visibleData)
    .map(date => ({ ...visibleData[date], _date: date }))
    .sort((a, b) => a._date.localeCompare(b._date));

  const getColor = (currency: InvestmentCurrency) => CURRENCIES_LIST[currency].color;

  return (
    <AreaChart
      width={width}
      height={height}
      data={dataset}
      margin={{ top: 10, right: 0, left: 16, bottom: 0 }}
    >
      <defs>
        {investments.map(it => (
          <linearGradient
            key={`line-chart-gradient-${it}`}
            id={`line-chart-gradient-${it}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset={startOffset}
              stopColor={getColor(it as InvestmentCurrency)}
              stopOpacity={startOpacity}
            />
            <stop
              offset={endOffset}
              stopColor={getColor(it as InvestmentCurrency)}
              stopOpacity={endOpacity}
            />
          </linearGradient>
        ))}
      </defs>
      <XAxis dataKey="_date" interval={interval} />
      <YAxis tickFormatter={moneyLabelFormatter} />
      <CartesianGrid strokeDasharray="8 8" />
      <Tooltip
        content={(props: ChartTooltipProps) => <ChartTooltip data={data} {...props} />}
      />
      {investments.map(it => (
        <Area
          animationDuration={500}
          animationEasing="ease-out"
          key={`line-chart-area-${it}`}
          type="linear"
          dataKey={it}
          stroke={getColor(it as InvestmentCurrency)}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#line-chart-gradient-${it})`}
        />
      ))}
    </AreaChart>
  );
};

export default InvestmentChart;
