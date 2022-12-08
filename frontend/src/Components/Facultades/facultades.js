import { useEffect, useState } from "react";
import { InputGroup, Table } from "react-bootstrap";
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
  const [tablaFacultades, setTablaFacutades] = useState([]);
  const [facultades, setFacultades] = useState([]);
  const [search, setSearch] = useState("");
  let index = 0;

  const handleChange = e => {
    setSearch(e.target.value);
    filterSearch(e.target.value);
  }

  const filterSearch = (searchTerm) => {
    let searchResult = tablaFacultades.filter(elem =>
      elem.nombreFacultad.toLowerCase().includes(searchTerm.toLowerCase()));
    setFacultades(searchResult);
  }

  useEffect(() => {
    facultyServices.getFacultiesByUniversityName(params.nombreUniversidad).then(faculties => {
      setFacultades(faculties);
      setTablaFacutades(faculties);
    });
  }, [params.nombreUniversidad]);

  return ( facultades.length !== 0 ?
    <div
      style={{
        margin: "8rem 15rem 15rem 15rem",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "2rem"
      }}
    >
      <section className="facultyTable">
      <h2 style={{marginBottom:"1.3em", fontWeight:"bold"}}>{params.nombreUniversidad}</h2>
      <InputGroup className="mb-3">
        <input style={{marginBottom:"1em"}} className="form-control" value={search} type="text" placeholder="Buscar facultad..." onChange={handleChange} />
      </InputGroup>
        <Table striped bordered hover >
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
      </section>
    </div> : search !== "" ?
    (<>
      <div
      style={{
        margin: "1rem 15rem 1rem 15rem",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "2rem"
      }}
    >
      <section className="contentTable">
        <h2 style={{marginBottom:"1.3em", fontWeight:"bold"}}>{params.nombreUniversidad}</h2>
        <InputGroup className="mb-3">
          <input className="form-control" value={search} type="text" placeholder="Buscar facultad..." onChange={handleChange} />
        </InputGroup>
      </section>
      <section style={{ margin: "auto", marginTop: "50px", width: "80%" }}>
        <h2>Hmmm...</h2>
        <h3>No pudimos encontrar ninguna coincidencia para el término "{search}"</h3>
        <p style={{ margin: "0" }}>Compruebe su búsqueda para ver si hay errores tipográficos u ortográficos, o pruebe con otro término de búsqueda.</p>
      </section>
      </div>
    </>):
    (<section style={{margin:"auto", marginTop: "50px", width:"90%"}}>
        <h2>Hmmm...</h2>
        <h3>Parece que no tenemos ningún resultado para <i style={{fontWeight: "bold"}}>{params.nombreUniversidad}</i></h3>
        <p style={{margin:"0"}}>Por favor, presione <a style={{textDecoration: "none"}} href="../">este</a> enlace para volver a {params.nombreCiudad}</p>
      </section>)
  );
}

export default Facultades;