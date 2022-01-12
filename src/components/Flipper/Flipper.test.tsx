import { Flipper } from './index';
import { fireEvent, render } from '@testing-library/react';

describe('Flipper', () => {
  const handleClickMock = jest.fn();

  it('Fires onClick handler', async () => {
    expect(handleClickMock).not.toBeCalled();

    const { findByTestId } = render(
      <Flipper isFlipped={false} onClick={handleClickMock} />,
    );
    const flipper = await findByTestId('flipper');

    fireEvent.click(flipper);
    fireEvent.click(flipper);

    expect(handleClickMock).toBeCalledTimes(2);
  });
});
