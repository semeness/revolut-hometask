import {ExchangeActionType, TExchangeState} from "./interfaces";
import {euro, gbp, usd} from "shared/mocks/accaunts";
import exchangeReducer, {
    setExchangeAction,
    setFirstAccountName,
    setFirstAmount,
    setSecondAccountName, setSecondAmount
} from './exchangeSlice';

describe('exchange reducer', () => {
    const previousState: TExchangeState = {
        action: ExchangeActionType.buy,
        firstAccountName: usd.name,
        secondAccountName: gbp.name,
        firstAmount: '',
        secondAmount: '',
    };

    it('should handle initial state', () => {
      expect(exchangeReducer(undefined, { type: 'unknown' })).toEqual({
        action: ExchangeActionType.sell,
        firstAccountName: gbp.name,
        secondAccountName: usd.name,
        firstAmount: '',
        secondAmount: '',
      });
    });

    it('should handle action setting', () => {
        const actual = exchangeReducer(previousState, setExchangeAction(ExchangeActionType.sell))
        expect(actual.action).toEqual(ExchangeActionType.sell)
    })

    it('should handle first account name setting', () => {
        const actual = exchangeReducer(previousState, setFirstAccountName(usd.name))
        expect(actual.firstAccountName).toEqual(usd.name)
    })

    it('should handle second account name setting', () => {
        const actual = exchangeReducer(previousState, setSecondAccountName(euro.name))
        expect(actual.secondAccountName).toEqual(euro.name)
    })

    it('should handle first amount setting', () => {
        const actual = exchangeReducer(previousState, setFirstAmount('-12'))
        expect(actual.firstAmount).toEqual('-12')
    })

    it('should handle second amount setting', () => {
        const actual = exchangeReducer(previousState, setSecondAmount(14))
        expect(actual.secondAmount).toEqual(14)
    })
})