import { getConnection } from "../database/database"

let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addArticleImages = async (req, res) => {
    try {
        const connection = await getConnection()
        const {id} = req.params
        let uploaded, i = 0
        if (id === undefined)
            res.status(400).json({ "message": "ID de articulo no encontrado" })
        
        var files = [], fileKeys = Object.keys(req.files)

        fileKeys.forEach(key => {
            files.push(req.files[key])
        })
        
        while (i < files.length)
        {
            uploaded = await cloudinary.uploader.upload(files[i].tempFilePath, {
                folder: 'articulos',
            })
            var imagenArt = {"urlImagen": uploaded.secure_url ,"articulo_idArticulo" : id}
            await connection.query("INSERT INTO galeriaimagenesarticulo SET ?", imagenArt)
            i++;
        }
        res.json("Images uploaded successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getArticleImages = async (req, res) => {
    try {
        const connection = await getConnection()
        const {id} = req.params
        let query = await connection.query(`SELECT urlImagen FROM galeriaimagenesarticulo WHERE articulo_idArticulo = ?`, id)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    addArticleImages,
    getArticleImages
}