const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const securityMiddleware = (app) => {
  // Helmet aide à sécuriser les applications Express en définissant divers en-têtes HTTP
  app.use(helmet());

  // Activer CORS avec les paramètres par défaut (devrait être configuré pour les origines autorisées)
  app.use(cors());

  // Configuration de base du limitateur de requêtes pour limiter les requêtes répétées aux APIs publiques
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par fenêtre temporelle
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
};

module.exports = securityMiddleware;
