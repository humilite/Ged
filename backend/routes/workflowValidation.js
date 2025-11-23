const express = require('express');
const router = express.Router();
const { getValidationsByDocument, createValidation, updateValidationStatus } = require('../controllers/workflowValidationController');
const { authenticateJWT } = require('../middleware/auth');

// Récupérer toutes les validations d'un document
router.get('/document/:documentId', authenticateJWT, getValidationsByDocument);

// Créer une nouvelle étape de validation
router.post('/', authenticateJWT, createValidation);

// Mettre à jour le statut d'une validation
router.put('/:id', authenticateJWT, updateValidationStatus);

module.exports = router;
