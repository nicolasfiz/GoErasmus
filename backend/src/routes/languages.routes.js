import { Router } from 'express';
import {methods as languageController} from "../controllers/languaje.controller"

const router = Router()

router.get("/", languageController.getLanguages);
router.post("/", languageController.addLanguages);
router.get("/:id", languageController.getLanguage);
router.delete("/:id", languageController.deleteLanguage);
router.put("/:id", languageController.updateLanguage);

router.post("/uploadPdf", languageController.uploadPdf);

export default router;