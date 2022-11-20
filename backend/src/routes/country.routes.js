import {Router} from 'express'
const router = Router();

import {methods as countryCtrl} from '../controllers/country.controller';
//import * as authJwt from "../middlewares/authJwt";

router.post('/', countryCtrl.addCountry);
router.get('/', countryCtrl.getCountries);
router.get('/:id', countryCtrl.getCountryById);
router.put('/:id', countryCtrl.updateCountry);
router.delete('/:id', countryCtrl.deleteCountry);

export default router;