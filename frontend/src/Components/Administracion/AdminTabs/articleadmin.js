import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import ToastComponent from "../toast"
import articleServices from "../../../services/article.service"
import tokenServices from "../../../services/token.service"
import authServices from "../../../services/auth.service"
import "./adminTables.css"

function ArticleAdmin() {

  // Almacenar tabla forma estatica
  const [articleTable, setArticleTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [articlesList, setArticlesList] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  // Determina el rol del token
  const [tokenRole, setTokenRole] = useState([])

  const [likes, setLikes] = useState([])

  let index = 0

  const [showDeleteToast, setShowDeleteToast] = useState(false)
  const [showPublishToast, setShowPublishToast] = useState(false)

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = articleTable.filter(elem =>
      elem.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      // || likes.find(({idArticulo}) => idArticulo === elem.idArticulo).mg.toString().includes(searchTerm.toString())
      )
    setArticlesList(searchResult)
  }

  const publishArticle = (id) => {
    articleServices.publishArticle(id).then(() => {
      articleServices.getArticles().then(art => {
        if (tokenRole === 'Trotamundos')
          setArticlesList(art.filter(elem => elem.esBorrador.includes('Si')))
        else if (tokenRole === 'Administrador')
          setArticlesList(art)
      })
      setShowPublishToast(true)
    })
  }

  const removeArticle = (id) => {
    articleServices.deleteArticle(id).then(() => {
      const articulo = articlesList.filter(art => id !== art.idArticulo)
      setArticlesList(articulo)
      setShowDeleteToast(true)
    })
  }

  useEffect(() => {
    articleServices.getArticles().then(art => {
      tokenServices.getToken().then(t => {
        authServices.getAccount(t).then(ac => setTokenRole(ac.rol))
      })
      if (tokenRole === 'Trotamundos')
      {
        setArticlesList(art.filter(elem => elem.esBorrador.includes('Si')))
        setArticleTable(art.filter(elem => elem.esBorrador.includes('Si')))
      }
        else if (tokenRole === 'Administrador')
      {
        setArticlesList(art)
        setArticleTable(art)
      }
    })
  }, [tokenRole])

  useEffect(() => {
    Promise.all(articlesList.map(({idArticulo}) => articleServices.getArticleLikesById(idArticulo))).then(likes => {
      setLikes(likes.map((like, id) => ({mg: like[0].mg, idArticulo: articlesList[id].idArticulo})))
    })
  }, [articlesList])

  return (<>
    {ToastComponent("Artículo publicado", showPublishToast, () => {setShowPublishToast(false)})}
    {ToastComponent("Artículo eliminado", showDeleteToast, () => {setShowDeleteToast(false)})}
    <section className = "contentTable">
      <input
        type        = "text"
        className   = "form-control"
        value       = { search }
        placeholder = "Buscar artículo..."
        onLoad      = { () => {setSearch("")} }
        onChange    = { handleChange }
      />
    </section>
    {( articlesList.length !== 0 ? (
      <section className="contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Autor</th>
              <th>Título</th>
              <th>Ciudad</th>
              <th>Likes</th>
              <th>Publicado</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {articlesList.map(({idArticulo, titulo, fechaPublicacion, nombreCiudad, nombreUsuario, esBorrador}, id) =>
              <tr key={id}>
                <td>{++index}</td>
                <td>
                    <a
                      href    = {`${process.env.REACT_APP_DIRECCIONES}perfil/${nombreUsuario}`}
                      target  = "_blank"
                      rel     = "noreferrer"
                      style   = {{textDecoration: "none"}}
                    >
                      {nombreUsuario}
                    </a>
                </td>
                <td>{titulo}</td>
                <td>{nombreCiudad}</td>
                <td>{likes.find(a => a.idArticulo === idArticulo)?.mg}</td>
                <td>{fechaPublicacion}</td>
                <td>
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-primary"
                      onClick={() => window.open(`${process.env.REACT_APP_DIRECCIONES}articulos/${idArticulo}`, "_blank")}
                    >
                      Consultar
                    </Button>
                    {esBorrador === 'Si' ? (
                      <>
                        <Button 
                          variant="outline-success"
                          onClick={() => publishArticle(idArticulo)}>
                            Aceptar
                        </Button>
                        <Button 
                          variant="outline-danger"
                          onClick={() => removeArticle(idArticulo) }>
                            Rechazar
                        </Button>
                      </>) : (
                      <Button 
                        variant="outline-danger"
                        onClick={() => removeArticle(idArticulo) }>
                          Eliminar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>) :
      (search === "" ? (
        <section className="contentTable">
          <h2>Hmmm... Parece ser que no hay artículos</h2>
          <span className = "noResultsText">
            <p>Actualmente no contamos con artículos.</p>
            <p>Mientras lleguan nuevos borradores, te recordamos que puedes administrar otras secciones de la web.</p>
            <p>Muchas gracias :)</p>
          </span>
        </section>) : (
        <section className="contentTable">
          <h2>Hmmm...</h2>
          <h3>No pudimos encontrar ninguna coincidencia para el término "{search}"</h3>
          <span className = "noResultsText">
            <p>
              Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos,
              o pruebe con otro término de búsqueda.
            </p>
            <p>
              Recuerde que puede buscar por cualquier campo de los mostrados en la cabecera de la tabla,
              a excepción de numeros de fila, enlaces y fechas.
            </p>
          </span>
        </section>
      ))
      )}
    </>
  )
}

export default ArticleAdmin