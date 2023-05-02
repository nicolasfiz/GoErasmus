import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

function ArticleCard ({id, titulo, caption, url, fecha}) {
    const nav = useNavigate()
    const captionResume = caption.substring(0,145) + '...'
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body className="d-grid gap-2">
        <Card.Title>{titulo}</Card.Title>
          <Card.Text><ReactMarkdown children={captionResume} /></Card.Text>
          <Button variant="primary" onClick={() => {nav(`/articulos/${id}`)}}>Seguir leyendo</Button>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Publicado el {fecha}</small>
          </Card.Footer>
      </Card>
    )
  }

export default ArticleCard