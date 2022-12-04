import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import toast from "react-hot-toast";
import asignaturaService from "../../../services/asignatura.service"

const SubirArchivo = (props) => {
  const [imagen, setImagen] = useState(null);
  const [nombreImagen, setNombreImagen] = useState(null)
  const [valido, setValido] = useState(false)
  const [datos, setDatos] = useState({
    titulo: '',
    comentario: ''
  })

  const handleImage = (e) => {
    setImagen(e.target.files[0])
    setNombreImagen(e.target.files[0].name)
    if (datos.titulo.length > 0) {
      setValido(true)
    }
  }
  const toSave = (event) => {
    event.preventDefault()
    
    const bodyFormData = new FormData()
    bodyFormData.append("file", imagen)
    bodyFormData.append("titulo", datos.titulo)
    bodyFormData.append("descripcion", datos.comentario)
    bodyFormData.append("idUsuario", props.idusuario)
    bodyFormData.append("idAsignatura", props.idasignatura)
    bodyFormData.append("nombreArchivo", nombreImagen)

    /*
    for (const pair of bodyFormData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }*/
    
    asignaturaService
      .subirArchivo(bodyFormData)
      .then(response => {
        toast.success("Archivo Subido")
        props.onHide()
      })
      .catch(error => {
        toast.error("No se ha podido subir el archivo")
      })
  }
  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setDatos({
      ...datos,
      [name]: value,
    })
    if (datos.titulo.length > 0 && imagen != null) {
      setValido(true);
    } else {
      setValido(false);
    }
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
          Subir Archivo
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={toSave}>
        <Modal.Body>

          <div>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Título"
              className="mb-3"
            >
              <Form.Control
                name="titulo"
                placeholder="Leave a comment here"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={handleChanges}
              />
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
          <div style={{ marginTop: '1rem' }}>
            <input type="file" accept="application/pdf,application/vnd.ms-excel" onChange={handleImage} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' disabled={!valido}>Guardar</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default SubirArchivo