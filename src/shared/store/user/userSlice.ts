import { TUpdateBalancePayload, TUserState } from './interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { euro, gbp, usd } from 'shared/mocks/accaunts';
import { TRootState } from 'shared/types/store';
import { getRoundedValue } from 'shared/helpers/getRoundedValue';

const initialState: TUserState = {
  accounts: [usd, gbp, euro],
  balance: { USD: 5.74, GBP: 876, EUR: 3.08 },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<TUpdateBalancePayload>) => {
      const { downgrade, upgrade } = action.payload;
      state.balance = {
        ...state.balance,
        [downgrade.accountName]: getRoundedValue(
          state.balance[downgrade.accountName] - Number(downgrade.amount),
        ),
        [upgrade.accountName]: getRoundedValue(
          state.balance[upgrade.accountName] + Number(upgrade.amount),
        ),
      };
    },
  },
});

export const { updateBalance } = userSlice.actions;
export const selectUserBalance = (state: TRootState) => state.user.balance;
export const selectUserAccounts = (state: TRootState) => state.user.accounts;

export default userSlice.reducer;
