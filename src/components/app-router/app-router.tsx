import React from 'react';
import Main from "../../pages/main/main";
import AudioCall from "../../pages/games/audio-call/audio-call";
import Sprint from "../../pages/games/sprint/sprint";
import {Navigate, useRoutes} from "react-router-dom";
import Loader from "../Loader/loader";

const Glossary = React.lazy(() => import('../../pages/glossary/glossary'));

const AppRouter: React.FC = () => {
  const routes = useRoutes([
    {path: '/', element: <Main/>},
    {path: '/glossary/:group/:page', element:
        <React.Suspense fallback={<div className='loader-wrapper'><Loader/></div>}>
          <Glossary/>
        </React.Suspense>
    },
    {path: '/audio-call', element: <AudioCall/>},
    {path: '/sprint', element: <Sprint/>},
    {path: '*', element: <Navigate to="/" replace />}
  ]);

  return (
    <div>
      {routes}
    </div>
  );
};

export default AppRouter;
