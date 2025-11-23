'use strict';

import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_NAME = 'ged_dgrh',
  DB_USER = 'postgres',
  DB_PASSWORD = '',
  DB_SSL = 'false',
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: DB_SSL === 'true' ? { 
      require: true,
      rejectUnauthorized: false 
    } : false,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

// Import models - Correction des chemins
import User from './user.js';
import Document from './document.js';
import Metadonnees from './metadonnees.js';
import PlanClassement from './plan_classement.js';
import DroitsAcces from './droits_acces.js';
import HistoriqueActions from './historique_actions.js';
import WorkflowValidation from './workflow_validation.js';
import Notifications from './notifications.js';

// Aggregate models into one object
const models = {
  User,
  Document,
  Metadonnees,
  PlanClassement,
  DroitsAcces,
  HistoriqueActions,
  WorkflowValidation,
  Notifications,
};

// Initialize associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Function to sync models with the database
async function syncModels({ force = false, alter = false } = {}) {
  try {
    // Test connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    console.log('🔄 Syncing database models...');
    
    // Sync all models
    await sequelize.sync({ 
      force, // ⚠️ DANGEROUS - drops all tables
      alter, // Updates tables to match models
    });
    
    console.log('✅ Database synced from models successfully.');
    
    // Log table info
    const tableNames = Object.keys(models);
    console.log(`📊 Models synchronized: ${tableNames.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error syncing database from models:', error);
    throw error;
  }
}

export {
  sequelize,
  Sequelize,
  models,
  syncModels,
  testConnection,
}