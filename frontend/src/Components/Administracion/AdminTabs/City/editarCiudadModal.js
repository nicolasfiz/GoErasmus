import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import cityServices from "../../../../services/city.service"
import cityGalleryServices from "../../../../services/cityGallery.service"
import countryServices from "../../../../services/country.service"

function EditarCiudadModal(props){
//Desestructurando props
const {updatechanges, row, ...others} = props

//Guarda los valores del modal
const [nombre, setNombre] = useState("")
const [cabecera, setCabecera] = useState(null)
const [texto, setTexto] = useState(row.texto)
const [galeria, setGaleria] = useState([])
const [pais, setPais] = useState(0)

//Comprueba si son validos los datos
const [nombreValido, setNombreValido] = useState(true)
const [cabeceraValida, setCabeceraValida] = useState(true)
const [textoValido, setTextoValido] = useState(true)
const [galeriaValida, setGaleriaValida] = useState(true)
const [paisValido, setPaisValido] = useState(true)

// Lista de paises
const [countries, setCountries] = useState([])

const [showToast, setShowToast] = useState(false)

const handleUploadFiles = files => {
  const uploaded = []
  files.forEach(file => {
    if (uploaded.findIndex((f) => f.name === file.name) === -1)
        uploaded.push(file)
  })
  setGaleria(uploaded)
}

const handleButtonClick = () => {
  setShowToast(true)
}

const handleToastClose = () => {
  setShowToast(false)
}

const handleChanges = (tag, { target }) => {
  if (tag === "nombre"){
    setNombre(target.value)
    setNombreValido(target.value.length > 0 && target.value.length <= 100)
  } else if (tag === "cabecera"){
    setCabecera(target.files[0])
    if (target.files[0] !== undefined && target.files[0] !== null)
    {
      const subStr = target.files[0].name.substring(
        target.files[0].name.length - 4, target.files[0].name.length)
      setCabeceraValida(target.files[0].name !== "" && (subStr === ".png" || subStr === ".jpg"))
    }
    else
      setCabeceraValida(true)
  } else if (tag === "pais") {
    setPais(target.value)
    setPaisValido(target.value > 0)
  } else if (tag === "texto") {
    setTexto(target.value)
    setTextoValido(target.value !== "" && target.value.length >= 5000)
  } else if (tag === "galeria") {
    const archivosSeleccionados = Array.prototype.slice.call(target.files)
    handleUploadFiles(archivosSeleccionados)
    let valid = true
    archivosSeleccionados.forEach(img => {
      const subStr = img.name.substring(img.name.length - 4, img.name.length)
      valid &&= subStr === ".png" || subStr === ".jpg"
    })
    setGaleriaValida(valid)
  }
}

const toSave = (event) => {
  event.preventDefault()

  const bodyFormData = new FormData()

  if (nombre !== "")
    bodyFormData.append("nombre", nombre)
  else
    bodyFormData.append("nombre", row.nombre)

  if (cabecera !== null && cabecera !== undefined)
    bodyFormData.append("file", cabecera)
  
  if (texto !== "" && texto.length !== 0)
    bodyFormData.append("informacion", texto)
  else
    bodyFormData.append("informacion", row.texto)
  
  bodyFormData.append("pais_idPais", pais)

  cityServices.updateCity(row.id, bodyFormData).then(() => {
    if (galeria.length !== 0) { //HACERLO MEJOR
      const galleryFormData = new FormData()
      galeria.forEach((file, i) => {
        galleryFormData.append(`file${i}`, file, file.name)
      })
      
      cityGalleryServices.deleteCityImages(row.id).then(() => {
        cityGalleryServices.insertCityImages(row.id, galleryFormData).then(() => {
          handleButtonClick()
          props.updatechanges()
          props.onHide()
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    } else {
      handleButtonClick()
      props.updatechanges()
      props.onHide()
    }
  }).catch(error => {
    console.log(error)
  })
}

useEffect(() => {
  countryServices.getCountries().then(p => {
    setCountries(p)
  })
}, [])

return (
  <>
    {ToastComponent("Cambios realizados con éxito", showToast, handleToastClose)}
    <Modal
      {...others}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter-edit-city"
      centered
      onShow = {() => {
        setNombreValido(true)
        setCabeceraValida(true)
        setTextoValido(true)
        setPaisValido(true)
        setGaleriaValida(true)
        setGaleria([]) //Valor por defecto -> lo que habia antes de la edicion
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter-edit-city">
          Editar Ciudad
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={toSave}>
        <Modal.Body>
          <div>
            <Form.Label>Nombre de la ciudad</Form.Label>
            <Form.Control
              type="text"
              placeholder={row.nombre}
              onChange={ (event) => handleChanges("nombre", event) }
            />
            <div style={{ margin:"1em auto" }}></div>
            <Form.Group controlId="formHeaderFile" className="mb-3">
              <Form.Label>Imagen de cabecera en formato .png o .jpg</Form.Label>
              <Form.Control type="file" onChange={ (event) => handleChanges("cabecera", event)}/>
            </Form.Group>
            <Form.Group controlId="formGalleryImg" className="mb-3">
              <Form.Label>Imágenes de galería en formato .png o .jpg (opcional)</Form.Label>
              <Form.Control type="file" multiple onChange={ (event) => handleChanges("galeria", event)}/>
              <div className="ml-3">
                { galeria.length !== 0 ? 
                  galeria.map((file, id) => (
                    <div className="mt-2" style={{fontSize: "13px"}} key={id}> <li> <i>{ file.name }</i> </li> </div>
                  )) : null
                }
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Selecciona un país</Form.Label>
              <Form.Select defaultValue={0} onChange = { (event) => handleChanges("pais", event)}>
                <option></option>
                {countries && countries.length !== 0 ? 
                  countries.map(({ idPais, nombrePais }, id) =>
                    <option key={id} value={idPais}> { nombrePais } </option>) : null}
              </Form.Select>
            </Form.Group>
            <Form.Label>Información</Form.Label>
            <Form.Control
              as="textarea"
              style={{height: '300px'}}
              value={texto}
              onChange={(event) => handleChanges("texto", event)}
            />
            <p style={{fontSize:"13px" }}>Si no sabes sobre lenguaje de marcado, pulsa <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://www.markdowntutorial.com/es/">aquí</a></p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type     = 'submit'
            variant  = 'primary'
            disabled = { !(nombreValido && cabeceraValida && textoValido && paisValido && galeriaValida) }>
              Guardar cambios
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  </>)
}

export default EditarCiudadModal