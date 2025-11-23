import DroitsAcces from '../models/droits_acces.js';

/**
 * Contrôleur pour gérer les droits d'accès aux documents.
 */

/**
 * Récupère les droits d'accès d'un utilisateur pour un document.
 */
export async function getUserAccessRights(req, res) {
  try {
    const { userId, documentId } = req.params;
    const accessRights = await DroitsAcces.findOne({ where: { userId, documentId } });
    if (!accessRights) {
      return res.status(404).json({ error: 'Droits d\'accès non trouvés' });
    }
    return res.json(accessRights);
  } catch (error) {
    console.error('Erreur lors de la récupération des droits d\'accès :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Crée ou met à jour les droits d'accès d'un utilisateur pour un document.
 */
export async function upsertAccessRights(req, res) {
  try {
    const { userId, documentId, access_level } = req.body;
    let accessRights = await DroitsAcces.findOne({ where: { userId, documentId } });
    if (accessRights) {
      accessRights.access_level = access_level;
      await accessRights.save();
    } else {
      accessRights = await DroitsAcces.create({ userId, documentId, access_level });
    }
    return res.status(201).json(accessRights);
  } catch (error) {
    console.error('Erreur lors de la création ou mise à jour des droits d\'accès :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Supprime les droits d'accès d'un utilisateur pour un document.
 */
export async function deleteAccessRights(req, res) {
  try {
    const { userId, documentId } = req.params;
    const deleted = await DroitsAcces.destroy({ where: { userId, documentId } });
    if (!deleted) {
      return res.status(404).json({ error: 'Droits d\'accès non trouvés' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression des droits d\'accès :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
