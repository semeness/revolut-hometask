import { ExchangeAccountType } from '../interfaces';
import {
  valueRegexp,
  decimalOnlyValueRegexp,
  exchangeTypeMapStore,
  operationSignData,
} from '../const';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { TAccountName } from 'shared/types/Account.interface';
import {ChangeEvent, useEffect} from 'react';
import { selectExchangeAction } from '../exchangeSlice';
import { useGetCurrencyDataQuery } from 'shared/api/currencyApi';
import {useIsSelling} from "shared/hooks/useIsSelling";
import {getRoundedValue} from "shared/helpers/getRoundedValue";

export type TUseExchangeControls = {
  accountName: TAccountName;
  currencyAmount?: number | string;
  onSelect: (accountName: TAccountName) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  operationSign: string;
};

export const useExchangeControls = (
  accountType: ExchangeAccountType,
): TUseExchangeControls => {
  const dispatch = useAppDispatch();
  const {
    currencyAmountSelector,
    accountNameSelector,
    oppositeAccountNameSelector,
    setAccountName,
    setCurrencyAmount,
    setOppositeCurrencyAmount,
  } = exchangeTypeMapStore[accountType];
  const accountName = useAppSelector(accountNameSelector);
  const exchangeAction = useAppSelector(selectExchangeAction);
  const oppositeAccountName = useAppSelector(oppositeAccountNameSelector);
  const currencyAmount = useAppSelector(currencyAmountSelector);
  const isSelling = useIsSelling();
  const isFirst = accountType === ExchangeAccountType.first;
  const { data } = useGetCurrencyDataQuery({
    firstAccountName: isFirst ? accountName : oppositeAccountName,
    secondAccountName: isFirst ? oppositeAccountName : accountName,
  });
  const currencyRate = data?.[accountName]?.[oppositeAccountName] || 1;

  //Update value when rate is updating
  useEffect(() => {
    if (currencyRate && currencyAmount) {
      if (isSelling && isFirst || !isSelling && !isFirst) {
        dispatch(
            setOppositeCurrencyAmount(
                getRoundedValue(+currencyAmount * currencyRate),
            ),
        );
      }
    }
  }, [currencyRate])

  return {
    accountName,
    currencyAmount,
    operationSign: operationSignData[exchangeAction][accountType],
    onSelect: (accountName) => {
      dispatch(setAccountName(accountName));
      dispatch(setCurrencyAmount(''));
      dispatch(setOppositeCurrencyAmount(''));
    },
    onChange: (event) => {
      const { value } = event.target;

      if (
        !value ||
        value.match(valueRegexp) ||
        value.match(decimalOnlyValueRegexp)
      ) {

        dispatch(setCurrencyAmount(value));
        dispatch(
          setOppositeCurrencyAmount(
            getRoundedValue(+value * currencyRate),
          ),
        );
      }
    },
  };
};
