import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import authServices from '../../services/auth.service'
import tokenServices from "../../services/token.service"
import toast, {Toaster} from 'react-hot-toast'
import logotypeImage from '../../assets/mundobyn.png'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import './login.css'

const Register = () => {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [username, setUsername] = useState("")
  const [hide, setHide] = useState(true)
  const [hide2, setHide2] = useState(true)

  let nav = useNavigate()

  useEffect(() => {
    tokenServices.getToken().then(data => {
        if(data && data.length > 0)
          nav("../", {replace: true})
    })
  }, [nav])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSurname = (e) => {
    setSurname(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSecondPassword = (e) => {
    setSecondPassword(e.target.value)
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const generateToken = (e) => {
    e.preventDefault()
    
    let formData = new FormData()
    formData.append("nombrePersona", name)
    formData.append("primerApellido", surname)
    formData.append("correo", email)
    formData.append("contrasenaSinCifrar", password)
    formData.append("contrasenaRepetida", secondPassword)
    formData.append("nombreUsuario", username)
    
    authServices.signUp(formData).then(t => {
      if (t.message)
        toast.error(t.message)
      else
      {
        toast.success("Registro realizado")
        setTimeout(() => {
          tokenServices.setToken(t.token)
          window.location.reload(true)
        }, 5000)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <Toaster/>
      <div className="Auth-bg my-0 py-0">
        <div className="Auth-form-container register-margin">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h2 className="Auth-form-title" onClick={() => nav('/')}>
                G<img
                  className="Auth-form-image"
                  src={logotypeImage}
                  alt="logo-goerasmus"/>Erasmus
              </h2>
              <div className="inputs">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="dup form-control mt-1"
                    placeholder="John"
                    value={name}
                    onChange={handleName}/>
                </div>
                <div className="form-group ml-3">
                  <label>Primer apellido</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Doe"
                    value={surname}
                    onChange={handleSurname}/>
                </div>
              </div>
              <div className="form-group">
                <label>Nombre de Usuario</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="johndoe"
                  value={username}
                  onChange={handleUsername}
                  />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={handleEmail}
                  />
              </div>
              <div className="inputs">
                <div className="form-group">
                  <label>Contraseña</label>
                  <div style={{ position: "relative"}}>
                    <input
                      type={hide ? "password" : "text"}
                      className="dup form-control mt-1"
                      placeholder="Contraseña"
                      value={password}
                      onChange={handlePassword}
                    />
                    {hide ? 
                      <span
                        className = "passwordEye"
                        onClick={()=> {setHide(false)}}>
                          <AiFillEye/>
                      </span> : 
                      <span
                        className = "passwordEye"
                        onClick={() => {setHide(true)}}>
                          <AiFillEyeInvisible/>
                      </span>}
                  </div>
                </div>
                <div className="form-group ml-3">
                  <label>Repita la contraseña</label>
                  <div style={{ position: "relative"}}>
                    <input
                      type={hide2 ? "password" : "text"}
                      className="form-control mt-1"
                      placeholder="Misma contraseña"
                      value={secondPassword}
                      onChange={handleSecondPassword}
                    />
                    {hide2 ? 
                      <span
                        className = "passwordEye"
                        onClick={()=> {setHide2(false)}}>
                          <AiFillEye/>
                      </span> : 
                      <span
                        className = "passwordEye"
                        onClick={() => {setHide2(true)}}>
                          <AiFillEyeInvisible/>
                      </span>}
                  </div>
                </div>
              </div>
              {/*{password.length >= 5 || password.length === 0 ?
                  (password === secondPassword ? null :
                    <p className="error-msg">Contraseñas no coincidentes</p>)
                  : <p className ="error-msg">La contraseña debe tener entre 5 y 20 caracteres</p>}*/}
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={generateToken}>
                    Registrarse
                </button>
              </div>
              <div className="text-center">
                <p>
                  ¿Tienes una cuenta? {" "} <Link to="/signIn">Inicia sesión</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register