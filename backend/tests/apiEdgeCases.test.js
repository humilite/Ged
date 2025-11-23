/**
 * Tests backend supplémentaires pour cas limites et erreurs
 */

const request = require('supertest');
const app = require('../index');

describe('Tests API Backend Cas Limites et Erreurs', () => {
  it('rejette la création d\'un utilisateur avec un email invalide', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testuser', email: 'invalidemail', password: 'pass123' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('rejette l\'accès sans token sur endpoint protégé', async () => {
    const res = await request(app)
      .get('/documents');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('renvoie 404 pour document non trouvé', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .get('/documents/9999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });

  it('gère correctement les validations workflow invalides', async () => {
    const token = await getAdminToken();
    const res = await request(app)
      .post('/workflow/approve')
      .set('Authorization', `Bearer ${token}`)
      .send({ workflowId: 99999 });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  async function getAdminToken() {
    const res = await request(app)
      .post('/auth/login')
      .send({ usernameOrEmail: 'admin', password: 'adminpassword' });
    return res.body.token;
  }
});
