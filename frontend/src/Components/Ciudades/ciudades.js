import { useEffect, useState } from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import cityServices from "../../services/city.service";
import universityServices from "../../services/university.service";
import './ciudades.css';

const UniversityCard = ({nombre, urlLogo}) => {

  const nav = useNavigate();

  return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={urlLogo} />
      <Card.Body className="d-grid gap-2">
        <Button size="lg" variant="primary" onClick={() => {nav(`${nombre}/facultades`)}}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
}

const Universidad =  () => {

  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    universityServices.getCountries().then(universities => {
      setUniversidades(universities);
    });
  });

  return <main>
    <h2>Selecciona una universidad</h2>
    <div className="container">
      {universidades.map(({nombre, urlLogo}, id) =>  <UniversityCard key={id} nombre={nombre} urlLogo={urlLogo}/>)}
    </div>
  </main>;
}

function Ciudad() {

    return <main>
      <Tabs
        defaultActiveKey="informacion"
        id="informacion-universidades-articulos"
        className="mb-3"
        fill
      >
        <Tab eventKey="informacion" title="Información">
          
        </Tab>
        <Tab eventKey="universidades" title="Universidades">
          <Universidad />
        </Tab>
        <Tab eventKey="articulos" title="Artículos" disabled>
      
        </Tab>
      </Tabs>
    </main>
}

export default Ciudad;