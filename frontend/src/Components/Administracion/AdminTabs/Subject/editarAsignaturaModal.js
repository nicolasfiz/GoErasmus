import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import facultyServices from "../../../../services/faculty.service"
import subjectServices from "../../../../services/subject.service"

function EditarAsignaturaModal(props){
  //Desestructurando props
  const {updatechanges, row, ...others} = props

  //Guarda los valores del modal
  const [nombre, setNombre] = useState("")
  const [facultad, setFacultad] = useState(0)
  
  //Comprueba si son validos los datos
  const [nombreValido, setNombreValido] = useState(true)
  const [facultadValida, setFacultadValida] = useState(true)

  // Lista de facultades
  const [faculties, setFaculties] = useState([])

  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  const handleChanges = (tag, { target }) => {
    if (tag === "nombre") {
      setNombre(target.value)
      setNombreValido(target.value.length <= 100)
    } else if (tag === "facultad") {
      setFacultad(target.value)
      setFacultadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()

    if (nombre !== "")
      bodyFormData.append("nombre", nombre)
    else
      bodyFormData.append("nombre", row.nombre)
      
    bodyFormData.append("facultad_idFacultad", facultad)

    subjectServices.updateSubject(row.id, bodyFormData).then(() => {
      handleButtonClick()
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    facultyServices.getFaculties().then(f => {
      setFaculties(f)
    })
  }, [])

  return (
    <>
      {ToastComponent("Cambios realizados con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-edit-subject"
        centered
        onShow = {() => {
          setNombreValido(true)
          setFacultadValida(true)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-edit-subject">
            Editar Asignatura
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <Form.Label>Nombre de la asignatura</Form.Label>
              <Form.Control
                type="text"
                placeholder={row.nombre}
                onChange={ (event) => handleChanges("nombre", event) }
              />
              <div style={{ margin:"1em auto" }}></div>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona una facultad</Form.Label>
                <Form.Select defaultValue={0} onChange = { (event) => handleChanges("facultad", event)}>
                  <option></option>
                  {faculties && faculties.length !== 0 ? 
                    faculties.map(({ idFacultad, nombreFacultad }, id) =>
                      <option key={id} value={idFacultad}> { nombreFacultad } </option>) : null}
                </Form.Select>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type     = 'submit'
              variant  = 'primary'
              disabled = { !(nombreValido && facultadValida) }>
                Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default EditarAsignaturaModal