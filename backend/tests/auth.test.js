const request = require('supertest');
const app = require('../index'); // Assuming index.js exports the Express app

describe('Authentication API', () => {
  let server;
  
  beforeAll(() => {
    server = app.listen(4000); // start test server on port 4000
  });

  afterAll((done) => {
    server.close(done);
  });

  test('Register user successfully', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'TestPassword123',
        role: 'user'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  test('Login user successfully', async () => {
    const res = await request(server)
      .post('/auth/login')
      .send({
        usernameOrEmail: 'testuser',
        password: 'TestPassword123',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
