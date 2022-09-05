import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Registro</h3>
                    <div className="text-center">
                        ¿Ya estás registrado?{" "}
                        <Link to="/login" className='link-primary'>
                            Iniciar sesión
                        </Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Nombre</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Introduzca su nombre en la aplicación"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Introduzca su dirección de correo"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Introduzca su contraseña"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Enviar
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        ¿Has olvidado tu <Link to="/">contraseña?</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default Register;