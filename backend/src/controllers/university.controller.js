import { getConnection } from "../database/database";

// Panel de Administracion
const addUniversity = async (req, res) => {
    try {
        const { nombre, urlLogo, ciudad_idCiudad } = req.body;

        if (nombre === undefined || urlLogo === undefined || ciudad_idCiudad === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const university = { nombre, urlLogo, ciudad_idCiudad };
        const connection = await getConnection();

        await connection.query("INSERT INTO universidad SET ?", university);
        res.json({message: "University added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getUniversities = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query(`SELECT u.idUniversidad, u.nombre as nombreUniversidad, c.nombre as nombreCiudad
                                                FROM Universidad u
                                                LEFT JOIN Ciudad c ON (c.idCiudad = u.ciudad_idCiudad)`);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getUniversityById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre, urlLogo FROM universidad
                                                WHERE idUniversidad=?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Ruta paises/id_pais/id_ciudad/id_universidad/
const getFacultiesByUniversityId = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT f.nombre FROM Facultad f
                                                JOIN Universidad ON idUniversidad = f.universidad_idUniversidad
                                                WHERE idUniversidad = ?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateUniversity = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, urlLogo, ciudad_idCiudad } = req.body;

        if(id === undefined || nombre === undefined || urlLogo === undefined || ciudad_idCiudad === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});

        const universidad = { nombre, urlLogo, ciudad_idCiudad };
        const connection = await getConnection();
        const query = await connection.query("UPDATE universidad SET ? WHERE idUniversidad = ?", [universidad, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteUniversity = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM universidad WHERE idUniversidad = ?", id);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addUniversity,
    getUniversities,
    getUniversityById,
    getFacultiesByUniversityId,
    updateUniversity,
    deleteUniversity
};