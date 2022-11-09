import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import userService from "../../services/user";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./logro.css";

const Logro = () => {
  const token = useParams().token;
  const [logros, setLogros] = useState(null);

  useEffect(() => {
    userService
      .getLogros(token)
      .then((response) => {
        setLogros(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <div
      style={{
        margin: "4vh",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {logros ? (
        <div style={{ margin: "2em" }}>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <Card bg="light">
              <Card.Header>
                <p className="textoCard">Nivel:</p>
                <h1>{logros.rol}</h1>
              </Card.Header>
              <Card.Body>
                <p className="textoCard">Experiencia:</p>
                <div style={{ margin: "2em" }}>
                  <ProgressBar
                    animated
                    now={
                      ((logros.cantidad - logros.arrayProximos.length) /
                        logros.cantidad) *
                      100
                    }
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
          {logros.arrayProximos.length > 0 ? (
            <div
              style={{
                margin: "2em",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <h4 style={{ color: "#4193ef" }}> Proximos logros</h4>
              <div style={{ margin: "2em" }}>
                {logros.arrayProximos.map((elem) => (
                  <Card
                    style={{
                      marginBottom: "1em",
                      marginRight: "4em",
                      marginLeft: "4em",
                      background: "#ffd043",
                    }}
                    key={elem}
                  >
                    <Card.Body>{elem}</Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
          {logros.arrayConseguidos.length > 0 ? (
            <div
              style={{
                margin: "2em",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <h4 style={{ color: "#4193ef" }}>Logros conseguidos</h4>
              <div style={{ margin: "2em" }}>
                {logros.arrayConseguidos.map((elem) => (
                  <Card
                    style={{
                      marginBottom: "1em",
                      marginRight: "4em",
                      marginLeft: "4em",
                      background: "#89e2a7",
                    }}
                    key={elem}
                  >
                    <Card.Body>{elem}</Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default Logro;
