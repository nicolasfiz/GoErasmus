import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import toast from 'react-hot-toast'
import subjectServices from "../../../../services/subject.service"
import CrearNuevaAsignaturaModal from "./crearNuevaAsignaturaModal"
import EditarAsignaturaModal from "./editarAsignaturaModal"
import "../adminTables.css"

function SubjectAdmin() {

  // Almacenar tabla forma estatica
  const [subjectTable, setSubjectTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [subjects, setSubjects] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  // Controla la visibilidad del Modal para creación de asignaturas
  const [createSubjectForm, setCreateSubjectForm] = useState(false)

  // Controla la visibilidad del Modal para creación de asignaturas
  const [editSubjectForm, setEditSubjectForm] = useState(false)

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
    let searchResult = subjectTable.filter(elem =>
      elem.nombreAsignatura.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.puntuacion.toString().includes(searchTerm.toString())
      || elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()))
    setSubjects(searchResult)
  }

  const updateChanges = () => {
    subjectServices.getSubjects().then(p => {
      setSubjects(p)
    })
  }

  const removeSubject = (id) => {
    subjectServices.deleteSubject(id).then(() => {
      const asignatura = subjects.filter(c => id !== c.idAsignatura)
      setSubjects(asignatura)
      toast.success("Asignatura eliminada")
    })
  }

  useEffect(() => {
    subjectServices.getSubjects().then(s => {
      setSubjects(s)
      setSubjectTable(s)
    })
  }, [])

  return (
    <>
      <CrearNuevaAsignaturaModal
        show    = {createSubjectForm}
        onHide  = {() => setCreateSubjectForm(false)}
        updatechanges = { () => updateChanges() }
      />
      <EditarAsignaturaModal
        show    = {editSubjectForm}
        onHide  = {() => setEditSubjectForm(false)}
        updatechanges = { () => updateChanges() }
        row = {row}
      />
      <section className = "contentTable flex">
        <input
          type        = "text"
          className   = "form-control"
          value       = {search}
          placeholder = "Buscar asignatura..."
          onLoad      = { () => {setSearch("")} }
          onChange    = {handleChange}
        />
        <Button
          style     = {{ marginLeft:"1em" }}
          variant   = "outline-success"
          onClick   = { () => {setCreateSubjectForm(true)} }>
            Añadir
        </Button>
      </section>
      {( subjects.length !== 0 ? (
        <section className="contentTable">
          <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr className="centerTableText">
              <th>#</th>
              <th>Nombre</th>
              <th>Puntuación</th>
              <th>Facultad</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {subjects && subjects.map(( {idAsignatura, nombreAsignatura, puntuacion, nombreFacultad}, id) => 
              <tr key={id}>
                <td>{ ++index }</td>
                <td>{ nombreAsignatura }</td>
                <td>{ puntuacion }</td>
                <td>{ nombreFacultad }</td>
                <td>
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        setRow({
                          id: idAsignatura,
                          nombre: nombreAsignatura
                        })
                        setEditSubjectForm(true)
                      } }>
                        Editar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeSubject(idAsignatura) }>
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
        <span>
          <p>Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos,
            o pruebe con otro término de búsqueda.
          </p>
          <p>Recuerde que puede buscar por cualquier campo de los mostrados en la cabecera de la tabla,
            a excepción de numeros de fila, enlaces y fechas.
          </p>
        </span>
      </section>)
    )}
  </>)
}

export default SubjectAdmin