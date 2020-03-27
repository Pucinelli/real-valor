import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import { ChartData, ChartTooltipPayload } from '../../_settings/types/models';
import ChartTooltipItem from '../../atoms/chart-tooltip-item';

const useStyles = makeStyles(theme => ({
  root: {
    width: 256,
    padding: 16,
    background: '#fffc',
    boxShadow: '#0007 0 1px 6px',
    borderRadius: 6,
    color: '#1e2225dd',
  },
}));

export interface ChartTooltipProps {
  active: boolean;
  payload: ChartTooltipPayload[];
  label: string;
  data: ChartData;
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  data,
}) => {
  const classes = useStyles();
  return active ? (
    <div className={classes.root}>
      <Typography variant="h6">{moment(label).format('LL')}</Typography>
      <Divider />
      {(payload || []).map(investment => (
        <ChartTooltipItem
          key={`chart-tooltip-item-${investment.dataKey}`}
          investment={investment}
          data={data}
        />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default ChartTooltip;
