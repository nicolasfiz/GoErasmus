import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyImage from "../../assets/mundobyn.png";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiUser, BiUserPlus, BiLogOut } from "react-icons/bi";
import './navbar.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { GiProgression } from "react-icons/gi";
import tokenService from "../../services/token.service"

function Navegador({ user }) {
  let navigate = useNavigate();

  const routeChange = (dest) => {
    //let path = `login`;
    navigate(dest);
  }

  const cerrarSesion = () => {
    tokenService.removeToken()
    window.location.replace(process.env.REACT_APP_DIRECCIONES)
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top" >
      <Container >
        <Link to="" className='navbar-brand'>G<img src={MyImage} width={17} height={20} style={{ paddingBottom: 3.2, paddingTop: 0 }} alt="mundoLogo" />Erasmus</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <Nav className="me-auto">
              <Link to="search" className='nav-link'>Buscar</Link>
              <Link to="paises" className='nav-link'>Descubrir</Link>
              <Link to="articulos" className="nav-link">Artículos</Link>
              <Link to="panelAdministracion" className='nav-link'>Panel de Administración</Link>
            </Nav>
          ) :
            (
              <Nav className='me-auto'>
              </Nav>
            )}
          {!user ? (<OverlayTrigger
            key={'Inicio Sesion'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Iniciar sesión
              </Tooltip>
            }
          >
            <Button variant="outline-dark" onClick={() => routeChange("signIn")} className="rounded-circle custom-button"><BiUserPlus /></Button>
          </OverlayTrigger>) : (null)}

          {/*<OverlayTrigger
            key={'Perfil'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Ver un perfil
              </Tooltip>
            }
          >
            <Button variant="outline-dark" onClick={() => routeChange("perfil/nfiz")} className="rounded-circle custom-button"><BiUserCheck /></Button>
          </OverlayTrigger>*/}

          {user ? (<OverlayTrigger
            key={'editPerfil'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Configurar mi perfil
              </Tooltip>
            }
          >
            <Button variant="outline-dark" onClick={() => routeChange("editPerfil")} className="rounded-circle custom-button"><BiUser /></Button>
          </OverlayTrigger>): (null)}
          
          {user ? (<OverlayTrigger
            key={'Logros'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Mi progreso
              </Tooltip>
            }
          >
            <Button variant="outline-dark" onClick={() => routeChange("progreso")} className="rounded-circle custom-button"><GiProgression /></Button>
          </OverlayTrigger>):(null)}

          {user ? (<OverlayTrigger
            key={'cerrarSesion'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Cerrar sesión
              </Tooltip>
            }
          >
            <Button variant="outline-primary" onClick={() => cerrarSesion()} className="rounded-circle custom-button" style={{marginLeft: '2rem'}}><BiLogOut /></Button>
          </OverlayTrigger>): (null)}
          
        </Navbar.Collapse>
      </Container>

    </Navbar>
  );
}

export default Navegador;