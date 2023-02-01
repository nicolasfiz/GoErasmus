import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/country`

const createCountry = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const getCountries = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data)
}

const updateCountry = async (id, bodyFormData) => {
    const request = axios.put(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const deleteCountry = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const methods = {
    createCountry,
    getCountries,
    updateCountry,
    deleteCountry
}

export default methods