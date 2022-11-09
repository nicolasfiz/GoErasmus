import { getConnection } from "../database/database";
import config from '../config';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
const nodemailer = require('nodemailer');

export const signUp = async (req, res) => {

    try {
        const { nombre, apellido1, nombreUsuario, email, contrasenaSinCifrar, contrasenaRepetida } = req.body;

        // Checking that the required data has been filled in and that the passwords match
        if (nombre === undefined || apellido1 === undefined || nombreUsuario === undefined ||
            email === undefined || contrasenaSinCifrar === undefined || contrasenaRepetida === undefined)
            return res.status(400).json({ message: "Bad Request. Please fill all fields" });
        else if (contrasenaSinCifrar !== contrasenaRepetida)
            return res.status(500).json({ message: "Passwords don't match"});
            const connection = await getConnection();
        
        // Checking that both email and username are not already in the database
        let idUsername = await connection.query("SELECT idUsuario FROM usuario WHERE nombreUsuario = ?", nombreUsuario.toLowerCase());
        if (idUsername.length !== 0)
            return res.status(500).json({message: "There is already an account with that username"});

        let idEmail = await connection.query("SELECT idUsuario FROM usuario WHERE email = ?", email.toLowerCase());
        if (idEmail.length !== 0)
            return res.status(500).json({message: "There is already an account with that email"});
        
        // ------------------------------------------------------------------------------------------------------------------ //

        // Filling in the rest of the properties
        let apellido2 = null;
        let urlFotoPerfil = null;
        let cantidadPuntos = 0;
        let cuentaActivada = 0;
        let fechaCreacionCuenta = "current_timestamp";
        let facultad_idfacultad = null;
        
        let {Rol_idRol, nombreRol} = await connection.query('SELECT idRol, nombre as nombreRol FROM Rol where nombre = "Novato"');
        
        //Encrypting the password
        const  contrasena = await encryptPassword(contrasenaSinCifrar);
        
        //Constructing the user to be added to the database and inserting it into the database
        const user = { nombre, apellido1, apellido2, nombreUsuario, email, contrasena, urlFotoPerfil,
                        cantidadPuntos, cuentaActivada, fechaCreacionCuenta, Rol_idRol, facultad_idfacultad };
        await connection.query("INSERT INTO usuario SET ?", user);

        // ------------------------------------------------------------------------------------------------------------------ //

        // Generating the user token
        const idUsuario = await connection.query(`SELECT idUsuario FROM Usuario WHERE email = ?`, user.email);
        const token = jwt.sign({id: idUsuario, rol: nombreRol}, config.secret, {
                expiresIn: 86400 //24 hours
        });

        return res.json({token});
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    const connection = await getConnection();

    // Checking that the email is in the database
    const emailFound = await connection.query('SELECT email FROM Usuario WHERE email = ?', email);
    if ( emailFound.length === 0)
        return res.status(400).json({ message: "Bad request. Email not found" });
    
    // Checking that the password matches the saved one
    const passwordDB = await connection.query('SELECT contrasena FROM Usuario WHERE email = ?', email);
    const matchPassword = await validatePassword(password, passwordDB[0].contrasena);
    if (!matchPassword)
        return res.status(400).json({ message: "Invalid password. Please try again!" });
    
    // Querying the data needed to generate the token
    const {idUsuario, nombreRol} = await connection.query(`SELECT u.idUsuario as idUsuario, r.nombre as nombreRol FROM Usuario u
                                                            JOIN Rol r ON r.idRol = u.Rol_idRol WHERE u.email = ?`, email);

     // Generating the user token                                                        
    const token = jwt.sign({id: idUsuario, rol: nombreRol}, config.secret, {
        expiresIn: 86400 
    });

    return res.json({token: token});
}

export const sendPasswordtoUserEmail = async (req, res) => {
    const {email} = req.body;
    const connection = await getConnection();

    // Checking that the email is in the database
    const emailFound = await connection.query("SELECT email FROM usuario WHERE email = ?", email);
    if (emailFound.length === 0)
        return res.status(400).json({message: "Bad request. That email isn't registered in the system."});
    
    // Generating a random password to be mailed to the user and encrypting it to store it in the database
    const idUsuario = await connection.query("SELECT idUsuario FROM usuario WHERE email = ?", email);
    const alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let autoGeneratedPassword = '';
    for (let i = 0; i < 8; i++)
        autoGeneratedPassword += alphanumeric[Math.floor(Math.random() * alphanumeric.length)];
    const contrasena = await encryptPassword(autoGeneratedPassword);
    await connection.query("update usuario set contrasena=? where idUsuario=?;", [contrasena, idUsuario[0].idUsuario]);

    // ------------------------------------------------------------------------------------------------------------------ //
    
    // Generating the transport object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.email_pass
        }
    });

    // Creating the body of the email message
    const mensaje = `Usted ha solicitado una recuperacion de cuenta.\n Para acceder nuevamente a su cuenta, por favor introduzca la siguiente contraseña autogenerada: ${autoGeneratedPassword}\nUna vez iniciada la sesión, le recomendamos cambiarla por una nueva que sea más segura.\nSaludos,\n\nEl equipo de GoERASMUS.`;
   
    // Creating the object with the email options
    const mailOptions = {
        from: config.email,
        to: email,
        subject: 'Solicitud de reseteo de contraseña',
        text: mensaje
    };

    //Sending the email to the user
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
          return res.status(500).json({message: error});
        return res.json({ message: 'Email enviado: ' + info.response });
      });
}

const encryptPassword = async (password) => {

    //Generating a salt of 10 iterations
    const salt = await bcrypt.genSalt(10);
    // The password is returned hashed with salt added to it
    return await bcrypt.hash(password, salt);
}

const validatePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export const methods = {
    signIn,
    signUp,
    sendPasswordtoUserEmail
};