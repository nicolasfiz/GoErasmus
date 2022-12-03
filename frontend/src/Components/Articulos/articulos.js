import { useEffect, useState } from "react";
import ArticleCard from "./articlecard";
import articleServices from "../../services/article.service";
import "./articulos.css"

function Articulos() {

  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    articleServices.getArticles().then(art => {
      setArticulos(art);
    });
  }, []);

  return (
    <main>
      <div className="articleContainer">
        {articulos.map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion}, id) =>  <ArticleCard key={id} titulo={titulo} id={idArticulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/>)}
      </div>
    </main>
  );
}

export default Articulos;
