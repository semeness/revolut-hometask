import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ExchangeActionType, TExchangeState } from './interfaces';
import { TAccountName } from 'shared/types/Account.interface';
import { gbp, usd } from 'shared/mocks/accaunts';

const initialState: TExchangeState = {
  action: ExchangeActionType.sell,
  firstAccountName: gbp.name,
  secondAccountName: usd.name,
  firstAmount: '',
  secondAmount: '',
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setExchangeAction: (state, action: PayloadAction<ExchangeActionType>) => {
      state.action = action.payload;
    },
    setFirstAccountName: (state, action: PayloadAction<TAccountName>) => {
      state.firstAccountName = action.payload;
    },
    setSecondAccountName: (state, action: PayloadAction<TAccountName>) => {
      state.secondAccountName = action.payload;
    },
    setFirstAmount: (state, action: PayloadAction<number | string>) => {
      state.firstAmount = action.payload;
    },
    setSecondAmount: (state, action: PayloadAction<number | string>) => {
      state.secondAmount = action.payload;
    },
  },
});

export const {
  setExchangeAction,
  setFirstAccountName,
  setSecondAccountName,
  setFirstAmount,
  setSecondAmount,
} = exchangeSlice.actions;

export const selectExchangeAction = (state: RootState) => state.exchange.action;
export const selectExchangeFirstAccountName = (state: RootState) =>
  state.exchange.firstAccountName;
export const selectExchangeSecondAccountName = (state: RootState) =>
  state.exchange.secondAccountName;
export const selectExchangeFirstAmount = (state: RootState) =>
  state.exchange.firstAmount;
export const selectExchangeSecondAmount = (state: RootState) =>
  state.exchange.secondAmount;

export default exchangeSlice.reducer;
