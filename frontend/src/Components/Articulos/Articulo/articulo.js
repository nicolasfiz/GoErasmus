import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import articleServices from "../../../services/article.service";
import articleGalleryServices from "../../../services/articleGallery.service";
import authServices from "../../../services/auth.service";
import tokenServices from "../../../services/token.service";
import anonimo from "../../../assets/ImagenesUsers/anonimo.png";
import SubirComentarioArticulo from "./subirComentarioArticulo";
//import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs";
//import ComentariosArticulo from "./comentariosArticulo";
import "./articulo.css";

const ArticleHead = ({titulo, autor, imagenPerfil, fecha}) => {
  //const [isLike, setIsLike] = useState(false);
  return (
    <>
      <section width={"100%"}>
        <h1 style={{textAlign:"center", fontWeight:"bold", fontFamily:"Times New Roman", marginTop: "1.5em"}}>{titulo}</h1>
        <div className="headerInformation">
          {imagenPerfil ? <img className="profile" width={40} height={40} src={imagenPerfil} alt={`Imagen de perfil de ${autor}`}/> :
                          <img className="profile" width={40} height={40} src={anonimo} alt={`Imagen de perfil de ${autor}`}/>}
          {autor ?  <a className="articleName" href={`/perfil/${autor}`}>{autor}</a>:
                    <p className="articleName">Anónimo</p>}
        </div>
        <i><p style={{margin:"0.75em 5px 0.75em auto", fontSize:"12px"}} className="headerInformation">Publicado el {fecha}</p></i>
        <hr style={{width:"60%", margin: "0.5em auto 0 40%"}}/>
        {/*{isLike ? (
          <span className="btn-position">
            <BsFillHandThumbsUpFill />
          </span>) :
          (<span className="btn-position">
            <BsHandThumbsUp />
          </span>)
        }*/}
      </section>
    </>
  );
}

const Paragraph = ({desc}) => {
  const paragraphs = desc.split(/\n+/);
  return (
    <>
      <section className="articleSection">
        {paragraphs.map((paragraph, id) => <p style={{fontSize:"18px", fontFamily: "Times New Roman"}} key={id}> {paragraph} </p>)}
      </section>
    </>
  );
}

function Articulo() {
  const params = useParams();
  const [articulo, setArticulo] = useState([]);
  //const [votados, setVotados] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [subirComentarioModal, setsubirComentarioModal] = useState(false);
  const [tokenUserId, setTokenUserId] = useState([]);

  //const COMENTARIOS_POR_PAGINA = 6;

  useEffect(() => {
    tokenServices.getToken().then(t => {
      authServices.getAccount(t).then(d =>{
        setTokenUserId(d.id);
      });
    });
    articleServices.getArticleById(params.id).then(art => {
      setArticulo(art);
    });
    articleGalleryServices.getArticleImagesByArticleId(params.id).then(gallery => {
      setGallery(gallery);
    });
  }, [params.id]);

  const setImages = (articulo, gallery) => {
    let images = [];
    articulo.forEach( ({urlCabecera}) => {images.push({original: urlCabecera, thumbnail: urlCabecera})});
    gallery.forEach( ({urlImagen}) => {images.push({original: urlImagen, thumbnail: urlImagen})});
    return images;
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
        style={{
          margin: "10rem 20rem 10rem 20rem",
          boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
          borderRadius: "8px",
          backgroundColor: "white",
          padding: "2rem"
        }}
      >
        {articulo.map( ({titulo, autor, urlFotoPerfil, fechaPublicacion}, id) => <ArticleHead key={id} titulo={titulo} autor={autor} imagenPerfil={urlFotoPerfil} fecha={fechaPublicacion}/>)}
        <article className="articleInformation">
          <ImageGallery items={setImages(articulo, gallery)} showPlayButton={false} showBullets={true} autoPlay={true} />
          <div style={{marginTop:"3em"}}></div>
          {articulo.map(({descripcion}, id) => <Paragraph key={id} desc={descripcion} />)}
          <hr />
          <div>
            <Button variant="primary" onClick={() => setsubirComentarioModal(true)}>Comentar</Button>
          </div>
        </article>
        
      </div>
    </>);
}

export default Articulo;
