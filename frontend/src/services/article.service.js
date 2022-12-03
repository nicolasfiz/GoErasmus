import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/article`;

const getCityArticlesLength = async (name) => {
    const request = axios.get(`${baseUrl}/${name}/length`)
    return request.then(response => response.data);
}

const getArticleById = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const getArticles = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const getArticlesByCityName = async (name) => {
    const request = axios.get(`${baseUrl}/?name=${name}`)
    return request.then(response => response.data);
}

const methods = {
    getCityArticlesLength,
    getArticles,
    getArticleById,
    getArticlesByCityName
}

export default methods;