import { useState, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import moment from 'moment';
import {
  InvestmentHistory,
  ApiResponseData,
  ApiResponseDataRecord,
  InvestmentHistoryRecord,
  InvestmentCurrenciesHistory,
} from './types/models';

/* Utils */

export const mapArrayToObject = <T, U>(
  array: T[],
  keyFactor: (object: T, mappedValue: U) => string,
  mapFn: (object: T, index: number) => U
) => {
  const newObject: { [key: string]: U } = {};
  array.forEach((value, index) => {
    const mappedValue = mapFn(value, index);
    newObject[keyFactor(value, mappedValue)] = mappedValue;
  });
  return newObject;
};

export const numberToMoneyString = (value: number) =>
  value.toLocaleString('pt-br', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export const generateTdData = (
  investment: string,
  investmentValue: number,
  limit: number
) => {
  const data: InvestmentHistory = {};
  let profit: number | undefined;
  for (let i = limit; i > 0; i--) {
    const momentDate = moment().subtract(i, 'days');
    const dateKey = momentDate.toISOString().split('T')[0];
    const profitPerDayPercentage = 0.1 / 365;
    profit =
      profit === undefined ? 0 : profit + investmentValue * profitPerDayPercentage;
    data[dateKey] = {
      date: momentDate,
      value: investmentValue + profit,
    };
  }
  return { [investment]: data };
};

/* Fetch Utils */

export const buildUrl = (
  baseUrl: string,
  params: { [key: string]: string | number | boolean } = {}
) => {
  const paramList = Object.keys(params).map(key => `${key}=${params[key]}`);
  return `${baseUrl}?${paramList.join('&')}`;
};

interface ParametrizedRequestInit extends RequestInit {
  params?: { [key: string]: string | number | boolean };
}

export const makeRequest = async (
  baseUrl: string,
  info: ParametrizedRequestInit = {}
) => {
  const { params } = info;
  const res = await fetch(buildUrl(baseUrl, params), info);
  if (!res.ok) throw new Error(res.statusText);
  return res;
};

export const handleRawResponse = (res: Response) => res.json();

export const handleResponseErrors = <T extends { Response: string; Message: string }>(
  res: T
) => {
  if (res.Response === 'Error') throw new Error(res.Message);
  else return res;
};

export const handleResponseDataDecorator = (
  investment: string,
  investmentValue: number
) => (data: ApiResponseData) => ({
  Data: data.Data.Data,
  _investment: investment,
  _investmentValue: investmentValue,
});

export const handleResponseIntoInvestmentHistory = <
  T extends {
    _investment: string;
    _investmentValue: number;
    Data: ApiResponseDataRecord[];
  }
>(
  data: T
): InvestmentCurrenciesHistory => {
  const { _investment, _investmentValue } = data;
  const responseValues = data.Data.slice(1, data.Data.length);
  let prevValue: number | undefined;
  return {
    [_investment]: mapArrayToObject<ApiResponseDataRecord, InvestmentHistoryRecord>(
      responseValues,
      (_, obj) => obj.date.format().split('T')[0],
      (obj, index) => {
        const nextObj = responseValues[index + 1];
        const nextOpen = nextObj ? nextObj.open : obj.close;
        const profit = nextOpen / obj.open || 1;
        prevValue = prevValue === undefined ? _investmentValue : prevValue * profit;
        return {
          date: moment(obj.time * 1000),
          value: prevValue,
        };
      }
    ),
  };
};

/* Dispatch Utils */

export const dispatchType = <T, U, V>(
  dispatch: ThunkDispatch<T, U, { type: string; payload: V }>,
  type: string
) => (payload: V) =>
  dispatch({
    type,
    payload,
  });

/* UI Utils */

export const moneyLabelFormatter = (value: string | number | (string | number)[]) =>
  (value as number).toLocaleString('pt-br', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const smoothScrollToElement = (element: HTMLElement, duration = 500) => {
  if (element) {
    let timeout = setTimeout(() => {
      window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop - 8,
      });
      clearTimeout(timeout);
    }, duration);
  }
};

export const makeSmoothScrollToElement = (element: HTMLElement, duration = 500) => () =>
  smoothScrollToElement(element, duration);
