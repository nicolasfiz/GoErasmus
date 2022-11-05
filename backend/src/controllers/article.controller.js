/*import { getConnection } from "../database/database";

const addDraftArticle = async (req, res) => {
    try {
        const { titulo, descripcion, urlCabecera, ciudad_idCiudad, usuario_idUsuario } = req.body;

        if (titulo === undefined || descripcion === undefined || urlCabecera === undefined ||
            ciudad_idCiudad === undefined || usuario_idUsuario === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        let esBorrador = 1;
        const fechaUltimaModificacion = "current_timestamp";
        const fechaPublicacion = "";
        const article = { titulo, descripcion, urlCabecera, esBorrador, fechaUltimaModificacion, fechaPublicacion, ciudad_idCiudad, usuario_idUsuario };
        const connection = await getConnection();
        await connection.query("INSERT INTO articulo SET ?", article);
        res.json({message: "Article added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getArticles = async (req, res) => { //??
    try {
        const connection = await getConnection();
        const {id} = req.query;
        let query;
        if (id === undefined) // idCiudad ? articulos de una ciudad : articulo panel admin
            query = await connection.query(`SELECT titulo, descripcion, urlCabecera, fechaPublicacion,  FROM articulo a
                                                LEFT JOIN ciudad c ON c.idCiudad = a.ciudad_idCiudad`);
        else
            query = await connection.query(`SELECT titulo, descripcion, urlCabecera, fechaPublicacion
                                                JOIN Pais p ON p.idPais = c.pais_idPais WHERE p.idPais=?`, id);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}


const getArticleById = async (req, res) => { //??
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT titulo, descripcion, urlCabecera, fechaPublicacion FROM articulo WHERE idArticulo=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


/*const updateArticle = async (req, res) => {

}

// Panel de Administracion
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

/*const publishArticle = async (req, res) => {

}

// Panel de Administracion
const voteArticle = async (req, res) => {

}

export const methods = {
    addDraftArticle,
    getArticles,
    getArticleById,
    //updateArticle,
    deleteArticle,
    //publishArticle,
    voteArticle
};*/