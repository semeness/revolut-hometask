export interface TAccount {
  name: TAccountName;
  id: number;
}

export type TAccountName = 'USD' | 'GBP' | 'EUR';
