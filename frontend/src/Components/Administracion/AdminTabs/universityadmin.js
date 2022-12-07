import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import universityServices from "../../../services/university.service";
import "./adminTables.css";

function UniversityAdmin() {

  // Almacenar tabla forma estatica
  const [universityTable, setUniversityTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [universities, setUniversities] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = universityTable.filter(elem =>
      elem.nombreUniversidad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase()));
    setUniversities(searchResult);
  }

  const createNewUniversity = () => {
    console.log("nuevo");
  }

  const updateUniversity = (idUniversidad) => {
    console.log(idUniversidad);
  }

  const removeUniversity = (id) => {
    universityServices.deleteUniversity(id).then(() => {
      const universidad = universities.filter(c => id !== c.idUniversidad);
      setUniversities(universidad);
      toast.success("Universidad eliminada");
    })
  }

  useEffect(() => {
    universityServices.getUniversities().then(u => {
      setUniversities(u);
      setUniversityTable(u);
    });
  }, []);

  return ( universities.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar universidad..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewUniversity}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Logotipo</th>
            <th>Ciudad</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {universities && universities.map(({idUniversidad, nombreUniversidad, urlLogo, nombreCiudad}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreUniversidad}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlLogo} rel="noreferrer">Consultar</a></td>
              <td>{nombreCiudad}</td>
              <td>
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => updateUniversity(idUniversidad) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeUniversity(idUniversidad) }>
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
            <input style={{width: "60%"}} className="form-control" value={search} type="text" placeholder="Buscar universidad..." onChange={handleChange} />
          </InputGroup>
          <Button
            style={{marginLeft:"1em"}}
            variant="outline-success"
            onClick={createNewUniversity}>
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

export default UniversityAdmin;