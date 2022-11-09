import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/university';

const getUniversities = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getUniversityById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getUniversities,
    getUniversityById
}

export default methods;