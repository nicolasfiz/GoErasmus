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

const getArticles = async (req, res) => {
    try {
        const connection = await getConnection();
        const {name} = req.query;
        let query;
        if (name === undefined) // nombreCiudad ? articulos de una ciudad : articulo panel admin
            query = await connection.query(`SELECT a.idArticulo, a.titulo, a.descripcion, a.urlCabecera,
                                            DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion FROM Articulo a
                                            LEFT JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad WHERE esBorrador = 'No'
                                            ORDER BY fechaPublicacion ASC`);
        else
            query = await connection.query(`SELECT a.idArticulo, a.titulo, a.descripcion, a.urlCabecera,
                                            DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion FROM Articulo a
                                            LEFT JOIN Ciudad c ON c.idCiudad = a.ciudad_idCiudad WHERE c.nombre = ? AND esBorrador = 'No'
                                            ORDER BY fechaPublicacion ASC`, name);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCityArticlesLength = async (req, res) => {
    try {
        const connection = await getConnection();
        const {name} = req.params;
        let query;
        if (name === undefined)
            query = [{"length": 0}];
        else
            query = await connection.query(`SELECT COUNT(*) as length FROM articulo a
                                            JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad WHERE c.nombre = ?`, name);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getArticleById = async (req, res) => { 
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT a.titulo, a.descripcion, a.urlCabecera, a.esBorrador,
                                                DATE_FORMAT(a.fechaPublicacion, "%d/%m/%Y") as fechaPublicacion,
                                                c.nombre as nombreCiudad, u.nombreUsuario as autor, u.urlFotoPerfil
                                                FROM articulo a
                                                LEFT JOIN usuario u ON u.idUsuario = a.usuario_idUsuario
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
        const {descripcion} = req.body;
        const connection = await getConnection();
        const query = await connection.query("UPDATE articulo SET descripcion=?, esBorrador='No', fechaPublicacion=CURRENT_TIMESTAMP WHERE idArticulo = ?", [descripcion, id]);
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
    getCityArticlesLength,
    getArticleById,
    publishArticle,
    deleteArticle,
    voteArticle,
    deleteArticleVote
};