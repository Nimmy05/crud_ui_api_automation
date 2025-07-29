const supertest = require('supertest');
import app from '../app.js';


function post(path) {
  return supertest(app).post(path);
}

function get(path) {
  return supertest(app).get(path);
}

function put(path) {
  return supertest(app).put(path);
}

function del(path) {
  return supertest(app).delete(path);
}

module.exports = { post, get, put, del };
