const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const planController = require('../controllers/planClassementController');

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

module.exports = router;
