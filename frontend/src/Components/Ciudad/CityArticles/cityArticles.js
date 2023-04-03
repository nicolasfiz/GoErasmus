import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import articleServices from "../../../services/article.service"
import cityServices from "../../../services/city.service"
import '../../Ciudades/ciudades.css'
import ArticleCard from "../../Articulos/articlecard"
import { Button } from "react-bootstrap"

function CityArticles() {

  const nav = useNavigate()
  const params = useParams()
  const [articulos, setArticulos] = useState([])
  const [cityId, setCityId] = useState(-1)

  useEffect(() => {
    articleServices.getArticlesByCityName(params.nombreCiudad).then(art => {
      setArticulos(art)
    })
    cityServices.getCityByName(params.nombreCiudad).then(id => {
      setCityId(id[0].idCiudad)
    })
  }, [params.nombreCiudad])

  return (
    <section>
      <div style={{display:"flex", flexDirection: "row-reverse", marginTop:"1.5em", marginRight:"5em"}}>
        <Button
          variant="outline-success"
          onClick={() =>  {nav('/crearArticulo/', {
              state: { cityId: cityId, }
            })
          }}>
            Crear Artículo
        </Button>
      </div>
      <div className="cityContainer">
        {articulos.map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion}, id) =>  <ArticleCard key={id} id={idArticulo} titulo={titulo} caption={descripcion} url={urlCabecera} fecha={fechaPublicacion}/>)}
      </div>
    </section>
  )
}

export default CityArticles