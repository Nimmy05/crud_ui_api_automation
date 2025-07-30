import request from 'supertest';
import app from '../../app.js';
import { credentials } from '../../config/env.config.js';
import { clearTestTodos } from '../../utils/testUtils.js'; 
describe('GET /api/', () => {
  let token;

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send(credentials).catch(() => {});;

    const loginRes = await request(app).post('/api/auth/login').send(credentials);
    token = loginRes.body.token;

    await request(app)
      .post('/api/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Todo',
        completed: false,
        test: true 
      });
  });

  afterAll(async () => {
    await clearTestTodos(); 
  });

 it('should return 200 and an array of todos', async () => {
  const response = await request(app).get('/api/');
  console.log('GET /api/ response body:', response.body);

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body.todos)).toBe(true); // ✅ FIXED

  if (response.body.todos.length > 0) {
    expect(response.body.todos[0]).toHaveProperty('_id');
    expect(response.body.todos[0]).toHaveProperty('todo'); // 'todo', not 'title'
  }
});


  it('should return 404 for an invalid route', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.statusCode).toBe(404);
  });

  it('should return 401 Unauthorized when trying to POST without token', async () => {
    const response = await request(app).post('/api/').send({ title: 'tests' });
    expect(response.statusCode).toBe(401);
  });
});
