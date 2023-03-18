import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import universityServices from "../../../../services/university.service"
import cityServices from "../../../../services/city.service"

function CrearNuevaUniversidadModal(props){
      
  //Guarda los valores del modal
  const [nombre, setNombre] = useState("")
  const [logotipo, setLogotipo] = useState(null)
  const [ciudad, setCiudad] = useState(0)
  
  //Comprueba si son validos los datos
  const [nombreValido, setNombreValido] = useState(false)
  const [logotipoValido, setLogotipoValido] = useState(false)
  const [ciudadValida, setCiudadValida] = useState(false)

  // Lista de ciudades
  const [cities, setCities] = useState([])

  //Desestructurando props
  const {updatechanges, ...others} = props

  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  const handleChanges = (tag, { target }) => {
    if (tag === "nombre"){
      setNombre(target.value)
      setNombreValido(target.value !== "" &&
      target.value.length >= 16 && target.value.length <= 150)
    } else if (tag === "logo"){
      setLogotipo(target.files[0])
      if (target.files[0] !== undefined)
      {
        const subStr = target.files[0].name.substring(
          target.files[0].name.length - 4,
          target.files[0].name.length)
        setLogotipoValido( target.files[0] !== null &&
        target.files[0].name !== "" && subStr === ".png")
      }
      else
        setLogotipoValido(false)
    } else if (tag === "ciudad") {
      setCiudad(target.value)
      setCiudadValida(target.value > 0)
    }
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("nombre", nombre)
    bodyFormData.append("file", logotipo)
    bodyFormData.append("ciudad_idCiudad", ciudad)

    universityServices.createUniversity(bodyFormData).then(() => {
      handleButtonClick()
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    cityServices.getAllCities().then(c => {
      setCities(c)
    })
  }, [])

  return (
    <>
      {ToastComponent("Universidad creada con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-create-university"
        centered
        onShow = {() => {
          setNombreValido(false)
          setLogotipoValido(false)
          setCiudadValida(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-create-university">
            Agregar Universidad
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <FloatingLabel controlId="floatingTextCreateUniversity" label="Nombre de la Universidad">
                <Form.Control
                  type="text"
                  placeholder="Nombre universidad"
                  onChange={ (event) => handleChanges("nombre", event) }/>
              </FloatingLabel>
              <div style={{margin:"1em auto"}}></div>
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
              variant  = 'success'
              disabled = { !(nombreValido && logotipoValido && ciudadValida) }>
                Crear universidad
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}
export default CrearNuevaUniversidadModal