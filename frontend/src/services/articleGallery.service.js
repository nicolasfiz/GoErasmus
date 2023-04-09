import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/articlesgallery`

const insertArticleImages = async (id, bodyFormData) => {
    const request = axios.post(`${baseUrl}/${id}`, bodyFormData)
    return request.then(response => response.data)
}

const getArticleImagesByArticleId = async (id) => {
    const request = axios.get(`${baseUrl}/?id=${id}`)
    return request.then(response => response.data)
}

const methods = {
    insertArticleImages,
    getArticleImagesByArticleId
}

export default methods