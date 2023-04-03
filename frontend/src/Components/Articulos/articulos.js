import { useEffect, useState } from "react"
import ArticleCard from "./articlecard"
import articleServices from "../../services/article.service"
import "./articulos.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function Articulos() {

  const nav = useNavigate()

  const [articulos, setArticulos] = useState([])

  useEffect(() => {
    articleServices.getArticles().then(art => {
      setArticulos(art)
    })
  }, [])

  return (
    <section>
      <div style={{display:"flex", flexDirection: "row-reverse", marginTop:"1.5em", marginRight:"5em"}}>
        <Button
          variant="outline-success"
          onClick={() => {nav(`/crearArticulo`, {
            state: { cityId: -1, }
          })}}
        >
            Crear Artículo
        </Button>
      </div>
      <div className="articleContainer">
        {articulos.map(({idArticulo, titulo, descripcion, esBorrador, urlCabecera, fechaPublicacion}, id) => esBorrador === 'No' ? <ArticleCard key={id} titulo={titulo} id={idArticulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/> : null)}
      </div>
    </section>
  )
}

export default Articulos
