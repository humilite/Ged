import express from 'express';
import * as metadonneesController from '../controllers/metadonneesController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Récupérer toutes les métadonnées d'un document
router.get('/document/:documentId', authenticateJWT, metadonneesController.getDocumentMetadata);

// Créer une nouvelle métadonnée
router.post('/', authenticateJWT, metadonneesController.createMetadata);

// Mettre à jour une métadonnée existante
router.put('/:id', authenticateJWT, metadonneesController.updateMetadata);

// Supprimer une métadonnée
router.delete('/:id', authenticateJWT, metadonneesController.deleteMetadata);

export default router;
