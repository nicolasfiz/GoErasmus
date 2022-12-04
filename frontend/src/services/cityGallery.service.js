import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/citiesgallery`;

const getCityImagesByCityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const methods = {
    getCityImagesByCityName
}

export default methods;