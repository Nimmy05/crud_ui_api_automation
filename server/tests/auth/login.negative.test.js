import api from '../../utils/request.js';
import { credentials } from '../../config/env.config.js';

describe('Login - Negative', () => {
  it('should fail with wrong password', async () => {
    const res = await api.post('/api/auth/login').send({ email: credentials.email, password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('should fail with wrong credentials', async () => {
    const res = await api.post('/api/auth/login').send({ email: 'invalid@example.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});
