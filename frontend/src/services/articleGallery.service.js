import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/articlesgallery`;

const getArticleImagesByArticleId = async (id) => {
    const request = axios.get(`${baseUrl}/?id=${id}`)
    return request.then(response => response.data);
}

const methods = {
    getArticleImagesByArticleId
}

export default methods;