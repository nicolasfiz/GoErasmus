import { useParams } from "react-router-dom";
import perfilService from "../../services/user";
import { useState, useEffect } from "react";
import anonimo from "../../assets/ImagenesUsers/anonimo.png";
import "./perfil.css"

const Perfil = () => {
    let params = useParams();
    const [datos, setDatos] = useState(null);

    useEffect(() => {
        perfilService
            .getDatos(params.token)
            .then(response => {
                setDatos(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params.token]);

    return (
        <main className="main">
            <div className="formPerfil">
                {datos != null ? (
                    <>
                        <div className="apartado">
                            {datos[0].urlFotoPerfil == null ? <img src={anonimo} width={171} height={180} alt="imagenUser" /> : <img src={datos[0].urlFotoPerfil} width={171} height={180} alt="imagenUser" />}
                        </div>
                        <section className="datos">
                            <div className="apartado">
                                <h3>Nombre de usuario: </h3>
                                <i><p>{datos[0].nombreUsuario}</p></i>
                            </div>
                            <div className="apartado">
                                <h3>Email:</h3>
                                <i><p>{datos[0].email}</p></i>
                            </div>
                            <div className="apartado">
                                <h3>Rango: </h3>
                                <i><p>{datos[0].rol}</p></i>
                            </div>
                            <div className="apartado">
                                <h3>Donde ha estudiado:</h3>
                                <ul>
                                    <li>País: <i>{datos[0].pais}</i></li>
                                    <li>Ciudad: <i>{datos[0].ciudad}</i></li>
                                    <li>Universidad: <i>{datos[0].universidad}</i></li>
                                    <li>Facultad: <i>{datos[0].facultad}</i></li>
                                </ul>
                            </div>
                        </section>

                        {console.log(datos[0])}
                    </>
                ) : (<p>hola</p>)}
            </div>
        </main>
    );
}

export default Perfil;