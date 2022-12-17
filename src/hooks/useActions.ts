import {useAppDispatch} from "./redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actionsCreators} from "../store/actions-creators";

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionsCreators, dispatch);
};