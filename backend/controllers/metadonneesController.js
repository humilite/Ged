import Metadonnees from '../models/metadonnees.js';

/**
 * Contrôleur pour gérer les métadonnées des documents.
 */

/**
 * Récupère toutes les métadonnées d'un document.
 */
export async function getDocumentMetadata(req, res) {
  try {
    const { documentId } = req.params;
    const metadata = await Metadonnees.findAll({ where: { document_id: documentId } });
    return res.json(metadata);
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Crée une nouvelle métadonnée pour un document.
 */
export async function createMetadata(req, res) {
  try {
    const { document_id, key, value } = req.body;
    const metadata = await Metadonnees.create({ document_id, key, value });
    return res.status(201).json(metadata);
  } catch (error) {
    console.error('Erreur lors de la création de la métadonnée :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Met à jour une métadonnée existante.
 */
export async function updateMetadata(req, res) {
  try {
    const { id } = req.params;
    const { key, value } = req.body;
    const metadata = await Metadonnees.findByPk(id);
    if (!metadata) {
      return res.status(404).json({ error: 'Métadonnée non trouvée' });
    }
    metadata.key = key;
    metadata.value = value;
    await metadata.save();
    return res.json(metadata);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la métadonnée :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Supprime une métadonnée.
 */
export async function deleteMetadata(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Metadonnees.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Métadonnée non trouvée' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Erreur lors de la suppression de la métadonnée :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
