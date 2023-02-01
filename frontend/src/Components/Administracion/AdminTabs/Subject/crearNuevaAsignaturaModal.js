import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import toast, { Toaster } from "react-hot-toast"
import subjectServices from "../../../../services/subject.service"
import facultyServices from "../../../../services/faculty.service"

function CrearNuevaAsignaturaModal(props){

  //Guarda los datos nuevos
  const [nombre, setNombre] = useState("")
  const [facultad, setFacultad] = useState(0)

  //Comprueba si los datos son validos
  const [nombreValido, setNombreValido] = useState(false)
  const [facultadValida, setFacultadValida] = useState(false)

  //Lista de universidades
  const [faculties, setFaculties] = useState([])

  //Desestructurando props
  const {updatechanges, ...others} = props

  const handleChanges = (tag, { target }) => {
    if (tag === "nombre")
    {
      setNombre(target.value)
      setNombreValido(target.value !== "" &&
        target.value.length <= 100)
    } else if (tag === "facultad") {
      setFacultad(target.value)
      setFacultadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("nombre", nombre)
    bodyFormData.append("facultad_idFacultad", facultad)

    subjectServices.createSubject(bodyFormData).then(() => {
      toast.success("Asignatura añadida")
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      toast.error(error)
    })
  }

  useEffect(() => {
    facultyServices.getFaculties().then(f => {
      setFaculties(f)
    })
  }, [])

  return (
    <>
      <Toaster/>
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-create-subject"
        centered
        onShow = {() => {
          setNombreValido(false)
          setFacultadValida(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-create-subject">
            Agregar Asignatura
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <FloatingLabel controlId="floatingTextCreateSubject" label="Nombre de la asignatura">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={(event) => { handleChanges("nombre", event) }}/>
              </FloatingLabel>
              <div style={{margin:"1em auto"}}></div>
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
              type='submit'
              variant='success'
              disabled={ !(nombreValido && facultadValida) }>
                Crear asignatura
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default CrearNuevaAsignaturaModal