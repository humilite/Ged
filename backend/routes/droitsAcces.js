const express = require('express');
const router = express.Router();
const droitsAccesController = require('../controllers/droitsAccesController');
const { authenticateJWT } = require('../middleware/auth');

console.log('Imported droitsAccesController:', droitsAccesController);

// Récupérer les droits d'accès d'un utilisateur pour un document
router.get('/user/:userId/document/:documentId', authenticateJWT, droitsAccesController.getUserAccessRights);

// Créer ou mettre à jour les droits d'accès d'un utilisateur pour un document
router.post('/', authenticateJWT, droitsAccesController.upsertAccessRights);

// Supprimer les droits d'accès d'un utilisateur pour un document
router.delete('/user/:userId/document/:documentId', authenticateJWT, droitsAccesController.deleteAccessRights);

module.exports = router;
