import React from 'react';
import Main from "../../pages/main/main";
import AudioCall from "../../pages/games/audio-call/audio-call";
import Sprint from "../../pages/games/sprint/sprint";
import {Navigate, useRoutes} from "react-router-dom";
import Loader from "../Loader/loader";
import Auth from "../../pages/auth/auth";
import {Route} from "../../types/types";
import {useAppSelector} from "../../hooks/redux";
import {RouteNames} from "../../consts/consts";

const Glossary = React.lazy(() => import('../../pages/glossary/glossary'));

const publicRoutes: Route[] = [
  {path: RouteNames.main, element: <Main/>},
  {path: RouteNames.glossary, element:
      <React.Suspense fallback={<div className='loader-wrapper'><Loader/></div>}>
        <Glossary/>
      </React.Suspense>
  },
  {path: RouteNames.audioCall, element: <AudioCall/>},
  {path: RouteNames.sprint, element: <Sprint/>},
  {path: RouteNames.login, element: <Auth/>},
  {path: RouteNames.register, element: <Auth/>},
  {path: RouteNames.error, element: <Navigate to="/" replace />}
];

const privateRoutes: Route[] = [
  {path: '/', element: <Main/>},
  {path: '/glossary/:group/:page', element:
      <React.Suspense fallback={<div className='loader-wrapper'><Loader/></div>}>
        <Glossary/>
      </React.Suspense>
  },
  {path: '/audio-call', element: <AudioCall/>},
  {path: '/sprint', element: <Sprint/>},
  {path: '*', element: <Navigate to="/" replace />}
];

const AppRouter: React.FC = () => {
  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const routes = useRoutes(isAuth ? privateRoutes : publicRoutes);

  return (
    <>
      {routes}
    </>
  );
};

export default AppRouter;
