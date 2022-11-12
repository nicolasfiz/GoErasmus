import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import facultyServices from "../../services/faculty.service";

const  FacultyCell = ({index, nombreFacultad}) => {

  const nav = useNavigate();

  return <>
           <tr>
             <td>{index}</td>
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre de la facultad</th>
        </tr>
      </thead>
      <tbody>
        {facultades.map(({nombreFacultad}, id) => <FacultyCell key={id} index={++index} nombreFacultad={nombreFacultad} />)}
      </tbody>
    </Table>
  );
}

export default Facultades;