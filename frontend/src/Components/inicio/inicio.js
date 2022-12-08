import './inicio.css';
import { FcCollaboration, FcOpenedFolder, FcGlobe, FcBullish } from "react-icons/fc";
import { Link } from 'react-router-dom';

function Inicio({user}) {
  return (
    <>
      <section>
        <div className="head">
          <div className="boxHead">
            <h1>Bienvenido a GoErasmus</h1>
            <p><i>Una ayuda por y para estudiantes</i></p>
          </div>
        </div>
      </section>
      <section className="body">
        <div className="texto">
          <h2 className="titulos">¿Qué es GoErasmus?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae est felis. Etiam bibendum commodo venenatis. Etiam porttitor, nisi eu sollicitudin lobortis, purus augue gravida mi, nec semper purus lectus sit amet metus. Nulla aliquet, metus a posuere vehicula, mi lectus ornare metus, quis sagittis orci augue feugiat dolor. Sed dapibus erat ipsum, et congue tortor semper vel. Praesent egestas elit a neque porttitor egestas. Quisque fringilla vestibulum nisi, id porttitor risus condimentum vitae. Aliquam rhoncus purus ipsum, sit amet pulvinar felis rhoncus vitae. Nullam sagittis hendrerit mollis. Cras sagittis neque nec sapien finibus vulputate. Quisque elementum, orci id blandit tempor, magna nibh maximus tortor, sit amet congue elit ante id nisi. Nam mattis, ipsum eget luctus pellentesque, neque massa gravida est, a ullamcorper justo nibh ut mauris. Vestibulum vitae nisl scelerisque, tincidunt arcu vel, maximus sapien. Nulla in sem lorem. Vestibulum porta risus risus, quis molestie neque facilisis et</p>
        </div>
        <div className="servicios">
          <h2>¿Qué ofrecemos?</h2>
          <div className="contenedor">
            <div>
              <FcCollaboration size={70} />
              <h4>Comunicación</h4>
              <div className="texto">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus erat elit, at volutpat neque aliquet in. Etiam non mi magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum tempor nunc quis tortor feugiat, ac dapibus urna egestas. Quisque sed libero in mi imperdiet tincidunt. Curabitur non ipsum id mi pellentesque tempus blandit eget diam. Sed tempor tincidunt tempor. Sed vel nisl ligula. Vest</p>
              </div>
            </div>
            <div>
              <FcOpenedFolder size={70} />
              <h4>Apuntes y material</h4>
              <div className="texto">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus erat elit, at volutpat neque aliquet in. Etiam non mi magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum tempor nunc quis tortor feugiat, ac dapibus urna egestas. Quisque sed libero in mi imperdiet tincidunt. Curabitur non ipsum id mi pellentesque tempus blandit eget diam. Sed tempor tincidunt tempor. Sed vel nisl ligula. Vest</p>
              </div>
            </div>
            <div>
              <FcGlobe size={70} />
              <h4>Información de tu destino</h4>
              <div className="texto">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus erat elit, at volutpat neque aliquet in. Etiam non mi magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum tempor nunc quis tortor feugiat, ac dapibus urna egestas. Quisque sed libero in mi imperdiet tincidunt. Curabitur non ipsum id mi pellentesque tempus blandit eget diam. Sed tempor tincidunt tempor. Sed vel nisl ligula. Vest</p>
              </div>
            </div>
            <div>
              <FcBullish size={70} />
              <h4>Sistema de puntuación</h4>
              <div className="texto">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus erat elit, at volutpat neque aliquet in. Etiam non mi magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum tempor nunc quis tortor feugiat, ac dapibus urna egestas. Quisque sed libero in mi imperdiet tincidunt. Curabitur non ipsum id mi pellentesque tempus blandit eget diam. Sed tempor tincidunt tempor. Sed vel nisl ligula. Vest</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {user ? null : <section className="despedida">
        <div className="texto">
          <h2 className="titulos">Saber más</h2>
          <p>Si deseas conocernos mejor y disfrutar de todos nuestros servicios puedes registrarte <Link to="/signUp" className='link-primary'>aquí</Link></p>
          <p> </p>
        </div>
      </section>}
    </>
  );
}
export default Inicio;