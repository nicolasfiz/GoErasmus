import { AiFillDislike, AiFillLike } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import Moment from "moment";
import toast from 'react-hot-toast';
import ToggleButton from 'react-bootstrap/ToggleButton'
import asignaturasService from "../../../services/asignatura.service"


const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`;

const Comentario = ({ currentItems, votados, idUsuario }) => {
  const mg = (idVotacion) => {
    if(votados.includes(idVotacion)){
      toast.error("Ya has votado este comentario")
    }else{
      const bodyFormData = new FormData()
      bodyFormData.append("idUsuario", idUsuario)
      asignaturasService
        .mg(idVotacion, bodyFormData)
        .then(respose => {
          console.log(respose)
          if(respose===true){
            toast.success("Votado")
            votados.push(idVotacion)      
          }else{
            toast.error("No puedes votar tu propia aportacion")
          }
        })
        .catch(error => toast.error("ha ocurrido un errror"))
    } 
  }
  const nmg = (idVotacion) => {
    if(votados.includes(idVotacion)){
      toast.error("Ya has votado este comentario")
    }else{
      const bodyFormData = new FormData()
      bodyFormData.append("idUsuario", idUsuario)
      asignaturasService
        .nmg(idVotacion, bodyFormData)
        .then(respose =>{ 
          console.log(respose)
          if(respose===true){
            toast.success("Votado")
            votados.push(idVotacion)      
          }else{
            toast.error("No puedes votar tu propia aportacion")
          }
        })
        .catch(error => toast.error("ha ocurrido un errror"))
    } 
  }
  return (
    <>
      <div style={{ margin: "1rem", marginLeft: "20%", marginRight: "20%" }}>
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
                    <a
                      href={baseUrl + item.nombreUsuario}
                      style={{ textDecoration: "none" }}
                    >
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
                    <ToggleButton variant="outline-success" size="sm" id={`likeComentario${item.idVotacion}`} type="checkbox" onChange={() => mg(item.idVotacion)}>
                      <AiFillLike /> {item.mg}
                    </ToggleButton>
                  </div>
                  <div>
                    <ToggleButton variant="outline-danger" size="sm" id={`dislikeComentario${item.idVotacion}`} type="checkbox" onChange={() => nmg(item.idVotacion)}>
                      <AiFillDislike /> {item.nmg}
                    </ToggleButton>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};
export default Comentario;
