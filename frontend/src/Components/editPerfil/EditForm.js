import './editPerfil.css';
import anonimo from "../../assets/ImagenesUsers/anonimo.png";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { useState, useEffect } from 'react';
import perfilService from "../../services/user";

const EditForm = ({ datos, nuevosD, handleChanges, toSave, valido }) => {
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const [paises, setPaises] = useState([]);
    const [ciudades, setCiudades] = useState([])
    const [universidades, setUniversidades] = useState([])
    const [facultades, setFacultades] = useState([])
    const [selectedPais, setSelectedPais] = useState(null)
    const [selectedCiudad, setSelectedCiudad] = useState(null)
    const [selectedUniversidad, setSelectedUniversidad] = useState(null)
    const [selectedFacultad, setSelectedFacultad] = useState(null)


    useEffect(() => {
        perfilService
            .getPaises()
            .then(response => {
                console.log(response)
                setPaises(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const changePais = (elem) => {
        perfilService.
            getCiudades(elem.value).
            then(result => {
                setCiudades(result);
                setSelectedPais(elem.value);
            })
            .catch(error =>
                console.log(error)
            );
    }
    const changeCiudad = (elem) => {
        perfilService.
            getUniversidades(elem.value).
            then(result => {
                setUniversidades(result);
                setSelectedCiudad(elem.value);
            })
            .catch(error =>
                console.log(error)
            );

    }
    const changeUniversidad = (elem) => {
        perfilService.
            getFacultades(elem.value).
            then(result => {
                setFacultades(result);
                setSelectedUniversidad(elem.value);
            })
            .catch(error =>
                console.log(error)
            );
    }
    const changeFacultad = (elem) => {
        setSelectedFacultad(elem.value)
    }
    return (
        <form className='formPerfil' onSubmit={toSave}>
            <div className="apartado">
                {datos.urlFotoPerfil == null ? <img src={anonimo} width={171} height={180} alt="imagenUser" /> : <img src={datos.urlFotoPerfil} width={171} height={180} alt="imagenUser" />}
            </div>
            <div className='apartado'>
                <input className='field' type="file" style={{ marginTop: "2vh" }} name="route" value={nuevosD.file} onChange={handleChanges} />
            </div>
            <section className='campos'>
                <div className="apartado">
                    <h3>Nombre de usuario: </h3>
                    <input className='field' name="nombre" value={nuevosD.nombre} placeholder={datos.nombre} onChange={handleChanges} />
                    {nuevosD.nombre.length > 15 ? (<p className='error'>El nombre de usuario no puede tener mas de 15 caracteres</p>) : null}
                </div>
                <div className="apartado">
                    <h3>Email:</h3>
                    <input className='field' name="email" value={nuevosD.email} placeholder={datos.email} onChange={handleChanges} />
                    {nuevosD.email.length > 0 && !validEmail.test(nuevosD.email) ? (<p className='error'>El email no es válido</p>) : null}
                </div>
                <div className='apartado'>
                    <h3>Donde ha estudidado:</h3>
                    <Dropdown className="dropdown" options={paises} name="pais" onChange={changePais} placeholder="Selecciona un país" />
                    {selectedPais ? <Dropdown className="dropdown" options={ciudades} name="pais" onChange={changeCiudad} placeholder="Selecciona una ciudad" /> : null}
                    {selectedCiudad ? <Dropdown className="dropdown" options={universidades} name="pais" onChange={changeUniversidad} placeholder="Selecciona una universidad" /> : null}
                    {selectedUniversidad ? <Dropdown className="dropdown" options={facultades} name="pais" onChange={changeFacultad} placeholder="Selecciona un facultad" /> : null}
                </div>
            </section>
            <Button type="submit" variant="dark" disabled={!valido}>Guardar</Button>
        </form>
    )
}

export default EditForm;