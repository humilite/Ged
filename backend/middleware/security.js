import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  // ajouter ici les autres origines autorisées, par exemple en production
];

const corsOptions = {
  origin: function (origin, callback) {
    // autoriser les requêtes sans origine (ex : Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `L'origine ${origin} n'est pas autorisée par le CORS.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

const securityMiddleware = (app) => {
  // Helmet aide à sécuriser les applications Express en définissant divers en-têtes HTTP
  app.use(helmet());

  // Activer CORS avec configuration stricte des origines autorisées
  app.use(cors(corsOptions));

  // Configuration de base du limitateur de requêtes pour limiter les requêtes répétées aux APIs publiques
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limite chaque IP à 100 requêtes par fenêtre temporelle
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
};

export default securityMiddleware;
