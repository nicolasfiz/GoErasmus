import { useEffect, useState } from "react";
import { Button, InputGroup, Table } from "react-bootstrap";
import achievementServices from "../../../services/achievement.service";
import "./achievementadmin.css";

const  AchievementsCell = ({index, nombre, descripcion, url, rol}) => {

  return  (<>
            <tr style={{verticalAlign: "middle"}}>
              <td className="centerUserTableText">{index}</td>
              <td>{nombre}</td>
              <td>{descripcion}</td>
              <td>{url}</td>
              <td>{rol}</td>
              <td> <Button
                     variant="secondary"
                     style={{marginLeft: "10px"}}>
                     Editar
                   </Button>
                   <Button
                     variant="danger"
                     style={{marginLeft: "10px"}}>
                     Eliminar
                   </Button>
              </td>
            </tr>
          </>);
}

function AchievementAdmin() {

  const [achievements, setAchievements] = useState([]);
  let index = 0;

  useEffect(() => {
    achievementServices.getAchievements().then(achievement => {
      setAchievements(achievement);
    });
  }, []);

  return (
    <section className="achievementsTable">
      <InputGroup className="mb-3">
        <input style={{width:"60%"}} className="form-control" type="text" placeholder="Buscar logro..." onKeyPress={e => {if (e.key === 'Enter') console.log("hola") }}></input>
      </InputGroup>
      <Table striped bordered hover style={{marginTop: "50px", boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"}}>
        <thead>
          <tr className="centerAchievementTableText">
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>URL Imagen</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {achievements.map(({nombreLogro, descripcionLogro, urlImagenLogro, nombreRol}, id) =>
            <AchievementsCell key={id} index={++index} nombre={nombreLogro} descripcion={descripcionLogro} url={urlImagenLogro} rol={nombreRol} />)}
        </tbody>
      </Table>
    </section>
  );
}

export default AchievementAdmin;