import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SingInRes} from "../../types/types";

export type UserState = {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  tokenExpire: string;
  token: string;
  refreshToken: string;
  userId: string;
}

const initialUser: UserState | null = JSON.parse(localStorage.getItem('userData') as string);

const initialState: UserState = {
  isAuth: !!initialUser?.token || false,
  isLoading: false,
  error:  '',
  tokenExpire: initialUser?.tokenExpire || '',
  token: initialUser?.token || '',
  userId: initialUser?.userId || '',
  refreshToken: initialUser?.refreshToken || ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userCreate(state) {
      state.isLoading = true;
    },
    userCreateSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    userCreateError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    userSignIn(state) {
      state.isLoading = true;
    },
    userSignSuccess(state, action: PayloadAction<SingInRes>) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpire = action.payload.tokenExpire as string;
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
    },
    userSignError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    userSignOut(state) {
      state.isAuth = false;
      state.isLoading = false;
      state.error = '';
      state.tokenExpire = '';
      state.token = '';
      state.userId = '';
      state.refreshToken = '';
    }
  }
});

export default userSlice.reducer;