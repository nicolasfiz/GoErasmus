import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Usuarios from './usuarios/Usuarios';
import Asignaturas from './asignaturas/Asignaturas'
const Buscador = () => {
    return (
        <div style={{marginTop: '1rem'}}>
            <Tabs
                defaultActiveKey="Asignaturas"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Asignaturas" title="Asignaturas">
                    <Asignaturas />
                </Tab>
                <Tab eventKey="Personas" title="Personas">
                    <Usuarios />
                </Tab>
            </Tabs>
        </div>
    )
}

export default Buscador