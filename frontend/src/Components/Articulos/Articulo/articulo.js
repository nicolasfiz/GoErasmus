import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import articleServices from "../../../services/article.service"
import articleGalleryServices from "../../../services/articleGallery.service"
import authServices from "../../../services/auth.service"
import tokenServices from "../../../services/token.service"
import anonimo from "../../../assets/ImagenesUsers/anonimo.png"
import SubirComentarioArticulo from "./subirComentarioArticulo"
import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs"
import ComentariosArticulo from "./comentariosArticulo"
import "./articulo.css"

const ArticleHead = ({titulo, autor, imagenPerfil, fecha, esBorrador}) => {
  return (
    <>
      <section width={"100%"}>
        <i><p style={{fontSize: "16px"}} className="headerInformation"> {esBorrador === 'Si' ? "Borrador" : null}</p></i>
        <h1 style={{textAlign:"center", fontWeight:"bold", fontFamily:"Times New Roman", marginTop: "1em"}}>{titulo}</h1>
        <div className="headerInformation">
          {imagenPerfil ? <img className="profile" width={40} height={40} src={imagenPerfil} alt={`Imagen de perfil de ${autor}`}/> :
                          <img className="profile" width={40} height={40} src={anonimo} alt={`Imagen de perfil de ${autor}`}/>}
          {autor ?  <a className="articleName" href={`/perfil/${autor}`}>{autor}</a>:
                    <p className="articleName">Anónimo</p>}
        </div>
        <i>
          <p style = {{margin:"0.75em 5px 0.75em auto", fontSize:"12px"}} className="headerInformation">
            { fecha ? `Publicado el ${fecha}` : "No publicado" }
          </p>
        </i>
        <hr style={{width:"80%", margin: "1em 0 1em 10%"}}/>
      </section>
    </>
  )
}

const Paragraph = ({desc}) => {
  const paragraphs = desc.split(/\n+/)
  return (
    <>
      <section className="articleSection">
        {paragraphs.map((paragraph, id) => <p style={{fontSize:"18px", fontFamily: "Times New Roman"}} key={id}> {paragraph} </p>)}
      </section>
    </>
  )
}

function Articulo() {
  const params = useParams()
  const [articulo, setArticulo] = useState([])
  const [votados, setVotados] = useState([])
  const [gallery, setGallery] = useState([])
  const [subirComentarioModal, setsubirComentarioModal] = useState(false)
  const [tokenUserId, setTokenUserId] = useState([])
  const [isLiked, setIsLiked] = useState(false)

  const COMENTARIOS_POR_PAGINA = 6

  useEffect(() => {
    tokenServices.getToken().then(t => {
      authServices.getAccount(t).then(d =>{
        setTokenUserId(d.id)
      })
    })
    articleServices.getArticleById(params.id).then(art => {
      setArticulo(art)
    })
    articleGalleryServices.getArticleImagesByArticleId(params.id).then(gallery => {
      setGallery(gallery)
    })
  }, [params.id])

  const setImages = (articulo, gallery) => {
    let images = []
    articulo.forEach( ({urlCabecera}) => {images.push({original: urlCabecera, thumbnail: urlCabecera})})
    gallery.forEach( ({urlImagen}) => {images.push({original: urlImagen, thumbnail: urlImagen})})
    return images
  }

  return (
    <>
      <SubirComentarioArticulo
        show={subirComentarioModal}
        onHide={() => setsubirComentarioModal(false)}
        idusuario={tokenUserId}
        idarticulo={params.id}
      />
      <div
        style = {{
          margin: "5rem 15rem 5rem 15rem",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          borderRadius: "8px",
          backgroundColor: "white",
          padding: "2rem"
        }}
      >
        { articulo.map(({titulo, autor, urlFotoPerfil, fechaPublicacion, esBorrador}, id) => 
          <ArticleHead
            key             = {id}
            titulo          = {titulo}
            autor           = {autor}
            imagenPerfil    = {urlFotoPerfil}
            fecha           = {fechaPublicacion}
            esBorrador      = {esBorrador}
          />)}
        <article className  = "articleInformation">
          <ImageGallery
            items                 = {setImages(articulo, gallery)}
            slideInterval         = {5000}
            showPlayButton        = {false}
            showNav               = {false}
            showFullscreenButton  = {false}
            showBullets           = {true}
            autoPlay              = {true}
          />
          <div style={{ marginTop:"1em" }}></div>
          { articulo.map(({descripcion}, id) => 
            <Paragraph key={id} desc={descripcion} />
          )}
          <hr />
          <div>
            <Button
              style   = {{position: "inline-block"}}
              variant = "primary"
              onClick = {() => 
                setsubirComentarioModal(true)}>
                  Comentar
            </Button>
            {isLiked ? 
              <Button
                variant="danger"
                style={{position: "inline-block", float:"right"}}
                onClick={() => 
                  //articleServices.voteArticle().then(() => {setNumVotos++})
                  setIsLiked(false)
                }
              >
                Útil <BsFillHandThumbsUpFill/>
              </Button> :
              <Button
                variant="success"
                style={{position: "inline-block", float:"right"}}
                onClick={() => setIsLiked(true)}
              >
                Útil <BsHandThumbsUp/>
              </Button>}
          </div>
        </article>
      </div>
    </>)
}

export default Articulo
