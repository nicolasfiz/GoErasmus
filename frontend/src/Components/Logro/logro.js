import ProgressBar from "react-bootstrap/ProgressBar";
import userService from "../../services/user";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./logro.css"
import ListGroup from 'react-bootstrap/ListGroup';

const Logro = ({user}) => {
  const [logros, setLogros] = useState(null);

  useEffect(() => {
    userService
      .getLogros(user.id)
      .then((response) => {
        setLogros(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div
      style={{
        margin: "1rem 30% .5rem 30%",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      {logros ? (
        <div style={{ margin: ".5em" }}>
          <div style={{ textAlign: "center", padding: "1.5rem" }}>
            <Card bg="light">
              <Card.Header>
                <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{logros.rol}</div>
              </Card.Header>
              <Card.Body>
                <div style={{ margin: ".5em" }} className="textoCard">
                  <ProgressBar
                    animated
                    now={
                      ((logros.cantidad - logros.arrayProximos.length) /
                        logros.cantidad) *
                      100
                    }
                    style={{ marginBottom: '1rem' }}
                  />
                  {
                    ((logros.cantidad - logros.arrayProximos.length) /
                      logros.cantidad) *
                    100
                  }/100
                </div>
              </Card.Body>
            </Card>
          </div>
          {logros.arrayProximos.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#4193ef", fontSize: '1.5rem', fontWeight: '500' }}> Proximos logros</div>
              <div style={{ margin: "1em" }}>
                <ListGroup
                  style={{
                    marginBottom: "1em",
                    marginRight: "4em",
                    marginLeft: "4em",

                  }}
                >
                  {logros.arrayProximos.map((elem) => (


                    <ListGroup.Item key={elem} variant="warning">{elem}</ListGroup.Item>

                  ))}
                </ListGroup>
              </div>
            </div>
          ) : null}
          {logros.arrayConseguidos.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#4193ef", fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem'}}> Logros obtenidos</div>
              <ListGroup
                style={{
                  margin: '1rem 4rem 2rem 4em'
                }}

              >
                  {logros.arrayConseguidos.map((elem) => (

                    <ListGroup.Item key={elem} variant="success">{elem}</ListGroup.Item>

                  ))}
              </ListGroup>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
export default Logro;
