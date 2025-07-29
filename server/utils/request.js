// utils/request.js
import supertest from 'supertest';
import app from '../app.js';
import { baseUrl } from '../config/env.config.js';

const request = supertest(baseUrl);

export function post(path) {
  return request(app).post(path);
}

export function get(path) {
  return supertest(app).get(path);
}

export function put(path) {
  return supertest(app).put(path);
}

export function del(path) {
  return supertest(app).delete(path);
}
