const { post } = require('../../utils/request');
const { credentials, baseUrl } = require('../../config/env.config');

describe('Login - Positive', () => {
  it('should login with valid credentials', async () => {
    const res = await post(`${baseUrl}/auth/login`).send(credentials);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
