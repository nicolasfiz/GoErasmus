const setToken = (token) => {
    window.localStorage.setItem("token", token);
}

const removeToken = () => {
    window.localStorage.removeItem("token");
}

const getToken = () => {
    return window.localStorage.getItem("token");
}

const methods = {
    setToken,
    removeToken,
    getToken
}

export default methods;
