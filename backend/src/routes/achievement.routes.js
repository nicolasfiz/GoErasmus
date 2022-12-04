import {Router} from 'express'
const router = Router();

import {methods as achievementCtrl} from '../controllers/achievement.controller';
//import * as authJwt from "../middlewares/authJwt";

router.post('/', achievementCtrl.addAchievement);
router.get('/', achievementCtrl.getAchievements);
router.get('/:id', achievementCtrl.getAchievementById);
router.put('/:id', achievementCtrl.updateAchievement);
router.delete('/:id', achievementCtrl.deleteAchievement);
router.post('/:usuario_idUsuario/:logro_idLogro', achievementCtrl.unlockAchievement);

export default router;