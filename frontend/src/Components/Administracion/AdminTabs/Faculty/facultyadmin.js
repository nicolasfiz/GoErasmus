import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast'
import facultyServices from "../../../../services/faculty.service"
import CrearNuevaFacultadModal from "./crearNuevaFacultadModal"
import EditarFacultadModal from "./editarFacultadModal"
import "../adminTables.css"

function FacultyAdmin() {

  // Almacenar tabla forma estatica
  const [facultyTable, setFacultyTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [faculties, setFaculties] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  // Controla la visibilidad del Modal para creación de facultades
  const [createFacultyForm, setCreateFacultyForm] = useState(false)

  // Controla la visibilidad del Modal para creación de facultades
  const [editFacultyForm, setEditFacultyForm] = useState(false)

  // Fila a editar
  const [row, setRow] = useState({
    id: 0,
    nombre: ""
  })

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = facultyTable.filter(elem =>
      elem.nombreUniversidad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()))
    setFaculties(searchResult)
  }

  const updateChanges = () => {
    facultyServices.getFaculties().then(f => {
      setFaculties(f)
    })
  }

  const removeFaculty = (id) => {
    facultyServices.deleteFaculty(id).then(() => {
      const facultad = faculties.filter(c => id !== c.idFacultad)
      setFaculties(facultad)
      toast.success("Facultad eliminada")
    })
  }

  useEffect(() => {
    facultyServices.getFaculties().then(f => {
      setFaculties(f)
      setFacultyTable(f)
    })
  }, [])

  return (
  <>
    <Toaster/>
    <CrearNuevaFacultadModal
      show    = {createFacultyForm}
      onHide  = {() => setCreateFacultyForm(false)}
      updatechanges = { () => updateChanges() }
    />
    <EditarFacultadModal
      show    = {editFacultyForm}
      onHide  = {() => setEditFacultyForm(false)}
      updatechanges = { () => updateChanges() }
      row = {row}
    />
    <section className = "contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar facultad..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
      <Button
        style   = {{ marginLeft:"1em" }}
        variant = "outline-success"
        onClick = { () => {setCreateFacultyForm(true)} }>
          Añadir
      </Button>
    </section>
    {( faculties.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Universidad</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {faculties && faculties.map(( {idFacultad, nombreFacultad, nombreUniversidad}, id) => 
              <tr key={id}>
                <td>{ ++index }</td>
                <td>{ nombreFacultad }</td>
                <td>{ nombreUniversidad }</td>
                <td width = "20%">
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        setRow({
                          id: idFacultad,
                          nombre: nombreFacultad
                        })
                        setEditFacultyForm(true)
                      }}
                    >
                        Editar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeFaculty(idFacultad) }>
                        Eliminar
                    </Button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </Table>
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
      </section>)
    )}
  </>)
}

export default FacultyAdmin