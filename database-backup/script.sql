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
  `nombreArchivo` varchar(255) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `urlArchivo` varchar(255) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario_idUsuario` int NOT NULL,
  `asignatura_idAsignatura` int NOT NULL,
  PRIMARY KEY (`idArchivo`),
  UNIQUE KEY `url_archivo_UNIQUE` (`urlArchivo`),
  KEY `fk_archivos_usuario1_idx` (`usuario_idUsuario`),
  KEY `fk_Archivo_Asignatura1_idx` (`asignatura_idAsignatura`),
  CONSTRAINT `fk_Archivo_Asignatura1` FOREIGN KEY (`asignatura_idAsignatura`) REFERENCES `asignatura` (`idAsignatura`) ON DELETE CASCADE,
  CONSTRAINT `fk_archivos_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE
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
  `titulo` varchar(170) NOT NULL,
  `descripcion` longtext NOT NULL,
  `urlCabecera` varchar(255) NOT NULL,
  `esBorrador` enum('Si','No') NOT NULL DEFAULT 'Si',
  `fechaPublicacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ciudad_idCiudad` int NOT NULL,
  `usuario_idUsuario` int DEFAULT NULL,
  PRIMARY KEY (`idArticulo`),
  KEY `fk_Articulo_Ciudad1_idx` (`ciudad_idCiudad`),
  KEY `fk_articulo_usuario1_idx` (`usuario_idUsuario`),
  CONSTRAINT `fk_Articulo_Ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE CASCADE,
  CONSTRAINT `fk_articulo_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulo`
--

LOCK TABLES `articulo` WRITE;
/*!40000 ALTER TABLE `articulo` DISABLE KEYS */;
INSERT INTO `articulo` VALUES (1,'Visita Polonia','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668105655/ciudades/Varsovia_h0kxym.jpg','No','2022-12-01 16:11:53',1,19),(2,'Si el chaleco viene de Chalecoslovaquia, el checo viene de... Brno, ¡por supuesto!','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Brno_nbjuic.jpg','No','2022-11-12 00:00:00',8,19),(3,'No visites Polonia','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668105655/ciudades/Varsovia_h0kxym.jpg','Si','2022-12-01 00:14:28',1,NULL);
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
  `nombre` varchar(100) NOT NULL,
  `puntuacion` double DEFAULT NULL,
  `facultad_idFacultad` int NOT NULL,
  PRIMARY KEY (`idAsignatura`),
  KEY `fk_Asignatura_Facultad1_idx` (`facultad_idFacultad`),
  CONSTRAINT `fk_Asignatura_Facultad1` FOREIGN KEY (`facultad_idFacultad`) REFERENCES `facultad` (`idfacultad`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (2,'Algorithms',0,4),(3,'Formal Languages and Compilers',0,4),(4,'Web Design',0,4),(5,'Computational Geometry',0,4),(6,'Visualization and CAD',0,4),(7,'Modern Trends in Informatics',0,4),(8,'Compiler Construction',0,4),(9,'Mathematics I',0,7),(10,'Mathematics II',0,7),(11,'Mathematics III',0,7),(12,'Mathematics IV',0,7);
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
  `nombre` varchar(100) NOT NULL,
  `informacion` longtext NOT NULL,
  `urlCabecera` varchar(255) NOT NULL,
  `pais_idPais` int NOT NULL,
  PRIMARY KEY (`idCiudad`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `fk_ciudad_pais1_idx` (`pais_idPais`),
  CONSTRAINT `fk_ciudad_pais1` FOREIGN KEY (`pais_idPais`) REFERENCES `pais` (`idPais`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Varsovia','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668105655/ciudades/Varsovia_h0kxym.jpg',1),(2,'Bolonia','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114119/ciudades/Bolonia_q4hxmx.jpg',5),(5,'Cracovia','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Cracovia_p4uyzq.jpg',1),(6,'Roma','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/roma_ydcgkq.jpg',5),(7,'París','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114619/ciudades/Paris_hcilao.jpg',2),(8,'Brno','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Brno_nbjuic.jpg',3),(9,'Praga','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Praga_tagxpe.jpg',3),(10,'Lyon','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114619/ciudades/Lyon_vihjnq.jpg',2),(11,'Bratislava','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.\nMauris vitae iaculis elit. Proin aliquet tincidunt eros non lobortis. Curabitur id velit dui. Aliquam eros turpis, finibus at ultrices quis, mattis sit amet quam. Nullam et nulla et libero vehicula pulvinar sed quis mi. Nam porttitor, augue non varius dignissim, nisi libero ullamcorper nulla, ut rhoncus nunc urna tincidunt libero. Fusce rutrum sem varius dolor semper, non tristique sapien aliquet. Nulla vestibulum ante eget quam tincidunt vestibulum. Suspendisse sit amet mattis arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sit amet justo at felis accumsan hendrerit. Ut varius dignissim lorem et euismod. Nulla quis posuere nisi. Integer eget enim vel leo maximus interdum sit amet a nunc.\nSuspendisse sit amet facilisis libero. Nam ac dolor pretium, tempor enim eu, scelerisque enim. Sed quis nisi ut mi aliquam ultrices imperdiet ut leo. Cras sollicitudin sem quis enim venenatis tristique. Pellentesque egestas imperdiet egestas. Nunc ac sagittis arcu, nec rutrum sem. Vivamus vehicula laoreet nisl non vestibulum.\nEtiam elit lectus, sodales sed felis sit amet, interdum porttitor eros. Suspendisse dolor diam, viverra id lorem vel, venenatis fringilla tortor. Nullam ante mi, congue quis fringilla vitae, feugiat at arcu. Duis dictum ultrices dolor eget vulputate. Duis commodo urna condimentum leo lacinia vulputate. Vestibulum pharetra eros efficitur consequat vulputate. Integer porta vel diam vitae mollis. Maecenas sed ex eget justo ultricies vestibulum.\nEtiam facilisis fringilla lectus, quis fermentum magna dictum nec. Phasellus suscipit tincidunt orci sit amet tincidunt. Nulla facilisi. Curabitur ullamcorper ultrices ex vitae placerat. In dignissim volutpat massa a feugiat. In et sagittis arcu. Vivamus felis diam, ultricies at nisi nec, dictum faucibus dolor. Nunc luctus, sem at imperdiet gravida, purus nisl venenatis diam, nec tincidunt arcu arcu nec odio.\nNulla dictum id elit ut mattis. Pellentesque vestibulum sollicitudin dolor, quis porttitor diam tincidunt vel. Sed quis nisi enim. Vivamus sit amet tempor diam. Nulla facilisi. Mauris porta sed tellus ac lobortis. Duis ornare mi pellentesque nisi eleifend convallis. Vestibulum facilisis cursus dignissim. Etiam ut tincidunt eros. Morbi elementum ipsum lectus, non efficitur tellus euismod a. Vivamus vel rutrum eros. Quisque vitae leo convallis, laoreet eros quis, sollicitudin tortor. Integer sit amet finibus felis. Aenean rhoncus urna ullamcorper leo consectetur porta. Mauris aliquet urna metus, eu facilisis mauris gravida tincidunt.\nNam sem lorem, eleifend id tempus in, rhoncus nec eros. Duis scelerisque, urna id dictum mattis, justo felis pretium felis, a finibus eros ante non orci. Vivamus varius, mi nec volutpat congue, tortor enim hendrerit velit, vel volutpat justo tortor eu ante. Maecenas fermentum quam eget eros imperdiet, sed luctus leo mollis. Curabitur blandit convallis lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed posuere interdum nisl. Ut et congue orci. Cras hendrerit accumsan enim, nec finibus lectus egestas et. Nulla facilisi. Nunc efficitur turpis id ornare pretium. Vivamus nunc lorem, pulvinar sit amet finibus nec, laoreet id ligula. Morbi vestibulum eget quam ac ornare. Nunc consequat consectetur justo et dapibus. Nulla facilisi.\nQuisque laoreet sodales interdum. In porttitor mi eget tellus bibendum maximus. Curabitur risus enim, facilisis non odio nec, auctor auctor risus. Donec hendrerit, libero quis porta consectetur, mauris leo semper tortor, quis ultricies nunc ante id odio. Integer non facilisis enim, ac congue nisl. Sed consequat, ligula quis pellentesque finibus, tellus augue mollis enim, nec aliquam nisl erat ut tellus. Ut libero ante, vehicula at massa a, pretium porttitor eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean consectetur eget quam vel mattis. Etiam pharetra justo dapibus ullamcorper elementum. Duis hendrerit lorem enim, in bibendum est interdum at. Suspendisse malesuada turpis a lorem vestibulum dignissim. In volutpat felis id odio aliquet, eget blandit lorem pellentesque. In a tellus turpis. Nulla quis justo vel urna placerat placerat a eget lacus.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Bratislava_stmkik.jpg',4),(12,'Kosice','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum bibendum turpis, vel ornare metus efficitur et. Aliquam tempus, nibh at aliquet rutrum, metus enim molestie leo, vel scelerisque metus metus vitae massa. Praesent venenatis, erat in iaculis egestas, arcu nulla lobortis justo, vel vulputate leo turpis pulvinar erat. Mauris rhoncus dictum euismod. Mauris auctor lacinia ligula, quis fringilla purus bibendum at. Pellentesque fermentum ut lectus at vehicula. Proin dignissim fermentum pretium. Sed et lobortis nibh, id malesuada lacus. Morbi rhoncus tellus metus, non facilisis leo eleifend eu. Duis ut mauris commodo, consectetur mi at, vehicula elit. Suspendisse cursus, orci eu cursus elementum, ligula libero mattis nisi, non pulvinar risus est id tellus. In dolor nunc, convallis non augue at, accumsan viverra tortor. Etiam et est sagittis, aliquet enim ac, sagittis mi.','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668114618/ciudades/Kosice_kglfdd.jpg',4);
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
  `descripcion` varchar(180) NOT NULL,
  `fecha` datetime NOT NULL,
  `articulo_idArticulo` int DEFAULT NULL,
  `usuario_idUsuario` int NOT NULL,
  PRIMARY KEY (`idComentario`),
  KEY `fk_comentario_articulo1_idx` (`articulo_idArticulo`),
  KEY `fk_comentario_usuario1_idx` (`usuario_idUsuario`),
  CONSTRAINT `fk_comentario_articulo1` FOREIGN KEY (`articulo_idArticulo`) REFERENCES `articulo` (`idArticulo`) ON DELETE SET NULL,
  CONSTRAINT `fk_comentario_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE
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
  `nombre` varchar(150) NOT NULL,
  `universidad_idUniversidad` int NOT NULL,
  PRIMARY KEY (`idfacultad`),
  KEY `fk_facultad_universidad1_idx` (`universidad_idUniversidad`),
  CONSTRAINT `fk_facultad_universidad1` FOREIGN KEY (`universidad_idUniversidad`) REFERENCES `universidad` (`idUniversidad`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultad`
--

LOCK TABLES `facultad` WRITE;
/*!40000 ALTER TABLE `facultad` DISABLE KEYS */;
INSERT INTO `facultad` VALUES (1,'Facultad de Electrónica',1),(2,'Facultad de Arte',2),(3,'Facultad de Química',3),(4,'Facultad de Tecnologías de la Información',3),(5,'Facultad de Arquitectura',3),(6,'Facultad de Ingeniería Civil',3),(7,'Facultad de Ingeniería Mecánica',3);
/*!40000 ALTER TABLE `facultad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeriaimagenesarticulo`
--

DROP TABLE IF EXISTS `galeriaimagenesarticulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeriaimagenesarticulo` (
  `idGaleriaImagenesArticulo` int NOT NULL AUTO_INCREMENT,
  `urlImagen` varchar(255) NOT NULL,
  `articulo_idArticulo` int NOT NULL,
  PRIMARY KEY (`idGaleriaImagenesArticulo`),
  KEY `fk_galeriaImagenesArticulo_articulo1_idx` (`articulo_idArticulo`),
  CONSTRAINT `fk_galeriaImagenesArticulo_articulo1` FOREIGN KEY (`articulo_idArticulo`) REFERENCES `articulo` (`idArticulo`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeriaimagenesarticulo`
--

LOCK TABLES `galeriaimagenesarticulo` WRITE;
/*!40000 ALTER TABLE `galeriaimagenesarticulo` DISABLE KEYS */;
INSERT INTO `galeriaimagenesarticulo` VALUES (1,'https://res.cloudinary.com/dnkmzoohy/image/upload/v1669828381/ciudades/varsovia5_owrfub.jpg',1);
/*!40000 ALTER TABLE `galeriaimagenesarticulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galeriaimagenesciudad`
--

DROP TABLE IF EXISTS `galeriaimagenesciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galeriaimagenesciudad` (
  `idGaleriaImagenesCiudad` int NOT NULL AUTO_INCREMENT,
  `urlImagen` varchar(255) NOT NULL,
  `ciudad_idCiudad` int NOT NULL,
  PRIMARY KEY (`idGaleriaImagenesCiudad`),
  KEY `fk_galeriaImagenesCiudad_ciudad1_idx` (`ciudad_idCiudad`),
  CONSTRAINT `fk_galeriaImagenesCiudad_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galeriaimagenesciudad`
--

LOCK TABLES `galeriaimagenesciudad` WRITE;
/*!40000 ALTER TABLE `galeriaimagenesciudad` DISABLE KEYS */;
INSERT INTO `galeriaimagenesciudad` VALUES (1,'https://res.cloudinary.com/dnkmzoohy/image/upload/v1669828381/ciudades/varsovia2_xbxyo0.webp',1),(2,'https://res.cloudinary.com/dnkmzoohy/image/upload/v1669828381/ciudades/Varsovia3_eygfir.jpg',1),(3,'https://res.cloudinary.com/dnkmzoohy/image/upload/v1669828381/ciudades/varsovia4_hby4kb.jpg',1),(4,'https://res.cloudinary.com/dnkmzoohy/image/upload/v1669828381/ciudades/varsovia5_owrfub.jpg',1);
/*!40000 ALTER TABLE `galeriaimagenesciudad` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `rol_idRol` int NOT NULL,
  PRIMARY KEY (`idLogro`),
  KEY `fk_logro_rol1_idx` (`rol_idRol`),
  CONSTRAINT `fk_logro_rol1` FOREIGN KEY (`rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logro`
--

LOCK TABLES `logro` WRITE;
/*!40000 ALTER TABLE `logro` DISABLE KEYS */;
INSERT INTO `logro` VALUES (1,'email','Confirmar email',' ',1),(2,'perfil','Caracteristicas de perfil seleccionadas',' ',1),(3,'foto','Foto perfil seleccionada',' ',1),(4,'1 aportaciones','Realizar al menos una aportación',' ',2),(5,'1 votos','Recibir menos un voto positivo',' ',2),(6,'concurso','Ganar concurso',' ',4),(7,'3 aportaciones','Realizar al menos tres aportaciones',' ',3),(8,'3 votos','Recibir al menos tres votos positivos',' ',3),(9,'¡Aquí comienza tu viaje!','Crea una cuenta y verifícala a través del correo de confirmación','https://res.cloudinary.com/dnkmzoohy/image/upload/v1667133921/logros/turista-novato-basico_tmzaw2.png',1);
/*!40000 ALTER TABLE `logro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `idPais` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(85) NOT NULL,
  `urlBandera` varchar(255) NOT NULL,
  PRIMARY KEY (`idPais`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Polonia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668461916/paises/polonia_w5pxma.png'),(2,'Francia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1667737779/paises/fr_ui6jgo.png'),(3,'Republica Checa','https://res.cloudinary.com/dnkmzoohy/image/upload/v1667737779/paises/cz_v582vg.png'),(4,'Eslovaquia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1667737779/paises/sk_fsghfv.png'),(5,'Italia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1667737924/paises/it_xua94i.png'),(6,'Alemania','https://res.cloudinary.com/dnkmzoohy/image/upload/v1670188345/paises/alemania_w2q0ts.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,'REINICIAR PUNTOS');
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
  CONSTRAINT `fk_permisorol_permiso1` FOREIGN KEY (`permiso_idPermiso`) REFERENCES `permiso` (`idPermiso`) ON DELETE CASCADE,
  CONSTRAINT `fk_permisorol_rol1` FOREIGN KEY (`rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisorol`
--

LOCK TABLES `permisorol` WRITE;
/*!40000 ALTER TABLE `permisorol` DISABLE KEYS */;
INSERT INTO `permisorol` VALUES (6,1);
/*!40000 ALTER TABLE `permisorol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE KEY `nombre_rol_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (6,'Administrador'),(3,'Aventurero'),(2,'Mochilero'),(5,'Trotamundos'),(1,'Turista'),(4,'Viajero Experto');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universidad`
--

DROP TABLE IF EXISTS `universidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universidad` (
  `idUniversidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `urlLogo` varchar(255) NOT NULL,
  `ciudad_idCiudad` int NOT NULL,
  PRIMARY KEY (`idUniversidad`),
  KEY `fk_universidad_ciudad1_idx` (`ciudad_idCiudad`),
  CONSTRAINT `fk_universidad_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universidad`
--

LOCK TABLES `universidad` WRITE;
/*!40000 ALTER TABLE `universidad` DISABLE KEYS */;
INSERT INTO `universidad` VALUES (1,'Universidad Tecnológica de Varsovia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668115587/logosUniversidades/Sin_t%C3%ADtulo-2-removebg-preview_h6torr.png',1),(2,'Universidad de Bolonia','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668115091/UniversidadBolonia_u9ybfv.png',2),(3,'Universidad Tecnológica de Brno','https://res.cloudinary.com/dnkmzoohy/image/upload/v1668123589/logosUniversidades/brno-university-technology_y4ywa2.png',8);
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
  `nombre` varchar(150) NOT NULL,
  `apellido1` varchar(150) NOT NULL,
  `apellido2` varchar(150) DEFAULT NULL,
  `nombreUsuario` varchar(25) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `urlFotoPerfil` varchar(255) DEFAULT NULL,
  `cuentaActivada` enum('Si','No') NOT NULL DEFAULT 'No',
  `fechaCreacionCuenta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Rol_idRol` int DEFAULT NULL,
  `facultad_idFacultad` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombreUsuario`),
  KEY `fk_Usuario_Rol1_idx` (`Rol_idRol`),
  KEY `fk_usuario_facultad1_idx` (`facultad_idFacultad`),
  CONSTRAINT `fk_usuario_facultad1` FOREIGN KEY (`facultad_idFacultad`) REFERENCES `facultad` (`idfacultad`),
  CONSTRAINT `fk_Usuario_Rol1` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (19,'Juan Antonio','Dominguez',NULL,'Juanandarcas','juanandarcas@uma.es','$2a$10$IxWX/ffsNIhKFn1uszsVeuAgSVvvIEmmmcvOcvGcrA5KtnCVS76t6','https://res.cloudinary.com/dnkmzoohy/image/upload/v1670171861/jezkkftcmn8t1w5hsnae.png','Si','2022-12-03 19:22:28',6,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariologro`
--

DROP TABLE IF EXISTS `usuariologro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariologro` (
  `usuario_idUsuario` int NOT NULL,
  `logro_idLogro` int NOT NULL,
  PRIMARY KEY (`usuario_idUsuario`,`logro_idLogro`),
  KEY `fk_usuario_has_logro_logro1_idx` (`logro_idLogro`),
  KEY `fk_usuario_has_logro_usuario1_idx` (`usuario_idUsuario`),
  CONSTRAINT `fk_usuario_has_logro_logro1` FOREIGN KEY (`logro_idLogro`) REFERENCES `logro` (`idLogro`) ON DELETE CASCADE,
  CONSTRAINT `fk_usuario_has_logro_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariologro`
--

LOCK TABLES `usuariologro` WRITE;
/*!40000 ALTER TABLE `usuariologro` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariologro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votacion`
--

DROP TABLE IF EXISTS `votacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votacion` (
  `idVotacion` int NOT NULL AUTO_INCREMENT,
  `numeroMeGusta` int unsigned NOT NULL DEFAULT '0',
  `numeroNoMeGusta` int unsigned NOT NULL DEFAULT '0',
  `archivo_idArchivo` int DEFAULT NULL,
  `comentario_idComentario` int DEFAULT NULL,
  PRIMARY KEY (`idVotacion`),
  KEY `fk_votacion_archivo1_idx` (`archivo_idArchivo`),
  KEY `fk_votacion_comentario1_idx` (`comentario_idComentario`),
  CONSTRAINT `fk_votacion_archivo1` FOREIGN KEY (`archivo_idArchivo`) REFERENCES `archivo` (`idArchivo`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_votacion_comentario1` FOREIGN KEY (`comentario_idComentario`) REFERENCES `comentario` (`idComentario`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votacion`
--

LOCK TABLES `votacion` WRITE;
/*!40000 ALTER TABLE `votacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `votacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votacion_usuario`
--

DROP TABLE IF EXISTS `votacion_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votacion_usuario` (
  `usuario_idUsuario` int NOT NULL,
  `votacion_idVotacion` int NOT NULL,
  PRIMARY KEY (`usuario_idUsuario`,`votacion_idVotacion`),
  KEY `fk_votacion_usuario_usuario1_idx` (`usuario_idUsuario`),
  KEY `fk_votacion_usuario_votacion1_idx` (`votacion_idVotacion`),
  CONSTRAINT `fk_votacion_usuario_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_votacion_usuario_votacion1` FOREIGN KEY (`votacion_idVotacion`) REFERENCES `votacion` (`idVotacion`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votacion_usuario`
--

LOCK TABLES `votacion_usuario` WRITE;
/*!40000 ALTER TABLE `votacion_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `votacion_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votacionarticulo`
--

DROP TABLE IF EXISTS `votacionarticulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votacionarticulo` (
  `usuario_idUsuario` int NOT NULL,
  `articulo_idArticulo` int NOT NULL,
  PRIMARY KEY (`usuario_idUsuario`,`articulo_idArticulo`),
  KEY `fk_votacionArticulo_usuario1_idx` (`usuario_idUsuario`),
  KEY `fk_votacionArticulo_articulo1_idx` (`articulo_idArticulo`),
  CONSTRAINT `fk_votacionArticulo_articulo1` FOREIGN KEY (`articulo_idArticulo`) REFERENCES `articulo` (`idArticulo`) ON DELETE CASCADE,
  CONSTRAINT `fk_votacionArticulo_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votacionarticulo`
--

LOCK TABLES `votacionarticulo` WRITE;
/*!40000 ALTER TABLE `votacionarticulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `votacionarticulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votacionponderada`
--

DROP TABLE IF EXISTS `votacionponderada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votacionponderada` (
  `comentario_idComentario` int NOT NULL,
  `asignatura_idAsignatura` int NOT NULL,
  `nota` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`comentario_idComentario`,`asignatura_idAsignatura`),
  KEY `fk_votacionPonderada_comentario1_idx` (`comentario_idComentario`),
  KEY `fk_votacionPonderada_asignatura1_idx` (`asignatura_idAsignatura`),
  CONSTRAINT `fk_votacionPonderada_asignatura1` FOREIGN KEY (`asignatura_idAsignatura`) REFERENCES `asignatura` (`idAsignatura`) ON DELETE CASCADE,
  CONSTRAINT `fk_votacionPonderada_comentario1` FOREIGN KEY (`comentario_idComentario`) REFERENCES `comentario` (`idComentario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votacionponderada`
--

LOCK TABLES `votacionponderada` WRITE;
/*!40000 ALTER TABLE `votacionponderada` DISABLE KEYS */;
/*!40000 ALTER TABLE `votacionponderada` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-06  3:53:21
