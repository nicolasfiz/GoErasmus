import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_URL}/article`

const createDraftArticle = async (bodyFormData) => {
    const request = axios.post(`${baseUrl}/`, bodyFormData)
    return request.then(response => response.data).catch(error => error.response.data)
}

const getArticles = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data)
}

const getArticleById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const getArticlesByCityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data)
}

const getArticleLikesById = async (id) => {
    const request = axios.get(`${baseUrl}/likes/${id}`)
    return request.then(response => response.data)
}

const publishArticle = async (id) => {
    const request = axios.put(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const publishComment = async (formData) => {
    const request = axios.post(`${baseUrl}/comment`, formData)
    return request.then(response => response.data)
} 

const deleteArticle = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const voteArticle = async (idUsuario, idArticulo) => {
    const request = axios.post(`${baseUrl}/${idUsuario}/${idArticulo}`)
    return request.then(response => response.data)
}

const deleteVoteArticle = async (idUsuario, idArticulo) => {
    const request = axios.delete(`${baseUrl}/${idUsuario}/${idArticulo}`)
    return request.then(response => response.data)
}

const getArticleComments = async (idArticulo) => {
    const request = axios.get(`${baseUrl}/${idArticulo}/comments`)
    return request.then(response => response.data)
}

const methods = {
    createDraftArticle,
    getArticles,
    getArticleById,
    getArticlesByCityName,
    getArticleLikesById,
    publishArticle,
    publishComment,
    deleteArticle,
    voteArticle,
    deleteVoteArticle,
    getArticleComments
}

export default methods