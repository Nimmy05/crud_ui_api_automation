import post from '../../utils/request';
import { baseUrl, credentials } from '../../config/env.config';

describe('Login - Positive', () => {
  it('should login with valid credentials', async () => {
    const res = await post(`${baseUrl}/auth/login`).send(credentials);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
