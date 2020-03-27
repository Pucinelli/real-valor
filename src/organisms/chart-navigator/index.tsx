import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import InvestmentChart from '../../molecules/investment-chart';
import { ChartData, InvestmentCurrency } from '../../_settings/types/models';
import { mapArrayToObject } from '../../_settings/util';

const useStyles = makeStyles(theme => ({
  tabs: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: -theme.spacing(2),
    marginLeft: -theme.spacing(2),
    marginRight: -theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '3px 3px 0 0',
  },
}));

export interface ChartNavigatorProps {
  chartWidth: number;
  dataSet: ChartData;
  tabKeys: string[];
  tabTextFormatter: (key: string) => string;
  filter: (dataKey: string, period: string) => boolean;
  interval: number;
}

const ChartNavigator: React.FC<ChartNavigatorProps> = ({
  chartWidth,
  dataSet,
  tabKeys,
  tabTextFormatter,
  filter,
  interval,
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (_: React.ChangeEvent<{}>, tab: any) => setSelectedTab(tab);

  const getChartData = (data: ChartData, tabIndex: number): ChartData => {
    const newData = mapArrayToObject(
      (Object.keys(data) as InvestmentCurrency[]).filter(key =>
        filter(key, tabKeys[tabIndex])
      ),
      key => key,
      (key: InvestmentCurrency) => dataSet[key]
    ) as ChartData;
    return newData;
  };

  useEffect(() => {
    if (tabKeys.length > 0) setSelectedTab(tabKeys.length - 1);
  }, [tabKeys]);

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="on"
        className={classes.tabs}
      >
        {tabKeys.map(key => (
          <Tab key={key} label={tabTextFormatter(key)} />
        ))}
      </Tabs>
      {tabKeys.length > 0 && (
        <Typography variant="h6" align="center">
          Variação de Preços em {tabTextFormatter(tabKeys[selectedTab])}
        </Typography>
      )}
      <InvestmentChart
        data={dataSet}
        visibleData={getChartData(dataSet, selectedTab)}
        interval={interval}
        width={chartWidth}
      />
    </>
  );
};

export default ChartNavigator;
