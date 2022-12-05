import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import roleServices from "../../../services/role.service";
import "./roleadmin.css";

function RoleAdmin() {

  // Almacenar tabla forma estatica
  const [rolesTable, setRolesTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [roles, setRoles] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = rolesTable.filter(elem =>
      elem.nombreRol.toLowerCase().includes(searchTerm.toLowerCase()));
    setRoles(searchResult);
  }
  const updateRole = (idRol) => { //Hacer
    console.log(idRol);
  }

  const createNewRole = () => { //Hacer
    console.log("nuevo")
  }

  useEffect(() => {
    roleServices.getRoles().then(role => {
      setRoles(role);
      setRolesTable(role);
    });
  }, []);

  return (roles.length !== 0 ?
    (<section className="rolesTable" onLoad={() => {setSearch("")}}>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar rol..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewRole}>
            Añadir
        </Button>
      </div>
      <Table striped hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerRoleTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {roles && roles.map(({idRol, nombreRol}, id) => 
            <tr key={id} className="centerUserTableText">
              <td>{++index}</td>
              <td>{nombreRol}</td>
              <td>
                <Button 
                  variant="outline-secondary"
                  style={{cursor:"pointer", display: "block", margin: "auto"}}
                  onClick={() => updateRole(idRol) }>
                    Editar
                </Button>
              </td>
            </tr>
            )}
        </tbody>
      </Table>
    </section>) :
    (<>
      <section className="rolesTable">
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input style={{width: "60%"}} className="form-control" value={search} type="text" placeholder="Buscar rol..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewRole}>
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

export default RoleAdmin;