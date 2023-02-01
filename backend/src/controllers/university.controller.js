import { getConnection } from "../database/database"
let cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const addUniversity = async (req, res) => {
    try {
        const { nombre, ciudad_idCiudad } = req.body

        if (nombre === undefined || ciudad_idCiudad === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"})
        
        const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
            folder: 'logosUniversidades',
        })
    
        const {secure_url} = uploaded
        const university = { nombre, "urlLogo": secure_url, ciudad_idCiudad }
        const connection = await getConnection()

        await connection.query("INSERT INTO universidad SET ?", university)
        res.json({"message": "University added successfully"})
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getUniversities = async (req, res) => { // name ? universidades de ciudad name : todas las universidades
    try {
        const connection = await getConnection()
        const {name} = req.query
        let query
        if (name === undefined)
            query = await connection.query(`SELECT u.idUniversidad, u.urlLogo, u.nombre as nombreUniversidad, c.nombre as nombreCiudad
                                            FROM Universidad u LEFT JOIN Ciudad c ON c.idCiudad = u.ciudad_idCiudad
                                            ORDER BY nombreUniversidad ASC`)
        else
            query = await connection.query(`SELECT u.nombre as nombreUniversidad, u.urlLogo
                                            FROM Universidad u JOIN Ciudad c ON c.idCiudad = u.ciudad_idCiudad WHERE c.nombre= ?
                                            ORDER BY nombreUniversidad ASC`, name)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getUniversitiesCityLength = async (req, res) => {
    try {
        const connection = await getConnection()
        const {name} = req.params
        let query
        if (name === undefined)
            query = [{"length": 0}]
        else
            query = await connection.query(`SELECT COUNT(*) as length FROM universidad u
                                            JOIN ciudad c ON c.idCiudad = u.ciudad_idCiudad WHERE c.nombre = ?`, name)
        res.json(query)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateUniversity = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, ciudad_idCiudad } = req.body

        if (id === undefined || nombre === undefined || ciudad_idCiudad === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"})

            let universidad
            if (req.files === null && ciudad_idCiudad > 0)
                universidad = { nombre, ciudad_idCiudad }
            else if (req.files === null)
                universidad = { nombre }
            else
            {
                const uploaded = await cloudinary.uploader.upload(req.files.file.tempFilePath, {
                    folder: 'logosUniversidades',
                })
        
                const {secure_url} = uploaded
                if (ciudad_idCiudad > 0)
                    universidad = { nombre, "urlLogo": secure_url, ciudad_idCiudad }
                else
                    universidad = { nombre, "urlLogo": secure_url }
            }
        const connection = await getConnection()
        const query = await connection.query("UPDATE universidad SET ? WHERE idUniversidad = ?", [universidad, id])
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const deleteUniversity = async (req, res) => {
    try {
        const {id} = req.params
        const connection = await getConnection()
        const query = await connection.query("DELETE FROM universidad WHERE idUniversidad = ?", id)
        res.json(query)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

export const methods = {
    addUniversity,
    getUniversities,
    getUniversitiesCityLength,
    updateUniversity,
    deleteUniversity
}