import React from "react";
import {Provider} from "react-redux";
import {store} from "app/store";

export const hookStoreWrapper: React.FC = ({ children }) => {
    return (<Provider store={store}>{children}</Provider>);
};