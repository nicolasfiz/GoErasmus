import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import userServices from "../../../services/user";
import "./useradmin.css";

const  UsersCell = ({idUsuario, index, nombreCompleto, nombreUsuario, email, cuentaActivada, facultad, rol, cuenta}) => {
  
  const nav = useNavigate();

  return  (<>
            <tr style={{verticalAlign: "middle"}}>
              <td style={{cursor: "pointer"}} className="centerUserTableText" onClick={() => nav(`/perfil/${nombreUsuario}`) }>{index}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreCompleto}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreUsuario}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{email}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{cuentaActivada}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{rol}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{facultad}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{cuenta}</td>
              <td> <Button
                     variant="danger"
                     style={{cursor:"pointer", display: "block", margin: "auto"}}
                     onClick={() => userServices.deleteUser(idUsuario) }>
                     Eliminar
                   </Button>
              </td>
            </tr>
          </>);
}

function UserAdmin() {

  const [users, setUsers] = useState([]);
  let index = 0;

  useEffect(() => {
    userServices.getUsers().then(usr => {
      setUsers(usr);
    });
  }, []);

  return (
    <section className="usersTable">
      <InputGroup className="mb-3">
        <input style={{width:"60%"}} className="form-control" type="text" placeholder="Buscar usuario..." onKeyPress={e => {if (e.key === 'Enter') console.log("hola") }}></input>
        <Form.Select>
          <option value="">Selecciona campo de búsqueda</option>
          <option value="nombreUsuario">Nombre Usuario</option>
          <option value="email">Correo Electrónico</option>
          <option value="nombreRol">Nombre Rol</option>
          <option value="nombreFacultad">Nombre Facultad</option>
        </Form.Select>
      </InputGroup>
      <Table striped bordered hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerUserTableText">
            <th>#</th>
            <th>Nombre Completo</th>
            <th>Nombre Usuario</th>
            <th>Email</th>
            <th>Cuenta Activada</th>
            <th>Rol</th>
            <th>Facultad</th>
            <th>Creacion de Cuenta</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(({idUsuario, nombreCompleto, nombreUsuario, emailUsuario, cuentaActivada, nombreFacultad, nombreRol, fechaCreacionCuenta}, id) =>
            <UsersCell key={id} idUsuario={idUsuario} index={++index} nombreCompleto={nombreCompleto} nombreUsuario={nombreUsuario}
              email={emailUsuario} cuentaActivada={cuentaActivada} facultad={nombreFacultad} rol={nombreRol} cuenta={fechaCreacionCuenta}/>)}
        </tbody>
      </Table>
    </section>
  );
}

export default UserAdmin;