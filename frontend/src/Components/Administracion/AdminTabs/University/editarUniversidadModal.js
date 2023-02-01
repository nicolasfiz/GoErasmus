import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import toast, { Toaster } from "react-hot-toast"
import universityServices from "../../../../services/university.service"
import cityServices from "../../../../services/city.service"

function EditarUniversidadModal(props){
  
  //Desestructurando props
  const {updatechanges, row, ...others} = props

  //Guarda los valores del modal
  const [nombre, setNombre] = useState("")
  const [logotipo, setLogotipo] = useState(null)
  const [ciudad, setCiudad] = useState(0)
  
  //Comprueba si son validos los datos
  const [nombreValido, setNombreValido] = useState(true)
  const [logotipoValido, setLogotipoValido] = useState(true)
  const [ciudadValida, setCiudadValida] = useState(true)

  // Lista de ciudades
  const [cities, setCities] = useState([])

  const handleChanges = (tag, { target }) => {
    if (tag === "nombre"){
      setNombre(target.value)
      setNombreValido(target.value.length >= 16 && target.value.length <= 150)
    } else if (tag === "logo"){
      setLogotipo(target.files[0])
      if (target.files[0] !== undefined && target.files[0] !== null)
      {
        const subStr = target.files[0].name.substring(
          target.files[0].name.length - 4, target.files[0].name.length)
        setLogotipoValido(target.files[0].name !== "" && subStr === ".png")
      }
      else
        setLogotipoValido(true)
    } else if (tag === "ciudad") {
      setCiudad(target.value)
      setCiudadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()

    if (nombre !== "")
      bodyFormData.append("nombre", nombre)
    else
    bodyFormData.append("nombre", row.nombre)

    if (logotipo !== null && logotipo !== undefined)
      bodyFormData.append("file", logotipo)
      
    bodyFormData.append("ciudad_idCiudad", ciudad)

    universityServices.updateUniversity(row.id, bodyFormData).then(() => {
      toast.success("Datos actualizados")
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      toast.error(error)
    })
  }

  useEffect(() => {
    cityServices.getAllCities().then(c => {
      setCities(c)
    })
  }, [])

  return (
    <>
      <Toaster/>
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-edit-university"
        centered
        onShow = {() => {
          setNombreValido(true)
          setLogotipoValido(true)
          setCiudadValida(true)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-edit-university">
            Editar Universidad
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <Form.Label>Nombre de la universidad</Form.Label>
              <Form.Control
                type="text"
                placeholder={row.nombre}
                onChange={ (event) => handleChanges("nombre", event) }
              />
              <div style={{ margin:"1em auto" }}></div>
              <Form.Group controlId="formLogoFile" className="mb-3">
                <Form.Label>Logotipo en formato .png</Form.Label>
                <Form.Control type="file" onChange={ (event) => handleChanges("logo", event)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona una ciudad</Form.Label>
                <Form.Select defaultValue={0} onChange = { (event) => handleChanges("ciudad", event)}>
                  <option></option>
                  {cities && cities.length !== 0 ? 
                    cities.map(({ idCiudad, nombreCiudad }, id) =>
                      <option key={id} value={idCiudad}> { nombreCiudad } </option>) : null}
                </Form.Select>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type     = 'submit'
              variant  = 'primary'
              disabled = { !(nombreValido && logotipoValido && ciudadValida) }>
                Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default EditarUniversidadModal