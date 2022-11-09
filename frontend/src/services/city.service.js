import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/city';

const getAllCities = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getCitiesByCountryId = (id) => {
    const request = axios.get(`${baseUrl}/?id=${id}`)
    return request.then(response => response.data);
}

const getCityById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getAllCities,
    getCitiesByCountryId,
    getCityById
}

export default methods;