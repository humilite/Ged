const WorkflowValidation = require('../models/workflow_validation');

/**
 * Contrôleur pour gérer le workflow de validation des documents.
 */
module.exports = {
  /**
   * Récupère toutes les étapes de validation pour un document.
   */
  async getValidationsByDocument(req, res) {
    try {
      const documentId = req.params.documentId;
      const validations = await WorkflowValidation.findAll({ where: { documentId } });
      return res.json(validations);
    } catch (error) {
      console.error('Erreur lors de la récupération des validations :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * Crée une étape de validation pour un document.
   */
  async createValidation(req, res) {
    try {
      const { documentId, userId, comment } = req.body;
      const validation = await WorkflowValidation.create({ documentId, userId, comment });
      return res.status(201).json(validation);
    } catch (error) {
      console.error('Erreur lors de la création de la validation :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  },

  /**
   * Met à jour le statut d'une étape de validation.
   */
  async updateValidationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, comment } = req.body;
      const validation = await WorkflowValidation.findByPk(id);
      if (!validation) {
        return res.status(404).json({ error: "Étape de validation non trouvée" });
      }
      validation.status = status;
      validation.comment = comment;
      validation.validationDate = new Date();
      await validation.save();
      return res.json(validation);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la validation :', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }
};
