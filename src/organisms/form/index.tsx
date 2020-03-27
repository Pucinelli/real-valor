import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { InvestmentCurrency } from '../../_settings/types/models';
import { ChangeHandler } from '../../_settings/types/handlers';
import { investmentsFetchRequest } from '../../redux/actions/investments';
import InvestmentSelector from '../../molecules/investment-selector';
import { makeStyles } from '@material-ui/core';

const MIN_DATE = moment([2015]);
const MAX_DATE = moment()
  .startOf('month')
  .subtract(1, 'day');

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none',
  },
}));

export interface FormProps {
  afterSubmit?: () => void;
}

const Form: React.FC<FormProps> = ({ afterSubmit = () => {} }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [investmentCoin, setInvestmentCoin] = useState<InvestmentCurrency>('_td');
  const [investedValue, setInvestedValue] = useState(2000);
  const [investmentDate, setInvestmentDate] = useState<moment.Moment | null>(
    moment().subtract(1, 'year')
  );

  const handleInvestmentCoinChange: ChangeHandler = ev =>
    setInvestmentCoin(ev.target.value as InvestmentCurrency);

  const handleInvestedValueChange: ChangeHandler<HTMLInputElement> = event => {
    const newValue = event.target.value.replace(/[.,]/g, '');
    if (newValue.length === 0) {
      setInvestedValue(0);
    } else if (newValue.length < 16) {
      setInvestedValue(Math.abs(Number(newValue) || investedValue));
    }
  };

  const handleInvestedValueSelect: ChangeHandler = ev =>
    setInvestedValue(Number(ev.target.value));

  const handleSubmit = (event: React.FormEvent | React.MouseEvent) => {
    event.preventDefault();
    if (investmentDate!.isBefore(MAX_DATE) && investmentDate!.isAfter(MIN_DATE)) {
      const limit = Math.abs(
        moment()
          .startOf()
          .diff(investmentDate!, 'days')
      );
      dispatch(
        investmentsFetchRequest({
          investment: investmentCoin,
          limit,
          investmentValue: investedValue,
        })
      );
      afterSubmit();
    }
  };
  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          <InvestmentSelector
            fullWidth
            label="Ativo de Investimento"
            hasNullOption={false}
            value={investmentCoin}
            name="investment-coin"
            data-testid="investment-coin"
            id="investment-coin"
            onChange={handleInvestmentCoinChange}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <InputLabel htmlFor="investment-date" className={classes.hidden}>
                Data do Investimento
              </InputLabel>
              <DatePicker
                autoOk
                label="Data do Investimento"
                value={investmentDate}
                name="investment-date"
                data-testid="investment-date"
                id="investment-date"
                onChange={setInvestmentDate}
                openTo="year"
                views={['year', 'month']}
                minDate={MIN_DATE}
                maxDate={MAX_DATE}
                minDateMessage="A data escolhida é menor que o limite mínimo permitido"
                maxDateMessage="A data escolhida é maior que o limite máximo permitido"
                cancelLabel="Cancelar"
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="invested-value">Valor de Investimento</InputLabel>
            <Input
              value={investedValue.toLocaleString('pt-BR')}
              onChange={handleInvestedValueChange}
              name="invested-value"
              data-testid="invested-value"
              id="invested-value"
              startAdornment={
                <InputAdornment position="start">
                  <Select
                    label="Valor de Investimento"
                    renderValue={() => 'Valores'}
                    value={investedValue}
                    onChange={handleInvestedValueSelect}
                    disableUnderline
                  >
                    <MenuItem style={{ display: 'none' }} value={investedValue} />
                    <MenuItem value={2000}>R$ 2.000,00</MenuItem>
                    <MenuItem value={10000}>R$ 10.000,00</MenuItem>
                  </Select>
                  R$
                </InputAdornment>
              }
              endAdornment={<InputAdornment position="end">,00</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid container item justify="flex-end" xs={12} lg={6}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Calcular
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
