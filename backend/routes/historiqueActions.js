import express from 'express';
import { getUserActions, logAction } from '../controllers/historiqueActionsController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Récupérer l'historique des actions pour un utilisateur donné
router.get('/user/:userId', authenticateJWT, getUserActions);

// Créer un nouvel enregistrement d'action dans l'historique
router.post('/', authenticateJWT, logAction);

export default router;
