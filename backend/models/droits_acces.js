'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// Modèle des droits d'accès des utilisateurs aux documents ou fonctions
const DroitsAcces = sequelize.define('DroitsAcces', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  permission: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'droits_acces',
  timestamps: false,
});

module.exports = DroitsAcces;
