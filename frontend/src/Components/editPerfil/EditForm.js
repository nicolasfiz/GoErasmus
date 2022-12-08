import './editPerfil.css';
import anonimo from "../../assets/ImagenesUsers/anonimo.png";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { useState, useEffect } from 'react';
import perfilService from "../../services/user";

const EditForm = ({ datos, nuevosD, ubicacion, imagen, handleChanges, toSave, valido, handleImage, handleUbicacion, pass2, handlePass2}) => {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([])
    const [universidades, setUniversidades] = useState([])
    const [facultades, setFacultades] = useState([])
    const [ciudad, setCiudad] = useState(ubicacion.pais.length > 0)
    const [universidad, setUniversidad] = useState(ubicacion.ciudad.length > 0)
    const [facultad, setFacultad] = useState(ubicacion.universidad.length > 0)
    const [pais, setPais] = useState(true);

    useEffect(() => {
        if(datos.facultad!=null){
            perfilService
            .getCiudades(datos.pais)
            .then(result => {
                setCiudades(result);
            })
            perfilService
            .getUniversidades(datos.ciudad)
            .then(result => {
                setUniversidades(result);
            })
            perfilService
            .getFacultades(datos.universidad)
            .then(result => {
                setFacultades(result);
            })
            
        }
        perfilService
            .getPaises()
            .then(response => {
                setPaises(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [datos]);

    const changePais = async (elem) => {
        setPais(false)
        setCiudad(false)
        setUniversidad(false)
        setFacultad(false)
        perfilService
            .getCiudades(elem.value)
            .then(result => {
                setCiudades(result);
                handleUbicacion('pais', elem.value)
                setPais(true)
                setCiudad(true)
            })
            .catch(error =>
                console.log(error)
            );
    }
    const changeCiudad = (elem) => {
        setUniversidad(false)
        setFacultad(false)
        perfilService
            .getUniversidades(elem.value)
            .then(result => {
                setUniversidades(result);
                handleUbicacion('ciudad', elem.value)
                setUniversidad(true)
            })
            .catch(error =>
                console.log(error)
            );

    }
    const changeUniversidad = (elem) => {
        setFacultad(false)
        perfilService
            .getFacultades(elem.value)
            .then(result => {
                setFacultades(result);
                handleUbicacion('universidad', elem.value);
                setFacultad(true)
            })
            .catch(error =>
                console.log(error)
            );
    }
    const changeFacultad = (elem) => {
        handleUbicacion('facultad', elem.value)
    }
    return (
        <form className='formPerfil' onSubmit={toSave}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                {datos.urlFotoPerfil == null ? <img src={anonimo} width={171} height={180} alt="imagenUser" /> : <img src={datos.urlFotoPerfil} width={171} height={180} alt="imagenUser" />}
                <label className='labelInput'>
                    <p style={{color: '#4193ef', marginTop: '4px'}}>Cambiar foto de perfil</p>
                    <input id="inputTag" className='input' type="file" name="route" onChange={handleImage} />
                    {imagen? <p style={{color: '#4ba672'}}>{imagen.name}</p>:null}
                </label>
            </div>
            <section className='campos'>
                <div className="apartado">
                    <h3>Nombre de usuario </h3>
                    <input className='field' name="nombreUsuario" value={nuevosD.nombreUsuario} placeholder={datos.nombreUsuario} onChange={handleChanges} />
                    {nuevosD.nombreUsuario.length > 15 ? (<p className='error'>El nombre de usuario no puede tener mas de 15 caracteres</p>) : null}
                </div>
                <div className="apartado">
                    <h3>Email</h3>
                    <input className='field' name="email" value={nuevosD.email} placeholder={datos.email} onChange={handleChanges} />
                    {nuevosD.email.length > 0 && !validEmail.test(nuevosD.email) ? (<p className='error'>El email no es válido</p>) : null}
                </div>
                <div className="apartado">
                    <h3>Contraseña</h3>
                    <input type={"password"} className='field' name="pass" value={nuevosD.pass} placeholder={"Nueva contraseña"} onChange={handleChanges} />
                    {nuevosD.pass.length>0 &&(nuevosD.pass.length < 5 || nuevosD.pass.length > 20) ? (<p className='error'>La contraseña debe tener entre 5 y 20 caracteres</p>) : null}
                    <input type={"password"} style={{marginTop: '1rem'}} className='field' name="pass2" value={pass2} placeholder={"Repetir nueva contraseña"} onChange={handlePass2} />
                    {nuevosD.pass.length > 0 && nuevosD.pass !== pass2 ? (<p className='error'>Las contraseñas deben ser iguales</p>) : null}
                </div>
                <div className='apartado'>
                    <h3>Donde ha estudidado</h3>
                    {pais ? <Dropdown className="dropdown" options={paises} value={ubicacion.pais} name="pais" onChange={changePais} placeholder="Selecciona un país" /> : null}
                    {ciudad ? <Dropdown className="dropdown" value={ubicacion.ciudad} options={ciudades} name="ciudad" onChange={changeCiudad} placeholder="Selecciona una ciudad" /> : null}
                    {ciudad && universidad ? <Dropdown className="dropdown" value={ubicacion.universidad} options={universidades} name="universidad" onChange={changeUniversidad} placeholder="Selecciona una universidad" /> : null}
                    {ciudad && universidad && facultad ? <Dropdown className="dropdown" value={ubicacion.facultad} options={facultades} name="facultad" onChange={changeFacultad} placeholder="Selecciona un facultad" /> : null}
                    {(!ubicacion.pais || !ubicacion.ciudad || !ubicacion.universidad || !ubicacion.facultad) ? <p className='error'>Debes seleccionar donde estudiaste</p> : null}
                </div>
            </section>
            <Button type="submit" variant="dark" disabled={!valido}>Guardar</Button>
        </form>
    )
}

export default EditForm;