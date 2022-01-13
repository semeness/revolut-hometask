import {renderHook} from "@testing-library/react-hooks";
import {useExchangeHandlers} from "../useExchangeHandlers";
import {hookStoreWrapper} from "shared/helpers/hookStoreWrapper";
import {store} from "app/store";
import {ExchangeActionType} from "../../interfaces";

describe('useExchangeHandlers', () => {
    it('return correct values', () => {
        const {result: {current}} = renderHook(() => useExchangeHandlers(), {wrapper: hookStoreWrapper})
        const {flipExchangeAction, handleExchangeSubmit} = current;

        expect(flipExchangeAction).toBeInstanceOf(Function)
        expect(handleExchangeSubmit).toBeInstanceOf(Function)
    })

    it('flipExchangeAction flips exchange action', () => {
        const {result: {current}} = renderHook(() => useExchangeHandlers(), {wrapper: hookStoreWrapper})
        const {flipExchangeAction} = current;

        expect(store.getState().exchange.action).toBe(ExchangeActionType.sell)
        flipExchangeAction()
        expect(store.getState().exchange.action).toBe(ExchangeActionType.buy)
    })
})
