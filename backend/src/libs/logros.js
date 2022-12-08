import { getConnection } from "../database/database"

const getLogros = async (id) => {
    const connection = await getConnection();
    const query = await connection.query("SELECT logro_idLogro from usuariologro where usuario_idUsuario = ?;", id)
    const final = JSON.parse(JSON.stringify(query))
    const finalV = final.map(elem => elem.logro_idLogro)
    return finalV
}

const insertLogro = async (usuario_idUsuario, logro_idLogro) => {
    try{
        const connection = await getConnection();
        const final = {usuario_idUsuario, logro_idLogro}
        await connection.query("INSERT INTO usuariologro SET ?", final)
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

const logrosCheck = async (idUsuario, idLogro) => {
    if(!await logroObtenido(idUsuario, idLogro)){
        await insertLogro(idUsuario, idLogro)
        return true
    } 
    return false
}

const getAportaciones = async (idUsuario) => {
    try{
        const connection = await getConnection();
        const archivosQuery = await connection.query("select count(*) as numero from archivo where usuario_idUsuario = ?;", idUsuario)
        const cantidadArchivos = archivosQuery[0].numero
        const comentariosQuery = await connection.query("select count(*) as numero from comentario where usuario_idUsuario = ?;", idUsuario)
        const cantidadComentarios = comentariosQuery[0].numero
        return cantidadArchivos+cantidadComentarios
    }catch{
        return false
    }
}

const logroAportaciones = async (idUsuario) => {
    if(!await logroObtenido(idUsuario, 4)){
        const aportaciones =await getAportaciones(idUsuario)
        if(aportaciones > 0){
            await insertLogro(idUsuario, 4)
            return true
        }
    }else if(!await logroObtenido(idUsuario, 7)){
        const aportaciones =await getAportaciones(idUsuario)
        if(aportaciones > 2){
            await insertLogro(idUsuario, 7)
            return true
        }
    }
    return false
}

const getMgs = async (idUsuario) => {
    try{
        const connection = await getConnection();
        const archivosQuery = await connection.query("select SUM(numeromegusta) as numeros from votacion v join archivo a on a.idArchivo=v.archivo_idArchivo where a.usuario_idUsuario = ?;", idUsuario)
        const cantidadArchivos = archivosQuery[0].numeros
        const comentariosQuery = await connection.query("select SUM(numeromegusta) as numeros from votacion v join comentario c on c.idcomentario=v.comentario_idComentario where c.usuario_idUsuario = ?", idUsuario)
        const cantidadComentarios = comentariosQuery[0].numeros
        return cantidadArchivos+cantidadComentarios
    }catch{
        return false
    }
}

const logroVotos = async (idUsuario) => {
    if(!await logroObtenido(idUsuario, 5)){
        const mgs =await getMgs(idUsuario)
        if(mgs > 0){
            await insertLogro(idUsuario, 5)
            return true
        }
    }else if(!await logroObtenido(idUsuario, 8)){
        const mgs =await getMgs(idUsuario)
        if(mgs > 2){
            await insertLogro(idUsuario, 8)
            return true
        }
    }
    return false
}

export const methods = {
    logrosCheck,
    logroAportaciones,
    logroVotos
}