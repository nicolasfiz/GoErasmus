import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/role`;

const getRoles = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const methods = {
    getRoles
}

export default methods;