import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import fileServices from "../../../services/file.service"
import ToastComponent from "../toast"
import "./adminTables.css"

function FileAdmin() {

  // Almacenar tabla forma estatica
  const [fileTable, setFileTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [files, setFiles] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = fileTable.filter(elem =>
      elem.nombreArchivo.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreAsignatura.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.mg.toString().includes(searchTerm)
      ||elem.nmg.toString().includes(searchTerm))
    setFiles(searchResult)
  }

  const [showToast, setShowToast] = useState(false)

  const handleButtonClick = () => {
    setShowToast(true)
  }

  const handleToastClose = () => {
    setShowToast(false)
  }

  const removeFile = (id) => {
    fileServices.deleteFile(id).then(() => {
      const f = files.filter(file => id !== file.idArchivo)
      setFiles(f)
      handleButtonClick()
    })
  }

  useEffect(() => {
    fileServices.getFiles().then(f => {
      setFiles(f)
      setFileTable(f)
    })
  }, [])

  return (
  <>
    {ToastComponent("Archivo eliminado", showToast, handleToastClose)}
    <section className="contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar archivo..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
    </section>
    {( files.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Autor</th>
              <th>Título</th>
              <th>Asignatura</th>
              <th>Likes</th>
              <th>Dislikes</th>
              <th>Fecha subida</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map(({idArchivo, idAsignatura, titulo, url, fechaSubida, nombreAsignatura, nombreUsuario, mg, nmg}, id) =>
              <tr key={id}>
                <td width= "5%">{++index}</td>
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
                <td>
                  <a
                    href    = {`${process.env.REACT_APP_DIRECCIONES}asignatura/${idAsignatura}`}
                    target  = "_blank"
                    rel     = "noreferrer"
                    style   = {{textDecoration: "none"}}
                  >
                    {nombreAsignatura}
                  </a>
                </td>
                <td>{mg}</td>
                <td>{nmg}</td>
                <td>{fechaSubida}</td>
                <td width="18%">
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-primary"
                      onClick={() => window.open(`${url}`, "_blank")}
                    >
                      Consultar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeFile(idArchivo) }
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>)}
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

export default FileAdmin