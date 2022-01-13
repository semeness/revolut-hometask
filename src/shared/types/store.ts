import {store} from "app/store";

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;