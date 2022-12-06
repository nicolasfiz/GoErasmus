import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/university`;

const getUniversities = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getUniversitiesByCityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const getUniversitiesCityLength = async (name) => {
    const request = axios.get(`${baseUrl}/${name}/length`)
    return request.then(response => response.data);
}

const deleteUniversity = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const methods = {
    getUniversities,
    getUniversitiesByCityName,
    getUniversitiesCityLength,
    deleteUniversity
}

export default methods;