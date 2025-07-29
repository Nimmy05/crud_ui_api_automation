const { post } = require('./request'); // adjust relative path as needed
const { credentials, baseUrl } = require('../config/env.config');

let token;

const loginAndGetToken = async () => {
  if (!token) {
    const res = await post(`http://localhost:3001/api/auth/login`).send(credentials);
    token = res.body.token;
  }
  return token;
};

module.exports = { loginAndGetToken };
