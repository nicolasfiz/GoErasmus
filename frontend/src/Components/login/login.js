import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import authServices from '../../services/auth.service'
import tokenServices from "../../services/token.service"
import logotypeImage from '../../assets/mundobyn.png'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import './login.css'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hide, setHide] = useState(true)

  let nav = useNavigate()

  useEffect(() => {
    tokenServices.getToken().then(data => {
        if(data && data.length > 0)
          nav("../", {replace: true})
    })
  }, [nav])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const generateToken = (e) => {
    e.preventDefault()
    
    let formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    
    authServices.signIn(formData).then(t => {
      if (t.message)
        toast.error(t.message)
      else
      {
        tokenServices.setToken(t.token)
        window.location.reload(true)
      }
    }).catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <Toaster/>
      <div className="Auth-bg">
        <div className="Auth-form-container login-margin">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h2 className="Auth-form-title" onClick={() => nav('/')}>
                G<img className="Auth-form-image"
                  src={logotypeImage}
                  alt="logo-goerasmus"/>Erasmus
              </h2>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={handleEmail}
                  />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <div style={{ position: "relative"}}>
                  <input
                    type={hide ? "password" : "text"}
                    className="form-control mt-1"
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
              <div>
                <p className="mt-2">
                  He olvidado mi <Link to="/recover">contraseña</Link>
                </p>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={generateToken}>
                    Iniciar sesión
                </button>
              </div>
              <div className="text-center">
                <p>
                  ¿No tienes una cuenta? Regístrate {" "}
                  <Link to="/signUp">aquí</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <p className="copyright-img cpy-login-pos">
          Image by&nbsp;
          <a href="https://www.freepik.com/free-vector/hand-drawn-colorful-travel-background_16137796.htm#query=travel%20tourism%20background&position=1&from_view=keyword&track=ais">Freepik</a>
        </p>
      </div>
    </>
  )
}

export default Login