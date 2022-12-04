import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import universityServices from "../../services/university.service";

const UniversityCard = ({nombre, urlLogo}) => {
  const nav = useNavigate();
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={urlLogo} />
      <Card.Body className="d-grid gap-2">
        <Button size="lg" variant="primary" onClick={() => {nav(`${nombre}/`)}}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
}
  
function Universidades() {
  const params = useParams();
  const [universidades, setUniversidades] = useState([]);
  
  useEffect(() => {
    universityServices.getUniversitiesByCityName(params.nombreCiudad).then(universities => {
      setUniversidades(universities);
    });
  }, [params.nombreCiudad]);
  
  return (
  <main>
    <div className="cityContainer">
      {universidades.map(({nombreUniversidad, urlLogo}, id) =>  <UniversityCard key={id} nombre={nombreUniversidad} urlLogo={urlLogo}/>)}
    </div>
  </main>);
}

export default Universidades;