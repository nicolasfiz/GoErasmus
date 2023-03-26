import { AiFillDislike, AiFillLike } from "react-icons/ai"
import Card from "react-bootstrap/Card"
import toast from 'react-hot-toast'
import moment from "moment"
import ToggleButton from 'react-bootstrap/ToggleButton'
//import articleServices from "../../../services/article.service"
import "../Articulo/articulo.css"
import anonimo from "../../../assets/ImagenesUsers/anonimo.png"


const baseUrl = `${process.env.REACT_APP_DIRECCIONES}perfil/`

const ComentarioArt = ({ currentItems, votados, idUsuario }) => {
  const mg = (idVotacion) => {
    if (votados.includes(idVotacion))
      toast.error("Ya has votado este comentario")
    else
    {
      const bodyFormData = new FormData()
      bodyFormData.append("idUsuario", idUsuario)
      /*asignaturasService.mg(idVotacion, bodyFormData).then(respose => {
        if (respose)
        {
          toast.success("Votado")
          votados.push(idVotacion)      
        }
        else
          toast.error("No puedes votar tu propia aportacion")
      }).catch( () => toast.error("ha ocurrido un errror"))*/
    } 
  }

  const nmg = (idVotacion) => {
    if (votados.includes(idVotacion))
      toast.error("Ya has votado este comentario")
    else
    {
      const bodyFormData = new FormData()
      bodyFormData.append("idUsuario", idUsuario)
      /*asignaturasService.nmg(idVotacion, bodyFormData).then(respose =>{ 
        if(respose)
        {
          toast.success("Votado")
          votados.push(idVotacion)      
        }
        else
          toast.error("No puedes votar tu propia aportacion")
      }).catch( () => toast.error("ha ocurrido un errror"))*/
    } 
  }

  return (
    <>
      <div style={{ margin: "1rem", marginLeft: "20%", marginRight: "20%" }}>
        {currentItems && currentItems.map((item) => (
          <div
            key={item.nombreUsuario + item.fecha}
            style={{ marginBottom: "1rem", paddingTop: "1rem" }}
          >
            <Card style={{ background: "#fafafa" }}>
              <Card.Body>
                <Card.Title style={{ display: "flex"}}>
                  {item.urlFotoPerfil ? 
                    <img className="profile" width={40} height={40} src={item.urlFotoPerfil} alt={`Imagen de perfil de ${item.nombreUsuario}`}/> :
                    <img className="profile" width={40} height={40} src={anonimo} alt={`Imagen de perfil de ${item.nombreUsuario}`}/>}
                  <a href={baseUrl + item.nombreUsuario} style={{textDecoration: "none"}}>
                    <p style={{ marginLeft: "1rem", marginTop: "0.5rem" }}> {item.nombreUsuario}</p>
                  </a>
                </Card.Title>
                <Card.Text> {item.descripcion} </Card.Text>
              </Card.Body>
              <div className="fecha"> {moment(item.fecha).format("DD-MM-YYYY")}</div>
              <Card.Footer style={{ display: "flex" }}>
                <div style={{ marginRight: "1rem" }}>
                  <ToggleButton
                    variant="outline-success"
                    size="sm"
                    id={`likeComentario${item.idVotacion}`}
                    type="checkbox"
                    onChange={() => mg(item.idVotacion)}
                  >
                    <AiFillLike /> {item.mg}
                  </ToggleButton>
                </div>
                <div>
                  <ToggleButton
                    variant="outline-danger"
                    size="sm"
                    id={`dislikeComentario${item.idVotacion}`}
                    type="checkbox"
                    onChange={() => nmg(item.idVotacion)}
                  >
                    <AiFillDislike /> {item.nmg}
                  </ToggleButton>
                </div>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default ComentarioArt