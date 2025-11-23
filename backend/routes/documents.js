const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const documentsController = require('../controllers/documentsController');
const multer = require('multer');
const path = require('path');

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

module.exports = router;
