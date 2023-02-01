import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import achievementServices from "../../../services/achievement.service";
import "./adminTables.css";

function AchievementAdmin() {

  // Almacenar tabla forma estatica
  const [achievementsTable, setAchievementsTable] = useState([]);

  // Almacenar datos que arroje la busqueda de forma dinamica
  const [achievements, setAchievements] = useState([]);

  // Controlar lo que se escribe en la barra de busqueda
  const [search, setSearch] = useState("");

  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = achievementsTable.filter(elem =>
      elem.nombreLogro.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.descripcionLogro.toLowerCase().includes(searchTerm.toLowerCase())
      ||elem.nombreRol.toLowerCase().includes(searchTerm.toLowerCase()));
    setAchievements(searchResult);
  }

  const createNewAchievement = () => {
    console.log("nuevo");
  }

  const updateAchievement = (idLogro) => {
    console.log(idLogro);
  }

  const removeAchievement = (id) => {
    achievementServices.deleteAchievement(id).then(() => {
      const ach = achievements.filter(l => id !== l.idLogro);
      setAchievements(ach);
      toast.success("Logro eliminado");
    })
  }

  useEffect(() => {
    achievementServices.getAchievements().then(ach => {
      setAchievements(ach);
      setAchievementsTable(ach);
    });
  }, []);

  return ( achievements.length !== 0 ?
    (<section className="contentTable" onLoad={() => {setSearch("")}}>
      <Toaster/>
      <div style={{display: "flex", margin: "0", padding:"0", marginBottom:"1em", marginTop:"1em"}}>
        <InputGroup>
          <input className="form-control" value={search} type="text" placeholder="Buscar logro..." onChange={handleChange} />
        </InputGroup>
        <Button
          style={{marginLeft:"1em"}}
          variant="outline-success"
          onClick={createNewAchievement}>
            Añadir
        </Button>
      </div>
      <Table striped hover bordered style={{marginTop: "50px", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px"}}>
        <thead>
          <tr className="centerTableText">
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Rol</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {achievements && achievements.map(({idLogro, nombreLogro, descripcionLogro, urlImagenLogro, nombreRol}, id) => 
            <tr key={id} className="centerTableText">
              <td>{++index}</td>
              <td>{nombreLogro}</td>
              <td>{descripcionLogro}</td>
              <td><a target="_blank" style={{textDecoration: "none"}} href={urlImagenLogro} rel="noreferrer">Consultar</a></td>
              <td>{nombreRol}</td>
              <td>
                <div style={{display: "flex", gap: "20px", justifyContent: "center"}}>
                  <Button 
                    variant="outline-secondary"
                    style={{cursor:"pointer"}}
                    onClick={() => updateAchievement(idLogro) }>
                      Editar
                  </Button>
                  <Button 
                    variant="outline-danger"
                    style={{cursor:"pointer"}}
                    onClick={() => removeAchievement(idLogro) }>
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
            <input style={{width: "60%"}} className="form-control" value={search} type="text" placeholder="Buscar logro..." onChange={handleChange} />
          </InputGroup>
          <Button
            style={{marginLeft:"1em"}}
            variant="outline-success"
            onClick={createNewAchievement}>
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

export default AchievementAdmin;