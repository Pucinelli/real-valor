import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import {
  InvestmentHistory,
  InvestmentCurrency,
  InvestmentDetails,
} from '../../_settings/types/models';
import { ChangeHandler } from '../../_settings/types/handlers';
import { numberToMoneyString } from '../../_settings/util';
import InvestmentSelector from '../../molecules/investment-selector';

const useStyles = makeStyles(theme => ({
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

export interface DetailedInvestmentInfoProps {
  investments: {
    [investment: string]: InvestmentHistory;
  };
  afterSelect?: () => void;
}

const DetailedInvestmentInfo: React.FC<DetailedInvestmentInfoProps> = ({
  investments,
  afterSelect = () => {},
}) => {
  const classes = useStyles();
  const [selectedInvestment, setSelectedInvestment] = useState<
    InvestmentCurrency | undefined
  >(undefined);
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails | undefined
  >(undefined);

  const handleInvestmentSelectorChange: ChangeHandler = ev => {
    setSelectedInvestment(ev.target.value as InvestmentCurrency);
    afterSelect();
  };

  useEffect(() => {
    if (selectedInvestment) {
      const investmentDates = Object.keys(investments[selectedInvestment]).sort();

      if (investmentDates.length > 0) {
        const startDate = investmentDates[0];
        const endDate = investmentDates[investmentDates.length - 1];
        const startValue = investments[selectedInvestment][startDate].value;
        const endValue = investments[selectedInvestment][endDate].value;

        setInvestmentDetails({
          initialDate: moment(startDate),
          initialTotalValue: startValue,
          currentTotalValue: endValue,
          accumulatedProfit: (endValue / startValue - 1) * 100,
        });
      } else {
        setInvestmentDetails(undefined);
      }
    }
  }, [investments, selectedInvestment]);

  return (
    <>
      <Typography variant="h6" align="center">
        Informações Adicionais
      </Typography>
      <Divider className={classes.divider} />
      <InvestmentSelector
        fullWidth
        label="Ativo de Investimento"
        value={selectedInvestment ? selectedInvestment : ''}
        onChange={handleInvestmentSelectorChange}
      />
      <Divider className={classes.divider} />
      {selectedInvestment ? (
        investmentDetails ? (
          <>
            <Typography align="center">
              <b>Início do Investimento</b>
              <br />
              {investmentDetails.initialDate.format('LL')}
              <br />
              <b>Valor Total Inicial</b>
              <br />
              R$ {numberToMoneyString(investmentDetails.initialTotalValue)}
              <br />
              <b>Valor Total Hoje</b>
              <br />
              R$ {numberToMoneyString(investmentDetails.currentTotalValue)}
              <br />
              <b>Rentabilidade Acumulada</b>
              <br />
              {numberToMoneyString(investmentDetails.accumulatedProfit)}%
            </Typography>
          </>
        ) : (
          <Typography align="center">
            Por favor, calcule uma estimativa de investimento para o ativo selecionado
          </Typography>
        )
      ) : (
        <Typography align="center">
          Por favor, selecione um ativo de investimento
        </Typography>
      )}
    </>
  );
};

export default DetailedInvestmentInfo;
