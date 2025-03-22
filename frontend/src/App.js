import React from 'react';
import {BrowserRouter as Routers, Routes, Route, Link} from 'react-router-dom';

import "./components/style.css";

import NavBar from './components/NavBar';
import Inicial from "./components/Inicial";
import Cadastro from './components/Cadastro';

export default function App(){
    return(
        <Routers>

            <NavBar />
            
            <Link to="/"></Link>
            <Link to="/cadastro"></Link>

            <Routes>
                <Route path="/" element={<Inicial />}></Route>
                <Route path="/cadastro" element={<Cadastro />}></Route>
            </Routes>
        </Routers>
    );
}