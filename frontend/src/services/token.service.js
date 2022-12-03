const setToken = (token) => {
    window.localStorage.setItem("token", token)
}

const removeToken = () => {
    window.localStorage.removeItem("token")
}

const funciones = {
    setToken,
    removeToken
}

export default funciones