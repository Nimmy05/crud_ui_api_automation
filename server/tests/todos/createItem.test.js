import request from 'supertest';
import app from '../../app.js'; // Or wherever your express app is defined
import { loginAndGetToken } from '../../utils/authHelper.js';

describe('Create Item API', () => {
  it('should create an item', async () => {
    const token = await loginAndGetToken();
    const newItem = {
      title: 'Write Playwright tests',
      completed: false,
    };

    const res = await request(app)
      .post('/api/todos') // ✅ fixed endpoint
      .set('Authorization', `Bearer ${token}`)
      .send(newItem);

    expect(res.statusCode).toBe(201);
    expect(res.body.todo.title).toBe(newItem.title);
  });
});
