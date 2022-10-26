import { Router } from 'express';
import {methods as userController} from "../controllers/user.controller"

const router = Router()

router.get("/getUser/:id", userController.getUser);
router.post("/picture", userController.uploadPicture);
router.get("/paises", userController.getPaises);
router.get("/ciudades/:id", userController.getCiudades);
router.get("/universidades/:id", userController.getUniversidades);
router.get("/facultades/:id", userController.getFacultades);
router.put("/guardarDatos/:id", userController.guardarDatos);
router.get("/logros/:id", userController.getLogros);

export default router;