import jwt from 'jsonwebtoken';
import { getConnection } from "../database/database";
import config from '../config';
import * as authUtils from "../libs/authUtils";
import { sendEmailToUser } from "../libs/sendEmail";

export const signUp = async (req, res) => { //Probar cambios + envio email
  try {
    const connection = await getConnection();
    const { nombrePersona, primerApellido, nombreUsuario, correo, contrasenaSinCifrar, contrasenaRepetida } = req.body;

    // Checking that the required data has been filled in and that the passwords match
    if (nombrePersona === undefined || primerApellido === undefined || nombreUsuario === undefined || correo === undefined ||
      contrasenaSinCifrar === undefined || contrasenaRepetida === undefined)
      return res.status(400).json({ message: "Bad Request. Please fill all fields" });
    else if (contrasenaSinCifrar !== contrasenaRepetida)
      return res.status(500).json({ message: "Passwords don't match" });
        
    // Checking that both email and username are not already in the database
    let idUsername = await connection.query("SELECT idUsuario FROM usuario WHERE nombreUsuario = ?", nombreUsuario);
    if (idUsername.length !== 0)
      return res.status(500).json({ message: "There is already an account with that username" });

    let idEmail = await connection.query("SELECT idUsuario FROM usuario WHERE email = ?", correo);
    if (idEmail.length !== 0)
      return res.status(500).json({ message: "There is already an account with that email" });
        
    // ------------------------------------------------------------------------------------------------------------------ //
        
    //Encrypting the password, formatting some user fields and getting role fields
    const contrasena = await authUtils.encryptPassword(contrasenaSinCifrar);
    const nombre = authUtils.capitalizeString(nombrePersona);
    const apellido1 = authUtils.capitalizeString(primerApellido);
    const email = correo.toLowerCase();
    const roles = await connection.query('SELECT idRol, nombre FROM Rol WHERE nombre = "Novato"');
    
    const rol_idRol = roles[0].idRol;
    const nombreRol = roles[0].nombre;

    //Constructing the user to be added to the database and inserting it into the database
    const user = { nombre, apellido1, nombreUsuario, email, contrasena, rol_idRol };
    await connection.query("INSERT INTO usuario SET ?", user);

    // ------------------------------------------------------------------------------------------------------------------ //
        
    // Generating the user token
    const idUsuario = await connection.query(`SELECT idUsuario FROM Usuario WHERE email = ?`, user.email);
    const token = jwt.sign({id: idUsuario[0].idUsuario, rol: nombreRol}, config.secret, {
            expiresIn: 86400 //24 hours
    });

    // ------------------------------------------------------------------------------------------------------------------ //

    // Creating the subject and the body of the email and sending it
    const subject = "Bienvenido a GoERASMUS";
    const activationLink = `http://localhost:4000/api/auth/${token}`; //Mirar
    const message = `Hola viajero,\nEstás a punto de empezar una larga travesía y el punto de partida es GoERASMUS, pero antes de ir al aeropuerto es necesario hacer la maleta o, en nuestro caso, pulsar el enlace a continuación para activar tu cuenta:\n${activationLink}\nEsperamos con ganas las anécdotas de tus viajes.\n\nUn saludo,\nEl equipo de GoERASMUS.`;  
    sendEmailToUser(email, subject, message);

    return res.json({ token });
  } catch(error) {
    return res.status(500).send(error.message);
  }
}

export const signIn = async (req, res) => { //Probar cambios
  try {
    const {email, password} = req.body;
    const connection = await getConnection();

    // Checking that the email is in the database
    const emailFound = await connection.query('SELECT email FROM Usuario WHERE email = ?', email);
    if ( emailFound.length === 0)
        return res.status(400).json({ message: "Bad request. Email not found" });
    
    // Checking that the password matches the saved one
    const passwordDB = await connection.query('SELECT contrasena FROM Usuario WHERE email = ?', email);
    const matchPassword = await authUtils.validatePassword(password, passwordDB[0].contrasena);
    if (!matchPassword)
        return res.status(400).json({ message: "Invalid password. Please try again!" });
    
    // Querying the data needed to generate the token
    const data = await connection.query(`SELECT u.idUsuario as idUsuario, r.nombre as nombreRol FROM Usuario u
                                                            LEFT JOIN Rol r ON r.idRol = u.Rol_idRol WHERE u.email = ?`, email);

     // Generating the user token                                                        
    const token = jwt.sign({id: data[0].idUsuario, rol: data[0].nombreRol}, config.secret, {
        expiresIn: 86400 
    });

    return res.json({ token });
  } catch(error) {
    return res.status(500).send(error.message);
  }
}

export const sendPasswordtoUserEmail = async (req, res) => { //Probar
  try {
    const {email} = req.body;
    const connection = await getConnection();

    // Checking that the email is in the database
    const emailFound = await connection.query("SELECT email FROM usuario WHERE email = ?", email);
    if (emailFound.length === 0)
        return res.status(400).json({message: "Bad request. That email isn't registered in the system."});
    
    // Generating a random password to be mailed to the user and encrypting it to store it in the database
    const idUsuario = await connection.query("SELECT idUsuario FROM usuario WHERE email = ?", email);
    const autoGeneratedPassword = authUtils.generatePassword();
    const contrasena = await authUtils.encryptPassword(autoGeneratedPassword);
    await connection.query("UPDATE usuario SET contrasena = ? WHERE idUsuario = ?;", [contrasena, idUsuario[0].idUsuario]);

    // ------------------------------------------------------------------------------------------------------------------ //

    // Creating the subject of the email
    const asunto = 'Solicitud de reseteo de contraseña';
    // Creating the body of the email message
    const mensaje = `Usted ha solicitado una recuperacion de cuenta.\nPara acceder nuevamente a su cuenta, por favor introduzca la siguiente contraseña autogenerada: ${autoGeneratedPassword}\nUna vez iniciada la sesión, le recomendamos cambiarla por una nueva que sea más segura.\n\nSaludos,\nEl equipo de GoERASMUS.`;
    sendEmailToUser(email, asunto, mensaje);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export const confirmAccount = async (req, res) => { //Probar
  try {
    const {token} = req.params;

    if (token !== undefined)
    {
      const connection = await getConnection();
      const {id} = jwt.verify(token, config.secret);
      await connection.query("UPDATE usuario SET cuentaActivada=? WHERE idUsuario=?", ['Si', id]);
      return res.json({ message: "Account activated successfully!" });
    }
    else
      return res.status(400).json({message: "token not found!"});
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export const getAccount = (req, res) => {
  const {token} = req.params;
  if (token === undefined)
    return res.status(400).json({"message": "token not found!"});
  const {id, rol} = jwt.verify(token, config.secret);
  return res.json({"id": id, "rol":rol});
}

export const methods = {
    signIn,
    signUp,
    sendPasswordtoUserEmail,
    confirmAccount,
    getAccount
};