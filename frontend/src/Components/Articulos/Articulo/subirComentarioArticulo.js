import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import toast from "react-hot-toast"
import articleServices from "../../../services/article.service"

const SubirComentarioArticulo = (props) => {
  const [comentario, setComentario] = useState("")
  const [valido, setValido] = useState(false)

  const handleChanges = ({ target }) => {
    setComentario(target.value)
    setValido(target.value.length <= 180)
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("descripcion", comentario)
    bodyFormData.append("usuario_idUsuario", props.idusuario)
    bodyFormData.append("articulo_idArticulo", props.idarticulo)


    /*for (const pair of bodyFormData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`)
    }*/

    articleServices.publishComment(bodyFormData).then(response => {
        toast.success("Comentario publicado")
        props.onHide()
      }).catch(error => {
        console.log(error)
        toast.error("Error al publicar el comentario")
      })
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter-articulo"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter-articulo">
          Publicar comentario
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={toSave}>
        <Modal.Body>
          <div>
            <FloatingLabel controlId="floatingTextComment" label="Escribe aquí lo que quieras compartir. Recuerda ser respetuoso con los demás.">
              <Form.Control
                as="textarea"
                placeholder="Aquí va el comentario"
                style={{ height: "100px" }}
                onChange={handleChanges}
              />
              {comentario.length > 180 ? <small style={{color: 'red'}}>El comentario no puede tener mas de 180 caracteres</small> : null }
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' disabled={!valido}>Publicar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
export default SubirComentarioArticulo
