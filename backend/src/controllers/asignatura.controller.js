import { getConnection } from "../database/database";
var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
import { setTimeout } from "timers/promises";

const getAsignatura = async (req, res) => {
    try {
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select a.nombre, a.puntuacion, f.nombre as facultad, u.nombre as universidad, c.nombre as ciudad, p.nombre as pais,
        (SELECT COUNT(*) FROM votacionPonderada where asignatura_idAsignatura = ?) as valoraciones
        from asignatura a join facultad f on a.Facultad_idfacultad=f.idfacultad
        join universidad u on f.universidad_iduniversidad=u.iduniversidad
        join ciudad c on u.ciudad_idciudad=c.idciudad 
        join pais p on c.pais_idpais = p.idpais where a.idAsignatura=?;`, [idAsignatura, idAsignatura]);
        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getComentarios = async (req, res) => {
    try {
        await setTimeout(3000)
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select c.votacion_idvotacion, vp.nota, c.descripcion, u.nombreUsuario, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg, c.fecha
        from votacionponderada vp 
        left join comentario c on c.idcomentario = vp.comentario_idComentario 
        left join usuario u on c.usuario_idUsuario=u.idUsuario
        left join votacion v on c.votacion_idVotacion=v.idVotacion where vp.asignatura_idAsignatura=?;;`, idAsignatura);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getArchivo = async (req, res) => {
    try {
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select a.votacion_idVotacion, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg, a.titulo,a.descripcion, a.urlArchivo, u.nombreUsuario, a.fecha, a.nombreArchivo
        from archivo a 
        left join votacion v on a.votacion_idVotacion=v.idVotacion
        left join usuario u on a.usuario_idUsuario=u.idUsuario where a.Asignatura_idAsignatura=?;`, idAsignatura);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const subirArchivo = async (req, res) => {
    try {
        const connection = await getConnection();
        //idVotacion
        await connection.query("insert into votacion (numeroMeGusta, numeroNoMeGusta) values (0, 0);")
        const idVotacionQuery = await connection.query("select idVotacion from votacion order by idVotacion DESC LIMIT 1;")
        const idVotacion = idVotacionQuery[0].idVotacion
        //urlArchivo
        let urlArchivo;
        if (req.files != null) {
            await cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error) {
                    res.status(500)
                    res.send(error)
                }
                urlArchivo = result.url;
            })
        }
        //resto de datos por body
        const {titulo, descripcion, idUsuario, idAsignatura, nombreArchivo} = req.body;
        //fecha
        const fecha = new Date();
        //objeto final
        const archivo = {titulo, descripcion, urlArchivo, usuario_idUsuario: idUsuario, Asignatura_idAsignatura: idAsignatura, votacion_idVotacion: idVotacion, fecha, nombreArchivo}
        //consulta final
        const result = await connection.query(`INSERT INTO archivo SET ?`, archivo);
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}


const deleteArchivo = async (req, res)=>{
    try{
        // console.log(req.params);
        const { idArchivo } = req.params;
        const connection = await getConnection();
        const votacionQuery = await connection.query("SELECT votacion_idVotacion from archivo where idArchivo = ?", idArchivo)
        const idVotacion = votacionQuery[0].votacion_idVotacion
        const query = await connection.query("Delete from archivo where idArchivo = ?", idArchivo);
        await connection.query(`Delete from votacion where idVotacion = ?`, idVotacion)
        res.json(query);
    }catch(error){
        res.status(500).send(error.message);
    }
}

const subirValoracion = async (req, res) => {
    try {
        const connection = await getConnection();
        //idVotacion
        await connection.query("insert into votacion (numeroMeGusta, numeroNoMeGusta) values (0, 0);")
        const idVotacionQuery = await connection.query("select idVotacion from votacion order by idVotacion DESC LIMIT 1;")
        const idVotacion = idVotacionQuery[0].idVotacion
        //resto de datos por body
        const { descripcion, idUsuario, idAsignatura, nota} = req.body;
        //fecha
        const fecha = new Date();
        //crear comentario
        const comentario = {descripcion, usuario_idUsuario: idUsuario, fecha, votacion_idVotacion: idVotacion}
        console.log(comentario)
        await connection.query(`INSERT INTO comentario SET ?`, comentario)
        const idComentarioQuery = await connection.query("select idComentario from comentario order by idComentario DESC LIMIT 1")
        const idComentario = idComentarioQuery[0].idComentario
        //añadir valoracion
        const votacionPonderada = {nota, comentario_idComentario: idComentario, asignatura_idAsignatura: idAsignatura}
        console.log(votacionPonderada)
        await connection.query(`INSERT INTO votacionPonderada SET ?`, votacionPonderada);
        //Calcular media
        const mediaQuery = await connection.query(`select AVG(nota) as puntuacion from votacionponderada where asignatura_idAsignatura=?;`, idAsignatura)
        const puntuacionBase = mediaQuery[0].puntuacion
        const puntuacion = puntuacionBase.toFixed(1)
        const result = await connection.query(`UPDATE asignatura SET puntuacion = ? WHERE idAsignatura = ?`, [puntuacion, idAsignatura])
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getAsignatura,
    getComentarios,
    getArchivo,
    subirArchivo,
    deleteArchivo,
    subirValoracion
};