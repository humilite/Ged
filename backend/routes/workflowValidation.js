import express from 'express';
import { getValidationsByDocument, createValidation, updateValidationStatus } from '../controllers/workflowValidationController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Récupérer toutes les validations d'un document
router.get('/document/:documentId', authenticateJWT, getValidationsByDocument);

// Créer une nouvelle étape de validation
router.post('/', authenticateJWT, createValidation);

// Mettre à jour le statut d'une validation
router.put('/:id', authenticateJWT, updateValidationStatus);

export default router;
