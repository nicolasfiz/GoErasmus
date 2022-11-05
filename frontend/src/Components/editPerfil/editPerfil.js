import perfilService from "../../services/user";
import { useState, useEffect } from "react";
import "./editPerfil.css";
import EditForm from "./EditForm";
import toast, { Toaster } from 'react-hot-toast';

const EditPerfil = () => {
    const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let params = "nfiz";
    const [datos, setDatos] = useState(null);
    const [valido, setValido] = useState(true);
    const [imagen, setImagen] = useState(null);
    const [nuevosD, setNuevos] = useState({
        nombreUsuario: '',
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
                if(response[0].pais.length()===0||response[0].ciudad.length()===0||response[0].universidad.length()===0||response[0].facultad.length()===0){
                    setValido(false);
                }
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
            setValido(false)
        }else if(type==='ciudad'){
            setUbicacion({
                ...ubicacion,
                ciudad: value,
                universidad: '',
                facultad: ''
            })
            setValido(false)
        }else if(type ==='universidad'){
            setUbicacion({
                ...ubicacion,
                universidad: value,
                facultad: ''
            })
            setValido(false)
        }
        else {
            setUbicacion({
                ...ubicacion,
                [type]: value,
            })
            setValido(true)
        }

    }

    const handleChanges = ({ target }) => {
        const { name, value } = target;
        setNuevos({
            ...nuevosD,
            [name]: value,
        })
        if ((name === "nombreUsuario" && value.length > 15) || (name === "email" && value.length > 0 && !validEmail.test(value))) {
            setValido(false);
        } else {
            setValido(true);
        }
    }

    const save = (event) => {
        event.preventDefault()
        const bodyFormData = new FormData()
        bodyFormData.append("email", nuevosD.email)
        bodyFormData.append("nombreUsuario", nuevosD.nombreUsuario)
        bodyFormData.append("file", imagen)
        for (const property in ubicacion) {
            bodyFormData.append(property, ubicacion[property])
        }

        for (const pair of bodyFormData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }

        perfilService
            .guardarDatos(params, bodyFormData)
            .then(response => console.log("respuesta:",response))
            .catch(error => console.log(error))
       toast.success("Los datos se han guardado correctamente")
    }

    return (
        
        <main className="main">
            <Toaster />
            {datos != null ? (
                <>
                    <EditForm datos={datos[0]} ubicacion={ubicacion} nuevosD={nuevosD} imagen={imagen} handleChanges={handleChanges} valido={valido} toSave={save} handleImage={handleImage} handleUbicacion={handleUbicacion} />
                </>
            ) : (<p>Cargando...</p>)}
        </main>
    );
}

export default EditPerfil;