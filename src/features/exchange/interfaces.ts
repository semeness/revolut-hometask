import { TAccountName } from 'shared/types/Account.interface';

export interface TExchangeState {
  action: ExchangeActionType;
  firstAccountName: TAccountName;
  secondAccountName: TAccountName;
  firstAmount?: number | string;
  secondAmount?: number | string;
}

export enum ExchangeActionType {
  sell = 'Sell',
  buy = 'Buy',
}

export enum ExchangeAccountType {
  first = 'first',
  second = 'second',
}
