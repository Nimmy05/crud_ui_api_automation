import request from 'supertest';
import app from '../../app.js'; // Or wherever your express app is defined
import { loginAndGetToken } from '../../utils/authHelper.js';

describe('Create Item API', () => {
  it('should create an item', async () => {
  const token = await loginAndGetToken();
  const newItem = {
    todo: 'Write Playwright tests',
  };

  const response = await request(app)
    .post('/api/create-todo')
    .set('Authorization', `Bearer ${token}`)
    .send(newItem);

  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe(newItem.title);
}, 15000);
});
