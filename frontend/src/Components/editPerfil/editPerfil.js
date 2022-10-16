import perfilService from "../../services/user";
import { useState, useEffect } from "react";
import "./editPerfil.css";
import EditForm from "./EditForm";

const EditPerfil = () => {
    const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let params = "1";
    const [datos, setDatos] = useState(null);
    const [valido, setValido] = useState(true);
    const [imagen, setImagen] = useState(null);
    const [nuevosD, setNuevos] = useState({
        nombre: '',
        email: '',
    });
    const [ubicacion, setUbicacion] = useState({
        pais: '',
        ciudad: '',
        universidad: '',
        facultad: ''
    })

    useEffect(() => {
        perfilService
            .getDatos(params)
            .then(response => {
                setDatos(response);
                setUbicacion({
                    pais: response[0].pais,
                    ciudad: response[0].ciudad,
                    universidad: response[0].universidad,
                    facultad: response[0].facultad
                })
            })
            .catch(error => {
                console.log(error);
            });
    }, [params]);

    const handleImage = (e) => {
        setImagen(e.target.files[0])
    }

    const handleUbicacion = (type, value) => {
        if (type === 'pais') {
            setUbicacion({
                [type]: value,
                ciudad: '',
                universidad: '',
                facultad: ''
            })
        }
        else {
            setUbicacion({
                ...ubicacion,
                [type]: value,
            })
        }

    }

    const handleChanges = ({ target }) => {
        const { name, value } = target;
        setNuevos({
            ...nuevosD,
            [name]: value,
        })
        if ((name === "nombre" && value.length > 15) || (name === "email" && value.length > 0 && !validEmail.test(value))) {
            setValido(false);
        } else {
            setValido(true);
        }
    }

    const save = (event) => {
        event.preventDefault()
        const bodyFormData = new FormData()
        bodyFormData.append("email", nuevosD.email)
        bodyFormData.append("nombreUsuario", nuevosD.nombre)
        bodyFormData.append("file", imagen)
        for (const property in ubicacion) {
            bodyFormData.append(property, ubicacion[property])
        }

        for (const pair of bodyFormData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        perfilService
            .guardarDatos(params, bodyFormData)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <main className="main">
            {datos != null ? (
                <>
                    <EditForm datos={datos[0]} ubicacion={ubicacion} nuevosD={nuevosD} handleChanges={handleChanges} valido={valido} toSave={save} handleImage={handleImage} handleUbicacion={handleUbicacion} />
                    {/*console.log(datos[0])*/}
                </>
            ) : (<p>Cargando...</p>)}
        </main>
    );
}

export default EditPerfil;