import { Router } from 'express';
import {methods as asignaturaController} from "../controllers/asignatura.controller"
// import * as authJwt from "../middlewares/authJwt";

const router = Router()

router.get("/:idAsignatura", asignaturaController.getAsignatura);
router.get("/comentarios/:idAsignatura", asignaturaController.getComentarios);
router.get("/archivos/:idAsignatura", asignaturaController.getArchivo)
router.post("/archivo", asignaturaController.subirArchivo)
router.post("/valoracion", asignaturaController.subirValoracion)
router.get("/votacionUsuario/:idUsuario", asignaturaController.getVotacionUsuario)
router.put("/mg/:idVotacion", asignaturaController.mg)
router.put("/nmg/:idVotacion", asignaturaController.nmg)

export default router;