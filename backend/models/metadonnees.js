'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// Modèle de métadonnées associées aux documents
const Metadonnees = sequelize.define('Metadonnees', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'metadonnees',
  timestamps: false,
});

module.exports = Metadonnees;
