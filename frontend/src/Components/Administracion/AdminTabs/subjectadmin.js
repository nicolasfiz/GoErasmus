import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import subjectServices from "../../../services/subject.service";
import "./adminTables.css";

function SubjectAdmin() {

  // Almacenar tabla forma estatica
  const [subjectTable, setSubjectTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [subjects, setSubjects] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = subjectTable.filter(elem =>
      elem.nombreAsignatura.toLowerCase().includes(searchTerm.toLowerCase())
      || elem.puntuacion.toString().includes(searchTerm.toString())
      || elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()));
    setSubjects(searchResult);
  }

  const createNewSubject = () => {
    console.log("nuevo");
  }

  const updateSubject = (idAsignatura) => {
    console.log(idAsignatura);
  }

  const removeSubject = (id) => {
    subjectServices.deleteSubject(id).then(() => {
      const asignatura = subjects.filter(c => id !== c.idAsignatura);
      setSubjects(asignatura);
      toast.success("Asignatura eliminada");
    })
  }

  useEffect(() => {
    subjectServices.getSubjects().then(s => {
      setSubjects(s);
      setSubjectTable(s);
    });
  }, []);

  return ( subjects.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar asignatura..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewSubject}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
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
          {subjects && subjects.map(({idAsignatura, nombreAsignatura, puntuacion, nombreFacultad}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreAsignatura}</td>
              <td>{puntuacion}</td>
              <td>{nombreFacultad}</td>
              <td>
                <div style={{display: "flex"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => updateSubject(idAsignatura) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer", margin:"auto"}}
                    onClick={() => removeSubject(idAsignatura) }>
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
            <input style={{width: "60%"}} className="form-control" value={search} type="text" placeholder="Buscar asignatura..." onChange={handleChange} />
          </InputGroup>
          <Button
            style={{marginLeft:"1em"}}
            variant="outline-success"
            onClick={createNewSubject}>
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

export default SubjectAdmin;