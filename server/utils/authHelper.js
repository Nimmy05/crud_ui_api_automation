import request from 'supertest';
import app from '../app.js'; // or the correct path to your app

export async function loginAndGetToken() {
  const credentials = {
    email: 'test67@gmail.com',
    password: 'abc123',
  };

  console.log('BASE_URL in login helper:', process.env.BASE_URL || 'http://localhost:3001');
  console.log('Credentials:', credentials);

  const res = await request(app)
    .post('/api/auth/login') // ✅ ensure this matches your backend login route
    .send(credentials);

  console.log('Login response:', res.body); // ❗ Check what comes back

  if (!res.body || !res.body.token) {
    throw new Error('Token not received in login response');
  }

  return res.body.token;
}
