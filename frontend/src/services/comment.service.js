import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/comment`;

const getComments = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const deleteComment = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const methods = {
    getComments,
    deleteComment
}

export default methods;