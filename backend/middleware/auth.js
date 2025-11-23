import { verifyToken } from '../utils/jwt.js';

// Middleware pour authentifier les requêtes via JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Non autorisé : jeton invalide' });
    }
    req.user = decoded;
    next();
  } else {
    return res.status(401).json({ message: 'Non autorisé : aucun jeton fourni' });
  }
};

export { authenticateJWT };
