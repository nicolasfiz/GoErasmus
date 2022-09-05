import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/user/'

const getDatos = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const getImagen = (id) => {
    const request = axios.get(`${baseUrl}/imagen/${id}`);
    return request.then(response => response.data);
}

const funciones = {
    getDatos,
    getImagen
}

export default funciones;