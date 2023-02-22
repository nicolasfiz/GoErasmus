import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import toast from 'react-hot-toast'
import cityServices from "../../../../services/city.service"
import "../adminTables.css"

function CityAdmin() {

  // Almacenar tabla forma estatica
  const [cityTable, setCityTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [cities, setCities] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = cityTable.filter(elem =>
      elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.informacion.toLowerCase().includes(searchTerm.toLowerCase()))
    setCities(searchResult)
  }

  const createNewCity = () => {
    console.log("nuevo")
  }

  const updateCity = (idCiudad) => {
    console.log(idCiudad)
  }

  const removeCity = (id) => {
    cityServices.deleteCity(id).then(() => {
      const ciudad = cities.filter(c => id !== c.idCiudad)
      setCities(ciudad)
      toast.success("Ciudad eliminada")
    })
  }

  useEffect(() => {
    cityServices.getAllCities().then(c => {
      setCities(c)
      setCityTable(c)
    })
  }, [])

  return (
    <>
      <section className="contentTable flex">
        <input
          type        = "text"
          className   = "form-control"
          value       = {search}
          placeholder = "Buscar ciudad..."
          onLoad      = { () => {setSearch("")} }
          onChange    = {handleChange}
        />
        <Button
          style   = {{ marginLeft:"1em" }}
          variant = "outline-success"
          onClick = { () => {createNewCity()} }>
            Añadir
        </Button>
      </section>
      {( cities.length !== 0 ? (
        <section className="contentTable">
          <Table striped hover bordered className = "centerTableText tableShadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {cities && cities.map(({idCiudad, nombreCiudad, informacion, urlCabecera, nombrePais}, id) =>
                <tr key={id}>
                  <td width = "5%">{++index}</td>
                  <td width = "30%">{nombreCiudad}</td>
                  <td width = "30%">{nombrePais}</td>
                  <td>
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-primary"
                      onClick={() => window.open( `${process.env.REACT_APP_DIRECCIONES}${nombrePais}/${nombreCiudad}`, "_blank") }>
                        Ver ciudad
                    </Button>
                    <Button 
                      variant="outline-secondary"
                      onClick={() => {
                        updateCity(idCiudad)
                      } }>
                        Editar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeCity(idCiudad) }>
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

export default CityAdmin