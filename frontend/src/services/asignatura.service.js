import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/asignatura`

const getAsignatura = (idAsignatura) => {
    const request = axios.get(`${baseUrl}/${idAsignatura}`)
    return request.then(response => response.data);
}

const funciones = {
    getAsignatura,
}

export default funciones;