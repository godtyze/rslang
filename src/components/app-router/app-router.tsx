import React from 'react';
import Main from "../../pages/main/main";
import Glossary from "../../pages/glossary/glossary";
import AudioCall from "../../pages/games/audio-call/audio-call";
import Sprint from "../../pages/games/sprint/sprint";
import {useRoutes} from "react-router-dom";

const AppRouter: React.FC = () => {
  const routes = useRoutes([
    {path: '/', element: <Main/>},
    {path: '/glossary/:group/:page', element: <Glossary/>},
    {path: '/audio-call', element: <AudioCall/>},
    {path: '/sprint', element: <Sprint/>},
    {path: '*', element: <Main/>}
  ]);

  return (
    <div>
      {routes}
    </div>
  );
};

export default AppRouter;
