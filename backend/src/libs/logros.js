import { getConnection } from "../database/database"

const getLogros = async (id) => {
    const connection = await getConnection();
    const query = await connection.query("SELECT logro_idLogro from usuariologro where usuario_idUsuario = ?;", id)
    const final = JSON.parse(JSON.stringify(query))
    const finalV = final.map(elem => elem.logro_idLogro)
    console.log(finalV)
    return finalV
}

const insertLogro = async (usuario_idUsuario, logro_idLogro) => {
    try{
        const connection = await getConnection();
        const final = {usuario_idUsuario, logro_idLogro}
        const result = await connection.query("INSERT INTO usuariologro SET ?", final)
        console.log(result)
        return true
    }catch{
        return false
    }
}

const comprobarRolLogro = async (idLogro, rol_idRol) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("select * from logro where rol_idRol = 1; ?", rol_idRol)
        const final = JSON.parse(JSON.stringify(result))
        const finalV = final.map(elem => elem.logro_idLogro)
        return finalV.includes(idLogro)
    }catch{
        return false
    }
}

const logroObtenido = async (idUsuario, idLogro) => {
    const logros = await getLogros(idUsuario)
    return logros.includes(idLogro)
}

export const methods = {
    getLogros,
    insertLogro,
    comprobarRolLogro,
    logroObtenido
}