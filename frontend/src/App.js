import Navegador from "./Components/nav/navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Components/Inicio/inicio.js";
import Articulos from "./Components/Articulos/articulos";
import Articulo from "./Components/Articulos/Articulo/articulo";
import Paises from "./Components/Paises/paises";
import Ciudades from "./Components/Ciudades/ciudades";
import Ciudad from "./Components/Ciudad/ciudad";
import Facultades from "./Components/Facultades/facultades";
import Asignaturas from "./Components/Asignaturas/asignaturas";
import Administracion from "./Components/Administracion/administracion";
import Login from "./Components/Login/login";
import Register from "./Components/Login/register";
import Footer from "./Components/Footer/footer";
import React from 'react';
import Perfil from "./Components/perfil/perfil";
import EditPerfil from "./Components/editPerfil/editPerfil.js"
import './App.css';
import Buscador from "./Components/Buscador/Buscador.js";
import Asignatura from "./Components/Asignatura/Asignatura.js";
import Logro from "./Components/Logro/logro";

function App() {
  return (
    <main id="app">
      <Navegador />
      <main id="body">
        <Routes>
          <Route path="" element={<Inicio />} />
          <Route path="paises" element={<Paises />} />
          <Route path=":nombrePais/" element={<Ciudades />} />
          <Route path=":nombrePais/:nombreCiudad" element={<Ciudad />} />
          <Route path="articulos" element={<Articulos />} />
          <Route path="articulos/:id" element={<Articulo />} />
          <Route path=":nombrePais/:nombreCiudad/:nombreUniversidad" element={<Facultades />} />
          <Route path=":nombrePais/:nombreCiudad/:nombreUniversidad/:nombreFacultad" element={<Asignaturas />} />
          <Route path="signIn" element={<Login />} />
          <Route path="signUp" element={<Register />} />
          <Route path="perfil/:token" element={<Perfil />} />
          <Route path="editPerfil" element={<EditPerfil />} />
          <Route path="search" element={<Buscador />} />
          <Route path="panelAdministracion" element={<Administracion />} />
          <Route path="asignatura/:idAsignatura" element={<Asignatura />} />
          <Route path="progreso/:token" element={<Logro />} />
        </Routes>
      </main>
      <div className="footer">
        <Footer />
      </div>
    </main>
  );
}

export default App;
