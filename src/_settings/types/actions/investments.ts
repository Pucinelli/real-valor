import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import moment from 'moment';
import { Store } from '../store';
import { InvestmentHistory } from '../models';

export enum InvestmentsActionTypes {
  INVESTMENTS_FETCH_REQUEST = 'INVESTMENTS_FETCH_REQUEST',
  INVESTMENTS_FETCH_SUCCESS = 'INVESTMENTS_FETCH_SUCCESS',
  INVESTMENTS_FETCH_FAILURE = 'INVESTMENTS_FETCH_FAILURE',
}

export interface InvestmentsFetchRequestPayload {
  investment: string;
  investmentValue: number;
  limit: number;
  latestRecordDate?: moment.Moment;
}
export interface InvestmentsFetchRequestAction {
  payload: InvestmentsFetchRequestPayload;
  type: InvestmentsActionTypes.INVESTMENTS_FETCH_REQUEST;
}

export interface InvestmentsFetchSuccessAction {
  payload: InvestmentHistory;
  type: InvestmentsActionTypes.INVESTMENTS_FETCH_SUCCESS;
}

export interface InvestmentsFetchFailureAction {
  payload: Error;
  type: InvestmentsActionTypes.INVESTMENTS_FETCH_FAILURE;
}

export type InvestmentsActions =
  | InvestmentsFetchRequestAction
  | InvestmentsFetchSuccessAction
  | InvestmentsFetchFailureAction;

export type InvestmentsActionThunk<T = void> = ThunkAction<
  T,
  Store,
  unknown,
  Action<InvestmentsActionTypes>
>;
