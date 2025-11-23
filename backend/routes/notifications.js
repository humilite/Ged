import express from 'express';
import { getUserNotifications, markAsRead } from '../controllers/notificationsController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();


// Protection des routes
router.use(authenticateJWT);

// Récupérer toutes les notifications pour un utilisateur (Id fourni dans req.params.userId)
router.get('/:userId', getUserNotifications);

// Marquer une notification comme lue
router.put('/:id/read', markAsRead);

export default router;
