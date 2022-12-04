import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import cityServices from "../../services/city.service";
import './ciudades.css';

const  CityCard = ({nombre, urlCabecera}) => {

  const nav = useNavigate();

  return (
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={urlCabecera} />
      <Card.Body className="d-grid gap-2">
        <Button size="lg" variant="primary" onClick={() => {nav(`${nombre}/`)}}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
}

function Ciudades() {
    const params = useParams();
    const [ciudades, setCiudades] = useState([]);

    useEffect(() => {
      cityServices.getCitiesByCountryName(params.nombrePais).then(cities => {
        setCiudades(cities);
      });
    }, [params.nombrePais]);

    return <main>
      <div className="cityContainer">
        {ciudades.map(({nombreCiudad, urlCabecera}, id) =>  <CityCard key={id} nombre={nombreCiudad} urlCabecera={urlCabecera}/>)}
      </div>
    </main>;
}

export default Ciudades;