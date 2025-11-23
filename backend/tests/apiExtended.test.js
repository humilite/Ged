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
});
