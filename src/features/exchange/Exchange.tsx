import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import css from './Exchange.module.scss';
import {
  selectExchangeAction,
  selectExchangeFirstAccountName,
  selectExchangeFirstAmount,
  selectExchangeSecondAccountName,
  selectExchangeSecondAmount,
} from './exchangeSlice';
import {
  selectUserAccounts,
  selectUserBalance,
} from 'shared/store/user/userSlice';
import { currencySignMap } from 'shared/const/currencySignMap';
import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ExchangeAccountType, ExchangeActionType } from './interfaces';
import { ExchangeControls } from 'components/ExchangeControls';
import { useExchangeControls } from './hooks/useExchangeControls';
import { Flipper } from 'components/Flipper';
import cn from 'classnames';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useGetCurrencyDataQuery } from 'shared/api/currencyApi';
import { useExchangeHandlers } from './hooks/useExchangeHandlers';
import { pollingInterval } from './const';

const Exchange = () => {
  const firstExchangeControls = useExchangeControls(ExchangeAccountType.first);
  const secondExchangeControls = useExchangeControls(ExchangeAccountType.second);
  const { flipExchangeAction, handleExchangeSubmit } =
    useExchangeHandlers();
  const exchangeAction = useAppSelector(selectExchangeAction);
  const firstAccountName = useAppSelector(selectExchangeFirstAccountName);
  const secondAccountName = useAppSelector(selectExchangeSecondAccountName);
  const firstExchangeAmount = useAppSelector(selectExchangeFirstAmount) || 0;
  const secondExchangeAmount = useAppSelector(selectExchangeSecondAmount) || 0;
  const userBalance = useAppSelector(selectUserBalance);
  const userAccounts = useAppSelector(selectUserAccounts);
  const { data: currencyData, isLoading } = useGetCurrencyDataQuery(
    { firstAccountName, secondAccountName },
    { pollingInterval },
  );

  const isFirstInvalid =
    exchangeAction === ExchangeActionType.sell &&
    userBalance[firstAccountName] < firstExchangeAmount;
  const isSecondInvalid =
    exchangeAction === ExchangeActionType.buy &&
    userBalance[secondAccountName] < secondExchangeAmount;
  const isSubmitButtonDisabled =
    isSecondInvalid || isFirstInvalid || firstExchangeAmount === 0 || isLoading;

  return (
    <>
      <div className={css.header}>
        <Title>
          {exchangeAction} {firstAccountName}
        </Title>
        <Text className={css.rate}>
          1{firstAccountName} ={' '}
          {currencyData?.[firstAccountName]?.[secondAccountName]?.toFixed(2)}
          {currencySignMap[secondAccountName]}
        </Text>
      </div>
      <div className={css.controls}>
        <ExchangeControls
          {...firstExchangeControls}
          isInvalid={isFirstInvalid}
          accounts={userAccounts}
          balance={userBalance[firstAccountName]}
        />
        <div className={css.actions}>
          <Flipper
            isFlipped={exchangeAction === ExchangeActionType.buy}
            onClick={flipExchangeAction}
          />
          <Button
            htmlType="submit"
            onClick={handleExchangeSubmit}
            className={cn(css.submit, {
              [css.submitDisabled]: isSubmitButtonDisabled,
            })}
          >
            <CheckOutlined className={css.icon} />
          </Button>
        </div>
        <ExchangeControls
          {...secondExchangeControls}
          isInvalid={isSecondInvalid}
          accounts={userAccounts}
          balance={userBalance[secondAccountName]}
        />
      </div>
    </>
  );
};

export default Exchange;
