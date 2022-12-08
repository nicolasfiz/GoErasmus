import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import commentServices from "../../../services/comment.service";
import "./adminTables.css";

function CommentAdmin() {

  // Almacenar tabla forma estatica
  const [commentTable, setCommentTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [comments, setComments] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = commentTable.filter(elem =>
      elem.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.mg.toString().includes(searchTerm)
      ||elem.nmg.toString().includes(searchTerm));
    setComments(searchResult);
  }

  const removeComment = (id) => {
    commentServices.deleteComment(id).then(() => {
      const c = comments.filter(comment => id !== comment.idComentario);
      setComments(c);
      toast.success("Comentario eliminado");
    })
  }

  useEffect(() => {
    commentServices.getComments().then(c => {
      setComments(c);
      setCommentTable(c);
    });
  }, []);
  return ( comments.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <InputGroup className="mb-3">
        <input className="form-control" value={search} type="text" placeholder="Buscar comentario..." onChange={handleChange} />
      </InputGroup>
      <Table striped hover style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Usuario</th>
            <th>Comentario</th>
            <th>Fecha subida</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {comments && comments.map(({idComentario, descripcion, fechaSubida, nombreUsuario, mg, nmg}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreUsuario}</td>
              <td>{descripcion}</td>
              <td>{fechaSubida}</td>
              <td>{mg}</td>
              <td>{nmg}</td>
              <td>
                <Button 
                  variant="outline-danger"
                  style={{cursor:"pointer", display: "block", margin: "auto"}}
                  onClick={() => removeComment(idComentario) }>
                    Eliminar
                </Button>
              </td>
            </tr>
            )}
        </tbody>
      </Table>
    </section>) :
    (<>
      <section className="contentTable">
        <Toaster/>
        <InputGroup className="mb-3">
          <input className="form-control" value={search} type="text" placeholder="Buscar comentario..." onChange={handleChange} />
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

export default CommentAdmin;