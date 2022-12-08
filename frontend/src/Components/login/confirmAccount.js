import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import authServices from "../../services/auth.service";

function ConfirmAccount() {
  const params = useParams();

  const nav = useNavigate();

  const confirmAndRedirect = () => {
    authServices.confirmAccount(params.token);
    nav('/');
  }

  return (
      <section style={{margin:"auto", textAlign: "center"}}>
        <div>
          <h2>¡Solo te queda un último paso!</h2>
          <h3>Pulsa el botón y serás oficialmente un miembro de nuestra comunidad</h3>
          <div style={{fontSize: "18px"}}>
            <p style={{marginTop:"1em", marginBottom:"0.25em"}}>Al pulsar el botón serás redireccionado a la página principal. A partir de ese instante empezará tu viaje, es decir, tu marcas tu propio ritmo.</p>
            <p style={{marginTop:"1em", marginBottom:"0.25em"}}>Podrás subir y descargar archivos, redactar artículos o incluso puedes intentar subir de rango. </p>
            <p style={{marginTop:"1em", marginBottom:"2.5em"}}>Nosotros te recomendamos que tengas tu pasaporte actualizado que, en otras palabras, sería configurar tu perfil. Puede que consigas algo interesante.</p>
            <Button variant="primary" size="lg" onClick={confirmAndRedirect}>Activar cuenta</Button>
          </div>
        </div>
      </section>)
}
export default ConfirmAccount;