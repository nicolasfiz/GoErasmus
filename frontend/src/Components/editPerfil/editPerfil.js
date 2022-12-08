import perfilService from "../../services/user";
import { useState, useEffect } from "react";
import "./editPerfil.css";
import EditForm from "./EditForm";
import toast, { Toaster } from 'react-hot-toast';
import tokenService from "../../services/token.service"

const EditPerfil = ({ user }) => {
    const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //let params = "nfiz";
    const [datos, setDatos] = useState(null);
    const [valido, setValido] = useState(true);
    const [imagen, setImagen] = useState(null);
    const [token, setToken] = useState(null)
    const [nuevosD, setNuevos] = useState({
        nombreUsuario: '',
        email: '',
        pass: ''
    })
    const [pass2, setPass2] = useState('')
    const [ubicacion, setUbicacion] = useState({
        pais: '',
        ciudad: '',
        universidad: '',
        facultad: ''
    })

    useEffect(() => {
        tokenService
            .getToken()
            .then(data => {
                setToken(data)
            }
        )
        perfilService
            .getDatosPorId(user.id)
            .then(response => {
                setDatos(response);
                if (response[0].pais != null) {
                    console.log(response[0])
                    setUbicacion({
                        pais: response[0].pais,
                        ciudad: response[0].ciudad,
                        universidad: response[0].universidad,
                        facultad: response[0].facultad
                    })
                    if (response[0].pais.length === 0 || response[0].ciudad.length === 0 || response[0].universidad.length === 0 || response[0].facultad.length === 0) {
                        setValido(false);
                    }
                } else {
                    setValido(false)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [user]);

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
        } else if (type === 'ciudad') {
            setUbicacion({
                ...ubicacion,
                ciudad: value,
                universidad: '',
                facultad: ''
            })
            setValido(false)
        } else if (type === 'universidad') {
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

    const handlePass2 = ({ target }) => {
        setPass2(target.value)
        if (target.value === nuevosD.pass) {
            setValido(true)
        } else {
            setValido(false)
        }
    }

    const handleChanges = ({ target }) => {
        const { name, value } = target;
        setNuevos({
            ...nuevosD,
            [name]: value,
        })
        if ((name === "nombreUsuario" && value.length > 15) || (name === "email" && value.length > 0 && !validEmail.test(value)) || (name === "pass" && value !== pass2) || (name === "pass" && (value.length > 20 || value.length < 5))) {
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
        bodyFormData.append("pass", nuevosD.pass)
        bodyFormData.append("file", imagen)
        bodyFormData.append("token", token)
        for (const property in ubicacion) {
            bodyFormData.append(property, ubicacion[property])
        }
        /*
        for (const pair of bodyFormData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
        }*/

        perfilService
            .guardarDatos(user.id, bodyFormData)
            .then(response => {
                toast.success("Los datos se han guardado correctamente")
                if(response){
                    toast('!Has obtenido un nuevo logro!', {
                        icon: '👏',
                    });
                }
            })
            .catch(error => console.log(error))
    }

    return (

        <main className="main">
            <Toaster />
            {datos != null ? (
                <>
                    <EditForm datos={datos[0]} ubicacion={ubicacion} pass2={pass2} nuevosD={nuevosD} imagen={imagen} handleChanges={handleChanges} valido={valido} toSave={save} handleImage={handleImage} handleUbicacion={handleUbicacion} handlePass2={handlePass2} />
                </>
            ) : (<p>Cargando...</p>)}
        </main>
    );
}

export default EditPerfil;