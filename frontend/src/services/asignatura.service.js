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

const getVotacionUsuarios = (idUsuario) => {
    const request = axios.get(`${baseUrl}/votacionUsuario/${idUsuario}`)
    return request.then(response => response.data);
}

const mg = (id, formdata) => {
    const request = axios.put(`${baseUrl}/mg/${id}`, formdata)
    return request.then(response => response.data)
} 

const nmg = (id, formdata) => {
    const request = axios.put(`${baseUrl}/nmg/${id}`, formdata)
    return request.then(response => response.data)
}

const subirArchivo = (formdata) => {
    const request = axios.post(`${baseUrl}/archivo`, formdata)
    return request.then(response => response.data)
} 

const subirValoracion = (formdata) => {
    const request = axios.post(`${baseUrl}/valoracion`, formdata)
    return request.then(response => response.data)
} 

const funciones = {
    getAsignatura,
    getComentarios,
    getArchivos,
    getVotacionUsuarios,
    mg,
    nmg,
    subirArchivo,
    subirValoracion
}

export default funciones;