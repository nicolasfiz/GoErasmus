import { getConnection } from "../database/database";
var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

//Cambiar query por los cambios de la bbdd
const getUser = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query(`SELECT u.nombre, u.email, r.nombre as rol, u.urlFotoPerfil, f.nombre as facultad, un.nombre as universidad, c.nombre as ciudad, p.nombre as pais
        FROM usuario u LEFT JOIN rol r ON u.Rol_idRol=r.idRol LEFT JOIN facultad f ON u.facultad_idfacultad=f.idFacultad LEFT JOIN universidad un ON f.universidad_iduniversidad=un.iduniversidad
        LEFT JOIN ciudad c on un.iduniversidad=c.idCiudad left join pais p on c.pais_idpais=p.idpais WHERE u.idUsuario=?;`, id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const getPaises = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`SELECT nombre FROM pais`);
        let array = []
        result.map(elem => array.push(elem.nombre))
        res.send(array);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const getCiudades = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query(`select d.nombre from ciudad d join pais p on p.idPais=d.pais_idPais where p.nombre like '%${id}%'`);
        let array = []
        result.map(elem => array.push(elem.nombre))
        res.send(array);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
const getUniversidades = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query(`SELECT u.nombre FROM universidad u join ciudad d on d.idCiudad=u.ciudad_idCiudad where d.nombre like '%${id}%'`);
        let array = []
        result.map(elem => array.push(elem.nombre))
        res.send(array);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}
const getFacultades = async (req, res) => {
    try {
        const connection = await getConnection();
        const { id } = req.params;
        const result = await connection.query(`SELECT f.nombre FROM facultad f join universidad u on f.universidad_idUniversidad=u.idUniversidad where u.nombre like '%${id}%'`);
        let array = []
        result.map(elem => array.push(elem.nombre))
        res.send(array);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const uploadPicture = async (req, res) => {
    try {
        cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => { console.log(result, error); })
        res.json("ok")
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const guardarDatos = async (req, res) => {
    try {
        const connection = await getConnection();
        const datos = {}
        if (req.files != null) {
            await cloudinary.uploader.upload(req.files.file.tempFilePath, async (error, result) => {
                if (error) {
                    res.status(500)
                    res.send(error)
                }
                datos['urlFotoPerfil'] = result.url;
            })
        }
        const { id } = req.params;
        const body = req.body;
        for (const prop in body) {
            if (body[prop].length > 0 && prop != 'file' && prop != 'facultad' && prop != 'universidad' && prop != 'ciudad' && prop != 'pais') {
                datos[prop] = body[prop]
            }
        }
        const objectoFacultad = await connection.query(`select idfacultad from facultad where nombre like '${body['facultad']}'`);
        datos['facultad_idfacultad'] = objectoFacultad[0].idfacultad;
        console.log("datos", datos)
        console.log("id:", id)
        const result = await connection.query("UPDATE usuario SET ? where idUsuario = ?", [datos, id]);
        res.json(result);
    } catch (error) {
        res.status(500)
        res.send(error.message);
    }
    //console.log(req.body)
    //console.log(req.files.file.tempFilePath)
}

export const methods = {
    getUser,
    getPaises,
    uploadPicture,
    getCiudades,
    getUniversidades,
    getFacultades,
    guardarDatos
};