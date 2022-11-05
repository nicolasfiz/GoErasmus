import { getConnection } from "../database/database";

const addCountry = async (req, res) => {
    try {
        const { nombre, urlBandera } = req.body;

        if (nombre === undefined || urlBandera === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const country = { nombre, urlBandera };
        const connection = await getConnection();

        await connection.query("INSERT INTO pais SET ?", country);
        res.json({message: "Country added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getCountries = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query('SELECT nombre as nombrePais, urlBandera FROM pais');
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCountryById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre as nombrePais, urlBandera FROM pais WHERE idPais=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateCountry = async (req, res) => { //Preguntar
    try {
        const { id } = req.params;
        const { nombre, urlBandera } = req.body;

        if(id === undefined || nombre === undefined || urlBandera === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});
        const country = { nombre, urlBandera };
        const connection = await getConnection();
        const query = await connection.query("UPDATE pais SET ? WHERE idPais = ?", [country, id]);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteCountry = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM pais WHERE idPais = ?", id);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry
};