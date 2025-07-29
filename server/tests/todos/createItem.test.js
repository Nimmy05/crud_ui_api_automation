import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js'; // Make sure the file has `.js` extension
import dotenv from 'dotenv';
dotenv.config();
let token;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({ email: 'test67@gmail.com', password: 'abc123' });

  token = loginResponse.body.token;
  console.log('Login token:', token);
});
import jwt from 'jsonwebtoken';

test('Verify token manually', () => {
  const secret = process.env.JWT_SECRET_KEY || 'your_test_secret';
  const decoded = jwt.verify(token, secret);
  console.log('Decoded token:', decoded);
  expect(decoded).toHaveProperty('id');
});

describe('POST /api/', () => {
  it('should create an item', async () => {
    const newItem = { todo: 'tests' };

    const response = await request(app)
      .post('/api/')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem);

    console.log('Authorization header sent:', `Bearer ${token}`);
    console.log('Response status:', response.statusCode);
    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.todo.todo).toBe('tests');
  });
});
