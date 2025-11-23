const express = require('express');
const router = express.Router();
const { getUserActions, logAction } = require('../controllers/historiqueActionsController');
const { authenticateJWT } = require('../middleware/auth');

// Récupérer l'historique des actions pour un utilisateur donné
router.get('/user/:userId', authenticateJWT, getUserActions);

// Créer un nouvel enregistrement d'action dans l'historique
router.post('/', authenticateJWT, logAction);

module.exports = router;
