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
        const connection = await getConnection();
        const { idAsignatura } = req.params;
        const result = await connection.query(`select c.votacion_idvotacion, vp.nota, c.descripcion, u.nombreUsuario, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg
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
        const result = await connection.query(`select a.votacion_idVotacion, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg, a.titulo,a.descripcion, a.urlArchivo, u.nombreUsuario
        from archivo a 
        left join votacion v on a.votacion_idVotacion=v.idVotacion
        left join usuario u on a.usuario_idUsuario=u.idUsuario where a.Asignatura_idAsignatura=?;`, idAsignatura);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    getAsignatura,
    getComentarios,
    getArchivo
};