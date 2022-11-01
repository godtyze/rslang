import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/app-router/app-router";
import {checkAuth, signOut} from "./store/reducers/UserActionCreators";
import {useAppDispatch, useAppSelector} from "./hooks/redux";

const App = () => {
  const dispatch = useAppDispatch();
  const {isAuth} = useAppSelector(state => state.userReducer);

  useEffect(() => {
    async function syncUser() {
      const token = await dispatch(checkAuth());
      if (token) {
        console.log('checked!');
      } else {
        await dispatch(signOut());
      }
    }

    if (isAuth) {
      syncUser();
    }
  }, [dispatch, isAuth]);

  return (
    <BrowserRouter basename='/rslang'>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default App;
