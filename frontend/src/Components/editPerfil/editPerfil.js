import perfilService from "../../services/user";
import { useState, useEffect } from "react";
import "./editPerfil.css";
import EditForm from "./EditForm";

const EditPerfil = () => {
    const validEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let params = "1";
    const [datos, setDatos] = useState(null);
    const [valido, setValido] = useState(true);
    const [nuevosD, setNuevos] = useState({
        nombre: '',
        email: '',
        file: '',
        
    });

    useEffect(() => {
        perfilService
            .getDatos(params)
            .then(response => {
                setDatos(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [params]);

    const handleChanges = ({target}) => {
        const { name, value } = target;
        setNuevos({
            ...nuevosD,
            [name]: value,
        })
        if((name==="nombre" && value.length>15) || (name==="email" && value.length>0 && !validEmail.test(value))){
            setValido(false);
        }else{
            setValido(true);
        }
    }
    
    const save = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", )
    }
    
    return (
        <main className="main">
            {datos != null ? (
                <>
                    <EditForm datos={datos[0]} nuevosD={nuevosD} handleChanges={handleChanges} valido={valido} toSave={save}/>
                    {console.log(datos[0])}
                </>
            ) : (<p>Cargando...</p>)}
        </main>
    );
}

export default EditPerfil;