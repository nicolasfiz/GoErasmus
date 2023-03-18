import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import facultyServices from "../../../../services/faculty.service"
import universityServices from "../../../../services/university.service"

function EditarFacultadModal(props) {
  //Desestructurando props
  const {updatechanges, row, ...others} = props

  //Guarda los valores del modal
  const [nombre, setNombre] = useState("")
  const [universidad, setUniversidad] = useState(0)
  
  //Comprueba si son validos los datos
  const [nombreValido, setNombreValido] = useState(true)
  const [universidadValida, setUniversidadValida] = useState(true)

  // Lista de universidades
  const [universities, setUniversities] = useState([])

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
      setNombreValido(target.value.length >= 13 && target.value.length <= 150)
    } else if (tag === "universidad") {
      setUniversidad(target.value)
      setUniversidadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()

    if (nombre !== "")
      bodyFormData.append("nombre", nombre)
    else
      bodyFormData.append("nombre", row.nombre)
      
    bodyFormData.append("universidad_idUniversidad", universidad)

    facultyServices.updateFaculty(row.id, bodyFormData).then(() => {
      handleButtonClick()
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    universityServices.getUniversities().then(u => {
      setUniversities(u)
    })
  }, [])

  return (
    <>
      {ToastComponent("Cambios realizados con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-edit-faculty"
        centered
        onShow = {() => {
          setNombreValido(true)
          setUniversidadValida(true)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-edit-faculty">
            Editar Facultad
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <Form.Label>Nombre de la facultad</Form.Label>
              <Form.Control
                type="text"
                placeholder={row.nombre}
                onChange={ (event) => handleChanges("nombre", event) }
              />
              <div style={{ margin:"1em auto" }}></div>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona una universidad</Form.Label>
                <Form.Select defaultValue={0} onChange = { (event) => handleChanges("universidad", event)}>
                  <option></option>
                  {universities && universities.length !== 0 ? 
                    universities.map(({ idUniversidad, nombreUniversidad }, id) =>
                      <option key={id} value={idUniversidad}> { nombreUniversidad } </option>) : null}
                </Form.Select>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type     = 'submit'
              variant  = 'primary'
              disabled = { !(nombreValido && universidadValida) }>
                Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default EditarFacultadModal