/**
 * Tests backend étendus utilisant supertest pour valider tous les endpoints y compris cas d'erreur
 */

const request = require('supertest');
const app = require('../index');

describe('Tests API Backend Complètes', () => {
  it('authentification avec identifiants corrects', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ usernameOrEmail: 'admin', password: 'adminpassword' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('authentification avec mauvais mot de passe', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ usernameOrEmail: 'admin', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('création de document avec données valides', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .post('/documents')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Nouveau document', content: 'Contenu de test' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('création de document sans token', async () => {
    const res = await request(app)
      .post('/documents')
      .send({ title: 'Nouveau document', content: 'Contenu de test' });
    expect(res.statusCode).toBe(401);
  });

  it('workflow validation: démarrage, approbation et refus', async () => {
    const token = await getAdminToken();

    // Démarrage
    let res = await request(app)
      .post('/workflow/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ documentId: 1 });
    expect(res.statusCode).toBe(200);

    // Approbation
    res = await request(app)
      .post('/workflow/approve')
      .set('Authorization', `Bearer ${token}`)
      .send({ workflowId: res.body.workflowId });
    expect(res.statusCode).toBe(200);

    // Refus
    res = await request(app)
      .post('/workflow/reject')
      .set('Authorization', `Bearer ${token}`)
      .send({ workflowId: res.body.workflowId });
    expect(res.statusCode).toBe(200);
  });

async function getAdminToken() {
    const res = await request(app)
      .post('/auth/login')
      .send({ usernameOrEmail: 'admin', password: 'adminpassword' });
    return res.body.token;
  }

  describe('Gestion des droits d\'accès', () => {
    let token;
    beforeAll(async () => {
      token = await getAdminToken();
    });

    it('Créer et récupérer un droit d\'accès', async () => {
      const accessPayload = { userId: 1, documentId: 1, access_level: 'read' };

      // Création ou mise à jour
      let res = await request(app)
        .post('/api/droits-acces')
        .set('Authorization', `Bearer ${token}`)
        .send(accessPayload);
      expect(res.statusCode).toBe(201);
      expect(res.body.access_level).toBe('read');

      // Récupération
      res = await request(app)
        .get(`/api/droits-acces/user/1/document/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.access_level).toBe('read');
    });

    it('Supprimer un droit d\'accès', async () => {
      const res = await request(app)
        .delete(`/api/droits-acces/user/1/document/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(204);
    });
  });

  describe('Historique des actions', () => {
    let token;
    beforeAll(async () => {
      token = await getAdminToken();
    });

    it('Logguer et récupérer des actions', async () => {
      const actionPayload = {
        userId: 1,
        action: 'Test action',
        target_type: 'document',
        target_id: 1,
      };

      // Créer un log
      let res = await request(app)
        .post('/api/historique-actions')
        .set('Authorization', `Bearer ${token}`)
        .send(actionPayload);
      expect(res.statusCode).toBe(201);
      expect(res.body.action).toBe('Test action');

      // Récupérer actions utilisateur
      res = await request(app)
        .get(`/api/historique-actions/user/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Gestion des métadonnées', () => {
    let token;
    let metadataId;
    beforeAll(async () => {
      token = await getAdminToken();
    });

    it('Créer et récupérer des métadonnées', async () => {
      const metadataPayload = {
        document_id: 1,
        key: 'Author',
        value: 'John Doe',
      };

      // Créer
      let res = await request(app)
        .post('/api/metadonnees')
        .set('Authorization', `Bearer ${token}`)
        .send(metadataPayload);
      expect(res.statusCode).toBe(201);
      expect(res.body.key).toBe('Author');
      metadataId = res.body.id;

      // Récupérer
      res = await request(app)
        .get(`/api/metadonnees/document/1`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('Mettre à jour une métadonnée', async () => {
      const updatePayload = { key: 'Auteur', value: 'Jean Dupont' };

      const res = await request(app)
        .put(`/api/metadonnees/${metadataId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatePayload);

      expect(res.statusCode).toBe(200);
      expect(res.body.key).toBe('Auteur');
      expect(res.body.value).toBe('Jean Dupont');
    });

    it('Supprimer une métadonnée', async () => {
      const res = await request(app)
        .delete(`/api/metadonnees/${metadataId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(204);
    });
  });
});
