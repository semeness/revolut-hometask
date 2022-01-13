import {OPERATION_ACCURACY} from "../const/operationAccuracy";

export const getRoundedValue = (value: number): number => {
    return Math.round((value) * OPERATION_ACCURACY) / OPERATION_ACCURACY
}