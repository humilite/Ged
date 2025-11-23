import PlanClassement from '../models/plan_classement.js';

/**
 * Récupérer toute la hiérarchie du plan de classement
 */
export async function getHierarchy(req, res) {
  try {
    const plans = await PlanClassement.findAll();
    // Construire arbre hiérarchique
    const map = new Map();
    const roots = [];

    plans.forEach(plan => {
      map.set(plan.id, {...plan.dataValues, children: []});
    });

    map.forEach(plan => {
      if(plan.parent_id) {
        const parent = map.get(plan.parent_id);
        if(parent) {
          parent.children.push(plan);
        } else {
          roots.push(plan);
        }
      } else {
        roots.push(plan);
      }
    });

    res.json(roots);
  } catch (error) {
    console.error('Erreur lors de la récupération du plan de classement:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Créer une nouvelle entrée dans le plan de classement
 */
export async function createPlan(req, res) {
  try {
    const { parent_id, name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Le nom est requis' });
    }
    const newPlan = await PlanClassement.create({ parent_id, name, description });
    res.status(201).json(newPlan);
  } catch (error) {
    console.error('Erreur lors de la création du plan de classement:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Mettre à jour une entrée du plan de classement
 */
export async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const { parent_id, name, description } = req.body;

    const plan = await PlanClassement.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Entrée non trouvée' });
    }
    await plan.update({ parent_id, name, description });
    res.json(plan);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du plan de classement:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Supprimer une entrée du plan de classement
 */
export async function deletePlan(req, res) {
  try {
    const { id } = req.params;

    const plan = await PlanClassement.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: 'Entrée non trouvée' });
    }
    await plan.destroy();
    res.json({ message: 'Entrée supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du plan de classement:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
