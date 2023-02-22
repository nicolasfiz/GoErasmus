import { getConnection } from "../database/database"

const getComments = async (req, res) => {
    try {
        const connection = await getConnection()
        let query = await connection.query(`SELECT c.idComentario, c.descripcion, DATE_FORMAT(c.fecha, "%d/%m/%Y %r") as fechaSubida,
                                            u.nombreUsuario, v.numeroMeGusta as mg, v.numeroNoMeGusta as nmg FROM Comentario c
                                            LEFT JOIN Usuario u ON c.usuario_idUsuario = u.idUsuario
                                            LEFT JOIN Votacion v ON c.idComentario = v.comentario_idComentario`)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteComment = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM comentario WHERE idComentario = ?", id)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    getComments,
    deleteComment
}