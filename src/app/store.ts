import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from 'features/exchange/exchangeSlice';
import userReducer from 'shared/store/user/userSlice';
import { currencyApi } from '../shared/api/currencyApi';

export const store = configureStore({
  reducer: {
    [currencyApi.reducerPath]: currencyApi.reducer,
    exchange: exchangeReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(currencyApi.middleware),
});
