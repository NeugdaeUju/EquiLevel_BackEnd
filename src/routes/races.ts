import express from 'express';
import { auth } from '../middleware/auth'
import * as racesCtrl from '../controllers/races';

const router = express.Router()

// Requête POST (Créer une espèces)
router.post('/', auth, racesCtrl.createRace)

// Requêtes GET (Récupérer les espèces)
router.get('/', racesCtrl.getAllRaces)


// Requête DELETE (supprimer une espèce)
router.delete('/:id', auth, racesCtrl.deleteRaces)

export default router