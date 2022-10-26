import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Asignatura.css";

const Asignatura = () => {
  const nota = 3;
  return (
    <>
      <div style={{ margin: "2em", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Asignatura</h1>
        <div
          className="nota"
          style={
            nota > 5
              ? { background: "rgb(0, 245, 0)", borderColor: "rgb(0, 245, 0)" }
              : { background: "red", borderColor: "red" }
          }
        >
          <h2 style={{ color: "white" }}>7.5/10</h2>
        </div>
        <div style={{border:'1px solid', padding: '2rem'}}>
          <p>Pais: </p>
          <p>Ciudad:</p>
          <p>Facultad: </p>
        </div>
      </div>
      <Tabs
        defaultActiveKey="Comentarios"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Comentarios" title="Comentarios">
          <ul>
            <li>buenas</li>
            <li>tardes</li>
          </ul>
        </Tab>
        <Tab eventKey="Archivos" title="Archivos">
          <ul>
            <li>buenisimas</li>
            <li>mañanas</li>
          </ul>
        </Tab>
      </Tabs>
    </>
  );
};
export default Asignatura;
