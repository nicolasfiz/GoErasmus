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

const getCities = async (req, res) => { // name ? ciudades de pais name : todas las ciudades
    try {
        const connection = await getConnection();
        const {name} = req.query;
        let query;
        if (name === undefined)
            query = await connection.query(`SELECT c.idCiudad, c.nombre as nombreCiudad, c.informacion, c.urlCabecera, p.nombre as nombrePais FROM ciudad c
                                                LEFT JOIN Pais p ON p.idPais = c.pais_idPais
                                                ORDER BY nombreCiudad`);
        else
            query = await connection.query(`SELECT c.nombre as nombreCiudad, c.urlCabecera FROM Ciudad c
                                                JOIN Pais p ON p.idPais = c.pais_idPais WHERE p.nombre=?
                                                ORDER BY nombreCiudad ASC`, name);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCityByName = async (req, res) => {
    try {
        const connection = await getConnection();
        const {name} = req.params;
        const query = await connection.query(`SELECT idCiudad, nombre, urlCabecera, informacion FROM ciudad WHERE nombre = ?`, name);
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
    getCityByName,
    updateCity,
    deleteCity
};