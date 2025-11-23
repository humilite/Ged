import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import * as planController from '../controllers/planClassementController.js';

const router = express.Router();

// Protection des routes
router.use(authenticateJWT);

// Récupérer la hiérarchie complète
router.get('/', planController.getHierarchy);

// Créer une nouvelle entrée
router.post('/', planController.createPlan);

// Mettre à jour une entrée
router.put('/:id', planController.updatePlan);

// Supprimer une entrée
router.delete('/:id', planController.deletePlan);

export default router;
