import HistoriqueActions from '../models/historique_actions.js';

/**
 * Contrôleur pour gérer l'historique des actions des utilisateurs.
 */

/**
 * Récupère l'historique des actions pour un utilisateur donné.
 */
export async function getUserActions(req, res) {
  try {
    const { userId } = req.params;
    const actions = await HistoriqueActions.findAll({ where: { userId } });
    return res.json(actions);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique des actions :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Crée un nouvel enregistrement d'action dans l'historique.
 */
export async function logAction(req, res) {
  try {
    const { userId, action, target_type, target_id } = req.body;
    const newAction = await HistoriqueActions.create({ userId, action, target_type, target_id });
    return res.status(201).json(newAction);
  } catch (error) {
    console.error('Erreur lors de la création de l\'historique des actions :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
