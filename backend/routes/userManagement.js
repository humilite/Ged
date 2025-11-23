import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import * as userController from '../controllers/userManagementController.js';

const router = express.Router();

// Protection des routes par authentification JWT
router.use(authenticateJWT);

// Utilisateurs
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Permissions
router.get('/permissions/:user_id', userController.getUserPermissions);
router.post('/permissions', userController.addPermission);
router.delete('/permissions/:id', userController.removePermission);

export default router;
