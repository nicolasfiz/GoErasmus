import "../usuarios/Usuario.css"
import { Spinner } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}asignatura/`;
const ListadoAsignaturas = ({ resultado, loading }) => {
    return (
        <ListGroup ListGroup className="listaUsuarios" >
            {!loading ? (
                resultado.length > 0 ? (resultado.map(elem =>
                    <ListGroup.Item key={elem.idAsignatura}>
                        <div className="usuarioListaBuscador">
                            <div>
                                {elem.puntuacion ? (
                                    <div className="imagenNota" >
                                        <div className="notaRedonda"
                                        >{elem.puntuacion}</div>
                                        <a
                                            href={baseUrl + elem.idAsignatura}
                                            style={{ textDecoration: "none" }}
                                        >
                                            {elem.nombre}
                                        </a>
                                    </div>)
                                    : (
                                        <div className="imagenNota">
                                            <div className="notaRedonda">
                                                0
                                            </div>
                                            <a
                                                href={baseUrl + elem.idAsignatura}
                                                style={{ textDecoration: "none" }}
                                            >{elem.nombre}</a>
                                        </div>)
                                }{" "}

                            </div>
                            {elem.pais ? (
                                <div className="estudioEn">
                                    {`${elem.pais}, ${elem.ciudad}, ${elem.universidad}, ${elem.facultad}`}
                                </div>) : null}
                            <div>
                            </div>
                        </div>
                    </ListGroup.Item>
                )) : (
                    <section style={{ margin: "auto", marginTop: "50px", width: "80%" }}>
                        <h2>Hmmm...</h2>
                        <h3>No pudimos encontrar ninguna coincidencia"</h3>
                        <p style={{ margin: "0" }}>Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos, o pruebe con otros términos de búsqueda.</p>
                    </section>
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
            </div>
            }
        </ListGroup>
    )
}

export default ListadoAsignaturas