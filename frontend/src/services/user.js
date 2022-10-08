import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/user/'

const getDatos = (id) => {
    const request = axios.get(`${baseUrl}/getUser/${id}`)
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

const funciones = {
    getDatos,
    getImagen,
    getPaises,
    getCiudades,
    getUniversidades,
    getFacultades
}

export default funciones;