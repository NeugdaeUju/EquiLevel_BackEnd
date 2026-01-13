import express from 'express';
import { auth } from '../middleware/auth'
import * as especesCtrl from '../controllers/especes';

const router = express.Router()

// Requête POST (Créer une espèces)
router.post('/', auth, especesCtrl.createEspece)

// Requêtes GET (Récupérer les espèces)


export default router