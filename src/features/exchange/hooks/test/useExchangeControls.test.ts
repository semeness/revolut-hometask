import { renderHook } from '@testing-library/react-hooks';
import { useExchangeControls } from '../useExchangeControls';
import { ExchangeAccountType } from '../../interfaces';
import { hookStoreWrapper } from 'shared/helpers/hookStoreWrapper';
import {euro, gbp, usd} from "shared/mocks/accaunts";
import {store} from "app/store";

describe('useExchangeControls', () => {
  it('returns correct value for first controls', () => {
    const {
      result: {current},
    } = renderHook(() => useExchangeControls(ExchangeAccountType.first), {
      wrapper: hookStoreWrapper,
    });
    const { accountName, currencyAmount, operationSign, onSelect, onChange } = current;

    expect(accountName).toBe(gbp.name)
    expect(currencyAmount).toBe('')
    expect(operationSign).toBe('-')
    expect(onSelect).toBeInstanceOf(Function)
    expect(onChange).toBeInstanceOf(Function)
  });

  it('returns correct value for second controls', () => {
    const {
      result: {current},
    } = renderHook(() => useExchangeControls(ExchangeAccountType.second), {
      wrapper: hookStoreWrapper,
    });
    const { accountName, currencyAmount, operationSign, onSelect, onChange } = current;

    expect(accountName).toBe(usd.name)
    expect(currencyAmount).toBe('')
    expect(operationSign).toBe('+')
    expect(onSelect).toBeInstanceOf(Function)
    expect(onChange).toBeInstanceOf(Function)
  });

  it('onSelect updates value of correct account name', () => {
    const {
      result: {current: firstCurrent},
    } = renderHook(() => useExchangeControls(ExchangeAccountType.first), {
      wrapper: hookStoreWrapper,
    });
    const {
      result: {current: secondCurrent},
    } = renderHook(() => useExchangeControls(ExchangeAccountType.second), {
      wrapper: hookStoreWrapper,
    });

    expect(store.getState().exchange.firstAccountName).toBe(gbp.name)
    expect(store.getState().exchange.secondAccountName).toBe(usd.name)
    firstCurrent.onSelect(euro.name)
    expect(store.getState().exchange.firstAccountName).toBe(euro.name)
    expect(store.getState().exchange.secondAccountName).toBe(usd.name)
    secondCurrent.onSelect(gbp.name)
    expect(store.getState().exchange.firstAccountName).toBe(euro.name)
    expect(store.getState().exchange.secondAccountName).toBe(gbp.name)
  })
});
