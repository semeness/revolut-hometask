import {
  selectExchangeAction,
  selectExchangeFirstAccountName,
  selectExchangeSecondAccountName,
  selectExchangeFirstAmount,
  selectExchangeSecondAmount,
} from '../../exchangeSlice';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
}));
jest.mock('../../exchangeSlice');

describe('useExchangeControl', () => {
  it('return correct value', () => {
  });
});
