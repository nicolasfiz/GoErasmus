import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from "moment";
import axios from "axios";
import fileDownload from "js-file-download";
import asignaturasService from "../../../services/asignatura.service";
import toast from "react-hot-toast";
import ToggleButton from 'react-bootstrap/ToggleButton'
import "./ArchivosAsignatura.css"

const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const Archivo = ({ currentItems, votados, idUsuario}) => {
  const mg = (idVotacion, nombreUsuario) => {
    if (votados.includes(idVotacion)) {
      toast.error("Ya has votado este comentario");
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append("idUsuario", idUsuario);
      asignaturasService
        .mg(idVotacion, bodyFormData)
        .then((respose) => {
          console.log(respose)
          if(respose === true){
            votados.push(idVotacion)
            toast.success("Votado")
          }else{
            toast.error("No puedes votar tu propia aportacion")
          }
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
        .then((respose) => {
          console.log(respose)
          if(respose === true){
            votados.push(idVotacion)
            toast.success("Votado")
          }else{
            toast.error("No puedes votar tu propia aportacion")
          }
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
      <ListGroup style={{ margin: '1rem 30% 2rem 30%' }}>
        {currentItems &&
          currentItems.map((item) => (
            <ListGroup.Item style={{ background: "#fafafa" }} key={item.nombreUsuario + item.fecha}>
              <div>
                <a
                  href={baseUrl + item.nombreUsuario}
                  style={{ textDecoration: "none" }}
                >
                  {item.nombreUsuario}
                </a>
                {" " + item.titulo}
              </div>

              <div className="descripcion">{item.descripcion}</div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ marginRight: "1rem" }}>
                  <ToggleButton size="sm" variant="outline-success" id={`likeComentario${item.idVotacion}`} type="checkbox" onChange={() => mg(item.idVotacion)}>
                    <AiFillLike /> {item.mg}
                  </ToggleButton>
                </div>
                <div style={{ marginRight: "1rem" }}>
                  <ToggleButton size="sm" variant="outline-danger" id={`likeArchivo${item.idVotacion}`} type="checkbox" onChange={() => nmg(item.idVotacion)}>
                    <AiFillDislike /> {item.nmg}
                  </ToggleButton>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
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
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};
export default Archivo;
