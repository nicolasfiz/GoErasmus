import { getConnection } from "../database/database";

let cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const addArticleImage = async (req, res) => {
    try {
        const connection = await getConnection();
        const {articulo_idArticulo} = req.params;
        if (articulo_idArticulo === undefined)
            res.status(400).json({ message: "Article ID is missing!" });
        else
        {
            let urlImagen;
            let imagenArticulo;
            cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error)
                    res.status(500).send(error.message);
                else
                {
                    urlImagen = result.url;
                    imagenArticulo = {urlImagen, articulo_idArticulo};
                    await connection.query("INSERT INTO galeriaimagenesarticulo SET ?", imagenArticulo);
                }
            })
            res.json("Image uploaded successfully");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getArticleImages = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.query;
        let query;
        if (id === undefined) // idArticulo ? imagenes de ese articulo : todas las imagenes
            query = await connection.query(`SELECT articulo_idArticulo as idArticulo, urlImagen FROM galeriaimagenesarticulo`);
        else
            query = await connection.query(`SELECT urlImagen FROM galeriaimagenesarticulo WHERE articulo_idArticulo = ?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getArticleImageById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT urlImagen FROM galeriaimagenesarticulo WHERE idGaleriaImagenesArticulo=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteArticleImage = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM galeriaimagenesarticulo WHERE idGaleriaImagenesArticulo = ?", id);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addArticleImage,
    getArticleImages,
    getArticleImageById,
    deleteArticleImage
};