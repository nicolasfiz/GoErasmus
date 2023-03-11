import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import authServices from '../../services/auth.service'
import logotypeImage from "../../assets/mundobyn.png"
import './login.css'

const RecoverPassword = () => {

  const [email, setEmail] = useState("")
  let send = false

  const nav = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const sendEmail = (e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append("email", email)
    if (send)
      toast.error("Revisa tu correo")
    else if (!send && email === '')
      toast.error("Introduzca email")
    else
    {
      send = true
      authServices.recoverPassword(formData).then(t => {
        if (t.message)
        {
          send = false
          toast.error(t.message)
        }
        toast.success("Email enviado")
      }).catch(e => {
        console.log(e)
      })
    }
  }

  return (
    <>
      <Toaster/>
      <div className="Auth-bg">
        <div
          onLoad={() => {send = false}}
          className="Auth-form-container recover-margin"
        >
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h2 className="Auth-form-title" onClick={() => {nav('/')}}>
                G<img className="Auth-form-image"
                    src={logotypeImage}
                    alt="logo-goerasmus"/>Erasmus
              </h2>
              <div className="form-group space">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={handleEmail}/>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={sendEmail}
                  disabled={send}>
                    Recuperar cuenta
                </button>
              </div>
              <div className="text-center">
                <p>
                    ¿Recordaste la contraseña? {" "} <Link to="/signIn">Inicia sesión</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <p className="copyright-img cpy-recover-pos">
          Image by&nbsp;
          <a href="https://www.freepik.com/free-vector/hand-drawn-colorful-travel-background_16137796.htm#query=travel%20tourism%20background&position=1&from_view=keyword&track=ais">Freepik</a>
        </p>
      </div>
    </>
  )
}

export default RecoverPassword