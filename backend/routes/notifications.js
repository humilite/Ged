const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { authenticateJWT } = require('../middleware/auth');

// Récupérer toutes les notifications d'un utilisateur
router.get('/user/:userId', authenticateJWT, notificationsController.getUserNotifications);

// Créer une nouvelle notification
router.post('/', authenticateJWT, notificationsController.createNotification);

// Marquer une notification comme lue
router.put('/:id/read', authenticateJWT, notificationsController.markAsRead);

module.exports = router;
