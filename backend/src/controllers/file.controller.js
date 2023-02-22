import { getConnection } from "../database/database"

const getFiles = async (req, res) => {
    try {
        const connection = await getConnection()
        let query = await connection.query(`SELECT ar.idArchivo, ar.titulo, ar.urlArchivo as url,
                                            DATE_FORMAT(ar.fecha, "%d/%m/%Y %r") as fechaSubida, u.nombreUsuario,
                                            asi.idAsignatura, asi.nombre as nombreAsignatura, v.numeroMeGusta as mg,
                                            v.numeroNoMeGusta as nmg FROM Archivo ar
                                            LEFT JOIN Asignatura asi ON ar.asignatura_idAsignatura = asi.idAsignatura
                                            LEFT JOIN Usuario u ON ar.usuario_idUsuario = u.idUsuario
                                            LEFT JOIN Votacion v ON ar.idArchivo = v.archivo_idArchivo
                                            ORDER BY fechaSubida DESC, titulo ASC`)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteFile = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM archivo WHERE idArchivo = ?", id)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    getFiles,
    deleteFile
}