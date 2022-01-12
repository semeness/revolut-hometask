import cn from 'classnames';
import { ArrowRightOutlined } from '@ant-design/icons';
import React from 'react';
import css from './Flipper.module.scss';

interface Props {
  isFlipped: boolean;
  onClick: () => void;
}

export const Flipper = ({ isFlipped, onClick }: Props) => {
  return (
    <div
      data-testid="flipper"
      className={cn(css.root, { [css.flipped]: isFlipped })}
      onClick={onClick}
    >
      <ArrowRightOutlined className={css.icon} />
    </div>
  );
};
