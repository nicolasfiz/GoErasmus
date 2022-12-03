import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/auth`;

const signUp = async () => {
    const request = await axios.post(`${baseUrl}/signup`)
    return request.then(response => response.data);
}

const signIn = (formData) => {
    const request = axios.post(`${baseUrl}/signin`, formData);
    return request.then(response => response.data);
}

const recoverPassword = async () => {
    const request = await axios.post(`${baseUrl}/recover-password`)
    return request.then(response => response.data);
}

const getAccount = (token) => {
    const request = axios.get(`${baseUrl}/${token}`)
    return request.then(response => response.data);
}

const methods = {
    signUp,
    signIn,
    recoverPassword,
    getAccount
}

export default methods;