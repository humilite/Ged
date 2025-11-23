import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

/**
 * Modèle représentant l'historique des actions des utilisateurs.
 */
const HistoriqueActions = sequelize.define('HistoriqueActions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "L'ID de l'utilisateur ayant effectué l'action",
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Description de l'action effectuée",
  },
  target_type: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: "Type de la cible de l'action (ex: document, utilisateur)",
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "ID de la cible de l'action",
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: "Horodatage de l'action",
  },
}, {
  tableName: 'historique_actions',
  timestamps: false,
});

export default HistoriqueActions;
