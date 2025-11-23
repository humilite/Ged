/**
 * Tests unitaires et d'intégration pour le workflow de validation.
 */

const request = require('supertest');
const app = require('../index');
const WorkflowValidation = require('../models/workflow_validation');

describe('API Workflow Validation', () => {
  let validationId;

  it('crée une étape de validation', async () => {
    const response = await request(app)
      .post('/workflowValidation')
      .send({ documentId: 1, userId: 1, comment: 'Validation initiale' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    validationId = response.body.id;
  });

  it('récupère les validations d\'un document', async () => {
    const response = await request(app)
      .get('/workflowValidation/document/1');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('met à jour le statut d\'une validation', async () => {
    const response = await request(app)
      .put(`/workflowValidation/${validationId}`)
      .send({ status: 'approved', comment: 'Validation approuvée' });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('approved');
  });

  it('retourne 404 si validation non trouvée lors de la mise à jour', async () => {
    const response = await request(app)
      .put('/workflowValidation/9999999')
      .send({ status: 'approved', comment: 'Inexistant' });
    expect(response.statusCode).toBe(404);
  });
});
