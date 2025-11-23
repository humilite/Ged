const request = require('supertest');
const app = require('../index');

describe('Tests API Workflow Validation', () => {
  let server;
  beforeAll(() => {
    server = app.listen(4001);
  });

  afterAll(done => {
    server.close(done);
  });

  test('Créer une étape de validation', async () => {
    const response = await request(server)
      .post('/api/workflow-validation')
      .send({
        documentId: 1,
        userId: 1,
        comment: "Validation initiale"
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('documentId', 1);
  });

  test('Récupérer les validations d\'un document', async () => {
    const response = await request(server)
      .get('/api/workflow-validation/document/1');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Mettre à jour le statut d\'une validation', async () => {
    // Pré-requis: avoir une validation existante avec id=1
    const response = await request(server)
      .put('/api/workflow-validation/1')
      .send({
        status: "Approuvé",
        comment: "Validation mise à jour"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'Approuvé');
  });

  // Tests erreurs et cas limites pour enrichir la couverture

  test('Erreur création étape sans documentId', async () => {
    const response = await request(server)
      .post('/api/workflow-validation')
      .send({
        userId: 1,
        comment: "Sans documentId"
      });
    expect(response.statusCode).toBe(400);
  });

  test('Erreur récupération validations document invalide', async () => {
    const response = await request(server)
      .get('/api/workflow-validation/document/999999');
    expect([200, 404]).toContain(response.statusCode);
  });

  test('Erreur mise à jour statut validation inexistante', async () => {
    const response = await request(server)
      .put('/api/workflow-validation/999999')
      .send({
        status: "Rejeté",
        comment: "Validation inexistante"
      });
    expect(response.statusCode).toBe(404);
  });

  test('Erreur mise à jour statut sans données', async () => {
    const response = await request(server)
      .put('/api/workflow-validation/1')
      .send({});
    expect([400, 422]).toContain(response.statusCode);
  });

});
