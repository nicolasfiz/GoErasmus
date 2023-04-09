import { getConnection } from "../database/database"
let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addCityImages = async (req, res) => {
    try {
        const connection = await getConnection()
        const {id} = req.params
        let uploaded, i = 0
        if (id === undefined)
            res.status(400).json({ "message": "ID de ciudad no encontrado" })
        
        var files = [], fileKeys = Object.keys(req.files)

        fileKeys.forEach(key => {
            files.push(req.files[key])
        })
        
        while (i < files.length)
        {
            uploaded = await cloudinary.uploader.upload(files[i].tempFilePath, {
                folder: 'ciudades',
            })
            var imagenArt = {"urlImagen": uploaded.secure_url ,"ciudad_idCiudad" : id}
            await connection.query("INSERT INTO galeriaimagenesciudad SET ?", imagenArt)
            i++;
        }
        res.json("Images uploaded successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getCityImages = async (req, res) => {
    try {
        const connection = await getConnection()
        const {name} = req.query
        let query
        if (name === undefined) // nombreCiudad ? imagenes de esa ciudad : todas las imagenes
            query = await connection.query(`SELECT ciudad_idCiudad as idCiudad, urlImagenOriginal FROM galeriaimagenesciudad`)
        else
            query = await connection.query(`SELECT gic.urlImagen FROM galeriaimagenesciudad gic
                                            JOIN Ciudad c ON c.idCiudad= gic.ciudad_idCiudad
                                            WHERE c.nombre = ?`, name)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const deleteCityImages = async (req, res) => {
    try {
        const connection = await getConnection()
        const {id} = req.params
        await connection.query("DELETE FROM galeriaimagenesciudad WHERE ciudad_idCiudad=?", id)
        res.json({"message": "Images deleted succesfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    addCityImages,
    getCityImages,
    deleteCityImages
}