import './editPerfil.css';
import anonimo from "../../assets/ImagenesUsers/anonimo.png";
import Button from 'react-bootstrap/Button';

const EditForm = ({ datos, nuevosD, handleChanges, toSave, valido }) => {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    return (
        <form className='formPerfil' onSubmit={toSave}>
            <div className="apartado">
                {datos.route == null ? <img src={anonimo} width={171} height={180} alt="imagenUser" /> : <img src={datos.route} width={171} height={180} alt="imagenUser" />}
                <br></br>
                <input className='field' style={{ marginTop: "2vh" }} name="route" value={nuevosD.route} placeholder={datos.route} onChange={handleChanges}/>
            </div>
            <section className='campos'>
                <div className="apartado">
                    <h3>Nombre de usuario: </h3>
                    <input className='field' name="nombre" value={nuevosD.nombre} placeholder={datos.nombre} onChange={handleChanges} />
                    {nuevosD.nombre.length>15?(<p className='error'>El nombre de usuario no puede tener mas de 15 caracteres</p>): null}
                </div>
                <div className="apartado">
                    <h3>Email:</h3>
                    <input className='field' name="email" value={nuevosD.email} placeholder={datos.email} onChange={handleChanges} />
                    {nuevosD.email.length>0&&!validEmail.test(nuevosD.email)?(<p className='error'>El email no es válido</p>): null}
                </div>
                <div className="apartado">
                    <h3>Rango: </h3>
                    <i><p>{datos.rango}</p></i>
                </div>
                <div>
                    <h3>Donde ha estudidado:</h3>
                    <p>País:</p>
                    
                </div>
            </section>
            <Button type="submit" variant="dark" disabled={!valido}>Guardar</Button>
        </form>

    )
}

export default EditForm;