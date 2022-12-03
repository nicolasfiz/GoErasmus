import './login.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import authServices from '../../services/auth.service';
import tokenServices from "../../services/token.service";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const generateToken = (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    authServices.signIn(formData).then(t => {
      tokenServices.setToken(t.token);
    }).catch(e => {
      console.log(e);
    });
  } 
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Iniciar sesión</h3>
            <div className="text-center">
              ¿No estás registrado aún?{" "}
              <Link to="/signUp" className='link-primary'>Registro</Link>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Introduce tu email"
                value={email}
                onChange={handleEmail}
                />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Introduce tu password"
                value={password}
                onChange={handlePassword}
                />
            </div>
            <div>
              <p className="forgot-password text-right mt-2">
                ¿Has olvidado tu <Link to="/">contraseña</Link>?
              </p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={generateToken}>
                  Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;