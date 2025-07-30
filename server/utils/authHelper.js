import request from 'supertest';
import app from '../app.js';
import { credentials } from '../config/env.config.js';

export async function loginAndGetToken() {
  const response = await request(app)
    .post('/api/auth/login')
    .send(credentials);

  if (response.status !== 200) {
    throw new Error('Login failed during test setup');
  }


  return response.body.token;
}

