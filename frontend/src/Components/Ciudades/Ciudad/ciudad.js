import { useEffect, useState } from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import universityServices from "../../../services/university.service";
import cityServices from "../../../services/city.service";
import "./ciudad.css"

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

const Universidad =  () => {

  const params = useParams();
  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    universityServices.getUniversitiesByCityName(params.nombreCiudad).then(universities => {
      setUniversidades(universities);
    });
  }, [params.nombreCiudad]);

  return <main>
    <div className="cityContainer">
      {universidades.map(({nombreUniversidad, urlLogo}, id) =>  <UniversityCard key={id} nombre={nombreUniversidad} urlLogo={urlLogo}/>)}
    </div>
  </main>;
}

const Paragraph = ({img, cityName, text}) => {

  const paragraphs = text.split('\n');

  return (
    <>
    <img className="paragraphCab" src={img} alt={cityName} title={cityName} />
    {paragraphs.map(paragraph => <><p> {paragraph} </p><br /></>)}
    </>
  );
}

const InformacionCiudad = () => {

  const params = useParams();
  const [ciudad, setCiudad] = useState([]);

  useEffect(() => {
    cityServices.getCityByName(params.nombreCiudad).then(city => {
      setCiudad(city);
    })

  }, [params.nombreCiudad]);

  return (<>
            <section>
              {ciudad.map(({urlCabecera, nombre, informacion}, id) => <Paragraph key={id} img={urlCabecera} cityName={nombre} text={informacion} />)}
              <hr />
            </section>
            <section>
              <p>que dise tu</p>
            </section>
          </>
  );
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
          <InformacionCiudad />
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