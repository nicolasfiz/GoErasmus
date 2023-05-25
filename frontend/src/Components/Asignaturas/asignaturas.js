import { useEffect, useState } from "react"
import { InputGroup, Table } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import subjectServices from "../../services/subject.service"
import "./asignaturas.css"
import "../Facultades/facultades.css"

const  SubjectCell = ({index, idAsignatura, nombreAsignatura}) => {

  const nav = useNavigate()

  return <>
          <tr>
            <td className="centerTableText">{index}</td>
            <td onClick={() => nav(`/asignatura/${idAsignatura}`) }>{nombreAsignatura}</td>
          </tr>
        </>
}

function Asignaturas() {
  
  const params = useParams()
  const [tablaAsignaturas, setTablaAsignaturas] = useState([])
  const [asignaturas, setAsignaturas] = useState([])
  const [search, setSearch] = useState("")
  let index = 0

  const handleChange = e => {
    setSearch(e.target.value)
    filterSearch(e.target.value)
  }

  const filterSearch = (searchTerm) => {
    let searchResult = tablaAsignaturas.filter(elem =>
      elem.nombreAsignatura.toLowerCase().includes(searchTerm.toLowerCase()))
    setAsignaturas(searchResult)
  }

  useEffect(() => {
    subjectServices.getSubjectsByFacultyName(params.nombreFacultad).then(subjects => {
      setAsignaturas(subjects)
      setTablaAsignaturas(subjects)
    })
  }, [params.nombreFacultad])

  return ( asignaturas.length !== 0 ?
    <div
      style={{
        margin: "8rem 15rem 15rem 15rem",
        boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "2rem"
      }}
    >
      <section className="subjectTable">
        <h2 style={{fontWeight:"bold"}}>{params.nombreUniversidad}</h2>
        <h4 style={{marginBottom:"1.3em"}}>{params.nombreFacultad}</h4>
        <InputGroup className="mb-3">
          <input style={{marginBottom:"1em"}} className="form-control" value={search} type="text" placeholder="Buscar asignatura..." onChange={handleChange} />
       </InputGroup>
        <Table striped bordered hover>
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
        <h2 style={{fontWeight:"bold"}}>{params.nombreUniversidad}</h2>
        <h4 style={{marginBottom:"1.3em"}}>{params.nombreFacultad}</h4>
        <InputGroup className="mb-3">
          <input className="form-control" value={search} type="text" placeholder="Buscar asignatura..." onChange={handleChange} />
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
        <h3>Parece que no tenemos ningún resultado para <i style={{fontWeight: "bold"}}>{params.nombreFacultad}</i></h3>
        <p style={{margin:"0"}}>Por favor, presione <a style={{textDecoration: "none"}} href="../">este</a> enlace para volver a la {params.nombreUniversidad}</p>
      </section>)
  )
}

export default Asignaturas