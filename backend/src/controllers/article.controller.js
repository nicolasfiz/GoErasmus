import { getConnection } from "../database/database"
let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addDraftArticle = async (req, res) => {
    try {
        const { titulo, descripcion, ciudad_idCiudad, usuario_idUsuario } = req.body

        if (titulo === undefined || descripcion === undefined || ciudad_idCiudad === undefined || usuario_idUsuario === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"})
        
        const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
            folder: 'articulos',
        })

        const article = { titulo, descripcion, "urlCabecera": uploaded.secure_url, ciudad_idCiudad, usuario_idUsuario }
        const connection = await getConnection()
        await connection.query("INSERT INTO articulo SET ?", article)
        const query = await connection.query("SELECT idArticulo FROM Articulo WHERE titulo=? AND ciudad_idCiudad=? AND usuario_idUsuario=? AND descripcion=? AND urlCabecera=?", [titulo, ciudad_idCiudad, usuario_idUsuario, descripcion, uploaded.secure_url])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getArticles = async (req, res) => {
    try {
        const connection = await getConnection()
        const {name} = req.query
        let query
        if (name === undefined) // nombreCiudad ? articulos de una ciudad : articulo panel admin / pantalla articulos
            query = await connection.query(`SELECT a.idArticulo, a.descripcion, a.urlCabecera, a.titulo, a.esBorrador,
                                            DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion,
                                            c.nombre as nombreCiudad, IFNULL(u.nombreUsuario, "Anónimo") as nombreUsuario
                                            FROM Articulo a
                                            LEFT JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad
                                            LEFT JOIN usuario u ON a.usuario_idUsuario = u.idUsuario
                                            ORDER BY fechaPublicacion ASC, esBorrador ASC`)
        else
            query = await connection.query(`SELECT a.idArticulo, a.titulo, a.descripcion, a.urlCabecera,
                                            DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion FROM Articulo a
                                            LEFT JOIN Ciudad c ON c.idCiudad = a.ciudad_idCiudad WHERE c.nombre = ? AND esBorrador = 'No'
                                            ORDER BY fechaPublicacion ASC`, name)
        res.json(query)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getArticleById = async (req, res) => { 
    try {
        const connection = await getConnection()
        const {id} = req.params
        const query = await connection.query(`SELECT a.titulo, a.descripcion, a.urlCabecera, a.esBorrador,
                                                DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion,
                                                c.nombre as nombreCiudad, u.idUsuario as idAutor,
                                                u.nombreUsuario as autor, u.urlFotoPerfil
                                                FROM articulo a
                                                LEFT JOIN usuario u ON u.idUsuario = a.usuario_idUsuario
                                                JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad 
                                                WHERE idArticulo = ?`, [id, id])
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getLikesArticleById = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query(`SELECT COUNT(*) as mg FROM votacionarticulo WHERE articulo_idArticulo=?`, id)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const publishComment = async (req, res) => {
    try {
        const {descripcion, usuario_idUsuario, articulo_idArticulo} = req.body
        const comment = { descripcion, usuario_idUsuario }

        const connection = await getConnection()

        await connection.query("INSERT INTO comentario SET ?", comment)

        const idComentario = await connection.query("SELECT idComentario FROM comentario ORDER BY idComentario DESC LIMIT 1")
        const comentario_idComentario =  idComentario[0].idComentario
        const articleComment = {comentario_idComentario, articulo_idArticulo}
        await connection.query("INSERT INTO comentarioarticulo SET ?", articleComment)
        
        const votation = {comentario_idComentario}
        await connection.query("INSERT INTO votacion SET ?", votation)

        res.json({message: "Comment added successfully"})
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const publishArticle = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("UPDATE articulo SET esBorrador='No', fechaPublicacion=CURRENT_TIMESTAMP WHERE idArticulo = ?", id)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

//GaleriaImagenesArticulo se borra automaticamente
const deleteArticle = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        query = await connection.query("DELETE FROM articulo WHERE idArticulo = ?", id)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const voteArticle = async (req, res) => {
    try {
        const {usuario_idUsuario, articulo_idArticulo} = req.params
        console.log(usuario_idUsuario, articulo_idArticulo)
        const articleVote = {usuario_idUsuario, articulo_idArticulo}
        const connection = await getConnection()                                      
        const query = await connection.query("INSERT INTO votacionarticulo SET ?", articleVote)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const deleteArticleVote = async (req, res) => {
    try {
        const {usuario_idUsuario, articulo_idArticulo} = req.params
        const connection = await getConnection()
        const query = await connection.query(
            `DELETE FROM votacionarticulo WHERE usuario_idUsuario = ?
                AND articulo_idArticulo = ? `, [usuario_idUsuario, articulo_idArticulo])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getArticleComments = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query(
            `SELECT c.descripcion, c.fecha, u.nombreUsuario, u.urlFotoPerfil,
                    v.idVotacion, ifnull(v.numeroMeGusta, 0) as mg, ifnull(v.numeroNoMeGusta, 0) as nmg
            FROM Articulo art
                LEFT JOIN ComentarioArticulo ca ON ca.articulo_idArticulo= art.idArticulo
                LEFT JOIN Comentario c ON c.idComentario=ca.comentario_idComentario
                LEFT JOIN Votacion v ON v.comentario_idComentario=c.idComentario
                LEFT JOIN Usuario u ON u.idUsuario=c.usuario_idUsuario
            WHERE idArticulo=?`, [id])
        console.log(query)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const methods = {
    addDraftArticle,
    getArticles,
    getArticleById,
    getLikesArticleById,
    publishComment,
    publishArticle,
    deleteArticle,
    voteArticle,
    deleteArticleVote,
    getArticleComments
}