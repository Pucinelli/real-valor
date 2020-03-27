import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InvestmentCurrency } from '../../_settings/types/models';
import { CURRENCIES_LIST } from '../../_settings/consts';

export interface InvestmentSelectorProps extends SelectProps {
  hasNullOption?: boolean;
}

const InvestmentSelector: React.FC<InvestmentSelectorProps> = ({
  hasNullOption = true,
  ...props
}) => (
  <FormControl fullWidth={props.fullWidth}>
    <InputLabel>{props.label}</InputLabel>
    <Select {...props}>
      {hasNullOption && <MenuItem value={undefined} style={{ display: 'none' }} />}
      {Object.keys(CURRENCIES_LIST).map(currency => (
        <MenuItem key={`investment-selector-${currency}`} value={currency}>
          {CURRENCIES_LIST[currency as InvestmentCurrency].name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default InvestmentSelector;
