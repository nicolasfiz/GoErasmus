import { getConnection } from "../database/database";

// Panel de Administracion
const addCountry = async (req, res) => {
    try {
        const { nombre, url } = req.body;

        if (nombre === undefined || url === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const country = { nombre, url };
        const connection = await getConnection();

        await connection.query("INSERT INTO pais SET ?", country);
        res.json({message: "Country added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Ruta /paises/
const getCountries = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query('SELECT nombre, url FROM pais');

        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Ruta /paises/id_pais/
const getCitiesByCountryId = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT c.nombre, c.url FROM Ciudad c
                                                JOIN Pais p ON p.idPais = c.pais_idPais
                                                WHERE p.idPais=?`, id);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, url } = req.body;

        if(id === undefined || nombre === undefined || url === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});

        const country = { nombre, url };
        const connection = await getConnection();
        const query = await connection.query("UPDATE pais SET ? WHERE id = ?", [country, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteCountry = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM pais WHERE id = ?", id);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addCountry,
    getCountries,
    getCitiesByCountryId,
    updateCountry,
    deleteCountry
};