const request = require('supertest');
const app = require('../index');

describe('Tests API Notifications', () => {
  let server;
  beforeAll(() => {
    server = app.listen(4002);
  });

  afterAll(done => {
    server.close(done);
  });

  test('Créer une notification', async () => {
    const response = await request(server)
      .post('/api/notifications')
      .send({
        userId: 1,
        message: "Nouvelle notification de test"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('userId', 1);
  });

  test('Récupérer les notifications d\'un utilisateur', async () => {
    const response = await request(server)
      .get('/api/notifications/user/1');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Marquer une notification comme lue', async () => {
    // Pré-requis : avoir une notification existante avec id=1
    const response = await request(server)
      .put('/api/notifications/1/read');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('isRead', true);
  });

  // Tests erreurs et cas limites pour renforcer la couverture

  test('Erreur création notification sans userId', async () => {
    const response = await request(server)
      .post('/api/notifications')
      .send({
        message: "Notification sans userId"
      });
    expect(response.statusCode).toBe(400);
  });

  test('Erreur récupération notifications utilisateur invalide', async () => {
    const response = await request(server)
      .get('/api/notifications/user/999999');
    expect([200, 404]).toContain(response.statusCode);
  });

  test('Erreur marquage comme lue notification inexistante', async () => {
    const response = await request(server)
      .put('/api/notifications/999999/read');
    expect(response.statusCode).toBe(404);
  });

});
