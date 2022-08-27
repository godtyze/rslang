import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router/app-router";

function App() {
    return (
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
