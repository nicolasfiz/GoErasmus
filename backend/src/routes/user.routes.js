import { Router } from 'express';
import {methods as userController} from "../controllers/user.controller"

const router = Router()

router.get("/", userController.getUsers);
router.get("/getUser/:nombreUsuario", userController.getUser);
router.delete("/:id", userController.deleteUser);
router.get("/paises", userController.getPaises);
router.get("/ciudades/:id", userController.getCiudades);
router.get("/universidades/:id", userController.getUniversidades);
router.get("/facultades/:id", userController.getFacultades);
router.get("/logros/:id", userController.getLogros);
router.post("/picture", userController.uploadPicture);
router.put("/guardarDatos/:id", userController.guardarDatos);
router.post("/resetPoints", userController.resetPoints);

export default router;