import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
//import toast from 'react-hot-toast'
import userServices from "../../../services/user"
import "./adminTables.css"

function UserAdmin() {

  // Almacenar tabla forma estatica
  const [usersTable, setUsersTable] = useState([])

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [users, setUsers] = useState([])

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("")

  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = usersTable.filter(elem =>
      elem.cuentaActivada.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.emailUsuario.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreRol.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()))
    setUsers(searchResult)
  }

  const removeUser = (id) => {
    userServices.deleteUser(id).then(() => {
      const usr = users.filter(user => id !== user.idUsuario)
      setUsers(usr)
      // toast.success("Usuario eliminado")
    })
  }

  useEffect(() => {
    userServices.getUsers().then(usr => {
      setUsers(usr)
      setUsersTable(usr)
    })
  }, [])

  return (
  <>
    <section className = "contentTable flex">
      <input
        type        = "text"
        className   = "form-control"
        value       = {search}
        placeholder = "Buscar usuario..."
        onLoad      = { () => {setSearch("")} }
        onChange    = {handleChange}
      />
    </section>
    {( users.length !== 0 ? (
      <section className = "contentTable">
        <Table striped hover bordered className = "centerTableText tableShadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Cuenta</th>
              <th>Fecha creación</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({idUsuario, nombreCompleto, nombreUsuario, emailUsuario, cuentaActivada, nombreRol, fechaCreacionCuenta}, id) => 
              <tr key={id}>
                <td>{++index}</td>
                <td>{nombreCompleto}</td>
                <td>{emailUsuario}</td>
                <td>{nombreUsuario}</td>
                <td>{nombreRol}</td>
                <td>{cuentaActivada === 'Si' ? 'Activada' : 'No Activada'}</td>
                <td>{fechaCreacionCuenta}</td>
                <td>
                  <div className = "buttonGroup">
                    <Button 
                      variant="outline-primary"
                      onClick={() => window.open(`${process.env.REACT_APP_DIRECCIONES}perfil/${nombreUsuario}`, "_blank")}
                    >
                        Consultar
                    </Button>
                    <Button 
                      variant="outline-danger"
                      onClick={() => removeUser(idUsuario) }>
                        Eliminar
                    </Button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </Table>
      </section>) : (
      <section className = "contentTable">
        <h2>Hmmm...</h2>
        <h3>No pudimos encontrar ninguna coincidencia para el término "{search}"</h3>
        <span className  = "noResultsText">
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

export default UserAdmin