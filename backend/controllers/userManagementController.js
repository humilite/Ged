const User = require('../models/user');
const DroitsAcces = require('../models/droits_acces');

/**
 * Récupérer tous les utilisateurs
 */
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Créer un nouvel utilisateur
 */
async function createUser(req, res) {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Champs obligatoires manquants' });
    }
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: 'Utilisateur déjà existant avec cet email' });
    }
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Mettre à jour un utilisateur
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    await user.update({ username, email, role });
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Supprimer un utilisateur
 */
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Récupérer permissions d'un utilisateur
 */
async function getUserPermissions(req, res) {
  try {
    const { user_id } = req.params;
    const permissions = await DroitsAcces.findAll({ where: { user_id } });
    res.json(permissions);
  } catch (error) {
    console.error('Erreur lors de la récupération des permissions:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Ajouter une permission à un utilisateur
 */
async function addPermission(req, res) {
  try {
    const { user_id, document_id, permission } = req.body;
    if (!user_id || !permission) {
      return res.status(400).json({ error: 'Champs user_id et permission obligatoires' });
    }
    const newPermission = await DroitsAcces.create({ user_id, document_id, permission });
    res.status(201).json(newPermission);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la permission:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Supprimer une permission
 */
async function removePermission(req, res) {
  try {
    const { id } = req.params;
    const perm = await DroitsAcces.findByPk(id);
    if (!perm) {
      return res.status(404).json({ error: 'Permission non trouvée' });
    }
    await perm.destroy();
    res.json({ message: 'Permission supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la permission:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserPermissions,
  addPermission,
  removePermission,
};
