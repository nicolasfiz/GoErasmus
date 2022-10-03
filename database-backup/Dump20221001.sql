-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: goerasmus
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `archivo`
--

DROP TABLE IF EXISTS `archivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivo` (
  `idArchivo` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `usuario_idUsuario` int NOT NULL,
  `Asignatura_idAsignatura` int NOT NULL,
  PRIMARY KEY (`idArchivo`),
  UNIQUE KEY `url_archivo_UNIQUE` (`url`),
  KEY `fk_archivos_usuario1_idx` (`usuario_idUsuario`),
  KEY `fk_Archivo_Asignatura1_idx` (`Asignatura_idAsignatura`),
  CONSTRAINT `fk_Archivo_Asignatura1` FOREIGN KEY (`Asignatura_idAsignatura`) REFERENCES `asignatura` (`idAsignatura`),
  CONSTRAINT `fk_archivos_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo`
--

LOCK TABLES `archivo` WRITE;
/*!40000 ALTER TABLE `archivo` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articulo`
--

DROP TABLE IF EXISTS `articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articulo` (
  `idArticulo` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Ciudad_idCiudad` int NOT NULL,
  PRIMARY KEY (`idArticulo`),
  KEY `fk_Articulo_Ciudad1_idx` (`Ciudad_idCiudad`),
  CONSTRAINT `fk_Articulo_Ciudad1` FOREIGN KEY (`Ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `idAsignatura` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `Facultad_idfacultad` int NOT NULL,
  PRIMARY KEY (`idAsignatura`),
  KEY `fk_Asignatura_Facultad1_idx` (`Facultad_idfacultad`),
  CONSTRAINT `fk_Asignatura_Facultad1` FOREIGN KEY (`Facultad_idfacultad`) REFERENCES `facultad` (`idfacultad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `idCiudad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `pais_idPais` int NOT NULL,
  PRIMARY KEY (`idCiudad`),
  KEY `fk_ciudad_pais1_idx` (`pais_idPais`),
  CONSTRAINT `fk_ciudad_pais1` FOREIGN KEY (`pais_idPais`) REFERENCES `pais` (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Varsovia',1),(2,'Bolonia',2);
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `idComentario` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `Usuario_idUsuario` int NOT NULL,
  PRIMARY KEY (`idComentario`),
  KEY `fk_Comentario_Usuario1_idx` (`Usuario_idUsuario`),
  CONSTRAINT `fk_Comentario_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultad`
--

DROP TABLE IF EXISTS `facultad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facultad` (
  `idfacultad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `universidad_idUniversidad` int NOT NULL,
  PRIMARY KEY (`idfacultad`),
  KEY `fk_facultad_universidad1_idx` (`universidad_idUniversidad`),
  CONSTRAINT `fk_facultad_universidad1` FOREIGN KEY (`universidad_idUniversidad`) REFERENCES `universidad` (`idUniversidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (1,'Facultad de electrónica',1),(2,'Facultad de arte',2);
/*!40000 ALTER TABLE `facultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gamificacion`
--

DROP TABLE IF EXISTS `gamificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamificacion` (
  `idGamificacion` int NOT NULL AUTO_INCREMENT,
  `cantidadPuntos` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idGamificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gamificacion`
--

LOCK TABLES `gamificacion` WRITE;
/*!40000 ALTER TABLE `gamificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `gamificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `programers` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (7,'python',21);
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logro`
--

DROP TABLE IF EXISTS `logro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logro` (
  `idLogro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `cantidadPuntos` int NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`idLogro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logro`
--

LOCK TABLES `logro` WRITE;
/*!40000 ALTER TABLE `logro` DISABLE KEYS */;
/*!40000 ALTER TABLE `logro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logrogamificacion`
--

DROP TABLE IF EXISTS `logrogamificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logrogamificacion` (
  `logros_idLogro` int NOT NULL,
  `Gamificacion_idGamificacion` int NOT NULL,
  `logroConseguido` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`logros_idLogro`,`Gamificacion_idGamificacion`),
  KEY `fk_gamificacion_logro_logros1_idx` (`logros_idLogro`),
  KEY `fk_LogroGamificacion_Gamificacion1_idx` (`Gamificacion_idGamificacion`),
  CONSTRAINT `fk_gamificacion_logro_logros1` FOREIGN KEY (`logros_idLogro`) REFERENCES `logro` (`idLogro`),
  CONSTRAINT `fk_LogroGamificacion_Gamificacion1` FOREIGN KEY (`Gamificacion_idGamificacion`) REFERENCES `gamificacion` (`idGamificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logrogamificacion`
--

LOCK TABLES `logrogamificacion` WRITE;
/*!40000 ALTER TABLE `logrogamificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `logrogamificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacion`
--

DROP TABLE IF EXISTS `notificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacion` (
  `idNotificacion` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `mensaje` varchar(255) NOT NULL,
  PRIMARY KEY (`idNotificacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacion`
--

LOCK TABLES `notificacion` WRITE;
/*!40000 ALTER TABLE `notificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacionusuario`
--

DROP TABLE IF EXISTS `notificacionusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacionusuario` (
  `Notificacion_idNotificacion` int NOT NULL,
  `Usuario_idUsuario` int NOT NULL,
  PRIMARY KEY (`Notificacion_idNotificacion`,`Usuario_idUsuario`),
  KEY `fk_Notificacion_has_Usuario_Usuario1_idx` (`Usuario_idUsuario`),
  KEY `fk_Notificacion_has_Usuario_Notificacion1_idx` (`Notificacion_idNotificacion`),
  CONSTRAINT `fk_Notificacion_has_Usuario_Notificacion1` FOREIGN KEY (`Notificacion_idNotificacion`) REFERENCES `notificacion` (`idNotificacion`),
  CONSTRAINT `fk_Notificacion_has_Usuario_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacionusuario`
--

LOCK TABLES `notificacionusuario` WRITE;
/*!40000 ALTER TABLE `notificacionusuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacionusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `idPais` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Polonia'),(2,'Italia');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `idPermiso` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`idPermiso`),
  UNIQUE KEY `descripcion_UNIQUE` (`descripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisorol`
--

DROP TABLE IF EXISTS `permisorol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisorol` (
  `rol_idRol` int NOT NULL,
  `permiso_idPermiso` int NOT NULL,
  PRIMARY KEY (`rol_idRol`,`permiso_idPermiso`),
  KEY `fk_permisorol_rol1_idx` (`rol_idRol`),
  KEY `fk_permisorol_permiso1_idx` (`permiso_idPermiso`),
  CONSTRAINT `fk_permisorol_permiso1` FOREIGN KEY (`permiso_idPermiso`) REFERENCES `permiso` (`idPermiso`),
  CONSTRAINT `fk_permisorol_rol1` FOREIGN KEY (`rol_idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisorol`
--

LOCK TABLES `permisorol` WRITE;
/*!40000 ALTER TABLE `permisorol` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisorol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `idReporte` int NOT NULL AUTO_INCREMENT,
  `Usuario_idUsuario` int NOT NULL,
  `TipoReporte_idTipoReporte` int NOT NULL,
  PRIMARY KEY (`idReporte`),
  KEY `fk_Reporte_Usuario1_idx` (`Usuario_idUsuario`),
  KEY `fk_Reporte_TipoReporte1_idx` (`TipoReporte_idTipoReporte`),
  CONSTRAINT `fk_Reporte_TipoReporte1` FOREIGN KEY (`TipoReporte_idTipoReporte`) REFERENCES `tiporeporte` (`idTipoReporte`),
  CONSTRAINT `fk_Reporte_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `nombre_rol_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiporeporte`
--

DROP TABLE IF EXISTS `tiporeporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiporeporte` (
  `idTipoReporte` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoReporte`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiporeporte`
--

LOCK TABLES `tiporeporte` WRITE;
/*!40000 ALTER TABLE `tiporeporte` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiporeporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad`
--

DROP TABLE IF EXISTS `universidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad` (
  `idUniversidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `ciudad_idCiudad` int NOT NULL,
  PRIMARY KEY (`idUniversidad`),
  KEY `fk_universidad_ciudad1_idx` (`ciudad_idCiudad`),
  CONSTRAINT `fk_universidad_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad`
--

LOCK TABLES `universidad` WRITE;
/*!40000 ALTER TABLE `universidad` DISABLE KEYS */;
INSERT INTO `universidad` VALUES (1,'Universidad Tecnológica de Varsovia',1),(2,'Universidad de Bolonia',2);
/*!40000 ALTER TABLE `universidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido1` varchar(45) NOT NULL,
  `apellido2` varchar(45) DEFAULT NULL,
  `nombreUsuario` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numeroTelefono` varchar(20) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `genero` varchar(45) NOT NULL DEFAULT 'Indefinido',
  `urlFotoPerfil` varchar(255) DEFAULT NULL,
  `facultad_idFacultad` int NOT NULL,
  `Rol_idRol` int NOT NULL,
  `gamificacion_idGamificacion` int NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombreUsuario`),
  UNIQUE KEY `numeroTelefono_UNIQUE` (`numeroTelefono`),
  KEY `fk_usuario_facultad1_idx` (`facultad_idFacultad`),
  KEY `fk_Usuario_Rol1_idx` (`Rol_idRol`),
  KEY `fk_usuario_gamificacion1_idx` (`gamificacion_idGamificacion`),
  CONSTRAINT `fk_usuario_facultad1` FOREIGN KEY (`facultad_idFacultad`) REFERENCES `facultad` (`idfacultad`),
  CONSTRAINT `fk_usuario_gamificacion1` FOREIGN KEY (`gamificacion_idGamificacion`) REFERENCES `gamificacion` (`idGamificacion`),
  CONSTRAINT `fk_Usuario_Rol1` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Nico','',NULL,'nfiz','nicolasfiz@outlook.com',NULL,'1234','',NULL,1,0,0),(2,'Nico2','',NULL,'nfiz2','nicolasfiz@topdigital.com',NULL,'1234','',NULL,2,0,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votacion`
--

DROP TABLE IF EXISTS `votacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votacion` (
  `idVotacion` int NOT NULL AUTO_INCREMENT,
  `numeroMeGusta` int NOT NULL DEFAULT '0',
  `numeroNoMeGusta` int NOT NULL DEFAULT '0',
  `Usuario_idUsuario` int NOT NULL,
  PRIMARY KEY (`idVotacion`),
  KEY `fk_Votacion_Usuario1_idx` (`Usuario_idUsuario`),
  CONSTRAINT `fk_Votacion_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votacion`
--

LOCK TABLES `votacion` WRITE;
/*!40000 ALTER TABLE `votacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `votacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-01 18:11:50
