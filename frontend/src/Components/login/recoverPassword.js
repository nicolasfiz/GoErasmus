import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import authServices from '../../services/auth.service';
import logotypeImage from "../../assets/mundobyn.png";
import './login.css';

const RecoverPassword = () => {

  const [email, setEmail] = useState("");
  let send = false;

  const nav = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const sendEmail = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    if (send)
      toast.error("Revisa tu correo");
    else if (!send && email === '')
      toast.error("Introduzca email");
    else
    {
      send = true;
      authServices.recoverPassword(formData).then(t => {
        if (t.message)
        {
         send = false;
         toast.error(t.message);
        }
        toast.success("Email enviado");
      }).catch(e => {
        console.log(e);
      });
    }
  }

  return (
    <>
      <Toaster/>
      <div onLoad={() => {send = false}} className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h2 className="Auth-form-title" style={{cursor:"pointer"}} onClick={() => {nav('/')}}>
              G<img
                  src={logotypeImage}
                  width={27}
                  height={31}
                  style={{ paddingBottom: 4.5, paddingTop: 0 }}
                  alt="logo-goerasmus"/>Erasmus
            </h2>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                style={{fontSize: "14px"}}
                placeholder="johndoe@example.com"
                value={email}
                onChange={handleEmail}/>
            </div>
            <div style={{marginBottom:"1.5em"}}></div>
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
              <p style = {{fontSize: "14px", marginTop: "1.5em", marginBottom:"1em"}}>
                  ¿Recordaste la contraseña? {" "} <Link to="/signIn" style={{textDecoration: "none"}}>Inicia sesión</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecoverPassword;