import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/buscador`

const usuarios = async (formdata) => {
    const request = axios.post(`${baseUrl}/usuarios`, formdata)
    return request.then(response => response.data);
}

const asignaturas = async (formdata) => {
    const request = axios.post(`${baseUrl}/asignaturas`, formdata)
    return request.then(response => response.data);
}

const funciones = {
    usuarios,
    asignaturas
}

export default funciones