import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/faculty`;

const getFaculties = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getFacultiesByUniversityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const deleteFaculty = async () => {
    const request = axios.delete(`${baseUrl}/`)
    return request.then(response => response.data);
}

const methods = {
    getFaculties,
    getFacultiesByUniversityName,
    deleteFaculty
}

export default methods;