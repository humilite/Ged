const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

/**
 * Modèle représentant une étape de validation dans un workflow.
 */
const WorkflowValidation = sequelize.define('WorkflowValidation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "L'ID du document associé à cette validation",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "L'ID de l'utilisateur chargé de valider cette étape",
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
    comment: "Statut de la validation de l'étape",
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "Commentaire laissé par le validateur",
  },
  validationDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: "Date de la validation",
  },
}, {
  tableName: 'workflow_validation',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = WorkflowValidation;
