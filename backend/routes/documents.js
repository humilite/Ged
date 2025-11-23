import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import * as documentsController from '../controllers/documentsController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configuration du stockage multer pour les uploads de fichiers
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Assurez-vous que ce dossier existe ou créez-le dynamiquement
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Protection des routes avec authentification JWT
router.use(authenticateJWT);

// Route pour téléverser un document avec ses métadonnées
router.post('/upload', upload.single('document'), documentsController.uploadDocument);

// Route de recherche avancée de documents
router.get('/search', documentsController.searchDocuments);

export default router;
