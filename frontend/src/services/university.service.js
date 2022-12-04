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


const methods = {
    getUniversities,
    getUniversitiesByCityName
}

export default methods;