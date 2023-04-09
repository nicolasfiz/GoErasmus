import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import cityServices from "../../services/city.service"
import articleServices from "../../services/article.service"
import articleGalleryServices from "../../services/articleGallery.service"
import { Toaster, toast } from "react-hot-toast"
import "./articulos.css"
import { useLocation, useNavigate } from "react-router-dom"

function CrearArticulo({ userid}) {

  const nav = useNavigate()
  const cityId = useLocation().state.cityId
  const [cityName, setCityName] = useState("")

  const [titulo, setTitulo] = useState("")
  const [cabecera, setCabecera] = useState(null)
  const [texto, setTexto] = useState("")
  const [galeria, setGaleria] = useState([])
  const [ciudad, setCiudad] = useState(cityId)

  const [tituloValido, setTituloValido] = useState(false)
  const [cabeceraValida, setCabeceraValida] = useState(false)
  const [textoValido, setTextoValido] = useState(false)
  const [galeriaValida, setGaleriaValida] = useState(true)
  const [ciudadValida, setCiudadValida] = useState(false)

  const [cities, setCities] = useState([])

  const handleUploadFiles = files => {
    const uploaded = []
    files.forEach(file => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1)
          uploaded.push(file)
    })
    setGaleria(uploaded)
  }

  const handleChanges = (tag, { target }) => {
    if (tag === "titulo")
    {
      setTitulo(target.value)
      setTituloValido(target.value !== "" &&
        target.value.length > 0 &&
        target.value.length <= 100)
    } else if (tag === "ciudad") {
      setCiudad(target.value)
      setCiudadValida(target.value > 0)
    } else if (tag === "texto") {
      setTexto(target.value)
      setTextoValido(target.value !== "" &&
        target.value.length >= 3000)
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
    bodyFormData.append("titulo", titulo)
    bodyFormData.append("ciudad_idCiudad", ciudad)
    bodyFormData.append("usuario_idUsuario", userid)
    bodyFormData.append("descripcion", texto)
    bodyFormData.append("file", cabecera)

    articleServices.createDraftArticle(bodyFormData).then(([{idArticulo}]) => {
        if (galeria.length !== 0)
        {
          const galleryFormData = new FormData()
          galeria.forEach((file, i) => {
            galleryFormData.append(`file${i}`, file, file.name)
          })

          articleGalleryServices.insertArticleImages(idArticulo, galleryFormData).then(() => {
            toast.success("Borrador enviado")
          }).catch(error => {
            articleServices.deleteArticle(idArticulo).then(() => {
              toast.error("Algo inesperado ocurrió")
              console.log(error)
            }).catch(error => {
              toast.error("Algo inesperado ocurrió")
              console.log(error)
            })
          })
        }
        else
          toast.success("Borrador enviado")
      }).catch(error => {
        console.log(error)
        toast.error("Ha ocurrido algo inesperado")
      })
  }

  useEffect(() => {
    cityServices.getAllCities().then(c => {
      setCities(c)
    })
  }, [])

  useEffect(() => {
    if (cityId !== -1)
    {
      cityServices.getNameByCityId(cityId).then(name => {
        setCityName(name[0].nombreCiudad)
      })
    }
  }, [cityId])

  return (
    <>
      <Toaster/>
      <div
        style = {{
          margin: "5rem 15rem 5rem 15rem",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          borderRadius: "8px",
          backgroundColor: "white",
          padding: "2rem"
        }}
      >
        <h1 className="formTitle">Agregar borrador de artículo</h1>
        <hr style={{width:"100%"}} />
        <form onSubmit={toSave}>
          <div>
            <div className="formSection">
              <h4>Título</h4>
              <Form.Control
                type="text"
                onChange={(event) => { handleChanges("titulo", event) }}
              />
            </div>
            <div className="formSection">
              <h4>Imagen de cabecera en formato .png o .jpg</h4>
              <Form.Control type="file" onChange={ (event) => handleChanges("cabecera", event)}/>
            </div>
            <div className="formSection">
              <h4>Imágenes de galería en formato .png o .jpg (opcional)</h4>
              <Form.Control type="file" multiple onChange={ (event) => handleChanges("galeria", event)}/>
              <div className="ml-3">
                { galeria.length !== 0 ? 
                  galeria.map((file, id) => (
                    <div className="mt-2" style={{fontSize: "13px"}} key={id}> <li> <i>{ file.name }</i> </li> </div>
                  )) : null
                }
              </div>
            </div>
            <div className="formSection">
              <h4>Ciudad</h4>
              <Form.Select defaultValue={0} disabled={cityId !== -1} onChange = { (event) => handleChanges("ciudad", event)}>
                {cityId === -1 ? 
                  <>
                    <option></option>
                    {cities && cities.length !== 0 ? 
                      cities.map(({ idCiudad, nombreCiudad }, id) =>
                        <option key={id} value={idCiudad}> { nombreCiudad } </option>) : null}
                  </> : <option value={cityId}>{cityName}</option>
                }
              </Form.Select>
            </div>
            <div className="formSection">
              <h4>Contenido</h4>
              <Form.Control
                as="textarea"
                style={{height: '500px'}}
                placeholder="Escribe aquí el cuerpo del artículo"
                value={texto}
                onChange={(event) => handleChanges("texto", event)}
              />
            </div>
            <p style={{fontSize:"13px" }}>Si no sabes sobre lenguaje de marcado, pulsa <a style={{textDecoration: "none"}} target="_blank" rel="noreferrer" href="https://www.markdowntutorial.com/es/">aquí</a></p>
          </div>
          <div className="formFooter">
            <div className="spacer"></div>
            <Button
              className="buttonForm"
              variant='secondary'
              onClick={() => nav('/articulos')}
            >
              Cancelar
            </Button>
            <Button
              className="buttonForm"
              type='submit'
              variant='success'
              disabled={ !(tituloValido && ciudadValida && cabeceraValida && textoValido && galeriaValida) }>
                Enviar borrador
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CrearArticulo