import { getConnection } from "../database/database";

const getUsuarios = async (req, res) => {
    try {
        const connection = await getConnection();
        const {nombreUsuario, email, facultad, universidad, ciudad, pais} = req.body
        let sql = `select u.nombreUsuario, u.urlFotoPerfil, f.nombre as facultad, un.nombre as universidad, c.nombre as ciudad, p.nombre as pais
        from usuario u left join facultad f on u.facultad_idfacultad=f.idfacultad 
        left join universidad un on f.universidad_idUniversidad=un.idUniversidad
        left join ciudad c on un.ciudad_idCiudad = c.idCiudad
        left join pais p on c.pais_idPais=p.idPais
        where 
        u.nombreUsuario like '%${nombreUsuario}%' AND
        u.email like '%${email}%' `
        if(facultad.length>0){
            sql += `AND f.nombre like '%${facultad}%' `
        }
        if(universidad.length>0){
            sql += `AND un.nombre like '%${universidad}%' `
        }
        if(ciudad.length>0){
            sql += `AND c.nombre like '%${ciudad}%' `
        }
        if(pais.length>0){
            sql += `AND p.nombre like '%${pais}%' `
        }
        const result = await connection.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAsignaturas = async (req, res) => {
    try {
        const connection = await getConnection();
        const { nombre, puntuacion, facultad, universidad, ciudad, pais} = req.body
        let sql = `select a.idAsignatura, a.nombre, a.puntuacion, f.nombre as facultad, un.nombre as universidad, c.nombre as ciudad, p.nombre as pais
        from asignatura a left join facultad f on a.Facultad_idfacultad=f.idfacultad 
        left join universidad un on f.universidad_idUniversidad=un.idUniversidad
        left join ciudad c on un.ciudad_idCiudad = c.idCiudad
        left join pais p on c.pais_idPais=p.idPais
        where 
        a.nombre like '%${nombre}%' AND
        f.nombre like '%${facultad}%' AND
        un.nombre like '%${universidad}%' AND
        c.nombre like '%${ciudad}%' AND
        p.nombre like '%${pais}%'  `

        if(puntuacion.length>0){
            sql += `AND a.puntuacion >= ${Number(puntuacion).toFixed(1)} `
        }
        console.log(sql)
        const result = await connection.query(sql);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getUsuarios,
    getAsignaturas
}