import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/app-router/app-router";

const AudioCall = () => {
  return (
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
  );
};

export default AudioCall;
