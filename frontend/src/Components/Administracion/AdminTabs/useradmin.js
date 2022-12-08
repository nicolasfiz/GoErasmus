import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import userServices from "../../../services/user";
import "./adminTables.css";

function UserAdmin() {

  // Almacenar tabla forma estatica
  const [usersTable, setUsersTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [users, setUsers] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const nav = useNavigate();

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = usersTable.filter(elem =>
      elem.cuentaActivada.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.emailUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreRol.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()));
    setUsers(searchResult);
  }

  const removeUser = (id) => {
    userServices.deleteUser(id).then(() => {
      const usr = users.filter(user => id !== user.idUsuario);
      setUsers(usr);
      toast.success("Usuario eliminado");
    })
  }

  useEffect(() => {
    userServices.getUsers().then(usr => {
      setUsers(usr);
      setUsersTable(usr);
    });
  }, []);

  return ( users.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <InputGroup className="mb-3">
        <input className="form-control" value={search} type="text" placeholder="Buscar usuario..." onChange={handleChange} />
      </InputGroup>
      <Table striped hover style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Imagen</th>
            <th>Facultad</th>
            <th>Rol</th>
            <th>¿Activada?</th>
            <th>Fecha creación</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(({idUsuario, nombreCompleto, nombreUsuario, emailUsuario, imagenPerfil, cuentaActivada, nombreFacultad, nombreRol, fechaCreacionCuenta}, id) => 
            <tr key={id} className="centerTableText">
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{++index}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreCompleto}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{emailUsuario}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreUsuario}</td>
              <td>{imagenPerfil ? <a target="_blank" style={{textDecoration: "none"}} href={imagenPerfil} rel="noreferrer">Consultar</a>: '-'}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreFacultad}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{nombreRol}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{cuentaActivada}</td>
              <td style={{cursor: "pointer"}} onClick={() => nav(`/perfil/${nombreUsuario}`) }>{fechaCreacionCuenta}</td>
              <td>
                <Button 
                  variant="outline-danger"
                  style={{cursor:"pointer", display: "block", margin: "auto"}}
                  onClick={() => removeUser(idUsuario) }>
                    Eliminar
                </Button>
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
          <input className="form-control" value={search} type="text" placeholder="Buscar usuario..." onChange={handleChange} />
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

export default UserAdmin;