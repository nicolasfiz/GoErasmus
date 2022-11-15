import { getConnection } from "../database/database";

const addAchievement = async (req, res) => {
    try {
        const { nombre, descripcion, cantidadPuntos, url, rol_idRol} = req.body;

        if (nombre === undefined || descripcion === undefined || cantidadPuntos === undefined || url === undefined || rol_idRol === undefined)
            res.status(400).json({ message: "Bad Request. Please fill all fields" });
        const achievement = { nombre, descripcion, cantidadPuntos, url, rol_idRol};
        const connection = await getConnection();
        await connection.query("INSERT INTO logro SET ?", achievement);
        res.json({message: "Achievement added successfully"});
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getAchievements = async (req, res) => { //Achievements por rol
    try {
        const connection = await getConnection();
        const {id} = req.query;
        let query;
        if (id === undefined)
            query = await connection.query(`SELECT l.nombre as nombreLogro, l.descripcion as descripcionLogro, l.url as urlImagenLogro,
                                            l.cantidadPuntos as cantidadPuntos, r.nombre as nombreRol FROM logro l
                                            LEFT JOIN rol r ON l.rol_idRol = r.idRol ORDER BY nombreRol, nombreLogro`);
        else
            query = await connection.query(`SELECT nombre, descripcion, url, cantidadPuntos FROM logro WHERE rol_idRol = ?`, id);
        res.json(query);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAchievementById = async (req, res) => {
    try {
        const connection = await getConnection();
        const {id} = req.params;
        const query = await connection.query(`SELECT nombre, urlCabecera, informacion FROM ciudad
                                                WHERE idCiudad=?`, id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateAchievement = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, cantidadPuntos, url, rol_idRol} = req.body;

        if (nombre === undefined || descripcion === undefined || cantidadPuntos === undefined || url === undefined || rol_idRol === undefined)
            res.status(400).json({message: "Bad Request. Please fill all fields"});

        const achievement = { nombre, descripcion, cantidadPuntos, url, rol_idRol };
        const connection = await getConnection();
        const query = await connection.query("UPDATE logro SET ? WHERE idLogro = ?", [achievement, id]);
        res.json(query);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteAchievement = async (req, res) => {
    try {
        const {id} = req.params;
        const connection = await getConnection();
        const query = await connection.query("DELETE FROM logro WHERE idLogro = ?", id);
        res.json(query);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const unlockAchievement = async (req, res) => {
    try {
        const {usuario_idUsuario, logro_idLogro} = req.params;
        const connection = await getConnection();
        const userachievement = {usuario_idUsuario, logro_idLogro};
        await connection.query("INSERT INTO usuariologro SET ?", userachievement);
        res.json({message: "Row added successfully"});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const methods = {
    addAchievement,
    getAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement,
    unlockAchievement
};