import { ExchangeAccountType, ExchangeActionType } from './interfaces';
import {
  selectExchangeFirstAccountName,
  selectExchangeFirstAmount,
  selectExchangeSecondAccountName,
  selectExchangeSecondAmount,
  setFirstAccountName,
  setFirstAmount,
  setSecondAccountName,
  setSecondAmount,
} from './exchangeSlice';

export const exchangeTypeMapStore = {
  [ExchangeAccountType.first]: {
    accountNameSelector: selectExchangeFirstAccountName,
    currencyAmountSelector: selectExchangeFirstAmount,
    oppositeAccountNameSelector: selectExchangeSecondAccountName,
    setAccountName: setFirstAccountName,
    setCurrencyAmount: setFirstAmount,
    setOppositeCurrencyAmount: setSecondAmount,
  },
  [ExchangeAccountType.second]: {
    accountNameSelector: selectExchangeSecondAccountName,
    currencyAmountSelector: selectExchangeSecondAmount,
    oppositeAccountNameSelector: selectExchangeFirstAccountName,
    setAccountName: setSecondAccountName,
    setCurrencyAmount: setSecondAmount,
    setOppositeCurrencyAmount: setFirstAmount,
  },
};

export const valueRegexp = /^[1-9]\d*(\.\d{0,2})?$/;
export const decimalOnlyValueRegexp = /^0(\.\d{0,2})?$/;

export const operationSignData = {
  [ExchangeActionType.sell]: {
    [ExchangeAccountType.first]: '-',
    [ExchangeAccountType.second]: '+',
  },
  [ExchangeActionType.buy]: {
    [ExchangeAccountType.first]: '+',
    [ExchangeAccountType.second]: '-',
  },
};

export const pollingInterval = 10000