import { getConnection } from "../database/database"
let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addCity = async (req, res) => {
    try {
        const { nombre, informacion, pais_idPais } = req.body

        if (nombre === undefined || informacion === undefined || pais_idPais === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"})
        const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
            folder: 'ciudades',
        })
        const city = { nombre, informacion, "urlCabecera": uploaded.secure_url, pais_idPais }
        const connection = await getConnection()
        await connection.query("INSERT INTO ciudad SET ?", city)
        const query = await connection.query("SELECT idCiudad FROM ciudad WHERE nombre=? AND informacion=? AND pais_idPais=? AND urlCabecera=?", [nombre, informacion, pais_idPais, uploaded.secure_url])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getCities = async (req, res) => { // name ? ciudades de pais name : todas las ciudades
    try {
        const connection = await getConnection()
        const {name} = req.query
        let query
        if (name === undefined)
            query = await connection.query(`SELECT c.idCiudad, c.nombre as nombreCiudad, c.informacion, c.urlCabecera, p.nombre as nombrePais FROM ciudad c
                                                LEFT JOIN Pais p ON p.idPais = c.pais_idPais
                                                ORDER BY nombreCiudad`)
        else
            query = await connection.query(`SELECT c.nombre as nombreCiudad, c.urlCabecera FROM Ciudad c
                                                JOIN Pais p ON p.idPais = c.pais_idPais WHERE p.nombre=?
                                                ORDER BY nombreCiudad ASC`, name)
        res.json(query)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getCityByName = async (req, res) => {
    try {
        const connection = await getConnection()
        const {name} = req.params
        const query = await connection.query(`SELECT idCiudad, nombre, urlCabecera, informacion FROM ciudad WHERE nombre = ?`, name)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getNameByCityId = async (req, res) => {
    try {
        const connection = await getConnection()
        const {id} = req.params
        const query = await connection.query(`SELECT nombre as nombreCiudad FROM ciudad WHERE idCiudad=?`, id)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateCity = async (req, res) => {
    try {
        const {id} = req.params
        const { nombre, informacion, pais_idPais } = req.body
        if (id === undefined || nombre === undefined || informacion === undefined || pais_idPais === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"})
        
        let city
        if (req.files === null && pais_idPais > 0)
            city = { nombre, informacion, ciudad_idCiudad }
        else if (req.files === null)
            city = { nombre, informacion }
        else
        {
            const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
                folder: 'ciudades',
            })
    
            const {secure_url} = uploaded
            if (pais_idPais > 0)
                city = { nombre, "urlCabecera": secure_url, informacion, pais_idPais }
            else
                city = { nombre, "urlCabecera": secure_url, informacion }
        }

        const connection = await getConnection()
        const query = await connection.query("UPDATE ciudad SET ? WHERE idCiudad = ?", [city, id])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

//Galeria Imágenes se borra de base de datos automáticamente
const deleteCity = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM ciudad WHERE idCiudad = ?", id)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    addCity,
    getCities,
    getNameByCityId,
    getCityByName,
    updateCity,
    deleteCity
}