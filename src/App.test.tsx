import React from 'react';
import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import {gbp, usd} from "./shared/mocks/accaunts";


describe('App testing', () => {
    it('Renders initial accounts', () => {
        const {getByText} = render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        expect(getByText(gbp.name)).toHaveTextContent(gbp.name);
        expect(getByText(usd.name)).toHaveTextContent(usd.name);
    })

    it('Render inputs with correct placeholders and empty values', async () => {
        const {findAllByPlaceholderText, findAllByDisplayValue} = render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        const inputWithCorrectPlaceholderList = await findAllByPlaceholderText('0');
        const inputWithCorrectValuePromiseList = await findAllByDisplayValue('')
        const inputWithCorrectValueList = inputWithCorrectValuePromiseList.filter((input) => input.classList.contains('ant-input'))
        expect(inputWithCorrectPlaceholderList.length).toBe(inputWithCorrectValueList.length);
    })
})