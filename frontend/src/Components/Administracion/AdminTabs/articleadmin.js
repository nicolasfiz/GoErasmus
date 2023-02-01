import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import articleServices from "../../../services/article.service";
import tokenServices from "../../../services/token.service";
import authServices from "../../../services/auth.service";
import "./adminTables.css";

function ArticleAdmin() {

  // Almacenar tabla forma estatica
  const [articleTable, setArticleTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [articles, setArticles] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  const [tokenRole, setTokenRole] = useState([]);

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = articleTable.filter(elem =>
      elem.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.esBorrador.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()));
    setArticles(searchResult);
  }

  const showContent = () => {
    setSearch("");
  }

  const removeArticle = (id) => {
    articleServices.deleteArticle(id).then(() => {
      const articulo = articles.filter(art => id !== art.idArticulo);
      setArticles(articulo);
      toast.success("Artículo eliminado");
    })
  }

  useEffect(() => {
    articleServices.getArticles().then(art => {
      tokenServices.getToken().then(t => {
        authServices.getAccount(t).then(ac => setTokenRole(ac.rol))
      });
      setArticles(art);
      setArticleTable(art);
    });
  }, []);

  return ( articles.length !== 0 ?
    (<section className="contentTable" onLoad={showContent}>
      <Toaster/>
      <InputGroup className="mb-3">
        <input className="form-control" value={search} type="text" placeholder="Buscar artículo..." onChange={handleChange} />
      </InputGroup>
        <Table striped hover bordered style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
          <thead>
            <tr className="centerTableText">
              <th>#</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Cabecera</th>
              <th>Publicado</th>
              <th>Likes</th>
              <th>Ciudad</th>
              <th>Usuario</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
          {articles && tokenRole === "Trotamundos" ? articles.filter(elem => elem.esBorrador.includes('Si')).map(({idArticulo, titulo, descripcion, urlCabecera, fechaPublicacion, nombreCiudad, nombreUsuario}, id) =>
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{titulo}</td>
              <td>{descripcion.substring(0, 75) + '...'}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlCabecera} rel="noreferrer">Consultar</a></td>
              <td>0</td>
              <td>{fechaPublicacion}</td>
              <td>{nombreCiudad}</td>
              <td>{nombreUsuario ? `${nombreUsuario}` : '-'}</td>
              <td>
                <div style={{display: "flex", gap: "20px", justifyContent: "center"}}>
                  <Button 
                    variant="outline-success"
                    style={{cursor:"pointer"}}>
                      Aceptar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer"}}
                    onClick={() => removeArticle(idArticulo) }>
                      Rechazar
                  </Button>
                </div>
              </td>
            </tr>) : 
            articles.map(({idArticulo, titulo, descripcion, urlCabecera, esBorrador, fechaPublicacion, nombreCiudad, nombreUsuario}, id) =>
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{titulo}</td>
              <td>{descripcion.substring(0, 75) + '...'}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlCabecera} rel="noreferrer">Consultar</a></td>
              <td>{fechaPublicacion}</td>
              <td>-</td>
              <td>{nombreCiudad}</td>
              <td>{nombreUsuario ? `${nombreUsuario}` : '-'}</td>
              <td> {esBorrador === 'Si' ? (
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-success"
                    style={{cursor:"pointer", margin:"auto 1em auto"}}>
                      Aceptar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeArticle(idArticulo) }>
                      Rechazar
                  </Button>
                </div>) : (
                <Button 
                  variant="outline-danger"
                  style={{cursor:"pointer"}}
                  onClick={() => removeArticle(idArticulo) }>
                    Eliminar
                </Button>)}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </section>) :
    (<>
      <section className="contentTable">
        <Toaster/>
        <InputGroup className="mb-3">
          <input className="form-control" value={search} type="text" placeholder="Buscar artículo..." onChange={handleChange} />
        </InputGroup>
      </section>
      <section style={{margin:"auto", marginTop: "50px", width:"80%"}}>
        <h2>Hmmm...</h2>
        <h3>No pudimos encontrar ninguna coincidencia para el término "{search}"</h3>
        <p style={{margin:"0"}}>Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos, o pruebe con otro término de búsqueda.</p>
        <p style={{margin:"0"}}>Recuerde que puede buscar por cualquier campo de los mostrados en la cabecera de la tabla, a excepción de numeros de fila, enlaces y fechas.</p>
      </section>
    </>)
  );
}

export default ArticleAdmin;