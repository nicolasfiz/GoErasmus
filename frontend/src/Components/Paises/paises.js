import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import countryService from "../../services/country.service";
import './paises.css';

const  CountryCard = ({nombre, urlBandera}) => {

  const nav = useNavigate();

  return (
      <Card style={{ width: '18rem' }}>
      <Card.Img style={{boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.15), -2px -2px 12px rgba(0, 0, 0, 0.15)'}}variant="top" src={urlBandera} />
      <Card.Body className="d-grid gap-2">
        <Button size="lg" variant="primary" onClick={() => {nav(`/${nombre}/`)}}>{nombre}</Button>
      </Card.Body>
    </Card>
  );
}

function Paises() {

    const [paises, setPaises] = useState([]);

    useEffect(() => {
      countryService.getCountries().then(countries => {
        setPaises(countries);
      });
    }, []);

    return <main>
      <div className="countryContainer">
        {paises.map(({nombrePais, urlBandera}, id) =>  <CountryCard key={id} nombre={nombrePais} urlBandera={urlBandera}/>)}
      </div>
    </main>;
}

export default Paises;