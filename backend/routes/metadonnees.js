const express = require('express');
const router = express.Router();
const metadonneesController = require('../controllers/metadonneesController');
const { authenticateJWT } = require('../middleware/auth');

// Récupérer toutes les métadonnées d'un document
router.get('/document/:documentId', authenticateJWT, metadonneesController.getDocumentMetadata);

// Créer une nouvelle métadonnée
router.post('/', authenticateJWT, metadonneesController.createMetadata);

// Mettre à jour une métadonnée existante
router.put('/:id', authenticateJWT, metadonneesController.updateMetadata);

// Supprimer une métadonnée
router.delete('/:id', authenticateJWT, metadonneesController.deleteMetadata);

module.exports = router;
