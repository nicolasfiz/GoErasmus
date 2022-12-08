import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import countryServices from "../../../services/country.service";
import "./adminTables.css";

function CountryAdmin() {

  // Almacenar tabla forma estatica
  const [countryTable, setCountryTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [countries, setCountries] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = countryTable.filter(elem =>
      elem.nombrePais.toLowerCase().includes(searchTerm.toLowerCase()));
    setCountries(searchResult);
  }

  const createNewCountry = () => {
    console.log("nuevo");
  }

  const updateCountry = (idPais) => {
    console.log(idPais);
  }

  const removeCountry = (id) => {
    countryServices.deleteCountry(id).then(() => {
      const pais = countries.filter(p => id !== p.idPais);
      setCountries(pais);
      toast.success("País eliminado");
    })
  }

  useEffect(() => {
    countryServices.getCountries().then(p => {
      setCountries(p);
      setCountryTable(p);
    });
  }, []);

  return ( countries.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar país..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewCountry}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Bandera</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {countries && countries.map(({idPais, nombrePais, urlBandera}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombrePais}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlBandera} rel="noreferrer">Consultar</a></td>
              <td>
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => updateCountry(idPais) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeCountry(idPais) }>
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
        <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
          <InputGroup>
            <input style={{width: "60%"}} className="form-control" value={search} type="text" placeholder="Buscar país..." onChange={handleChange} />
          </InputGroup>
          <Button
            style={{marginLeft:"1em"}}
            variant="outline-success"
            onClick={createNewCountry}>
              Añadir
          </Button>
        </div>
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

export default CountryAdmin;