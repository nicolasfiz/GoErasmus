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

    return ( ciudades.length !== 0 ? (
    <section>
      <div className="cityContainer">
        {ciudades.map(({nombreCiudad, urlCabecera}, id) =>  <CityCard key={id} nombre={nombreCiudad} urlCabecera={urlCabecera}/>)}
      </div>
    </section>) :
    (<section style={{margin:"auto", marginTop: "50px", width:"90%"}}>
      <h2>Hmmm...</h2>
      <h3>Parece que no tenemos ningún resultado para <i style={{fontWeight: "bold"}}>{params.nombrePais}</i></h3>
      <p style={{margin:"0"}}>Por favor, presione <a style={{textDecoration: "none"}} href="../paises">este</a> enlace para volver a la lista de países.</p>
    </section>)
    );
}

export default Ciudades;