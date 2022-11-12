import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/city`;

const getAllCities = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getCitiesByCountryName = (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const getCityByName = (name) => {
    const request = axios.get(`${baseUrl}/${name}`);
    return request.then(response => response.data);
}

const methods = {
    getAllCities,
    getCitiesByCountryName,
    getCityByName
}

export default methods;