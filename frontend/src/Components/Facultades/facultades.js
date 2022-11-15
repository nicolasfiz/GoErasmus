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

  return (
    <main className="facultyTable">
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
    </main>
  );
}

export default Facultades;