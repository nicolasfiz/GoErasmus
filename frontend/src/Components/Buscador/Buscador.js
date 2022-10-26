import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Buscador = () => {
    return (
        <>
        <br />
        <Tabs
                defaultActiveKey="Asignaturas"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Asignaturas" title="Asignaturas">
                    <ul>
                        <li>buenas</li>
                        <li>tardes</li>
                    </ul>
                </Tab>
                <Tab eventKey="Personas" title="Personas">
                    <ul>
                        <li>buenisimas</li>
                        <li>mañanas</li>
                    </ul>
                </Tab>
            </Tabs>
            <div>
                <input type="text" />
            </div>
        </>
    )
}

export default Buscador