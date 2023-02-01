import { getConnection } from "../database/database"
let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addCountry = async (req, res) => {
    try {
        const { nombre } = req.body

        if (nombre === "")
            res.status(400).json({"message": "Bad Request. Please fill all fields"})
        
        const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
            folder: 'paises',
        })

        const {secure_url} = uploaded
        const country = { nombre, "urlBandera": secure_url }
        const connection = await getConnection()
        await connection.query("INSERT INTO pais SET ?", country)
        res.json({"message": "Country added successfully"})
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getCountries = async (req, res) => {
    try {
        const connection = await getConnection()
        const query = await connection.query('SELECT idPais, nombre as nombrePais, urlBandera FROM pais ORDER BY nombre ASC')
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateCountry = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre } = req.body

        if(id === undefined || nombre === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"})
        let country
        if (req.files === null)
            country = { nombre }
        else
        {
            const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
                folder: 'paises',
            })
    
            const {secure_url} = uploaded
            country = { nombre, "urlBandera": secure_url }
        }
        
        const connection = await getConnection()
        const query = await connection.query("UPDATE pais SET ? WHERE idPais = ?", [country, id])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const deleteCountry = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM pais WHERE idPais = ?", id)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    addCountry,
    getCountries,
    updateCountry,
    deleteCountry
}