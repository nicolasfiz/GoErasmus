import { Router } from 'express';
import {methods as languagesCtrl} from "../controllers/languaje.controller"
// import * as authJwt from "../middlewares/authJwt";

const router = Router()

router.post("/", languagesCtrl.addLanguages);
router.get("/", languagesCtrl.getLanguages);
router.get("/:id", languagesCtrl.getLanguageById);
router.put("/:id", languagesCtrl.updateLanguage);
router.delete("/:id", languagesCtrl.deleteLanguage);
router.post("/uploadPdf", languagesCtrl.uploadPdf);

export default router;