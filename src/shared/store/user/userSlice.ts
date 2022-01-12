import { TUpdateBalancePayload, TUserState } from './interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { euro, gbp, usd } from 'shared/mocks/accaunts';

const initialState: TUserState = {
  accounts: [usd, gbp, euro],
  balance: { USD: 5.74, GBP: 876, EUR: 3.008 },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<TUpdateBalancePayload>) => {
      const { downgrade, upgrade } = action.payload;
      state.balance = {
        ...state.balance,
        [downgrade.accountName]:
          state.balance[downgrade.accountName] - Number(downgrade.amount),
        [upgrade.accountName]:
          state.balance[upgrade.accountName] + Number(upgrade.amount),
      };
    },
  },
});

export const { updateBalance } = userSlice.actions;
export const selectUserBalance = (state: RootState) => state.user.balance;
export const selectUserAccounts = (state: RootState) => state.user.accounts;

export default userSlice.reducer;
