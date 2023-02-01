import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import tokenServices from "../../services/token.service";
import authServices from "../../services/auth.service";
import UserAdmin from "./AdminTabs/useradmin";
import RoleAdmin from "./AdminTabs/roleadmin";
import AchievementAdmin from "./AdminTabs/achievementadmin";
import CountryAdmin from "./AdminTabs/Country/countryadmin";
import CityAdmin from "./AdminTabs/City/cityadmin";
import UniversityAdmin from "./AdminTabs/University/universityadmin";
import FacultyAdmin from "./AdminTabs/Faculty/facultyadmin";
import SubjectAdmin from "./AdminTabs/Subject/subjectadmin";
import FileAdmin from "./AdminTabs/fileadmin";
import CommentAdmin from "./AdminTabs/commentadmin";
import ArticleAdmin from "./AdminTabs/articleadmin";

function Administracion() {

  const [tokenRole, setTokenRole] = useState([]);

  useEffect(() => {
    tokenServices.getToken().then(t => {
      authServices.getAccount(t).then(d =>{
        setTokenRole(d.rol);
      });
    });
  }, []);

  return ( tokenRole && tokenRole === 'Administrador' ?
  (<section>
    <Tabs
      defaultActiveKey="usuarios"
      id="admin-panel-admins"
      className="mb-3"
      fill
    >
      <Tab eventKey="articulos" title="Articulos">
        <ArticleAdmin />
      </Tab>
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
        <CountryAdmin />
      </Tab>
      <Tab eventKey="ciudades" title="Ciudades">
        <CityAdmin />
      </Tab>
      <Tab eventKey="universidades" title="Universidades">
        <UniversityAdmin />
      </Tab>
      <Tab eventKey="facultades" title="Facultades">
        <FacultyAdmin />
      </Tab>
      <Tab eventKey="asignaturas" title="Asignaturas">
        <SubjectAdmin />
      </Tab>
      <Tab eventKey="archivos" title="Archivos">
        <FileAdmin />
      </Tab>
      <Tab eventKey="comentarios" title="Comentarios">
        <CommentAdmin />
      </Tab>
    </Tabs>
  </section>) :
  (<section>
    <Tabs
      defaultActiveKey="articulos"
      id="admin-panel-globetrotters"
      className="mb-3"
      fill
    >
      <Tab eventKey="articulos" title="Articulos">
        <ArticleAdmin />
      </Tab>
      <Tab eventKey="paises" title="Paises">
        <CountryAdmin />
      </Tab>
      <Tab eventKey="ciudades" title="Ciudades">
        <CityAdmin />
      </Tab>
      <Tab eventKey="universidades" title="Universidades">
        <UniversityAdmin />
      </Tab>
      <Tab eventKey="facultades" title="Facultades">
        <FacultyAdmin />
      </Tab>
      <Tab eventKey="asignaturas" title="Asignaturas">
        <SubjectAdmin />
      </Tab>
      <Tab eventKey="archivos" title="Archivos">
        <FileAdmin />
      </Tab>
    </Tabs>
  </section>));
}

export default Administracion;