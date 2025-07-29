require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL,
  credentials: {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  },
};
