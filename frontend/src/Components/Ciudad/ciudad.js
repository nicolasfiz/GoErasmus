import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Universidades from "../Universidades/universidades";
import CityArticles from "./CityArticles/cityArticles";
import cityServices from "../../services/city.service";
import articleServices from "../../services/article.service";
import cityGalleryServices from "../../services/cityGallery.service";
import "./ciudad.css";
import "../Ciudades/ciudades.css";

const Paragraph = ({text}) => {

  const paragraphs = text.split('\n');

  return (
    <>
      <section className="citySection">
        {paragraphs.map((paragraph, id) => <p key={id}> {paragraph} </p>)}
      </section>
    </>
  );
}

const Informacion = () => {

  const params = useParams();
  const [ciudad, setCiudad] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    cityServices.getCityByName(params.nombreCiudad).then(city => {
      setCiudad(city);
    })
  }, [params.nombreCiudad]);

  useEffect(() => {
    cityGalleryServices.getCityImagesByCityName(params.nombreCiudad).then(gallery => {
      setGallery(gallery);
    })
  }, [params.nombreCiudad]);

  const setImages = (ciudad, gallery) => {
    let images = [];
    ciudad.forEach( ({urlCabecera}) => {images.push({original: urlCabecera, thumbnail: urlCabecera})});
    gallery.forEach( ({org, thb}) => {images.push({original: org, thumbnail: thb})});
    return images;
  }

  return (
    <>
      <article className="cityInformation">
        <ImageGallery items={setImages(ciudad, gallery)} showPlayButton={false} showBullets={true} autoPlay={true} />
        {ciudad.map(({informacion}, id) => <Paragraph key={id} text={informacion} />)}
        <hr />
      </article>
    </>);
}

function Ciudad() {
  const params = useParams();
  const [numArticles, setNumArticles] = useState([]);

  useEffect(() => {
    articleServices.getCityArticlesLength(params.nombreCiudad).then(length => {
      setNumArticles(length);
    })
  }, [params.nombreCiudad]);

  let value;
  numArticles.forEach( ({length}) => {value |= length === 0});
  const isDisabled = value === 1;
  return (
  <main>
    <Tabs
      defaultActiveKey="informacion"
      id="informacion-universidades-articulos"
      className="mb-3"
      fill
    >
      <Tab eventKey="informacion" title="Información">
        <Informacion />
      </Tab>
      <Tab eventKey="universidades" title="Universidades">
        <Universidades />
      </Tab>
      <Tab eventKey="articulos" title="Artículos" disabled={isDisabled}>
        <CityArticles />
      </Tab>
    </Tabs>
  </main>
  )
}

export default Ciudad;