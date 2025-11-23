// Chargement des variables d'environnement en PREMIER
import dotenv from 'dotenv';
dotenv.config();

// Importation d'Express et des middlewares/routes
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import des middlewares et routes
import securityMiddleware from './middleware/security.js'; 
import authRoutes from './routes/auth.js';
import documentsRoutes from './routes/documents.js';
import planClassementRoutes from './routes/planClassement.js';
import userManagementRoutes from './routes/userManagement.js';
import workflowValidationRoutes from './routes/workflowValidation.js';
import notificationsRoutes from './routes/notifications.js';
import droitsAccesRoutes from './routes/droitsAcces.js';
import historiqueActionsRoutes from './routes/historiqueActions.js';
import metadonneesRoutes from './routes/metadonnees.js';

// Import de la configuration de la base de données
import { testConnection } from './models/index.js';

const app = express();

// Définition du port d'écoute du serveur
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Application des middlewares de sécurité
securityMiddleware(app);

// Middleware de logging des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Déclaration des routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/plan-classement', planClassementRoutes);
app.use('/api/users', userManagementRoutes);

/* API de validation du workflow désactivée pour l'instant - à activer lorsque prête */
// app.use('/api/workflow-validation', workflowValidationRoutes);

app.use('/api/notifications', notificationsRoutes);
app.use('/api/droits-acces', droitsAccesRoutes);
app.use('/api/historique-actions', historiqueActionsRoutes);
app.use('/api/metadonnees', metadonneesRoutes);

// Route de santé de l'API
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = await testConnection();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: dbStatus ? 'Connected' : 'Disconnected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Disconnected',
      error: error.message
    });
  }
});

// Route racine basique pour vérifier le bon fonctionnement du serveur
app.get('/', (req, res) => {
  res.json({
    message: 'L\'API Backend GED fonctionne correctement',
    version: '1.0.0',
    documentation: '/api/docs' // À implémenter si nécessaire
  });
});

// Gestionnaire pour les routes non trouvées (erreur 404)
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl,
    method: req.method
  });
});

// Gestionnaire global des erreurs
app.use((error, req, res, next) => {
  console.error('Erreur globale:', error);

  // Erreur de validation Sequelize
  if (error.name === 'SequelizeValidationError') {
    const errors = error.errors.map(err => ({
      field: err.path,
      message: err.message
    }));
    return res.status(400).json({
      error: 'Erreur de validation',
      details: errors
    });
  }

  // Erreur de contrainte unique Sequelize
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Conflit de données',
      message: 'Une ressource avec ces données existe déjà'
    });
  }

  // Erreur JWT
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token invalide'
    });
  }

  // Erreur par défaut
  res.status(error.status || 500).json({
    error: error.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    console.log('🔌 Test de connexion à la base de données...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      throw new Error('Impossible de se connecter à la base de données');
    }

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 Serveur démarré avec succès`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️ Database: ${dbConnected ? '✅ Connectée' : '❌ Erreur'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🏠 API Root: http://localhost:${PORT}/`);
      console.log('='.repeat(50));
    });

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt du serveur
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

// Démarrer le serveur
startServer();

export default app;