import { getConnection } from "../database/database";
var cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const getUser = async (req, res) => {
    try {
        const connection = await getConnection();
        const { nombreUsuario } = req.params;
        console.log(nombreUsuario)
        const result = await connection.query(`SELECT u.nombreUsuario, u.email, r.nombre as rol, u.urlFotoPerfil, f.nombre as facultad, un.nombre as universidad, c.nombre as ciudad, p.nombre as pais
        FROM usuario u LEFT JOIN rol r ON u.Rol_idRol=r.idRol LEFT JOIN facultad f ON u.facultad_idfacultad=f.idFacultad LEFT JOIN universidad un ON f.universidad_iduniversidad=un.iduniversidad
        LEFT JOIN ciudad c on un.iduniversidad=c.idCiudad left join pais p on c.pais_idpais=p.idpais WHERE u.nombreUsuario = '`+nombreUsuario+`';`);
        console.log(result)
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
}

const getLogros = async (req, res) => {
    try{
        const connection = await getConnection()
        const {id} = req.params
        //Obtener rol del usuario
        const rolQuery = await connection.query(`select r.idRol, r.nombre from usuario u join rol r on u.Rol_idRol=r.idRol where u.idUsuario=?;`, id);
        const rol = rolQuery[0].nombre
        const idRol = rolQuery[0].idRol
        //logros usuario
        const usuarioLogro = await connection.query(`select * from usuariologro where usuario_idusuario = ?;`, id);
        const array = []
        usuarioLogro.map(elem => array.push(elem.logro_idLogro))
        const logrosConseguidos = await connection.query(`select descripcion from logro where idLogro in (?);`, [array]);
        const logrosProximos = await connection.query(`select descripcion from logro where idLogro not in (?) AND rol_idRol = ?`, [array, idRol])
        const cantidadLogrosRol = await connection.query(`select count(*) as cantidad from logro where rol_idRol = ?;`, idRol);
        const cantidad = cantidadLogrosRol[0].cantidad;
        const arrayConseguidos = []
        const arrayProximos = []
        logrosConseguidos.map(elem => arrayConseguidos.push(elem.descripcion))
        logrosProximos.map(elem=> arrayProximos.push(elem.descripcion))
        res.send({rol, cantidad, arrayConseguidos, arrayProximos})
        
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const resetPoints = async (req, res) => {
    try{
        const connection = await getConnection();
        await connection.query("SET SQL_SAFE_UPDATES = 0;");
        await connection.query("UPDATE usuario SET cantidadPuntos = 0");
        await connection.query("SET SQL_SAFE_UPDATES = 1;");
        res.json({ message: "Points reset successfully" });
    }catch(error){
        res.status(500).send(error.message);
    }
}

export const methods = {
    getUser,
    getPaises,
    uploadPicture,
    getCiudades,
    getUniversidades,
    getFacultades,
    guardarDatos,
    getLogros,
    resetPoints
};