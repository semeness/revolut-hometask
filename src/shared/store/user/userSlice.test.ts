import { TUserState } from './interfaces';
import { euro, gbp, usd } from 'shared/mocks/accaunts';
import userReducer, { updateBalance } from './userSlice';

describe('user reducer', () => {
  const previousState: TUserState = {
    accounts: [usd, gbp, euro],
    balance: { USD: 10, GBP: 10, EUR: 10 },
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      accounts: [usd, gbp, euro],
      balance: { USD: 5.74, GBP: 876, EUR: 3.008 },
    });
  });

  it('should handle balance updating', () => {
    const actual = userReducer(
      previousState,
      updateBalance({
        downgrade: {
          accountName: usd.name,
          amount: '10',
        },
        upgrade: {
          accountName: euro.name,
          amount: 4,
        },
      }),
    );

    expect(actual.balance).toEqual({ USD: 0, GBP: 10, EUR: 14 });
  });
});
