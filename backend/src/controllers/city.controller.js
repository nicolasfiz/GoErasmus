import { getConnection } from "../database/database";

// Panel de Administracion
const addCity = async (req, res) => {
    try {
        const { nombre, informacion, url, pais_idPais } = req.body;

        if (nombre === undefined || informacion === undefined || url === undefined || pais_idPais === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const city = { nombre, informacion, url, pais_idPais };
        const connection = await getConnection();

        await connection.query("INSERT INTO ciudad SET ?", city);
        res.json({message: "City added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getCities = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query(`SELECT c.idCiudad, c.nombre, p.nombre FROM ciudad c
                                                LEFT JOIN Pais p ON (p.idPais = c.pais_idPais)`);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Ruta paises/id_pais/id_ciudad
const getCityById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre, url, informacion FROM ciudad
                                                WHERE idCiudad=?`, id);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, informacion, url, pais_idPais } = req.body;

        if(id === undefined || nombre === undefined || informacion === undefined || url === undefined || pais_idPais === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});

        const city = { nombre, informacion, url, pais_idPais };
        const connection = await getConnection();
        const query = await connection.query("UPDATE ciudad SET ? WHERE id = ?", [city, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteCity = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM ciudad WHERE id = ?", id);

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