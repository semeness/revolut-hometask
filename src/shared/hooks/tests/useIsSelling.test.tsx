import {useIsSelling} from "../useIsSelling";
import {renderHook} from "@testing-library/react-hooks";
import {hookStoreWrapper} from "shared/helpers/hookStoreWrapper";
import {store} from "app/store";
import {setExchangeAction} from "features/exchange/exchangeSlice";
import {ExchangeActionType} from "features/exchange/interfaces";


describe('useIsSelling', () => {
    it('Expect to return true when action is selling', () => {
        const {result} = renderHook(() => useIsSelling(), {wrapper: hookStoreWrapper})
        expect(result.current).toBe(true)
    })
    it('Expect to return false when action is buying', () => {
        store.dispatch(setExchangeAction(ExchangeActionType.buy))
        const {result} = renderHook(() => useIsSelling(), {wrapper: hookStoreWrapper})
        expect(result.current).toBe(false)
    })
})