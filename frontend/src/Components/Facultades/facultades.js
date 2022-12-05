import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import facultyServices from "../../services/faculty.service";
import "./facultades.css"

const  FacultyCell = ({index, nombreFacultad}) => {

  const nav = useNavigate();

  return <>
           <tr>
             <td className="centerTableText">{index}</td>
             <td onClick={() => { nav(`${nombreFacultad}/`); } }>{nombreFacultad}</td>
           </tr>
         </>;
}

function Facultades() {
  
  const params = useParams();
  const [facultades, setFacultades] = useState([]);
  let index = 0;

  useEffect(() => {
    facultyServices.getFacultiesByUniversityName(params.nombreUniversidad).then(faculties => {
      setFacultades(faculties);
    });
  }, [params.nombreUniversidad]);

  return ( facultades.length !== 0 ?
    <section className="facultyTable">
      <Table striped bordered hover className="shadowTable">
        <thead>
          <tr>
            <th className="centerTableText">#</th>
            <th>Nombre de la facultad</th>
          </tr>
        </thead>
        <tbody>
          {facultades.map(({nombreFacultad}, id) => <FacultyCell key={id} index={++index} nombreFacultad={nombreFacultad} />)}
        </tbody>
      </Table>
    </section> :
    (<section style={{margin:"auto", marginTop: "50px", width:"90%"}}>
        <h2>Hmmm...</h2>
        <h3>Parece que no tenemos ningún resultado para <i style={{fontWeight: "bold"}}>{params.nombreUniversidad}</i></h3>
        <p style={{margin:"0"}}>Por favor, presione <a style={{textDecoration: "none"}} href="../">este</a> enlace para volver a {params.nombreCiudad}</p>
      </section>)
  );
}

export default Facultades;