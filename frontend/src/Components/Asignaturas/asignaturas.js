import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import subjectServices from "../../services/subject.service";

const  SubjectCell = ({index, nombreAsignatura}) => {

  const nav = useNavigate();

  return <>
           <tr>
             <td>{index}</td>
             <td onClick={() => nav(`/asignatura/${nombreAsignatura}`) }>{nombreAsignatura}</td>
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre de la asignatura</th>
        </tr>
      </thead>
      <tbody>
        {asignaturas.map(({nombreAsignatura}, id) => <SubjectCell key={id} index={++index} nombreAsignatura={nombreAsignatura} />)}
      </tbody>
    </Table>
  );
}

export default Asignaturas;