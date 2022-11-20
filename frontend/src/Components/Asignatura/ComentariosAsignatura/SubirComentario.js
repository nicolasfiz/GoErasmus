import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import toast from "react-hot-toast";
import asignaturaService from "../../../services/asignatura.service"

const isNumber = (str) => {
  return /^(([0-9](\.\d{1})?)|10)$/.test(str)
}

const SubirComentario = (props) => {
  const [valoracion, setValoracion] = useState({
    nota: '',
    comentario: ''
  })
  const [valido, setValido] = useState(false)
  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setValoracion({
      ...valoracion,
      [name]: value,
    })
    if ((name==="nota" && value.length > 0) && isNumber(value)) {
      setValido(true);
    } else {
      setValido(false);
    }
  }
  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("descripcion", valoracion.comentario)
    bodyFormData.append("idUsuario", props.idusuario)
    bodyFormData.append("idAsignatura", props.idasignatura)
    bodyFormData.append("nota", valoracion.nota)


    for (const pair of bodyFormData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    asignaturaService
      .subirValoracion(bodyFormData)
      .then(response => {
        toast.success("Valoración enviada")
        props.onHide()
      })
      .catch(error => {
        toast.error("No se ha podido enviar la valoración")
      })
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Valorar Asignatura
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={toSave}>
        <Modal.Body>
          <div>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Introduce una nota del 1 al 10 (se redondea a un solo decimal)"
              className="mb-3"
            >
              <Form.Control
                name="nota"
                placeholder="Leave a comment here"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={handleChanges}
              />
              {valoracion.nota.length > 0 && !isNumber(valoracion.nota) ? <small style={{color: 'red'}}>La nota debe ser un numero del 1 al 10 (max un deicmal)</small> : null }
            </FloatingLabel>
          </div>
          <div>
            <FloatingLabel controlId="floatingTextarea2" label="Deja aqui tu comentario (Opcional)">
              <Form.Control
                name="comentario"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleChanges}
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' disabled={!valido}>Enviar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default SubirComentario;
