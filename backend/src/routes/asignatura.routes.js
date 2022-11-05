import { Router } from 'express';
import {methods as asignaturaController} from "../controllers/asignatura.controller"

const router = Router()

router.get("/:idAsignatura", asignaturaController.getAsignatura);
router.get("/comentarios/:idAsignatura", asignaturaController.getComentarios);
router.get("/archivos/:idAsignatura", asignaturaController.getArchivo)
//router.post("/valoracion")
//router.post("/archivo")
//router.update("/mg/:idVotacion")
//router.update("/nmg/:idVotacion")

export default router;