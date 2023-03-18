import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import countryServices from "../../../../services/country.service"

function CrearNuevoPaisModal(props){
  
  //Guarda el nombre del país
  const [nombrePais, setNombrePais] = useState("")

  //Guarda el fichero de la imagen
  const [imagen, setImagen] = useState(null)
  
  //Comprueba si es valido el nombre del pais
  const [nombreValido, setNombreValido] = useState(false)

  //Comprueba si son válida la imagen
  const [imagenValida, setImagenValida] = useState(false)

  //Desestructurando props
  const {updatechanges, ...others} = props

  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  const handleNameChanges = ({ target }) => {
    setNombrePais(target.value)
    setNombreValido(target.value !== "" && target.value.length >= 4 && target.value.length <= 85)
    
  }

  const handleUrlChanges = ({target}) => {
    setImagen(target.files[0])
    if (target.files[0] !== undefined)
    {
      const subStr = target.files[0].name.substring(target.files[0].name.length - 4, target.files[0].name.length)
      setImagenValida(target.files[0].name !== "" && subStr === ".png")
    }
    else
      setImagenValida(false)
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append("nombre", nombrePais)
    bodyFormData.append("file", imagen)

    countryServices.createCountry(bodyFormData).then(() => {
        handleButtonClick()
        props.updatechanges()
        props.onHide()
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      {ToastComponent("País creado con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-create-country"
        centered
        onShow = {() => {
          setNombreValido(false)
          setImagenValida(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-create-country">
            Agregar País
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <FloatingLabel controlId="floatingTextCreateCountry" label="Nombre del país">
                <Form.Control
                  type="text"
                  placeholder="Nombre del país"
                  onChange={handleNameChanges}/>
              </FloatingLabel>
              <div style={{margin:"1em auto"}}></div>
              <Form.Group controlId="formFlagFile" className="mb-3">
                <Form.Label>Bandera en formato .png</Form.Label>
                <Form.Control type="file" onChange={handleUrlChanges}/>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              variant='success'
              disabled={!(nombreValido && imagenValida)}>
                Crear país
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default CrearNuevoPaisModal