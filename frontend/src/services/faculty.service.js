import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/faculty`;

const getFaculties = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getFacultiesByUniversityName = (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const getFacultyById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getFaculties,
    getFacultiesByUniversityName,
    getFacultyById
}

export default methods;