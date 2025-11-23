'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// Modèle du plan de classement hiérarchique avec référence parent/enfant
const PlanClassement = sequelize.define('PlanClassement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'plan_classement',
      key: 'id'
    },
    onDelete: 'SET NULL',
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'plan_classement',
  timestamps: false,
});

module.exports = PlanClassement;
