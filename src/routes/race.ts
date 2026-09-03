import express from 'express';
import * as raceCtrl from '../controllers/race';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, raceCtrl.getAllRaces);
router.get('/:id', auth, raceCtrl.getRaceById);
router.post('/', auth, raceCtrl.createRace);
router.patch('/:id', auth, raceCtrl.updateRace);
router.delete('/:id', auth, raceCtrl.deleteRace);

export default router;