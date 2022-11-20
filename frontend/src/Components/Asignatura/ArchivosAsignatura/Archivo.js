import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import axios from "axios";
import fileDownload from "js-file-download";
import asignaturasService from "../../../services/asignatura.service";
import toast from "react-hot-toast";
import ToggleButton from 'react-bootstrap/ToggleButton'

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const Archivo = ({ currentItems, votados, idUsuario }) => {
  const mg = (idVotacion) => {
    if (votados.includes(idVotacion)) {
      toast.error("Ya has votado este comentario");
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append("idUsuario", idUsuario);
      asignaturasService
        .mg(idVotacion, bodyFormData)
        .then((respose) => {
          votados.push(idVotacion)
          toast.success("Votado")
        })
        .catch((error) => toast.error("ha ocurrido un errror"));
    }
  };
  const nmg = (idVotacion) => {
    if (votados.includes(idVotacion)) {
      toast.error("Ya has votado este comentario");
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append("idUsuario", idUsuario);
      asignaturasService
        .nmg(idVotacion, bodyFormData)
        .then((respose) =>{
          toast.success("Votado")
          votados.push(idVotacion)        
        })
        .catch((error) => toast.error("ha ocurrido un errror"));
    }
  };
  const handleDownload = (url, filename) => {
    console.log(url, filename)
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <>
      <div style={{ margin: "1rem", marginLeft: "30%", marginRight: "30%" }}>
        {currentItems &&
          currentItems.map((item) => (
            <div
              key={item.nombreUsuario + item.fecha}
              style={{ marginBottom: "1rem", paddingTop: "1rem" }}
            >
              <Card style={{ background: "#fafafa" }}>
                <Card.Body>
                  <Card.Title>{item.titulo.toUpperCase()}</Card.Title>
                  <Card.Subtitle>
                    <a
                      href={baseUrl + item.nombreUsuario}
                      style={{ textDecoration: "none" }}
                    >
                      {item.nombreUsuario}
                    </a>
                  </Card.Subtitle>
                  <Card.Text>{item.descripcion}</Card.Text>
                </Card.Body>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginRight: "1rem" }}>
                    <ToggleButton variant="outline-success" id={`likeComentario${item.idVotacion}`} type="checkbox" onChange={() => mg(item.idVotacion)}>
                      <AiFillLike /> {item.mg}
                    </ToggleButton>
                  </div>
                  <div style={{ marginRight: "1rem" }}>
                    <ToggleButton variant="outline-danger" id={`likeArchivo${item.idVotacion}`} type="checkbox" onChange={() => nmg(item.idVotacion)}>
                      <AiFillDislike /> {item.nmg}
                    </ToggleButton>
                  </div>
                  <div>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handleDownload(item.urlArchivo, `${item.nombreArchivo}`)
                      }
                    >
                      <BsDownload />
                    </Button>
                  </div>
                </div>
                <div className="fecha">
                  {Moment(item.fecha).format("DD-MM-YYYY")}
                </div>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};
export default Archivo;
