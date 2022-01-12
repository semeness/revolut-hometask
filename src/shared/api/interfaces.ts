import {TAccountName} from "../types/Account.interface";

export interface TCurrencyRate {
    base: TAccountName,
    updated: string,
    ms: string,
    results: {
        [key in TAccountName]: number
    }
}

export type TCurrencyData = {
    [key in TAccountName]?: {
        [key in TAccountName]?: number
    }
}

export interface TGetLatestCurrencyParams {
    firstAccountName: TAccountName,
    secondAccountName: TAccountName,
}