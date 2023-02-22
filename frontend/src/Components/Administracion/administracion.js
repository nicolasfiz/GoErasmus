import { useEffect, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import ArticleAdmin from "./AdminTabs/articleadmin"
import UserAdmin from "./AdminTabs/useradmin"
import RoleAdmin from "./AdminTabs/roleadmin"
import AchievementAdmin from "./AdminTabs/achievementadmin"
import CountryAdmin from "./AdminTabs/Country/countryadmin"
import CityAdmin from "./AdminTabs/City/cityadmin"
import UniversityAdmin from "./AdminTabs/University/universityadmin"
import FacultyAdmin from "./AdminTabs/Faculty/facultyadmin"
import SubjectAdmin from "./AdminTabs/Subject/subjectadmin"
import FileAdmin from "./AdminTabs/fileadmin"
import CommentAdmin from "./AdminTabs/commentadmin"
import authServices from "../../services/auth.service"
import tokenServices from "../../services/token.service"
import { Toaster } from "react-hot-toast"

function Administracion() {

  const [tokenRole, setTokenRole] = useState([])

  useEffect(() => {
    tokenServices.getToken().then(t => {
      authServices.getAccount(t).then(d =>{
        setTokenRole(d.rol)
      })
    })
  }, [])

  return ( tokenRole && (tokenRole === 'Administrador' || tokenRole === 'Trotamundos')) ?
    <section>
      <Toaster />
      <Tabs
        defaultActiveKey="articulos"
        id="admin-panel-access"
        className="mb-3"
        fill
      >
        <Tab eventKey="articulos" title="Articulos">
          <ArticleAdmin />
        </Tab>
        {tokenRole === 'Administrador' ?
          <Tab eventKey="usuarios" title="Usuarios">
            <UserAdmin />
          </Tab> : null }
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
        { tokenRole === 'Administrador' ?
          <Tab eventKey="comentarios" title="Comentarios">
            <CommentAdmin />
          </Tab> : null
        }
        {tokenRole === 'Administrador' ?
          <Tab eventKey="roles" title="Roles">
            <RoleAdmin />
          </Tab> : null }
        {tokenRole === 'Administrador' ?
          <Tab eventKey="logros" title="Logros">
            <AchievementAdmin />
          </Tab> : null }
      </Tabs>
    </section> : null
}

export default Administracion