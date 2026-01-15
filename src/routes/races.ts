import express from 'express';
import { auth } from '../middleware/auth'
import * as racesCtrl from '../controllers/races';

const router = express.Router()

// Requête POST (Créer une espèces)
router.post('/', auth, racesCtrl.createRace)

export default router