import css from './ExchangeControls.module.scss';
import Text from 'antd/lib/typography/Text';
import { currencySignMap } from 'shared/const/currencySignMap';
import { ChangeEvent } from 'react';
import { Input, Select } from 'antd';
import { TAccount, TAccountName } from 'shared/types/Account.interface';
import cn from 'classnames';
const { Option } = Select;

interface Props {
  accountName: TAccountName;
  currencyAmount?: number | string;
  balance: number;
  accounts: TAccount[];
  onSelect: (accountName: TAccountName) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  operationSign: string;
}

export const ExchangeControls = ({
  accountName,
  currencyAmount,
  balance,
  accounts,
  onSelect,
  onChange,
  isInvalid,
  operationSign,
}: Props) => {

  return (
    <div className={css.root}>
      <div className={css.header}>
        <Select
          data-testid="exchange-select"
          onSelect={onSelect}
          value={accountName}
          className={css.select}
          bordered={false}
        >
          {accounts.map((account) => (
            <Option key={account.id} value={account.name}>
              {account.name}
            </Option>
          ))}
        </Select>
        <Text className={cn(css.balance, { [css.error]: isInvalid })}>
          Balance: {currencySignMap[accountName]}
          {balance.toFixed(2)}
        </Text>
      </div>
      <div className={css.footer}>
        <Input
          onChange={onChange}
          addonBefore={currencyAmount ? operationSign : ' '}
          value={currencyAmount}
          className={cn(css.input, css.flex1)}
          placeholder={'0'}
          bordered={false}
        />
        {isInvalid && (
          <Text className={cn(css.error, css.flex1, css.errorMessage)}>
            Nah, man, that is too much
          </Text>
        )}
      </div>
    </div>
  );
};
