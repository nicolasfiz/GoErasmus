import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Asignatura.css";
import ComentariosAsignatura from "./ComentariosAsignatura/ComentariosAsignatura";
import { FaGraduationCap } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import asignaturaService from "../../services/asignatura.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
<<<<<<< HEAD
=======
import ArchivoAsignatura from "./ArchivosAsignatura/ArchivosAsignatura";

const COMENTARIOS_POR_PAGINA = 6
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838

const Asignatura = () => {
  const params = useParams();
  const [datosAsignatura, setDatosAsignatura] = useState(null);

  useEffect(() => {
    asignaturaService
      .getAsignatura(params.idAsignatura)
      .then((response) => {
        setDatosAsignatura(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.idAsignatura]);

  return datosAsignatura ? (
    <div
      style={{
        margin: "2vh",
<<<<<<< HEAD
        marginLeft: "10vh",
        marginRight: "10vh",
=======
        marginLeft: "15vh",
        marginRight: "15vh",
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section
          style={{
            boxShadow: "0 0px 2px 0 rgb(0 0 0 / 12%)",
            width: "100%",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
<<<<<<< HEAD
            padding: "1rem",
=======
            padding: "0.2rem",
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
          }}
        >
          <p
            style={{ textAlign: "center", fontSize: "1rem", color: "#aaaaaa" }}
          >
            Asignatura
          </p>
          <h1 style={{ textAlign: "center" }}>
            <FaGraduationCap size={50} /> {datosAsignatura.nombre}
          </h1>
          <div
            style={{
<<<<<<< HEAD
              padding: "1rem",
=======
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
              fontSize: "1rem",
              color: "#aaaaaa",
              textAlign: "center",
            }}
          >
            <p>
              Pais: <i>{datosAsignatura.pais}</i>
            </p>
            <p>
              Ciudad: <i>{datosAsignatura.ciudad}</i>
            </p>
            <p>
              Universidad: <i>{datosAsignatura.universidad}</i>
            </p>
            <p>
              Facultad: <i>{datosAsignatura.facultad}</i>
            </p>
          </div>
        </section>
        <section>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              alignItems: "center",
<<<<<<< HEAD
              margin: "4rem",
=======
              margin: "2rem",
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
              boxShadow:
                "0 1px 5px 0 rgb(0 0 0 / 12%), 0 3px 1px -2px rgb(0 0 0 / 20%)",
              background: "#fafafa",
              width: "300px",
              height: "320px",
              fontWeight: "100",
              fontSize: "30px",
            }}
          >
            <p>Valoración</p>
            <div
              className="nota"
              style={
                datosAsignatura.puntuacion
                  ? datosAsignatura.puntuacion >= 5
                    ? {
                        background: "#198754",
                        borderColor: "#198754",
                      }
<<<<<<< HEAD
                    : { background: "red", borderColor: "red" }
=======
                    : { background: "#dc3545", borderColor: "#dc3545" }
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
                  : {
                      background: "rgb(124 124 124)",
                      borderColor: 'rgb(124 124 124)'
                    }
              }
            >
              <b>
                {datosAsignatura.puntuacion ? datosAsignatura.puntuacion : 0}
              </b>
            </div>
            <p style={{ fontSize: "18px" }}>{datosAsignatura.valoraciones} valoracioness</p>
            {
              datosAsignatura.valoraciones === 0 ? (
                <div style={{ width: "100%" }}>
                  <ProgressBar variant="danger" now={0} />
                </div>
              ):(
                <div style={{ width: "100%" }}>
                  <ProgressBar variant={datosAsignatura.puntuacion >= 5 ? 'success': 'danger'} now={datosAsignatura.puntuacion*10} />
                </div>
              )
            }
            <div>
              <Button variant="warning">Votar</Button>
            </div>
          </div>
        </section>
      </div>
      <Tabs
        defaultActiveKey="Comentarios"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Comentarios" title="Comentarios">
<<<<<<< HEAD
          <ComentariosAsignatura itemsPerPage={6} />
        </Tab>
        <Tab eventKey="Archivos" title="Archivos">
          <ul>
            <li key={1}>buenisimas</li>
            <li key={2}>mañanas</li>
          </ul>
=======
          <ComentariosAsignatura itemsPerPage={COMENTARIOS_POR_PAGINA} idAsignatura={params.idAsignatura}/>
        </Tab>
        <Tab eventKey="Archivos" title="Archivos">
          <ArchivoAsignatura itemsPerPage={COMENTARIOS_POR_PAGINA} idAsignatura={params.idAsignatura}/>
>>>>>>> 3b5a822d61982f7b0d045aaed5b17951e2283838
        </Tab>
      </Tabs>
    </div>
  ) : (
    <div
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
  );
};
export default Asignatura;
