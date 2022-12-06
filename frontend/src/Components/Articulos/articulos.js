import { useEffect, useState } from "react";
import ArticleCard from "./articlecard";
import articleServices from "../../services/article.service";
import "./articulos.css"
import { Button } from "react-bootstrap";

function Articulos() {

  const [articulos, setArticulos] = useState([]);

  const createNewArticle = () => {
    console.log("nuevo");
  }

  useEffect(() => {
    articleServices.getArticles().then(art => {
      setArticulos(art);
    });
  }, []);

  return (
    <section>
      <div style={{display:"flex", flexDirection: "row-reverse", marginTop:"1.5em", marginRight:"5em"}}>
        <Button
          variant="outline-success"
          onClick={createNewArticle}>
            Crear Artículo
        </Button>
      </div>
      <div className="articleContainer">
        {articulos.map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion}, id) =>  <ArticleCard key={id} titulo={titulo} id={idArticulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/>)}
      </div>
    </section>
  );
}

export default Articulos;
