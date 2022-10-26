import { getConnection } from "../database/database";

// Panel de Administracion
const addRole = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (nombre === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const role = { nombre };
        const connection = await getConnection();

        await connection.query("INSERT INTO universidad SET ?", role);
        res.json({message: "Role added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getRoles = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query(`SELECT nombre as nombreRol FROM Rol`);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getRoleById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre FROM rol
                                                WHERE idRol=?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        if(id === undefined || nombre === undefined)
            res.status(400).json({message:"Bad Request. Please fill all fields"});

        const role = { nombre };
        const connection = await getConnection();
        const query = await connection.query("UPDATE rol SET ? WHERE idRol = ?", [role, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addRole,
    getRoles,
    getRoleById,
    updateRole,
};