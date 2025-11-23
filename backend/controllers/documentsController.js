import path from 'path';
import fs from 'fs';
import Document from '../models/document.js';
import Metadonnees from '../models/metadonnees.js';
import { Op } from 'sequelize';

/**
 * Gestion de l'upload d'un document
 * @param {*} req 
 * @param {*} res 
 */
export async function uploadDocument(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }

    const { originalname, filename, path: filePath } = req.file;
    const metadata = req.body.metadonnees ? JSON.parse(req.body.metadonnees) : [];

    // Ici, on pourrait rajouter la validation/sanitisation du fichier
    // Par exemple vérifier le type mime, la taille, etc.

    // Enregistrer dans la base de données
    const newDocument = await Document.create({
      user_id: req.user.id,
      filename: originalname,
      filepath: filePath,
    });

    // Enregistrer les métadonnées associées
    if(metadata.length > 0){
      for(const meta of metadata){
        await Metadonnees.create({
          document_id: newDocument.id,
          key: meta.key,
          value: meta.value,
        });
      }
    }

    res.status(201).json({ message: 'Document chargé avec succès', document: newDocument });
  } catch (error) {
    console.error('Erreur lors de l\'upload du document:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Recherche des documents avec filtres par nom, user ou metadata
 * @param {*} req 
 * @param {*} res 
 */
export async function searchDocuments(req, res) {
  try {
    const { filename, user_id, meta_key, meta_value } = req.query;

    let whereDoc = {};
    if(filename){
      whereDoc.filename = { [Op.iLike]: `%${filename}%` };
    }
    if(user_id){
      whereDoc.user_id = user_id;
    }

    // Requête principale avec jointure metadonnees
    const documents = await Document.findAll({
      where: whereDoc,
      include: [{
        model: Metadonnees,
        required: meta_key || meta_value ? true : false,
        where: {
          ...(meta_key ? { key: { [Op.iLike]: `%${meta_key}%` } } : {}),
          ...(meta_value ? { value: { [Op.iLike]: `%${meta_value}%` } } : {}),
        }
      }]
    });

    res.json(documents);
  } catch (error) {
    console.error('Erreur lors de la recherche des documents:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
