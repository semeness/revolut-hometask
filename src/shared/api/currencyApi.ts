import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TCurrencyData,
  TCurrencyRate,
  TGetLatestCurrencyParams,
} from './interfaces';

//It's only 7 days trial
const API_KEY = 'cc0c0e14c6-ee7961e801-r5lbys';
const accuracy = 100000;

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.fastforex.io/' }),
  endpoints: (builder) => ({
    getCurrencyData: builder.query<TCurrencyData, TGetLatestCurrencyParams>({
      transformResponse: (response: TCurrencyRate, _, arg) => {
        const { firstAccountName, secondAccountName } = arg;
        const { results } = response;

        return {
          [firstAccountName]: results,
          [secondAccountName]: {
            [secondAccountName]: 1,
            [firstAccountName]:
              accuracy / (results[secondAccountName] * accuracy),
          },
        };
      },
      query: ({ firstAccountName, secondAccountName }) => {
        return `fetch-multi?api_key=${API_KEY}&from=${firstAccountName}&to=${firstAccountName},${secondAccountName}`;
      },
    }),
  }),
});

export const { useGetCurrencyDataQuery } = currencyApi;
