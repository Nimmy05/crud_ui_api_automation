import api from '../../utils/request.js';
import { credentials } from '../../config/env.config.js';

describe('Login - Positive', () => {
  it('should login with valid credentials', async () => {
    const res = await api.post('/api/auth/login').send(credentials);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});
