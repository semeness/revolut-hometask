import { ExchangeControls } from './index';
import {fireEvent, render} from '@testing-library/react';
import {euro, gbp, usd} from 'shared/mocks/accaunts';


describe('Exchange Controls', () => {
  const handleChangeMock = jest.fn();
  const handleSelectMock = jest.fn();

  it('Should render correct account name, currency amount, balance operation sign and currency sign', async () => {
    const {findByText, findByDisplayValue} = render(
        <ExchangeControls
            accounts={[usd, gbp, euro]}
            onSelect={handleSelectMock}
            onChange={handleChangeMock}
            accountName={usd.name}
            currencyAmount={123.5}
            balance={144.54}
            operationSign={'+'}
        />,
    );

    expect(await findByText(/144.54/i)).toBeInTheDocument();
    expect(await findByDisplayValue(/123.5/i)).toBeInTheDocument();
    expect(await findByText(/\+/i)).toBeInTheDocument();
    expect(await findByText(/\$/i)).toBeInTheDocument();
    expect(await findByText(usd.name)).toBeInTheDocument();
  });

  it('Should invoke onChange handler when input value is changed', async () => {
    const {findByDisplayValue} = render(
        <ExchangeControls
            accounts={[usd, gbp, euro]}
            onSelect={handleSelectMock}
            onChange={handleChangeMock}
            accountName={usd.name}
            currencyAmount={123.5}
            balance={144.54}
            operationSign={'+'}
        />,
    );
    const input = await findByDisplayValue(/123.5/i);

    expect(input).toBeInTheDocument();
    expect(handleChangeMock).not.toBeCalled();
    fireEvent.change(input, { target: { value: 13 } })
    expect(handleChangeMock).toBeCalled();
  })
});
