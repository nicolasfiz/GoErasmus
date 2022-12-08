import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/subject`;

const getSubjects = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getSubjectsByFacultyName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const deleteSubject = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}


const methods = {
    getSubjects,
    getSubjectsByFacultyName,
    deleteSubject
}

export default methods;