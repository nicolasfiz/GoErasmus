import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast'
import universityServices from "../../../../services/university.service"
import CrearNuevaUniversidadModal from "./crearNuevaUniversidadModal"
import EditarUniversidadModal from "./editarUniversidadModal"
import "../adminTables.css"

function UniversityAdmin() {

  // Almacenar tabla forma estatica
  const [universityTable, setUniversityTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [universities, setUniversities] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  // Controla la visibilidad del Modal para creación de países
  const [createUniversityForm, setCreateUniversityForm] = useState(false)

  // Controla la visibilidad del Modal para edición de países
  const [editUniversityForm, setEditUniversityForm] = useState(false)

  //Datos pais a editar
  const [row, setRow] = useState({
    id: 0,
    nombre: ""
  }); 

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = universityTable.filter(elem =>
      elem.nombreUniversidad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase()))
    setUniversities(searchResult)
  }

  const updateChanges = () => {
    universityServices.getUniversities().then(u => {
      setUniversities(u)
    })
  }

  const removeUniversity = (id) => {
    universityServices.deleteUniversity(id).then(() => {
      const universidad = universities.filter(c => id !== c.idUniversidad)
      setUniversities(universidad)
      toast.success("Universidad eliminada")
    })
  }

  useEffect(() => {
    universityServices.getUniversities().then(u => {
      setUniversities(u)
      setUniversityTable(u)
    })
  }, [])

  return (
  <>
    <Toaster/>
    <CrearNuevaUniversidadModal
      show    = {createUniversityForm}
      onHide  = {() => setCreateUniversityForm(false)}
      updatechanges = { () => updateChanges() }
    />
    <EditarUniversidadModal
      show    = {editUniversityForm}
      onHide  = {() => setEditUniversityForm(false)}
      updatechanges = { () => updateChanges() }
      row = {row}
    />
    <section className="contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar universidad..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
      <Button
        style   = {{ marginLeft:"1em" }}
        variant = "outline-success"
        onClick = { () => {setCreateUniversityForm(true)} }>
          Añadir
      </Button>
    </section>
    {( universities.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Logotipo</th>
              <th>Ciudad</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            { universities && universities.map(({idUniversidad, nombreUniversidad, urlLogo, nombreCiudad}, id) => 
              <tr key = {id}>
                <td width = "5%"> { ++index } </td>
                <td width = "30%"> { nombreUniversidad } </td>
                <td width = "15%">
                  <a
                    style  = {{ textDecoration: "none" }}
                    href   = { urlLogo }
                    target = "_blank"
                    rel    = "noreferrer">
                      Consultar
                  </a>
                </td>
                <td width = "15%"> { nombreCiudad } </td>
                <td width = "20%">
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        setRow({
                          id: idUniversidad,
                          nombre: nombreUniversidad
                        })
                        setEditUniversityForm(true)
                      } }>
                        Editar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeUniversity(idUniversidad) }>
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

export default UniversityAdmin