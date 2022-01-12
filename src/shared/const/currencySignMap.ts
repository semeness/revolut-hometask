import { TAccountName } from '../types/Account.interface';

export const currencySignMap: { [key in TAccountName]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};
