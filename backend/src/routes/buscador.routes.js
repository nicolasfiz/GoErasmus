import { Router } from 'express';
import {methods as buscadorController} from "../controllers/buscador.controller"
// import * as authJwt from "../middlewares/authJwt";

const router = Router()

router.post("/usuarios", buscadorController.getUsuarios);
router.post("/asignaturas", buscadorController.getAsignaturas)

export default router;