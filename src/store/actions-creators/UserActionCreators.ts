import {User} from "../../types/types";
import {AppDispatch, RootState} from "../store";
import {userSlice} from "../reducers/UserSlice";
import moment from 'moment';
import {refreshTime} from "../../consts/consts";
import {getErrorMessage, getNextExpireTime} from "../../utils/utils";
import PostService from "../../api/PostService";

const {userCreate,
  userCreateSuccess,
  userCreateError,
  userSignIn,
  userSignSuccess,
  userSignError,
  userSignOut} = userSlice.actions;

export const createUser = (user: User) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userCreate());
    const res = await PostService.registerUser(user);
    if (res.ok) {
      await dispatch(signIn(user));
    } else {
      throw new Error('Пользователь с данным e-mail уже существует');
    }
    dispatch(userCreateSuccess());
  } catch (e) {
    dispatch(userCreateError(getErrorMessage(e)));
  }
};

export const signIn = (user: User) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSignIn());
    const res = await PostService.auth(user);
    const userData = {...res, tokenExpire: getNextExpireTime()}
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch(userSignSuccess(userData));
  } catch (e) {
    if (getErrorMessage(e).includes('Forbidden')) {
      dispatch(userSignError('Неправильный e-mail или пароль!'));
      return;
    } else if (getErrorMessage(e).includes('Couldn\'t')) {
      dispatch(userSignError('Пользователь с таким e-mail не найден!'));
    } else {
      dispatch(userSignError('Сервер не отвечает!'));
    }
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSignOut());
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
       const res = await PostService.refreshTokenRequest(refreshToken, userId);
       const userData = {...res, tokenExpire: getNextExpireTime()};
        localStorage.setItem('userData', JSON.stringify({
          ...JSON.parse(localStorage.getItem('userData') as string),
          ...userData
        }));
       dispatch(userSignSuccess(userData));
       return userData.token;
      }
      return token;
    }
    return false;
  } catch (e) {
    console.log(getErrorMessage(e));
  }
};

export const userAsyncActionCreators = {
  createUser,
  signIn,
  signOut,
  checkAuth
}