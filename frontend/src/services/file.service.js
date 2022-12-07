import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/file`;

const getFiles = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const deleteFile = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const methods = {
    getFiles,
    deleteFile
}

export default methods;