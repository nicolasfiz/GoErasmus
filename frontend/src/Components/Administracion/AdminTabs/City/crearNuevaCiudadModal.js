import { useEffect, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import ToastComponent from "../../toast"
import cityServices from "../../../../services/city.service"
import cityGalleryServices from "../../../../services/cityGallery.service"
import countryServices from "../../../../services/country.service"

function CrearNuevaCiudadModal(props){

  //Guarda los datos nuevos
  const [nombre, setNombre] = useState("")
  const [cabecera, setCabecera] = useState(null)
  const [input, setInput] = useState("")
  const [galeria, setGaleria] = useState([])
  const [pais, setPais] = useState(0)
  
  //Comprueba si los datos son validos
  const [nombreValido, setNombreValido] = useState(false)
  const [cabeceraValida, setCabeceraValida] = useState(false)
  const [inputValido, setInputValido] = useState(false)
  const [galeriaValida, setGaleriaValida] = useState(true)
  const [paisValido, setPaisValido] = useState(false)

  //Lista de universidades
  const [countries, setCountries] = useState([])

  //Desestructurando props
  const {updatechanges, ...others} = props

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
    if (tag === "nombre")
    {
      setNombre(target.value)
      setNombreValido(target.value !== "" &&
        target.value.length > 0 &&
        target.value.length <= 100)
    } else if (tag === "pais") {
      setPais(target.value)
      setPaisValido(target.value > 0)
    } else if (tag === "input") {
      setInput(target.value)
      setInputValido(target.value !== "" &&
        target.value.length >= 5000)
    } else if (tag === "cabecera") {
      setCabecera(target.files[0])
      if (target.files[0] !== undefined)
      {
        const subStr = target.files[0].name.substring(
          target.files[0].name.length - 4,
          target.files[0].name.length)
        setCabeceraValida( target.files[0] !== null &&
        target.files[0].name !== "" && (subStr === ".png" || subStr === ".jpg"))
      }
      else
        setCabeceraValida(false)
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
    bodyFormData.append("nombre", nombre)
    bodyFormData.append("pais_idPais", pais)
    bodyFormData.append("informacion", input)
    bodyFormData.append("file", cabecera)

    cityServices.createCity(bodyFormData).then(([{idCiudad}]) => {
        if (galeria.length !== 0) {
          const galleryFormData = new FormData()
          galeria.forEach((file, i) => {
            galleryFormData.append(`file${i}`, file, file.name)
          })
          cityGalleryServices.insertCityImages(idCiudad, galleryFormData).then(() => {
            props.updatechanges()
            props.onHide()
            handleButtonClick()
          }).catch(error => {
            cityServices.deleteCity(idCiudad).then(() => {
              console.log(error)
            }).catch(error => {
              console.log(error)
            })
          })
        } else {
          props.updatechanges()
          props.onHide()
          handleButtonClick()
        }
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    countryServices.getCountries().then(c => {
      setCountries(c)
    })
  }, [])

  return (
    <>
      {ToastComponent("Ciudad creada con éxito", showToast, handleToastClose)}
      <Modal
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter-create-city"
        centered
        onShow = {() => {
          setNombreValido(false)
          setPaisValido(false)
          setInputValido(false)
          setCabeceraValida(false)
          setGaleriaValida(true)
          setGaleria([])
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter-create-city">
            Agregar Ciudad
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={toSave}>
          <Modal.Body>
            <div>
              <FloatingLabel controlId="floatingTextCreateCity" label="Nombre de la ciudad">
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  onChange={(event) => { handleChanges("nombre", event) }}/>
              </FloatingLabel>
              <div style={{margin:"1em auto"}}></div>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona un país</Form.Label>
                <Form.Select defaultValue={0} onChange = { (event) => handleChanges("pais", event)}>
                  <option></option>
                  {countries && countries.length !== 0 ? 
                    countries.map(({ idPais, nombrePais }, id) =>
                      <option key={id} value={idPais}> { nombrePais } </option>) : null}
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formHeaderImg" className="mb-3">
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
              <FloatingLabel controlId="floatingTextCreateCity" label="Información sobre la ciudad">
                <Form.Control
                  as="textarea"
                  style={{height: '300px'}}
                  placeholder="Información sobre la ciudad"
                  value={input}
                  onChange={(event) => handleChanges("input", event)}
                />
              </FloatingLabel>
              <p style={{fontSize:"13px" }}>Si no sabes sobre lenguaje de marcado, pulsa <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://www.markdowntutorial.com/es/">aquí</a></p> 
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              variant='success'
              disabled={ !(nombreValido && paisValido && cabeceraValida && inputValido && galeriaValida) }>
                Crear ciudad
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>)
}

export default CrearNuevaCiudadModal