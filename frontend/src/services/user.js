import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/user`

const getDatos = (nombreUsuario) => {
    const request = axios.get(`${baseUrl}/getUser/${nombreUsuario}`)
    return request.then(response => response.data);
}

const getImagen = (id) => {
    const request = axios.get(`${baseUrl}/imagen/${id}`);
    return request.then(response => response.data);
}

const getPaises = () => {
    const request = axios.get(`${baseUrl}/paises`)
    return request.then(response => response.data);
}

const getCiudades = (pais) => {
    const request = axios.get(`${baseUrl}/ciudades/${pais}`)
    return request.then(response => response.data);
}

const getUniversidades = (ciudad) => {
    const request = axios.get(`${baseUrl}/universidades/${ciudad}`)
    return request.then(response => response.data)
}

const getFacultades = (universidad) => {
    const request = axios.get(`${baseUrl}/facultades/${universidad}`)
    return request.then(response => response.data)
}

const guardarDatos = (id, FormData) => {
    const request = axios.put(`${baseUrl}/guardarDatos/${id}`, FormData)
    return request.then(response => response.data)
}

const getLogros = (id) => {
    const request = axios.get(`${baseUrl}/logros/${id}`)
    return request.then(response => response.data)
}

const funciones = {
    getDatos,
    getImagen,
    getPaises,
    getCiudades,
    getUniversidades,
    getFacultades,
    guardarDatos,
    getLogros
}

export default funciones;