import { useAppSelector } from 'shared/hooks/useAppSelector';
import {
  selectExchangeAction,
  selectExchangeFirstAccountName,
  selectExchangeFirstAmount,
  selectExchangeSecondAccountName,
  selectExchangeSecondAmount,
  setExchangeAction,
  setFirstAmount,
  setSecondAmount,
} from '../exchangeSlice';
import { ExchangeActionType } from '../interfaces';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { updateBalance } from 'shared/store/user/userSlice';
import { notification } from 'antd';
import {useIsSelling} from "../../../shared/hooks/useIsSelling";

type TUseExchangeHandlers = {
  flipExchangeAction: () => void,
  handleExchangeSubmit: () => void,
}

export const useExchangeHandlers = (): TUseExchangeHandlers => {
  const dispatch = useAppDispatch();
  const isSelling = useIsSelling();
  const exchangeAction = useAppSelector(selectExchangeAction);
  const firstAccountName = useAppSelector(selectExchangeFirstAccountName);
  const secondAccountName = useAppSelector(selectExchangeSecondAccountName);
  const firstExchangeAmount = useAppSelector(selectExchangeFirstAmount) || 0;
  const secondExchangeAmount = useAppSelector(selectExchangeSecondAmount) || 0;

  return {
    flipExchangeAction: () => {
      if (exchangeAction === ExchangeActionType.buy) {
        dispatch(setExchangeAction(ExchangeActionType.sell));
      } else {
        dispatch(setExchangeAction(ExchangeActionType.buy));
      }
    },
    handleExchangeSubmit: () => {
      if (firstAccountName !== secondAccountName) {
        dispatch(
            updateBalance({
              downgrade: {
                accountName: isSelling ? firstAccountName : secondAccountName,
                amount: isSelling ? firstExchangeAmount : secondExchangeAmount,
              },
              upgrade: {
                accountName: isSelling ? secondAccountName : firstAccountName,
                amount: isSelling ? secondExchangeAmount : firstExchangeAmount,
              },
            }),
        );
      }

      notification.success({
        message: 'Yeessssir!',
        description:
          'Man, you did it! Congratulations! Welcome to the club, buddy! See ya in Russia',
      });

      dispatch(setSecondAmount(''));
      dispatch(setFirstAmount(''));
    },
  };
};
