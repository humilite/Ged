const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

/**
 * Modèle représentant une notification pour un utilisateur.
 */
const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "L'ID de l'utilisateur recevant la notification",
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "Le contenu de la notification",
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: "Indique si la notification a été lue",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: "Date de création de la notification",
  },
}, {
  tableName: 'notifications',
  timestamps: false,
});

module.exports = Notification;
