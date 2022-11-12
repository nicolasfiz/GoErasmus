import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/subject`;

const getSubjects = () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getSubjectsByFacultyName = (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const getSubjectById = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const methods = {
    getSubjects,
    getSubjectsByFacultyName,
    getSubjectById
}

export default methods;