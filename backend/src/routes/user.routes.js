import { Router } from 'express';
import {methods as userController} from "../controllers/user.controller"

const router = Router()

router.get("/:id", userController.getUser);

export default router;