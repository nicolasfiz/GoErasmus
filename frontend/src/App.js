import Navegador from "./Components/nav/navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Components/inicio/inicio.js";
import Articulos from "./Components/articulos";
import Ciudades from "./Components/ciudades";
import Login from "./Components/login/login";
import Register from "./Components/login/register";
import Footer from "./Components/footer/footer";
import React from 'react';

function App() {
  return (
    <>
      <Navegador />
      <Routes>
        <Route path="" element={<Inicio />} />
        <Route path="articulos" element={<Articulos />} />
        <Route path="ciudades" element={<Ciudades />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
