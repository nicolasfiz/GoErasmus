import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ArticleCard ({id, titulo, caption, url, fecha}) {
    const nav = useNavigate()
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body className="d-grid gap-2">
        <Card.Title>{titulo}</Card.Title>
          <Card.Text>{caption.substring(0,100) + '...'}</Card.Text>
          <Button variant="primary" onClick={() => {nav(`/articulos/${id}`)}}>Seguir leyendo</Button>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Publicado el {fecha}</small>
          </Card.Footer>
      </Card>
    )
  }

export default ArticleCard