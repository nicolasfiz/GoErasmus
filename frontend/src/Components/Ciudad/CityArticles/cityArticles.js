import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleServices from "../../../services/article.service";
import '../../Ciudades/ciudades.css';
import ArticleCard from "../../Articulos/articlecard";

function CityArticles() {
  const params = useParams();
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    articleServices.getArticlesByCityName(params.nombreCiudad).then(art => {
      setArticulos(art);
    });
  }, [params.nombreCiudad]);

  return (
    <main>
      <div className="cityContainer">
        {articulos.map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion}, id) =>  <ArticleCard key={id} id={idArticulo} titulo={titulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/>)}
      </div>
    </main>
  );
}

export default CityArticles;