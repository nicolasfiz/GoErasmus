import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/country`;

const getCountries = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const methods = {
    getCountries
}

export default methods;