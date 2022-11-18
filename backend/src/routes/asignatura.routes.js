import { Router } from 'express';
import {methods as asignaturaController} from "../controllers/asignatura.controller"
// import * as authJwt from "../middlewares/authJwt";

const router = Router()

router.get("/:idAsignatura", asignaturaController.getAsignatura);
router.get("/comentarios/:idAsignatura", asignaturaController.getComentarios);
router.get("/archivos/:idAsignatura", asignaturaController.getArchivo)
router.post("/archivo", asignaturaController.subirArchivo)
router.delete("/archivo/:idArchivo", asignaturaController.deleteArchivo)
router.post("/valoracion", asignaturaController.subirValoracion)
//router.delete("/valoracion/:idValoracion")
//router.put("/mg/:idVotacion")
//router.put("/nmg/:idVotacion")

export default router;