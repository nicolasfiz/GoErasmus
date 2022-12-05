import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import articleServices from "../../../services/article.service";
import articleGalleryServices from "../../../services/articleGallery.service";
import anonimo from "../../../assets/ImagenesUsers/anonimo.png";
import "./articulo.css";

const ArticleHead = ({titulo, autor, imagenPerfil, fecha}) => {
  
  return (
    <>
      <section>
        <h1 style={{textAlign:"center", fontWeight:"bold", fontFamily:"Times New Roman", marginTop: "1.5em"}}>{titulo}</h1>
        <div className="headerInformation">
          {imagenPerfil ? <img className="profile" width={40} height={40} src={imagenPerfil} alt={`Imagen de perfil de ${autor}`}/> :
                          <img className="profile" width={40} height={40} src={anonimo} alt={`Imagen de perfil de ${autor}`}/>}
          {autor ?  <a className="articleName" href={`/perfil/${autor}`}>{autor}</a>:
                    <p className="articleName">Anónimo</p>}
        </div>
        <i><p style={{marginTop:"0.75em", marginRight:"5px",fontSize:"12px"}} className="headerInformation">Publicado el {fecha}</p></i>
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
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    articleServices.getArticleById(params.id).then(art => {
      setArticulo(art);
    })
  }, [params.id]);

  useEffect(() => {
    articleGalleryServices.getArticleImagesByArticleId(params.id).then(gallery => {
      setGallery(gallery);
    })
  }, [params.id]);

  const setImages = (articulo, gallery) => {
    let images = [];
    articulo.forEach( ({urlCabecera}) => {images.push({original: urlCabecera, thumbnail: urlCabecera})});
    gallery.forEach( ({urlImagen}) => {images.push({original: urlImagen, thumbnail: urlImagen})});
    return images;
  }

  return (
    <>
      <article className="articleInformation">
        {articulo.map( ({titulo, autor, urlFotoPerfil, fechaPublicacion}, id) => <ArticleHead key={id} titulo={titulo} autor={autor} imagenPerfil={urlFotoPerfil} fecha={fechaPublicacion}/>)}
        <hr style={{width:"40%", marginLeft: "30%", marginTop:"0.5em"}}/>
        <ImageGallery items={setImages(articulo, gallery)} showPlayButton={false} showBullets={true} autoPlay={true} />
        <div style={{marginTop:"3em"}}></div>
        {articulo.map(({descripcion}, id) => <Paragraph key={id} desc={descripcion} />)}
        <hr />
      </article>
    </>);
}

export default Articulo;
