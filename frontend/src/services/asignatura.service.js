import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/asignatura`

const getAsignatura = async (idAsignatura) => {
    const request = axios.get(`${baseUrl}/${idAsignatura}`)
    return request.then(response => response.data);
}

const getComentarios = async (idAsignatura) => {
    const request = axios.get(`${baseUrl}/comentarios/${idAsignatura}`)
    return request.then(response => response.data);
}

const getArchivos = async (idAsignatura) => {
    const request = axios.get(`${baseUrl}/archivos/${idAsignatura}`)
    return request.then(response => response.data);
}

const funciones = {
    getAsignatura,
    getComentarios,
    getArchivos
}

export default funciones;