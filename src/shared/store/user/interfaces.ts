import { TAccount, TAccountName } from 'shared/types/Account.interface';

export interface TUserState {
  accounts: TAccount[];
  balance: Record<TAccountName, number>;
}

interface TUpdateBalance {
  accountName: TAccountName;
  amount: number | string;
}

export interface TUpdateBalancePayload {
  downgrade: TUpdateBalance;
  upgrade: TUpdateBalance;
}
