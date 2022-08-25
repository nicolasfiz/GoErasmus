import './login.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Iniciar sesión</h3>
                        <div className="text-center">
                            ¿No estás registrado aún?{" "}
                            <Link to="/register" className='link-primary'>
                                Registro
                            </Link>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Introduce tu email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Introduce tu password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            ¿Has olvidado tu <Link to="/">contraseña?</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;