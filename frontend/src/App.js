import Navegador from "./Components/nav/navbar"
import { Routes, Route, useLocation } from "react-router-dom"
import Inicio from "./Components/inicio/inicio"
import Articulos from "./Components/Articulos/articulos"
import Articulo from "./Components/Articulos/Articulo/articulo"
import Paises from "./Components/Paises/paises"
import Ciudades from "./Components/Ciudades/ciudades"
import Ciudad from "./Components/Ciudad/ciudad"
import Facultades from "./Components/Facultades/facultades"
import Asignaturas from "./Components/Asignaturas/asignaturas"
import Administracion from "./Components/Administracion/administracion"
import Login from "./Components/login/login"
import RecoverPassword from "./Components/login/recoverPassword"
import Register from "./Components/login/register"
import ConfirmAccount from "./Components/login/confirmAccount"
import Footer from "./Components/footer/footer"
import React, { useState, useEffect } from 'react'
import Perfil from "./Components/perfil/perfil"
import EditPerfil from "./Components/editPerfil/editPerfil.js"
import './App.css'
import Buscador from "./Components/Buscador/Buscador.js"
import Asignatura from "./Components/Asignatura/Asignatura.js"
import Logro from "./Components/Logro/logro"
import tokenService from "./services/token.service"
import authService from "./services/auth.service"

function App() {
  const [user, setUser] = useState(null)

  const location = useLocation()

  useEffect(() => {
    tokenService.getToken().then(data => {
      if (data) {
        authService.getAccount(data).then(elem => {
          setUser(elem)
        }).catch(error => {
            tokenService.removeToken()
        })
      }
    })
  }, [])

  return (
    <main id="app">
      { location.pathname === '/signIn' || location.pathname === '/signUp' || location.pathname === '/recover'
        || location.pathname === '/confirmAccount/:token' ?
          null : <Navegador user={user} />
      }
      <section id="body">
        <Routes>
          <Route path="/" element={<Inicio user={user} />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/confirmAccount/:token" element={<ConfirmAccount />} />
          { user ?
            <>
              { user.rol === 'Trotamundos' || user.rol === 'Administrador' ?
                <Route path="/panelAdministracion" element={<Administracion />} /> : null
              }
              <Route path="/search" element={<Buscador />} />
              <Route path="/progreso" element={<Logro user={user} />} />
              <Route path="/articulos" element={<Articulos />} />
              <Route path="/articulos/:id" element={<Articulo />} />
              <Route path="/paises" element={<Paises />} />
              <Route path="/:nombrePais/" element={<Ciudades />} />
              <Route path="/:nombrePais/:nombreCiudad" element={<Ciudad />} />
              <Route path="/:nombrePais/:nombreCiudad/:nombreUniversidad" element={<Facultades />} />
              <Route path="/:nombrePais/:nombreCiudad/:nombreUniversidad/:nombreFacultad" element={<Asignaturas />} />
              <Route path="/asignatura/:idAsignatura" element={<Asignatura user={user} />} />
              <Route path="/perfil/:token" element={<Perfil />} />
              <Route path="/editPerfil" element={<EditPerfil user={user} />} />
            </> : null
          }
        </Routes>
      </section>
      <section className="footer">
        <Footer />
      </section>
    </main>
  )
}

export default App