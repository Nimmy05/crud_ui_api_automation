import request from 'supertest';
import app from '../app.js'; 
import { credentials } from '../config/env.config.js';

export async function loginAndGetToken() {

  const res = await request(app)
    .post('/api/auth/login')
    .send(credentials);

  // console.log('Login response:', res.body);

  if (!res.body || !res.body.token) {
    throw new Error('Token not received in login response');
  }

  return res.body.token;
}
