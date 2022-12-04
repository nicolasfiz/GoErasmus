import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/user`

const getUsers = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const deleteUser = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const getDatos = async (nombreUsuario) => {
    const request = axios.get(`${baseUrl}/getUser/${nombreUsuario}`)
    return request.then(response => response.data);
}

const getDatosPorId = async (idUsuario) => {
    const request = axios.get(`${baseUrl}/getUserById/${idUsuario}`)
    return request.then(response => response.data);
}

const getImagen = async (id) => {
    const request = axios.get(`${baseUrl}/imagen/${id}`);
    return request.then(response => response.data);
}

const getPaises = async () => {
    const request = axios.get(`${baseUrl}/paises`)
    return request.then(response => response.data);
}

const getCiudades = async (pais) => {
    const request = axios.get(`${baseUrl}/ciudades/${pais}`)
    return request.then(response => response.data);
}

const getUniversidades = async (ciudad) => {
    const request = axios.get(`${baseUrl}/universidades/${ciudad}`)
    return request.then(response => response.data)
}

const getFacultades = async (universidad) => {
    const request = axios.get(`${baseUrl}/facultades/${universidad}`)
    return request.then(response => response.data)
}

const guardarDatos = async (id, FormData) => {
    const request = axios.put(`${baseUrl}/guardarDatos/${id}`, FormData)
    return request.then(response => response.data)
}

const getLogros = async (id) => {
    const request = axios.get(`${baseUrl}/logros/${id}`)
    return request.then(response => response.data)
}

const funciones = {
    getUsers,
    deleteUser,
    getDatos,
    getImagen,
    getPaises,
    getCiudades,
    getUniversidades,
    getFacultades,
    guardarDatos,
    getLogros,
    getDatosPorId
}

export default funciones;