import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import moment from 'moment';

const renderApp = () => {
  return render(<App />);
};

describe('<App />', () => {
  test('should display a form with the default values selected for it', async () => {
    const { findByTestId } = renderApp();

    const form = await findByTestId('form');

    expect(form).toHaveFormValues({
      'investment-coin': '_td',
      'investment-date': moment()
        .subtract(1, 'year')
        .format('MMMM YYYY'),
      'invested-value': '2.000',
    });
  });

  test('should allow selecting bitcoin', async () => {
    const { findByTestId } = renderApp();

    const investmentCoinWrapper = await findByTestId('investment-coin');
    const investmentCoin = investmentCoinWrapper.children.namedItem('investment-coin')!;

    fireEvent.change(investmentCoin, { target: { value: 'btc' } });

    expect(investmentCoin).toHaveValue('btc');
  });
});
