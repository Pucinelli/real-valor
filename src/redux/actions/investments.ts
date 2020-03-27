import moment from 'moment';
import {
  InvestmentsActionThunk,
  InvestmentsActionTypes,
  InvestmentsFetchRequestPayload,
} from '../../_settings/types/actions/investments';
import {
  dispatchType,
  generateTdData,
  handleRawResponse,
  handleResponseDataDecorator,
  handleResponseErrors,
  handleResponseIntoChartData,
  makeRequest,
} from '../../_settings/util';

export const investmentsFetchRequest = ({
  investment,
  investmentValue,
  limit,
  latestRecordDate = moment(),
}: InvestmentsFetchRequestPayload): InvestmentsActionThunk => {
  return dispatch => {
    dispatch({ type: InvestmentsActionTypes.INVESTMENTS_FETCH_REQUEST });

    if (investment === '_td') {
      dispatch({
        type: InvestmentsActionTypes.INVESTMENTS_FETCH_SUCCESS,
        payload: generateTdData(investment, investmentValue, limit),
      });
    } else {
      makeRequest('https://min-api.cryptocompare.com/data/v2/histoday', {
        params: {
          fsym: investment,
          tsym: 'BRL',
          limit,
          toTs: Math.floor(latestRecordDate.valueOf() / 1000),
        },
      })
        .then(handleRawResponse)
        .then(handleResponseErrors)
        .then(handleResponseDataDecorator(investment, investmentValue))
        .then(handleResponseIntoChartData)
        .then(dispatchType(dispatch, InvestmentsActionTypes.INVESTMENTS_FETCH_SUCCESS))
        .catch(
          dispatchType(dispatch, InvestmentsActionTypes.INVESTMENTS_FETCH_FAILURE)
        );
    }
  };
};

export const investmentsFetchSuccess = <T>(payload: T) => ({
  type: InvestmentsActionTypes.INVESTMENTS_FETCH_SUCCESS,
  payload,
});

export const investmentsFetchFailure = <T>(payload: T) => ({
  type: InvestmentsActionTypes.INVESTMENTS_FETCH_FAILURE,
  payload,
});
