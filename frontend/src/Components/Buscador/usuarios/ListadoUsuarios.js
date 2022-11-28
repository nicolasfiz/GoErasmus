import "../usuarios/Usuario.css"
import { Spinner } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import anonimo from "../../../assets/ImagenesUsers/anonimo.png"

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const ListadoUsuarios = ({resultado, loading}) => {
    return (
        <ListGroup className="listaUsuarios">
                {!loading ? (
                    resultado.map(elem =>
                        <ListGroup.Item key={elem.nombreUsuario}>
                            <div className="usuarioListaBuscador">
                                <div>
                                    {elem.urlFotoPerfil ? (<img alt="imagenUsuario" src={elem.urlFotoPerfil} width={30} height={30} className="imagenBuscador" />)
                                        : (<img alt="imagenAnonimo" src={anonimo} width={30} height={30} className="imagenBuscador" />)}{" "}
                                    <a
                                        href={baseUrl + elem.nombreUsuario}
                                        style={{ textDecoration: "none" }}
                                    >{elem.nombreUsuario}</a>
                                </div>
                                {elem.pais ? (
                                    <div className="estudioEn">
                                        Estudió en {`${elem.pais}, ${elem.ciudad}, ${elem.universidad}, ${elem.facultad}`}
                                    </div>) : null}
                                <div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )
                ) : <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        width: "100%",
                    }}
                >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>}
            </ListGroup>
    )
}

export default ListadoUsuarios