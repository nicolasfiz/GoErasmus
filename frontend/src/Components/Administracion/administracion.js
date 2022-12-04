import { Tab, Tabs } from "react-bootstrap";
import UserAdmin from "./User/useradmin";
import RoleAdmin from "./Role/roleadmin";
import AchievementAdmin from "./Achievement/achievementadmin";

function Administracion() {

    return <section>
      <Tabs
        defaultActiveKey="usuarios"
        id="admin-panel"
        className="mb-3"
        fill
      >
        <Tab eventKey="usuarios" title="Usuarios">
            <UserAdmin />
        </Tab>
        <Tab eventKey="roles" title="Roles">
            <RoleAdmin />
        </Tab>
        <Tab eventKey="logros" title="Logros">
            <AchievementAdmin />
        </Tab>
        <Tab eventKey="paises" title="Paises">

        </Tab>
        <Tab eventKey="ciudades" title="Ciudades">
      
        </Tab>
        <Tab eventKey="universidades" title="Universidades">

        </Tab>
        <Tab eventKey="facultades" title="Facultades">

        </Tab>
        <Tab eventKey="asignaturas" title="Asignaturas">
      
        </Tab>
        <Tab eventKey="articulos" title="Articulos">

        </Tab>
      </Tabs>
    </section>
}

export default Administracion;