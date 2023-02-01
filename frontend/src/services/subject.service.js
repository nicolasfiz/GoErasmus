import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/subject`

const createSubject = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const getSubjects = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data)
}

const getSubjectsByFacultyName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data)
}

const updateSubject = async (id, bodyFormData) => {
    const request = axios.put(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const deleteSubject = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


const methods = {
    createSubject,
    getSubjects,
    getSubjectsByFacultyName,
    updateSubject,
    deleteSubject
}

export default methods