import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/university`;

const getUniversities = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getUniversitiesByCityName = (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const getUniversityById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getUniversities,
    getUniversitiesByCityName,
    getUniversityById
}

export default methods;