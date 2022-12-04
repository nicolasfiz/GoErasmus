import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import subjectServices from "../../services/subject.service";
import "./asignaturas.css";
import "../Facultades/facultades.css";

const  SubjectCell = ({index, idAsignatura, nombreAsignatura}) => {

  const nav = useNavigate();

  return <>
           <tr>
             <td className="centerTableText">{index}</td>
             <td onClick={() => nav(`/asignatura/${idAsignatura}`) }>{nombreAsignatura}</td>
           </tr>
         </>;
}

function Asignaturas() {
  
  const params = useParams();
  const [asignaturas, setAsignaturas] = useState([]);
  let index = 0;

  useEffect(() => {
    subjectServices.getSubjectsByFacultyName(params.nombreFacultad).then(subjects => {
      setAsignaturas(subjects);
    });
  }, [params.nombreFacultad]);

  return (
    <main className="subjectTable">
      <Table striped bordered hover className="shadowTable">
        <thead>
          <tr>
            <th className="centerTableText">#</th>
            <th>Nombre de la asignatura</th>
          </tr>
        </thead>
        <tbody>
          {asignaturas.map(({idAsignatura, nombreAsignatura}, id) => <SubjectCell key={id} index={++index} idAsignatura={idAsignatura} nombreAsignatura={nombreAsignatura} />)}
        </tbody>
      </Table>
    </main>
  );
}

export default Asignaturas;