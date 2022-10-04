import { getConnection } from "../database/database";

// Panel de Administracion
const addUniversity = async (req, res) => {
    try {
    
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getUniversities = async (req, res) => {
    try {
        

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Ruta paises/id_pais/id_ciudad/id_universidad
const getUniversityById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateUniversity = async (req, res) => {
    try {
        
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteUniversity = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM universidad WHERE id = ?", id);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addUniversity,
    getUniversities,
    getUniversityById,
    updateUniversity,
    deleteUniversity
};