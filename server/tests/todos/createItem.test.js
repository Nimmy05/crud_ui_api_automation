import request from 'supertest';
import app from '../../app.js';
import { generateTodo } from '../../utils/dataGenerator.js';
import { loginAndGetToken } from '../../utils/authHelper.js';
import { credentials } from '../../config/env.config'

let token;

beforeAll(async () => {
  const user = {
    email: credentials.email,
    password: credentials.password,
  };

  await request(app).post('/api/auth/register').send(user);

  token = await loginAndGetToken();
});

describe('POST /api/ - Create Todo', () => {
  it('should create a unique todo item (positive)', async () => {
    const newItem = { todo: generateTodo() };

    const response = await request(app)
      .post('/api/')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem);

    expect(response.statusCode).toBe(201);
    expect(response.body.todo.todo).toBe(newItem.todo);
  });

  it('should fail when no todo is provided (negative)', async () => {
    const response = await request(app)
      .post('/api/')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should fail with missing Authorization token (negative)', async () => {
    const response = await request(app)
      .post('/api/')
      .send({ todo: generateTodo() });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  it('should fail with invalid Authorization token (negative)', async () => {
    const response = await request(app)
      .post('/api/')
      .set('Authorization', `Bearer invalidtoken123`)
      .send({ todo: generateTodo() });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });
});
