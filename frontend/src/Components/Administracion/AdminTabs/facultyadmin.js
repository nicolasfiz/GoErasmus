import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import facultyServices from "../../../services/faculty.service";
import "./adminTables.css";

function FacultyAdmin() {

  // Almacenar tabla forma estatica
  const [facultyTable, setFacultyTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [faculties, setFaculties] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = facultyTable.filter(elem =>
      elem.nombreUniversidad.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()));
    setFaculties(searchResult);
  }

  const createNewFaculty = () => {
    console.log("nuevo");
  }

  const updateFaculty = (idFacultad) => {
    console.log(idFacultad);
  }

  const removeFaculty = (id) => {
    facultyServices.deleteFaculty(id).then(() => {
      const facultad = faculties.filter(c => id !== c.idFacultad);
      setFaculties(facultad);
      toast.success("Facultad eliminada");
    })
  }

  useEffect(() => {
    facultyServices.getFaculties().then(f => {
      setFaculties(f);
      setFacultyTable(f);
    });
  }, []);

  return ( faculties.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar facultad..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewFaculty}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Universidad</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {faculties && faculties.map(({idFacultad, nombreFacultad, nombreUniversidad}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreFacultad}</td>
              <td>{nombreUniversidad}</td>
              <td>
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => updateFaculty(idFacultad) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeFaculty(idFacultad) }>
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
          <input className="form-control" value={search} type="text" placeholder="Buscar facultad..." onChange={handleChange} />
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

export default FacultyAdmin;