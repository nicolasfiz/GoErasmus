import { AiFillDislike, AiFillLike } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Moment from "moment";

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const Comentario = ({ currentItems }) => (
  <div style={{ margin: "1rem", marginLeft: "4rem", marginRight: "4rem" }}>
    {currentItems &&
      currentItems.map((item) => (
        <div
          key={item.nombreUsuario + item.fecha}
          style={{ marginBottom: "1rem", paddingTop: "1rem" }}
        >
          <Card style={{ background: "#fafafa" }}>
            <Card.Body>
              <Card.Title style={{ display: "flex" }}>
                <b
                  className="notaComentario"
                  style={
                    item.nota >= 5
                      ? { background: "#198754", borderColor: "#198754" }
                      : { background: "#dc3545", borderColor: "#dc3545" }
                  }
                >
                  {item.nota}
                </b>{" "}
                <a href={baseUrl+item.nombreUsuario} style={{textDecoration:'none'}}>
                  <p style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                    {item.nombreUsuario}
                  </p>
                </a>
              </Card.Title>
              <Card.Text>{item.descripcion}</Card.Text>
            </Card.Body>
            <div className="fecha">
              {Moment(item.fecha).format("DD-MM-YYYY")}
            </div>
            <Card.Footer style={{ display: "flex" }}>
              <div style={{ marginRight: "1rem" }}>
                <Button variant="outline-success" size="sm">
                  <AiFillLike /> {item.mg}
                </Button>
              </div>
              <div>
                <Button variant="outline-danger" size="sm">
                  <AiFillDislike /> {item.nmg}
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      ))}
  </div>
);
export default Comentario;
