import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import articleServices from "../../../services/article.service";
import articleGalleryServices from "../../../services/articleGallery.service";
import "./articulo.css";

const Paragraph = ({desc}) => {
  const paragraphs = desc.split(/\n+/);
  return (
    <>
      <section className="articleSection">
        {paragraphs.map((paragraph, id) => <p key={id}> {paragraph} </p>)}
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
        <h2>Aqui va el titulo</h2>
        <p>Faltan poner el autor y la fecha publicacion</p>
        <hr />
        <ImageGallery items={setImages(articulo, gallery)} showPlayButton={false} showBullets={true} autoPlay={true} />
        {articulo.map(({descripcion}, id) => <Paragraph key={id} desc={descripcion} />)}
        <hr />
      </article>
    </>);
}

export default Articulo;
