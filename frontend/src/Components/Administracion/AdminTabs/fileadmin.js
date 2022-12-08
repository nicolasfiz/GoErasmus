import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import fileServices from "../../../services/file.service";
import "./adminTables.css";

function FileAdmin() {

  // Almacenar tabla forma estatica
  const [fileTable, setFileTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [files, setFiles] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = fileTable.filter(elem =>
      elem.nombreArchivo.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreAsignatura.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.mg.toString().includes(searchTerm)
      ||elem.nmg.toString().includes(searchTerm));
    setFiles(searchResult);
  }

  const removeFile = (id) => {
    fileServices.deleteFile(id).then(() => {
      const f = files.filter(file => id !== file.idArchivo);
      setFiles(f);
      toast.success("Archivo eliminado");
    })
  }

  useEffect(() => {
    fileServices.getFiles().then(f => {
      setFiles(f);
      setFileTable(f);
    });
  }, []);
  return ( files.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <InputGroup className="mb-3">
        <input className="form-control" value={search} type="text" placeholder="Buscar archivo..." onChange={handleChange} />
      </InputGroup>
      <Table striped hover style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Archivo</th>
            <th>Fecha subida</th>
            <th>Asignatura</th>
            <th>Usuario</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {files && files.map(({idArchivo, nombreArchivo, titulo, descripcion, url, fechaSubida, nombreAsignatura, nombreUsuario, mg, nmg}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreArchivo}</td>
              <td>{titulo}</td>
              <td>{descripcion}</td>
              <td>{url ? <a target="_blank" style={{textDecoration: "none"}} href={url} rel="noreferrer">Consultar</a>: '-'}</td>
              <td>{fechaSubida}</td>
              <td>{nombreAsignatura}</td>
              <td>{nombreUsuario}</td>
              <td>{mg}</td>
              <td>{nmg}</td>
              <td>
                <Button 
                  variant="outline-danger"
                  style={{cursor:"pointer", display: "block", margin: "auto"}}
                  onClick={() => removeFile(idArchivo) }>
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
          <input className="form-control" value={search} type="text" placeholder="Buscar archivo..." onChange={handleChange} />
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

export default FileAdmin;