import jwt from 'jsonwebtoken';
import { getConnection } from "../database/database";
import config from '../config';

export const verifyToken = async (req, res, next) => {
  try{
    const token = req.headers["access-token"];
    if (!token)
      return res.status(400).json({message: "No token provided"});  
    const connection = await getConnection();
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    req.nombreRol = decoded.rol;
    
    const user = await connection.query("SELECT * FROM usuario WHERE idUsuario = ?", decoded.id);
    if (user.length === 0)
      return res.status(400).json({message: "no user found"});
    if (decoded.rol !== null)
    {
      const roleExist = await connection.query("SELECT * FROM rol WHERE nombre = ?", decoded.rol);
      if (roleExist.length === 0)
        return res.status(400).json({ message: "Role doesn't exist" });
    
      const roleDontMatch = await connection.query("SELECT * FROM usuario u JOIN rol r ON u.rol_idRol = r.idRol WHERE r.nombre = ?", decoded.rol);
      if (roleDontMatch.length === 0)
        return res.status(500).json({ message: "The role from token and the role of the userId don't match"});
    }
    next();
  } catch (error) {
    return res.status(500).json({message: `Unauthorized - ${error}`});
  }
}

export const isTheSameUser = async (req, res, next) => {
  const { id } = req.params;
  const connection = await getConnection();
  const user = await connection.query("SELECT idUsuario FROM usuario WHERE idUsuario = ?", id);
  if (user.length === 0)
    return res.status(400).json({ message: "User not found" });
  else if (user[0].idUsuario !== req.idUsuario)
    return res.status(500).json({ message: "Unauthorized" });
  next();
}

export const isAdministrator = async (req, res, next) => {
  if (req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user isn't an Administrator" });
  next();
}

export const isGlobetrotterOrAbove = async (req, res, next) => {
  if (req.nombreRol !== "Trotamundos" && req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user doesn't have at least the role of Globetrotter" });
  next();
}

export const isExpertTravellerOrAbove = async (req, res, next) => {
  if (req.nombreRol !== "Viajero Experto" && req.nombreRol !== "Trotamundos" && req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user doesn't have at least the role of Expert Traveller" });
  next();
}

export const isAdventurerOrAbove = async (req, res, next) => {
  if (req.nombreRol !== "Aventurero" && req.nombreRol !== "Viajero Experto" && req.nombreRol !== "Trotamundos" &&
       req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user doesn't have at least the role of Adventurer" });
  next();
}

export const isBackpackerOrAbove = async (req, res, next) => {
  if (req.nombreRol !== "Mochilero" && req.nombreRol !== "Aventurero" && req.nombreRol !== "Viajero Experto" &&
      req.nombreRol !== "Trotamundos" && req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user doesn't have at least the role of Backpacker" });
  next();
}

export const isRookieOrAbove = async (req, res, next) => {
  if (req.nombreRol !== "Novato" && req.nombreRol !== "Mochilero" && req.nombreRol !== "Aventurero" &&
        req.nombreRol !== "Viajero Experto" && req.nombreRol !== "Trotamundos" && req.nombreRol !== "Administrador")
    return res.status(500).json({ message: "This user doesn't have at least the role of Rookie" });
  next();
}

export const methods = {
  verifyToken,
  isTheSameUser,
  isAdministrator,
  isGlobetrotterOrAbove,
  isExpertTravellerOrAbove,
  isAdventurerOrAbove,
  isBackpackerOrAbove,
  isRookieOrAbove
}