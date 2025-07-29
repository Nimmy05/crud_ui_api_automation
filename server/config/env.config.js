import dotenv from 'dotenv';
dotenv.config();

export const baseUrl = 'http://localhost:3001';

export const credentials = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
};
