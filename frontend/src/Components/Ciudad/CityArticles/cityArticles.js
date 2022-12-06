import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleServices from "../../../services/article.service";
import '../../Ciudades/ciudades.css';
import ArticleCard from "../../Articulos/articlecard";
import { Button } from "react-bootstrap";

function CityArticles() {
  const params = useParams();
  const [articulos, setArticulos] = useState([]);

  const createNewArticle = () => {
    console.log("nuevo");
  }

  useEffect(() => {
    articleServices.getArticlesByCityName(params.nombreCiudad).then(art => {
      setArticulos(art);
    });
  }, [params.nombreCiudad]);

  return (
    <section>
      <div style={{display:"flex", flexDirection: "row-reverse", marginTop:"1.5em", marginRight:"5em"}}>
        <Button
          variant="outline-success"
          onClick={createNewArticle}>
            Crear Artículo
        </Button>
      </div>
      <div className="cityContainer">
        {articulos.map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion}, id) =>  <ArticleCard key={id} id={idArticulo} titulo={titulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/>)}
      </div>
    </section>
  );
}

export default CityArticles;