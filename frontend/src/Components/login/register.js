import { Link } from "react-router-dom";
import { useState } from 'react';
import authServices from '../../services/auth.service';
import tokenServices from "../../services/token.service";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import tokenService from '../../services/token.service'
import logotypeImage from '../../assets/mundobyn.png';
import './login.css';

const Register = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [username, setUsername] = useState("");

  let nav = useNavigate();

  useEffect(() => {
    tokenService.getToken().then(data => {
        if(data && data.length > 0)
          nav("../", {replace: true})
    })
  }, [nav])

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleSurname = (e) => {
    setSurname(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSecondPassword = (e) => {
    setSecondPassword(e.target.value);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const generateToken = (e) => {
    e.preventDefault();
    
    let formData = new FormData();
    formData.append("nombrePersona", name);
    formData.append("primerApellido", surname);
    formData.append("correo", email);
    formData.append("contrasenaSinCifrar", password);
    formData.append("contrasenaRepetida", secondPassword);
    formData.append("nombreUsuario", username);
    
    authServices.signUp(formData).then(t => {
      toast.success("Registro realizado")
      setTimeout(() => {
        tokenServices.setToken(t.token);
        window.location.reload(true);
      }, 5000);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <>
      <Toaster/>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h2 style={{cursor: "pointer"}} className="Auth-form-title" onClick={() => nav('/')}>
              G<img
                  src={logotypeImage}
                  width={27}
                  height={31}
                  style={{ paddingBottom: 4.5, paddingTop: 0 }}
                  alt="logo-goerasmus"/>Erasmus
            </h2>
            <div className="inputs">
              <div style={{marginRight:"1em"}} className="form-group mt-3">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  style={{fontSize: "14px"}}
                  placeholder="John"
                  value={name}
                  onChange={handleName}/>
              </div>
              <div className="form-group mt-3">
                <label>Primer apellido</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  style={{fontSize: "14px"}}
                  placeholder="Doe"
                  value={surname}
                  onChange={handleSurname}/>
              </div>
            </div>
            <div className="form-group mt-3">
              <label>Nombre de Usuario</label>
              <input
                type="text"
                className="form-control mt-1"
                style={{fontSize: "14px"}}
                placeholder="johndoe"
                value={username}
                onChange={handleUsername}
                />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                style={{fontSize: "14px"}}
                placeholder="johndoe@example.com"
                value={email}
                onChange={handleEmail}
                />
            </div>
            <div className="inputs">
              <div style={{marginRight:"1em"}} className="form-group mt-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  style={{fontSize: "14px"}}
                  placeholder="Contraseña"
                  value={password}
                  onChange={handlePassword}/>
              </div>
              <div className="form-group mt-3">
                <label>Repita la contraseña</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  style={{fontSize: "14px"}}
                  placeholder="Misma contraseña"
                  value={secondPassword}
                  onChange={handleSecondPassword}/>
              </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={generateToken}>
                  Registrarse
              </button>
            </div>
            <div className="text-center">
              <p style = {{fontSize: "14px", marginTop: "1.5em", marginBottom:"1em"}}>
                ¿Tienes una cuenta? {" "} <Link to="/signIn" style={{textDecoration: "none"}}>Inicia sesión</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;