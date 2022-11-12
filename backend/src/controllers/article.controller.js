import { getConnection } from "../database/database";

const addDraftArticle = async (req, res) => {
    try {
        const { titulo, descripcion, urlCabecera, ciudad_idCiudad, usuario_idUsuario } = req.body;

        if (titulo === undefined || descripcion === undefined || urlCabecera === undefined ||
            ciudad_idCiudad === undefined || usuario_idUsuario === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const esBorrador = 1;
        const fechaPublicacion = null;
        const article = { titulo, descripcion, urlCabecera, esBorrador, fechaPublicacion, ciudad_idCiudad, usuario_idUsuario };
        const connection = await getConnection();
        await connection.query("INSERT INTO articulo SET ?", article);
        res.json({message: "Article added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getArticles = async (req, res) => { //name ? articulos de una ciudad : todos los articulos (Cards + tabla panel admin)
    try {
        const connection = await getConnection();
        const {name} = req.query;
        let query;
        if (name === undefined) // idCiudad ? articulos de una ciudad : articulo panel admin
            query = await connection.query(`SELECT a.titulo, a.descripcion, a.urlCabecera, a.fechaPublicacion FROM articulo a
                                                LEFT JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad`);
        else
            query = await connection.query(`SELECT a.titulo, a.descripcion, a.urlCabecera, a.fechaPublicacion FROM Articulo a
                                                JOIN Ciudad c ON c.idCiudad = a.ciudad_idCiudad WHERE c.nombre = ? AND esBorrador = 0
                                                ORDER BY fechaPublicacion ASC`, name);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


const getArticleById = async (req, res) => { 
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT a.titulo, a.descripcion, a.urlCabecera, a.esBorrador, a.fechaPublicacion, c.nombre as nombreCiudad, u.nombreUsuario as autor
                                                FROM articulo a
                                                JOIN usuario u ON u.idUsuario = a.usuario_idUsuario
                                                JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad 
                                                WHERE idArticulo = ?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const publishArticle = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const date = new Date();
        const query = await connection.query("UPDATE articulo SET esBorrador=0, fechaPublicacion=? WHERE idArticulo = ?", [date, id]);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }

}

const deleteArticle = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM articulo WHERE idArticulo = ?", id);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const voteArticle = async (req, res) => {
    try {
        const {usuario_idUsuario, articulo_idArticulo} = req.params;
        const articleVote = {usuario_idUsuario, articulo_idArticulo};
        const connection = await getConnection();                                      
        const query = await connection.query("INSERT INTO votacionarticulo SET ?", articleVote);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteArticleVote = async (req, res) => {
    try {
        const {usuario_idUsuario, articulo_idArticulo} = req.params;
        const connection = await getConnection();
        const query = await connection.query(`DELETE FROM votacionarticulo WHERE usuario_idUsuario = ?
                                                AND articulo_idArticulo = ? `, [usuario_idUsuario, articulo_idArticulo]);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addDraftArticle,
    getArticles,
    getArticleById,
    publishArticle,
    deleteArticle,
    voteArticle,
    deleteArticleVote
};