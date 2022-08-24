import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyImage from "../../assets/mundobyn.png";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GrLogin } from "react-icons/gr";
import './navbar.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Navegador() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `login`;
    navigate(path);
  }

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container >
        <Link to="" className='navbar-brand'>G<img src={MyImage} width={17} height={20} style={{ paddingBottom: 3 }} alt="mundoLogo" />Erasmus</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="ciudades" className="nav-link">Ciudades</Link>
            <Link to="articulos" className="nav-link">Articulos</Link>
          </Nav>

          <OverlayTrigger
            key={'bottom'}
            placement={'bottom'}
            overlay={
              <Tooltip id={`tooltip-${'bottom'}`}>
                Iniciar sesión
              </Tooltip>
            }
          >
            <Button variant="outline-dark" onClick={routeChange} className="rounded-circle custom-button"><GrLogin /></Button>
          </OverlayTrigger>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegador;