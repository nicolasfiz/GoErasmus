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
-- Table structure for table `imagenusuario`
--

DROP TABLE IF EXISTS `imagenusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenusuario` (
  `idImagenUsuario` int NOT NULL AUTO_INCREMENT,
  `usuario_idUsuario` int NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idImagenUsuario`,`usuario_idUsuario`),
  UNIQUE KEY `route_UNIQUE` (`route`),
  KEY `fk_imagenusuario_usuario_idx` (`usuario_idUsuario`),
  CONSTRAINT `fk_imagenusuario_usuario` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenusuario`
--

LOCK TABLES `imagenusuario` WRITE;
/*!40000 ALTER TABLE `imagenusuario` DISABLE KEYS */;
INSERT INTO `imagenusuario` VALUES (1,1,'https://media-exp1.licdn.com/dms/image/C4D03AQGaBQLOGJX35Q/profile-displayphoto-shrink_800_800/0/1641248302282?e=1666828800&v=beta&t=tCRP_258fRYyvJxLaC1ucu6qc5IC5eR_6ajQBpgWgco');
/*!40000 ALTER TABLE `imagenusuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-01 12:28:05
