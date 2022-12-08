import { getConnection } from "../database/database"
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
import {methods as logrosUtils} from "../libs/logros"
import { setTimeout } from "timers/promises";
import { exit } from "process";

const getAsignatura = async (req, res) => {
    try {
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select a.nombre, a.puntuacion, f.nombre as facultad, u.nombre as universidad, c.nombre as ciudad, p.nombre as pais,
        (SELECT COUNT(*) FROM votacionPonderada where asignatura_idAsignatura = ?) as valoraciones
        from asignatura a join facultad f on a.facultad_idfacultad=f.idfacultad
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
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select v.idVotacion, vp.nota, c.descripcion, u.nombreUsuario, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg, c.fecha
        from votacionponderada vp 
        left join comentario c on c.idcomentario = vp.comentario_idComentario 
        left join usuario u on c.usuario_idUsuario=u.idUsuario
        left join votacion v on v.comentario_idComentario=c.idComentario where vp.asignatura_idAsignatura=?;`, idAsignatura);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getArchivo = async (req, res) => {
    try {
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select v.idVotacion, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg, a.titulo,a.descripcion, a.urlArchivo, u.nombreUsuario, a.fecha, a.nombreArchivo
        from archivo a 
        left join votacion v on a.idArchivo= v.archivo_idArchivo
        left join usuario u on a.usuario_idUsuario=u.idUsuario where a.Asignatura_idAsignatura=?;`, idAsignatura);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const subirArchivo = async (req, res) => {
    try {
        const connection = await getConnection();
        //urlArchivo
        let urlArchivo;
        if (req.files !=  null) {
            await cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error) {
                    res.status(500)
                    res.send(error)
                }
                urlArchivo = result.url;
            })
        }
        //body
        const {titulo, descripcion, idUsuario, idAsignatura, nombreArchivo} = req.body; // añadir rol tambien
        //fecha
        const fecha = new Date();
        //archivo
        const archivo = {titulo, descripcion, urlArchivo, usuario_idUsuario: idUsuario, Asignatura_idAsignatura: idAsignatura, fecha, nombreArchivo}
        //consulta final
        await connection.query(`INSERT INTO archivo SET ?`, archivo);
        const idArchivoQuery = await connection.query(`SELECT idArchivo from archivo order by idArchivo DESC LIMIT 1`)
        const idArchivo = idArchivoQuery[0].idArchivo
        //idVotacion
        await connection.query("insert into votacion (numeroMeGusta, numeroNoMeGusta, archivo_idArchivo) values (0, 0, ?);", idArchivo)
        //obtener logros usuarios
        console.log("hasta aqui bien?")
        let result = await logrosUtils.logroAportaciones(idUsuario)
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

/*

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
*/

const subirValoracion = async (req, res) => {
    try {
        const connection = await getConnection();
        //body
        const { descripcion, idUsuario, idAsignatura, nota} = req.body; //rol tambien
        //fecha
        const fecha = new Date();
        //crear comentario
        const comentario = {descripcion, usuario_idUsuario: idUsuario, fecha}
        await connection.query(`INSERT INTO comentario SET ?`, comentario)
        const idComentarioQuery = await connection.query("select idComentario from comentario order by idComentario DESC LIMIT 1")
        const idComentario = idComentarioQuery[0].idComentario
        //añadir valoracion
        const votacionPonderada = {nota, comentario_idComentario: idComentario, asignatura_idAsignatura: idAsignatura}
        await connection.query(`INSERT INTO votacionPonderada SET ?`, votacionPonderada);
        //Calcular media
        const mediaQuery = await connection.query(`select AVG(nota) as puntuacion from votacionponderada where asignatura_idAsignatura=?;`, idAsignatura)
        const puntuacionBase = mediaQuery[0].puntuacion
        const puntuacion = puntuacionBase.toFixed(1)
        await connection.query(`UPDATE asignatura SET puntuacion = ? WHERE idAsignatura = ?`, [puntuacion, idAsignatura])
        //idVotacion
        await connection.query("insert into votacion (numeroMeGusta, numeroNoMeGusta, comentario_idComentario) values (0, 0, ?);", idComentario)
        //obtener logros usuarios
        let result = await logrosUtils.logroAportaciones(idUsuario)
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

const getVotacionUsuario = async (req, res) => {
    try {
        const connection = await getConnection();
        const { idUsuario } = req.params;
        const result = await connection.query(`select votacion_idVotacion from votacion_usuario where usuario_idUsuario = ?;`, idUsuario);
        const final = result.map(elem => elem.votacion_idVotacion)
        res.json(final);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAportaciones = async (idUsuario) => {
    try{
        const connection = await getConnection();
        const archivosQuery = await connection.query("select v.idVotacion as votacion from archivo a left join votacion v on a.idarchivo=v.archivo_idarchivo where a.usuario_idUsuario = ?;", idUsuario)
        const comentariosQuery = await connection.query("select v.idVotacion as votacion from comentario c left join votacion v on c.idComentario=v.comentario_idcomentario where c.usuario_idUsuario = ?;", idUsuario)
        const archivosSucio = JSON.parse(JSON.stringify(archivosQuery))
        const comentariosSucio = JSON.parse(JSON.stringify(comentariosQuery))
        const archivosVId = archivosSucio.map(elem => elem.votacion)
        const comentariosVId = comentariosSucio.map(elem => elem.votacion)
        console.log("archivosSucio",archivosSucio)
        console.log("comentariosSucio", comentariosSucio)
        console.log("archivoVId", archivosVId)
        console.log("comentariosvID", comentariosVId)
        return archivosVId.concat(comentariosVId)
    }catch{
        return false
    }
}

const mg = async (req, res)=>{
    try{
        const { idVotacion } = req.params;
        const { idUsuario } = req.body;
        const connection = await getConnection();

        if(idVotacion === undefined || idUsuario === undefined ){
            res.status(400).json({ message:"Bad Request. Please fill all fields" });
        }
        //comprobar que no es su propia aportacion
        const aportaciones = await getAportaciones(idUsuario)
        if(aportaciones.includes(Number(idVotacion))){
            res.json(false)
            return
        }
        //insert votacion_usuario
        const votacionUsuario = {votacion_idVotacion: idVotacion, usuario_idUsuario: idUsuario}
        await connection.query(`INSERT INTO votacion_usuario SET ?`, votacionUsuario)
        //select mg
        const mgQuery = await connection.query(`select numeroMeGusta from votacion where idVotacion = ?;`, idVotacion)
        let mg = mgQuery[0].numeroMeGusta
        mg+=1
        //update mg
        const mgFinal = {numeroMeGusta: mg}    
        await connection.query("UPDATE votacion SET ? where idVotacion = ?", [mgFinal, idVotacion]);
        //logro
        logrosUtils.logroVotos(idUsuario)
        res.json(true);
    }catch(error){
        res.status(500).send(error.message);
    }
}
const nmg = async (req, res)=>{
    try{
        const { idVotacion } = req.params;
        const { idUsuario } = req.body;
        const connection = await getConnection();

        if(idVotacion === undefined || idUsuario === undefined ){
            res.status(400).json({ message:"Bad Request. Please fill all fields" });
        }
        //comprobar que no es su propia aportacion
        const aportaciones = await getAportaciones(idUsuario)
        if(aportaciones.includes(Number(idVotacion))){
            res.json(false)
            return
        }
        //insert votacion_usuario
        const votacionUsuario = {votacion_idVotacion: idVotacion, usuario_idUsuario: idUsuario}
        await connection.query(`INSERT INTO votacion_usuario SET ?`, votacionUsuario)
        //select mg
        const mgQuery = await connection.query(`select numeroNoMeGusta from votacion where idVotacion = ?;`, idVotacion)
        let nmg = mgQuery[0].numeroNoMeGusta
        nmg+=1
        console.log(nmg)
        //update mg
        const nmgFinal = {numeroNoMeGusta: nmg}    
        await connection.query("UPDATE votacion SET ? where idVotacion = ?", [nmgFinal, idVotacion]);
        res.json(true);
    }catch(error){
        res.status(500).send(error.message);
    }
}


export const methods = {
    getAsignatura,
    getComentarios,
    getArchivo,
    subirArchivo,
    subirValoracion,
    getVotacionUsuario,
    mg,
    nmg
};