import {User} from "../../types/types";
import {AppDispatch, RootState} from "../store";
import {auth, refreshTokenRequest, registerUser} from "../../api/api";
import {userSlice} from "./UserSlice";
import moment from 'moment';
import {expireTime, refreshTime} from "../../consts/consts";

const getNextExpireTime = () => moment().add(expireTime, 'hours').toISOString();

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const createUser = (user: User) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userCreate());
    const res = await registerUser(user);
    if (res.ok) {
      await dispatch(signIn(user));
    } else {
      throw new Error('Пользователь с данным e-mail уже существует');
    }
    dispatch(userSlice.actions.userCreateSuccess());
  } catch (e) {
    dispatch(userSlice.actions.userCreateError(getErrorMessage(e)));
  }
};

export const signIn = (user: User) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userSignIn());
    const res = await auth(user);
    const userData = {...res, tokenExpire: getNextExpireTime()}
    console.log(userData.tokenExpire);
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(userSlice.actions.userSignSuccess(userData));
  } catch (e) {
    dispatch(userSlice.actions.userSignError('Неправильный e-mail или пароль'));
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userSignOut());
    localStorage.removeItem('userData');
  } catch {

  }
};

export const checkAuth = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const {tokenExpire, token, refreshToken, userId} = getState().userReducer;
    const timeToRefresh = moment(tokenExpire).subtract(refreshTime, 'hours');
    if(moment().isBefore(tokenExpire)) {
      if (moment().isAfter(timeToRefresh)) {
       const res = await refreshTokenRequest(refreshToken, userId);
       const userData = {...res, tokenExpire: getNextExpireTime()};
        localStorage.setItem('userData', JSON.stringify({
          ...JSON.parse(localStorage.getItem('userData') as string),
          ...userData
        }));
       dispatch(userSlice.actions.userSignSuccess(userData));
       console.log('check!');
       return userData.token;
      }
      return token;
    }
    return false;
  } catch (e) {
    console.log(getErrorMessage(e));
  }
};