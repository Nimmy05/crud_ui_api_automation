import request from 'supertest';
import app from '../../app.js';

describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: `testuser_${Date.now()}`,
        password: 'testpassword',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should fail with missing username or password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
