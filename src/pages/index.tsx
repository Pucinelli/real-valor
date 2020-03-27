import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { GridProps } from '@material-ui/core/Grid';
import { useTheme, useMediaQuery } from '@material-ui/core';
import moment from 'moment';
import {
  InvestmentHistory,
  InvestmentCurrency,
  ChartData,
} from '../_settings/types/models';
import { Store } from '../_settings/types/store';
import {
  mapArrayToObject,
  useWindowDimensions,
  makeSmoothScrollToElement,
} from '../_settings/util';
import MainLayout from '../templates/main-layout';
import AboutText from '../molecules/about-text';
import Form from '../organisms/form';
import ChartNavigator from '../organisms/chart-navigator';
import DetailedInvestmentInfo from '../organisms/detailed-investment-info';

const getValues = (history: InvestmentHistory) =>
  Object.keys(history || {}).map(date => ({ date, value: history[date].value }));

const getChartWidth = (
  isLgSize: boolean,
  lgSize: GridProps['lg'],
  windowDimensions: { width: number; height: number }
) => {
  if (isLgSize) {
    return lgSize === 12
      ? windowDimensions.width * 0.85
      : windowDimensions.width * 0.64;
  }
  return windowDimensions.width * 0.75;
};

const Index: React.FC = () => {
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();
  const isLgSize = useMediaQuery(theme.breakpoints.up('lg'));
  const investments = useSelector((state: Store) => state.investments);

  const chartWrapperRef = useRef<HTMLElement>();
  const additionalInfoWrapperRef = useRef<HTMLElement>();

  const [chartData, setChartData] = useState<ChartData>({});
  const [chartWrapperLgSize, setChartWrapperLgSize] = useState<12 | 9>(12);

  const scrollToChart = makeSmoothScrollToElement(chartWrapperRef.current!);
  const scrollToAdditionalInfo = makeSmoothScrollToElement(
    additionalInfoWrapperRef.current!
  );

  useEffect(() => {
    const datesSet = new Set<string>();
    const monthsSet = new Set<string>();
    const data: ChartData = {};
    const investmentCurrencies = Object.keys(investments) as InvestmentCurrency[];

    investmentCurrencies.forEach(investment => {
      getValues(investments[investment]).forEach(investmentData => {
        datesSet.add(investmentData.date);
        monthsSet.add(investmentData.date.substr(0, 7));
      });
    });

    if (datesSet.size > 0) {
      Array.from(datesSet).forEach(date => {
        data[date] = mapArrayToObject(
          investmentCurrencies,
          it => it,
          it => (investments[it][date] || {}).value
        );
      });

      setChartData(data);
      setChartWrapperLgSize(9);
    }
  }, [investments]);

  return (
    <MainLayout
      headerText="Real Valor"
      topLeftChildren={<AboutText />}
      topRightChildren={<Form afterSubmit={scrollToChart} />}
      bottomLeftChildren={
        <ChartNavigator
          dataSet={chartData}
          filter={(key, index) => key.startsWith(index)}
          tabKeys={Array.from(
            new Set(Object.keys(chartData).map(key => key.substr(0, 7)))
          ).sort()}
          tabTextFormatter={key => moment(key).format('MMM YYYY')}
          chartWidth={getChartWidth(isLgSize, chartWrapperLgSize, windowDimensions)}
          interval={isLgSize ? 6 : 14}
        />
      }
      bottomRightChildren={
        <DetailedInvestmentInfo
          investments={investments}
          afterSelect={scrollToAdditionalInfo}
        />
      }
      bottomLeftRef={chartWrapperRef}
      bottomRightRef={additionalInfoWrapperRef}
      isGrown={chartWrapperLgSize === 12}
    />
  );
};

export default Index;
