import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/city`

const createCity = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const getAllCities = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data)
}

const getCitiesByCountryName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data)
}

const getCityByName = async (name) => {
    const request = axios.get(`${baseUrl}/${name}`)
    return request.then(response => response.data)
}

const deleteCity = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const methods = {
    createCity,
    getAllCities,
    getCitiesByCountryName,
    getCityByName,
    deleteCity
}

export default methods