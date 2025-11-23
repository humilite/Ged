require('dotenv').config();
const express = require('express');
const securityMiddleware = require('./middleware/security'); 
const authRoutes = require('./routes/auth');
const documentsRoutes = require('./routes/documents');
const planClassementRoutes = require('./routes/planClassement');
const userManagementRoutes = require('./routes/userManagement');
const workflowValidationRoutes = require('./routes/workflowValidation');
const notificationsRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Apply security middlewares (helmet, cors, rate limiting)
securityMiddleware(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/plan-classement', planClassementRoutes);
app.use('/api/users', userManagementRoutes);
app.use('/api/workflow-validation', workflowValidationRoutes);
app.use('/api/notifications', notificationsRoutes);

// Basic root route
app.get('/', (req, res) => {
  res.send('GED Backend API is running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
