const Notification = require('../models/notifications');

/**
 * Contrôleur pour gérer les notifications des utilisateurs.
 */
module.exports = {
  /**
   * Récupère toutes les notifications d'un utilisateur.
   */
  async getUserNotifications(req, res) {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.findAll({ where: { userId } });
      return res.json(notifications);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * Crée une nouvelle notification pour un utilisateur.
   */
  async createNotification(req, res) {
    try {
      const { userId, message } = req.body;
      const notification = await Notification.create({ userId, message });
      return res.status(201).json(notification);
    } catch (error) {
      console.error('Erreur lors de la création de la notification :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * Marque une notification comme lue.
   */
  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification non trouvée' });
      }
      notification.isRead = true;
      await notification.save();
      return res.json(notification);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la notification :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};
