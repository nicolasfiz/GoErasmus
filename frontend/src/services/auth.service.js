import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/auth`;

const signUp = (formData) => {
    const request = axios.post(`${baseUrl}/signup`, formData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const signIn = (formData) => {
    const request = axios.post(`${baseUrl}/signin`, formData);
    return request.then(response => response.data).catch(error => error.response.data);
}

const recoverPassword = async (formData) => {
    const request = await axios.put(`${baseUrl}/recover-password`, formData)
    return request.then(response => response.data).catch(error => error.response.data);
}

const confirmAccount = (token) => {
    const request = axios.get(`${baseUrl}/confirmAccount/${token}`)
    return request.then(response => response.data);
}

const getAccount = async (token) => {
    const request = axios.get(`${baseUrl}/${token}`)
    return request.then(response => response.data);
}


const methods = {
    signUp,
    signIn,
    recoverPassword,
    confirmAccount,
    getAccount
}

export default methods;