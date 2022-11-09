import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/country';

const getCountries = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getCountryById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getCountries,
    getCountryById
}

export default methods;