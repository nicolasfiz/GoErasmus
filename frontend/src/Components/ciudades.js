import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Articulos() {
    return (
      <Container>
        <main>
          <h2>Estas en ciudades auuuu</h2>
          <p>
            BOOOf
          </p>
        </main>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
      </Container>
    );
}

export default Articulos;