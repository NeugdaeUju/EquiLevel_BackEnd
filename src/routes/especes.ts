import express from 'express';
import { auth } from '../middleware/auth'
import * as especesCtrl from '../controllers/especes';

const router = express.Router()

// Requête POST (Créer une espèces)
router.post('/', auth, especesCtrl.createEspece)

// Requêtes GET (Récupérer les espèces)
router.get('/', especesCtrl.getAllEspeces)

// Requête DELETE (supprimer une espèce)
router.delete('/:id', auth, especesCtrl.deleteEspeces)

export default router