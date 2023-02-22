import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
// import toast from 'react-hot-toast'
import CrearNuevoPaisModal from "./crearNuevoPaisModal"
import EditarPaisModal from "./editarPaisModal"
import countryServices from "../../../../services/country.service"
import "../adminTables.css"

function CountryAdmin() {

  // Almacenar tabla forma estatica
  const [countryTable, setCountryTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [countries, setCountries] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  // Controla la visibilidad del Modal para creación de países
  const [createCountryForm, setCreateCountryForm] = useState(false)

  // Controla la visibilidad del Modal para edición de países
  const [editCountryForm, setEditCountryForm] = useState(false)

  //Datos pais a editar
  const [row, setRow] = useState({
    id: 0,
    nombre: ""
  }); 

  let index = 0

  const handleChange = ({ target }) => {
    setSearch(target.value)
    filterSearch(target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = countryTable.filter(elem =>
      elem.nombrePais.toLowerCase().includes(searchTerm.toLowerCase()))
    setCountries(searchResult)
  }

  const updateChanges = () => {
    countryServices.getCountries().then(p => {
      setCountries(p)
    })
  }

  const removeCountry = (id) => {
    countryServices.deleteCountry(id).then(() => {
      // toast.success("Pais eliminado")
      const pais = countries.filter(p => id !== p.idPais)
      setCountries(pais)
    })
  }

  useEffect(() => {
    countryServices.getCountries().then(p => {
      setCountries(p)
      setCountryTable(p)
    })
  }, [])

  return (
  <>
    <CrearNuevoPaisModal
      show    = {createCountryForm}
      onHide  = {() => setCreateCountryForm(false)}
      updatechanges = { () => updateChanges() }
    />
    <EditarPaisModal
      show    = {editCountryForm}
      onHide  = {() => setEditCountryForm(false)}
      updatechanges = { () => updateChanges() }
      row = {row}
    />
    <section className = "contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar país..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
      <Button
        style   = {{ marginLeft: "1em" }}
        variant = "outline-success"
        onClick = { () => {setCreateCountryForm(true)} }>
          Añadir
      </Button>
    </section>
    {( countries.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Bandera</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {countries && countries.map(( { idPais, nombrePais, urlBandera }, id) => 
              <tr key = {id}>
                <td width = "5%"> { ++index } </td>
                <td width = "30%"> { nombrePais } </td>
                <td width = "15%">
                  <a
                    style  = {{ textDecoration: "none" }}
                    href   = { urlBandera }
                    target = "_blank"
                    rel    = "noreferrer">
                      Consultar
                  </a>
                </td>
                <td width = "20%">
                  <div className = "buttonGroup">
                    <Button 
                      variant = "outline-secondary"
                      onClick = { () => { 
                        setRow({
                          id: idPais,
                          nombre: nombrePais
                        })
                        setEditCountryForm(true)
                      }}>
                        Editar
                    </Button>
                    <Button 
                      variant = "outline-danger"
                      onClick = {() => {removeCountry(idPais)} }>
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

export default CountryAdmin