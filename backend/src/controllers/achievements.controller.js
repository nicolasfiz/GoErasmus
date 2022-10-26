import { getConnection } from "../database/database";

/*// Panel de Administracion
const addAchievement = async (req, res) => {
    try {
        const { nombre, descripcion, cantidadPuntos, url } = req.body;

        if (nombre === undefined || descripcion === undefined || cantidadPuntos === undefined || url === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});
        const achievement = { nombre, descripcion, cantidadPuntos, url };
        const connection = await getConnection();

        await connection.query("INSERT INTO logro SET ?", achievement);
        res.json({message: "Achievement added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getAchievements = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = await connection.query(`SELECT c.idCiudad, c.nombre as nombreCiudad, p.nombre as nombrePais FROM ciudad c
                                                LEFT JOIN Pais p ON (p.idPais = c.pais_idPais)`);
        res.join(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const getAchievementById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre, urlCabecera, informacion FROM ciudad
                                                WHERE idCiudad=?`, id);
        res.join(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const updateAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, informacion, urlCabecera, pais_idPais } = req.body;

        if(id === undefined || nombre === undefined || informacion === undefined || urlCabecera === undefined || pais_idPais === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});

        const achievement = { nombre, informacion, urlCabecera, pais_idPais };
        const connection = await getConnection();
        const query = await connection.query("UPDATE logro SET ? WHERE idLogro = ?", [achievement, id]);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

// Panel de Administracion
const deleteAchievement = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM logro WHERE idLogro = ?", id);

        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addAchievement,
    getAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement
};*/