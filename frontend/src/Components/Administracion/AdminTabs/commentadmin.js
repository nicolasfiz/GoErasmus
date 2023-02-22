import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import toast from 'react-hot-toast'
import commentServices from "../../../services/comment.service"
import "./adminTables.css"

function CommentAdmin() {

  // Almacenar tabla forma estatica
  const [commentTable, setCommentTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [comments, setComments] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = commentTable.filter(elem =>
      elem.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.mg.toString().includes(searchTerm)
      ||elem.nmg.toString().includes(searchTerm))
    setComments(searchResult)
  }

  const removeComment = (id) => {
    commentServices.deleteComment(id).then(() => {
      const c = comments.filter(comment => id !== comment.idComentario)
      setComments(c)
      toast.success("Comentario eliminado")
    })
  }

  useEffect(() => {
    commentServices.getComments().then(c => {
      setComments(c)
      setCommentTable(c)
    })
  }, [])

  return (
  <>
    <section className = "contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar comentario..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
    </section>
    {( comments.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Autor</th>
              <th>Descripción</th>
              <th>Likes</th>
              <th>Dislikes</th>
              <th>Fecha subida</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(({idComentario, descripcion, fechaSubida, nombreUsuario, mg, nmg}, id) => 
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
                <td>{descripcion}</td>
                <td>{mg}</td>
                <td>{nmg}</td>
                <td>{fechaSubida}</td>
                <td>
                  <Button 
                    variant="outline-danger"
                    onClick={() => removeComment(idComentario) }
                  >
                      Eliminar
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>) : (
      <section className = "contentTable">
        <h2>Hmmm...</h2>
        <h3>No pudimos encontrar ninguna coincidencia para el término "{search}"</h3>
        <span className  = "noResultsText">
          <p>
            Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos,
            o pruebe con otro término de búsqueda.
          </p>
          <p>
            Recuerde que puede buscar por cualquier campo de los mostrados en la cabecera de la tabla,
            a excepción de numeros de fila, enlaces y fechas.
          </p>
        </span>
      </section>)
    )}
  </>)
}

export default CommentAdmin