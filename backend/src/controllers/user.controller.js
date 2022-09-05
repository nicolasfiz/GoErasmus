import { getConnection } from "../database/database";

const getUser = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query(`SELECT u.nombre, u.email, u.rango, i.route, f.nombre as facultad, un.nombre as universidad, c.nombre as ciudad, p.nombre as pais
        FROM usuario u LEFT JOIN imagenusuario i ON u.idUsuario = i.usuario_idUsuario
        LEFT JOIN facultad f ON u.idUsuario=f.idFacultad LEFT JOIN universidad un ON f.universidad_iduniversidad=un.iduniversidad
        LEFT JOIN ciudad c on un.iduniversidad=c.idCiudad left join pais p on c.pais_idpais=p.idpais WHERE u.idUsuario=?;`, id);
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
}

export const methods = {
    getUser
};