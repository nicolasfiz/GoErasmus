import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/citiesgallery`

const insertCityImages = async (id, bodyFormData) => {
    const request = axios.post(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data)
}

const getCityImagesByCityName = async (name) => {
    const request = axios.get(`${baseUrl}/${name}`)
    return request.then(response => response.data)
}

const deleteCityImages = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const methods = {
    insertCityImages,
    getCityImagesByCityName,
    deleteCityImages
}

export default methods