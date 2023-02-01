import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/faculty`

const createFaculty = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const getFaculties = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data)
}

const getFacultiesByUniversityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data)
}

const updateFaculty = async (id, bodyFormData) => {
    const request = axios.put(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const deleteFaculty = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const methods = {
    createFaculty,
    getFaculties,
    getFacultiesByUniversityName,
    updateFaculty,
    deleteFaculty
}

export default methods