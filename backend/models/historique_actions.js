'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// Modèle d'historique des actions réalisées par les utilisateurs
const HistoriqueActions = sequelize.define('HistoriqueActions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'historique_actions',
  timestamps: false,
});

module.exports = HistoriqueActions;
