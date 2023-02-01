import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import toast, { Toaster } from "react-hot-toast"
import facultyServices from "../../../../services/faculty.service"
import universityServices from "../../../../services/university.service"

function CrearNuevaFacultadModal(props){

  //Guarda los datos nuevos
  const [nombre, setNombre] = useState("")
  const [universidad, setUniversidad] = useState(0)
  
  //Comprueba si los datos son validos
  const [nombreValido, setNombreValido] = useState(false)
  const [universidadValida, setUniversidadValida] = useState(false)

  //Lista de universidades
  const [universities, setUniversities] = useState([])

  //Desestructurando props
  const {updatechanges, ...others} = props

  const handleChanges = (tag, { target }) => {
    if (tag === "nombre")
    {
      setNombre(target.value)
      setNombreValido(target.value !== "" &&
        target.value.length >= 13 &&
        target.value.length <= 150)
    } else if (tag === "universidad") {
      setUniversidad(target.value)
      setUniversidadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("nombre", nombre)
    bodyFormData.append("universidad_idUniversidad", universidad)

    facultyServices.createFaculty(bodyFormData).then(() => {
        toast.success("Facultad añadida")
        props.updatechanges()
        props.onHide()
      }).catch(error => {
        toast.error(error)
      })
  }

  useEffect(() => {
    universityServices.getUniversities().then(u => {
      setUniversities(u)
    })
  }, [])

  return (
    <>
      <Toaster/>
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-create-faculty"
        centered
        onShow = {() => {
          setNombreValido(false)
          setUniversidadValida(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-create-faculty">
            Agregar Facultad
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <FloatingLabel controlId="floatingTextCreateFaculty" label="Nombre de la facultad">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={(event) => { handleChanges("nombre", event) }}/>
              </FloatingLabel>
              <div style={{margin:"1em auto"}}></div>
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
              type='submit'
              variant='success'
              disabled={ !(nombreValido && universidadValida) }>
                Crear facultad
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default CrearNuevaFacultadModal