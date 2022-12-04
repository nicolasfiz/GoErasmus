import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import roleServices from "../../../services/role.service";
import "./roleadmin.css";

const  RolesCell = ({index, rol}) => {

  return  (<>
            <tr style={{verticalAlign: "middle"}}>
              <td className="centerUserTableText">{index}</td>
              <td>{rol}</td>
              <td> <Button
                     variant="secondary"
                     style={{display: "block", margin: "auto"}}>
                     Editar
                   </Button>
              </td>
            </tr>
          </>);
}

function RoleAdmin() {

  const [roles, setRoles] = useState([]);
  let index = 0;

  useEffect(() => {
    roleServices.getRoles().then(role => {
      setRoles(role);
    });
  }, []);

  return (
    <section className="rolesTable">
      <InputGroup className="mb-3">
        <input style={{width:"60%"}} className="form-control" type="text" placeholder="Buscar rol..." onKeyPress={e => {if (e.key === 'Enter') console.log("hola") }}></input>
      </InputGroup>
      <Table striped bordered hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerRoleTableText">
            <th>#</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map(({nombreRol}, id) =>
            <RolesCell key={id} index={++index} rol={nombreRol} />)}
        </tbody>
      </Table>
    </section>
  );
}

export default RoleAdmin;