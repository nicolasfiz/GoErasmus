import { getConnection } from "../database/database";

let cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const addCityImage = async (req, res) => {
    try {
        const connection = await getConnection();
        const {ciudad_idCiudad} = req.params;
        if (ciudad_idCiudad === undefined)
            res.status(400).json({ message: "Ciudad ID is missing!" });
        else
        {
            let urlImagen;
            let imagenCiudad;
            cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error)
                    res.status(500).send(error.message);
                else
                {
                    urlImagen = result.url;
                    imagenCiudad = {urlImagen, ciudad_idCiudad};
                    await connection.query("INSERT INTO galeriaimagenesciudad SET ?", imagenCiudad);
                }
            })
            res.json("Image uploaded successfully");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCityImages = async (req, res) => {
    try {
        const connection = await getConnection();
        const {name} = req.query;
        let query;
        if (name === undefined) // nombreCiudad ? imagenes de esa ciudad : todas las imagenes
            query = await connection.query(`SELECT ciudad_idCiudad as idCiudad, urlImagenOriginal FROM galeriaimagenesciudad`);
        else
            query = await connection.query(`SELECT gic.urlImagenOriginal as org, gic.urlThumbnail as thb FROM galeriaimagenesciudad gic
                                            JOIN Ciudad c ON c.idCiudad= gic.ciudad_idCiudad
                                            WHERE c.nombre = ?`, name);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCityImageById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT urlImagen FROM galeriaimagenesciudad WHERE idGaleriaImagenesCiudad=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteCityImage = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM galeriaimagenesciudad WHERE idGaleriaImagenesCiudad = ?", id);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addCityImage,
    getCityImages,
    getCityImageById,
    deleteCityImage
};