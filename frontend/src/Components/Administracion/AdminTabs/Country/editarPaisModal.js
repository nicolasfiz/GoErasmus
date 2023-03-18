import { useState} from "react"
import { Button, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import countryServices from "../../../../services/country.service"

function EditarPaisModal(props){
  
  //Desestructurando props
  const {updatechanges, row, ...others} = props

  //Guarda los datos del país
  const [nombrePais, setNombrePais] = useState("")
  const [imagen, setImagen] = useState(null)
  
  //Comprueba si datos validos
  const [nombreValido, setNombreValido] = useState(true)
  const [imagenValida, setImagenValida] = useState(true)

  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  const handleNameChanges = ({ target }) => {
    setNombrePais(target.value)
    setNombreValido(target.value.length >= 4 && target.value.length <= 85)
  }

  const handleUrlChanges = ({target}) => {
    setImagen(target.files[0])
    if (target.files[0] !== undefined && target.files[0] !== null)
    {
      const subStr = target.files[0].name.substring(target.files[0].name.length - 4, target.files[0].name.length)
      setImagenValida(target.files[0].name !== "" && subStr === ".png")
    }
    else
      setImagenValida(true)
  }

  const toSave = (event) => {
    event.preventDefault()

    const bodyFormData = new FormData()

    if (nombrePais !== "")
      bodyFormData.append("nombre", nombrePais)
    else
      bodyFormData.append("nombre", row.nombre)

    if (imagen !== null && imagen !== undefined)
      bodyFormData.append("file", imagen)
    
    countryServices.updateCountry(row.id, bodyFormData).then(() => {
      handleButtonClick()
      props.updatechanges()
      props.onHide()
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      {ToastComponent("Cambios realizados con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-edit-country"
        centered
        onShow = {() => {
          setNombreValido(true)
          setImagenValida(true)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-edit-country">
            Editar País
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <Form.Label>Nombre del país</Form.Label>
              <Form.Control
                type="text"
                placeholder={row.nombre}
                onChange={handleNameChanges}/>
              <div style={{margin:"1em auto"}}></div>
              <Form.Group controlId="formEditFlagFile" className="mb-3">
                <Form.Label>Bandera en formato .png</Form.Label>
                <Form.Control type="file" onChange={handleUrlChanges}/>
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              variant='primary'
              disabled={ !(nombreValido && imagenValida) }>
                Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default EditarPaisModal