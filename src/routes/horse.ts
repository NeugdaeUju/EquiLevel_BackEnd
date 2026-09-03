import express from 'express';
import * as horseCtrl from '../controllers/horse';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, horseCtrl.getAllHorses);
router.get('/:id', auth, horseCtrl.getHorseById);
router.post('/', auth, horseCtrl.createHorse);
router.patch('/:id', auth, horseCtrl.updateHorse);
router.delete('/:id', auth, horseCtrl.deleteHorse);

export default router;