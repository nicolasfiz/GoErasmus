import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/university`;

const createUniversity = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

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

const updateUniversity = async (id, bodyFormData) => {
    const request = axios.put(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const deleteUniversity = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const methods = {
    createUniversity,
    getUniversities,
    getUniversitiesByCityName,
    getUniversitiesCityLength,
    updateUniversity,
    deleteUniversity
}

export default methods;