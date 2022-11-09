import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import axios from "axios";
import fileDownload from "js-file-download";

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const Archivo = ({ currentItems }) => {
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <div style={{ margin: "1rem", marginLeft: "4rem", marginRight: "4rem" }}>
      {currentItems &&
        currentItems.map((item) => (
          <div
            key={item.nombreUsuario + item.fecha}
            style={{ marginBottom: "1rem", paddingTop: "1rem" }}
          >
            <Card style={{ background: "#fafafa" }}>
              <Card.Header
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="outline-primary"
                  onClick={() => handleDownload(item.urlArchivo, `${item.nombreArchivo}`)}
                >
                  DESCARGAR {item.titulo.toUpperCase()} <BsDownload />
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title style={{ display: "flex" }}>
                  <a
                    href={baseUrl + item.nombreUsuario}
                    style={{ textDecoration: "none" }}
                  >
                    {item.nombreUsuario}
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
};
export default Archivo;
