import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import * as droitsAccesController from '../controllers/droitsAccesController.js';

const router = express.Router();

console.log('Imported droitsAccesController:', droitsAccesController);

// Récupérer les droits d'accès d'un utilisateur pour un document
router.get('/user/:userId/document/:documentId', authenticateJWT, droitsAccesController.getUserAccessRights);

// Créer ou mettre à jour les droits d'accès d'un utilisateur pour un document
router.post('/', authenticateJWT, droitsAccesController.upsertAccessRights);

// Supprimer les droits d'accès d'un utilisateur pour un document
router.delete('/user/:userId/document/:documentId', authenticateJWT, droitsAccesController.deleteAccessRights);

export default router;
