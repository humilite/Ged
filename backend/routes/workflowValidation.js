const express = require('express');
const router = express.Router();
const workflowValidationController = require('../controllers/workflowValidationController');
const { authenticateJWT } = require('../middleware/auth');

// Récupérer toutes les validations d'un document
router.get('/document/:documentId', authenticateJWT, workflowValidationController.getValidationsByDocument);

// Créer une nouvelle étape de validation
router.post('/', authenticateJWT, workflowValidationController.createValidation);

// Mettre à jour le statut d'une validation
router.put('/:id', authenticateJWT, workflowValidationController.updateValidationStatus);

module.exports = router;
