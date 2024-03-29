import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import asignaturaServices from "../../../services/asignatura.service"
import articleServices from "../../../services/article.service"
import articleGalleryServices from "../../../services/articleGallery.service"
import authServices from "../../../services/auth.service"
import tokenServices from "../../../services/token.service"
import anonimo from "../../../assets/ImagenesUsers/anonimo.png"
import SubirComentarioArticulo from "./subirComentarioArticulo"
import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs"
import ComentariosArticulo from "./comentariosArticulo"
import "./articulo.css"
import { toast, Toaster } from "react-hot-toast"
import ReactMarkdown from "react-markdown"

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

function Articulo() {

  const params = useParams()
  const [articulo, setArticulo] = useState([])
  const [votados, setVotados] = useState([])
  const [gallery, setGallery] = useState([])
  const [subirComentarioModal, setsubirComentarioModal] = useState(false)
  const [tokenUserId, setTokenUserId] = useState([])
  const [votos, setVotos] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const COMENTARIOS_POR_PAGINA = 6

  useEffect(() => {
    tokenServices.getToken().then(t => {
      authServices.getAccount(t).then(d =>{
        setTokenUserId(d.id)
      })
    })
  }, [])

  useEffect(() => {
    articleServices.getArticleById(params.id).then(art => {
      setArticulo(art)
    })
    articleGalleryServices.getArticleImagesByArticleId(params.id).then(gallery => {
      setGallery(gallery)
    })
    articleServices.getArticleLikesById(params.id).then( ([{mg}]) => {
      setVotos(mg)
    })
  }, [params.id])

  useEffect(() => {
    asignaturaServices.getVotacionUsuarios(tokenUserId).then(r => {
      setVotados(r)
    })
  }, [tokenUserId])

  const setImages = (articulo, gallery) => {
    let images = []
    articulo.forEach( ({urlCabecera}) => {images.push({original: urlCabecera, thumbnail: urlCabecera})})
    gallery.forEach( ({urlImagen}) => {images.push({original: urlImagen, thumbnail: urlImagen})})
    return images
  }

  const voteArticle = (idUsuario) => {
    articleServices.voteArticle(idUsuario, parseInt(params.id)).then( () => {
      setIsLiked(true)
      setVotos(votos + 1)
    })
  }

  const deleteVoteArticle = (idUsuario) => {
    articleServices.deleteVoteArticle(idUsuario, parseInt(params.id)).then(() => {
      setIsLiked(false)
      setVotos(votos - 1)
    })
  }

  return (
    <>
      <Toaster />
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
          { articulo.map(({descripcion}, id) => <div key={id} style={{textAlign: "justify"}}><ReactMarkdown children={descripcion} /></div>)}
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
                onClick = { () => {deleteVoteArticle(tokenUserId)}}
              >
                {votos} <BsFillHandThumbsUpFill/>
              </Button> :
              <Button
                variant="success"
                style={{position: "inline-block", float:"right"}}
                onClick={() => {
                    if (tokenUserId !== articulo[0].idAutor)
                      voteArticle(tokenUserId)
                    else
                      toast.error("¡No puedes votarte a tí mismo!")
                  } 
                }
              >
                {votos} <BsHandThumbsUp/>
              </Button>}
          </div>
        </article>
        <ComentariosArticulo itemsPerPage={COMENTARIOS_POR_PAGINA} idArticulo={params.id} idUsuario={tokenUserId} votados={votados} />
      </div>
    </>)
}

export default Articulo