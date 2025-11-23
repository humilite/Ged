import bcrypt from 'bcrypt';
import * as jwt from '../utils/jwt.js';
import User from '../models/user.js';

/**
 * Controller pour l'inscription d'un nouvel utilisateur
 * @param {*} req 
 * @param {*} res 
 */
export async function register(req, res) {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    // Vérifier si l'email ou le nom d'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: newUser.id });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

/**
 * Controller pour la connexion d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    // Générer un token JWT
    const token = jwt.generateToken({ id: user.id, role: user.role });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
