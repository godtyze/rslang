import React from 'react';
import Main from "../../pages/main/main";
import Glossary from "../../pages/glossary/glossary";
import AudioCall from "../../pages/games/audio-call/audio-call";
import Sprint from "../../pages/games/sprint/sprint";
import {Route, Routes} from "react-router-dom";

const routes = [
  {path: '/', element: <Main/>},
  {path: '/glossary', element: <Glossary/>},
  {path: '/audio-call', element: <AudioCall/>},
  {path: '/sprint', element: <Sprint/>},
  {path: '/rslang', element: <Main/>},
  {path: '*', element: <Main/>}
];

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route
          element={route.element}
          path={route.path}
          key={route.path}/>
      )}
    </Routes>
  );
};

export default AppRouter;
