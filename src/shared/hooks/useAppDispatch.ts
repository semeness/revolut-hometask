import {useDispatch} from "react-redux";
import {TAppDispatch} from "../types/store";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
