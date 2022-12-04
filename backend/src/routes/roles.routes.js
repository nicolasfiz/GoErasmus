import { Router } from 'express';
import {methods as roleCtrl} from "../controllers/role.controller"
// import * as authJwt from "../middlewares/authJwt";

const router = Router()

router.post("/", roleCtrl.addRole);
router.get("/", roleCtrl.getRoles);
router.get("/:id", roleCtrl.getRoleById);
router.put("/:id", roleCtrl.updateRole);

export default router;