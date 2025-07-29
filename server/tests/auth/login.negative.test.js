const { post } = require('../../utils/request');
const { baseUrl, credentials } = require('../../config/env.config');

describe('Login - Negative', () => {
  it('should fail with wrong password', async () => {
    const res = await post(`${baseUrl}/auth/login`).send({ email: credentials.email, password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('should fail with wrong credentials', async () => {
    const res = await post(`${baseUrl}/auth/login`).send({ email: 'testrepmgmnt@gm.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });
});
