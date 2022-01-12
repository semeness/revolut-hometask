import {useAppSelector} from "./useAppSelector";
import {selectExchangeAction} from "features/exchange/exchangeSlice";
import {ExchangeActionType} from "features/exchange/interfaces";

export const useIsSelling = (): boolean => {
    const exchangeAction = useAppSelector(selectExchangeAction);

    return exchangeAction === ExchangeActionType.sell;
}