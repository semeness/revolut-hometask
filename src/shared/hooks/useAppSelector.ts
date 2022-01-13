import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TRootState} from "shared/types/store";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
