import { Router } from 'express';
import {methods as roleCtrl} from "../controllers/role.controller"

const router = Router()

router.post("/", roleCtrl.addRole);
router.get("/", roleCtrl.getRoles);
router.get("/:id", roleCtrl.getRoleById);
router.put("/:id", roleCtrl.updateRole);

export default router;