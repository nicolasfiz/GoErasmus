import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Articulos() {
    return (
      <Container>
        <main>
          <h2>Articulos sin tilde uwu</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
      </Container>
    );
}

export default Articulos;
