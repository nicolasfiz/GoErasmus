import { getConnection } from "../database/database";

const addCity = async (req, res) => {
    try {
        const { nombre, informacion, urlCabecera, pais_idPais } = req.body;

        if (nombre === undefined || informacion === undefined || urlCabecera === undefined || pais_idPais === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const city = { nombre, informacion, urlCabecera, pais_idPais };
        const connection = await getConnection();

        await connection.query("INSERT INTO ciudad SET ?", city);
        res.json({message: "City added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getCities = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.query;
        let query;
        if (id === undefined)
            query = await connection.query(`SELECT c.nombre as nombreCiudad, p.nombre as nombrePais FROM ciudad c
                                                LEFT JOIN Pais p ON (p.idPais = c.pais_idPais)`);
        else
            query = await connection.query(`SELECT c.nombre as nombreCiudad, c.urlCabecera FROM Ciudad c
                                                JOIN Pais p ON p.idPais = c.pais_idPais WHERE p.idPais=?`, id);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCityById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre, urlCabecera, informacion FROM ciudad WHERE idCiudad=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateCity = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, informacion, urlCabecera, pais_idPais } = req.body;
        if(id === undefined || nombre === undefined || informacion === undefined || urlCabecera === undefined || pais_idPais === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});
        const city = { nombre, informacion, urlCabecera, pais_idPais };
        const connection = await getConnection();
        const query = await connection.query("UPDATE ciudad SET ? WHERE idCiudad = ?", [city, id]);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteCity = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM ciudad WHERE idCiudad = ?", id);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addCity,
    getCities,
    getCityById,
    updateCity,
    deleteCity
};