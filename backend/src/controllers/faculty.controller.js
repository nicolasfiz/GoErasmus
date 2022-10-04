import { getConnection } from "../database/database";

// Panel de Administracion
const addFaculty = async (req, res) => {
    try {
        const { nombre, universidad_idUniversidad } = req.body;

        if (nombre === undefined ||  universidad_idUniversidad === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const faculty = { nombre, universidad_idUniversidad };
        const connection = await getConnection();

        await connection.query("INSERT INTO facultad SET ?", faculty);
        res.json({message: "Faculty added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getFaculties = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query(`SELECT f.nombre as nombreFacultad, u.nombre as nombreUniversidad
                                                FROM Facultad f
                                                LEFT JOIN Universidad u ON (f.universidad_idUniversidad = u.idUniversidad)`);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getFacultyById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre FROM facultad WHERE idFacultad = ?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

/*// Ruta paises/id_pais/id_ciudad/id_universidad/id_facultad
const getSubjectsByFacultyId = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT a.nombre FROM Asignatura a
                                                JOIN Facultad ON idFacultad = a.facultad_idFacultad
                                                WHERE iFacultad = ?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}*/

// Panel de Administracion
const updateFaculty = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, universidad_idUniversidad } = req.body;

        if(id === undefined || nombre === undefined || universidad_idUniversidad === undefined )
            res.status(400).json({message: "Bad Request. Please fill all fields"});

        const facultad = { nombre, universidad_idUniversidad };
        const connection = await getConnection();
        const query = await connection.query("UPDATE facultad SET ? WHERE idFacultad = ?", [facultad, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteFaculty = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM facultad WHERE idFacultad = ?", id);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addFaculty,
    getFaculties,
    getFacultyById,
    //getSubjectsByFacultyId,
    updateFaculty,
    deleteFaculty
};