import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_URL}/achievement`;

const getAchievements = async () => {
    const request = axios.get(`${baseUrl}/`)
    return request.then(response => response.data);
}

const deleteAchievement = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data);
}

const methods = {
    getAchievements,
    deleteAchievement
}

export default methods;