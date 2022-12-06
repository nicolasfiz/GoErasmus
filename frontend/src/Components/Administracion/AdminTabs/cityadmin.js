import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import cityServices from "../../../services/city.service";
import "./adminTables.css";

function CityAdmin() {

  // Almacenar tabla forma estatica
  const [cityTable, setCityTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [cities, setCities] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = cityTable.filter(elem =>
      elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.informacion.toLowerCase().includes(searchTerm.toLowerCase()));
    setCities(searchResult);
  }

  const createNewCity = () => {
    console.log("nuevo");
  }

  const updateCity = (idCiudad) => {
    console.log(idCiudad);
  }

  const removeCity = (id) => {
    cityServices.deleteCity(id).then(() => {
      const ciudad = cities.filter(c => id !== c.idCiudad);
      setCities(ciudad);
      toast.success("Ciudad eliminada");
    })
  }

  useEffect(() => {
    cityServices.getAllCities().then(c => {
      setCities(c);
      setCityTable(c);
    });
  }, []);

  return ( cities.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar ciudad..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewCity}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Cabecera</th>
            <th>Información</th>
            <th>País</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {cities && cities.map(({idCiudad, nombreCiudad, informacion, urlCabecera, nombrePais}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreCiudad}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlCabecera} rel="noreferrer">Consultar</a></td>
              <td>{informacion.substring(0, 75) + '...'}</td>
              <td>{nombrePais}</td>
              <td>
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => updateCity(idCiudad) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeCity(idCiudad) }>
                      Eliminar
                  </Button>
                </div>
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
          <input className="form-control" value={search} type="text" placeholder="Buscar ciudad..." onChange={handleChange} />
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

export default CityAdmin;