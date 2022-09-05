import Navegador from "./Components/nav/navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Components/inicio/inicio.js";
import Articulos from "./Components/articulos";
import Ciudades from "./Components/ciudades";
import Login from "./Components/login/login";
import Register from "./Components/login/register";
import Footer from "./Components/footer/footer";
import React from 'react';
import Perfil from "./Components/perfil/perfil";
import EditPerfil from "./Components/editPerfil/editPerfil.js"
import './App.css';

function App() {
  return (
    <main id="app">
      <Navegador />
      <main id="body">
        <Routes>
          <Route path="" element={<Inicio />} />
          <Route path="articulos" element={<Articulos />} />
          <Route path="ciudades" element={<Ciudades />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="perfil/:token" element={<Perfil />} />
          <Route path="editPerfil" element={<EditPerfil />} />
        </Routes>
      </main>
      <div className="footer">
        <Footer />
      </div>
    </main>
  );
}

export default App;
