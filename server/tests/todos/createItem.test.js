const { post } = require('../../utils/request');
const { loginAndGetToken } = require('../../utils/authHelper');
const { baseUrl } = require('../../config/env.config');
const { newItem } = require('../../data/testData');

describe('POST /create-todo', () => {  // update endpoint name here
  let token;

  beforeAll(async () => {
    token = await loginAndGetToken();
  });

  it('should create a new item', async () => {
    const res = await post(`${baseUrl}/todos`)  // use /todos, not /create-todo
      .set('Authorization', `Bearer ${token}`)
      .send({ title: newItem.title, completed: false });  // send correct fields

    expect(res.status).toBe(201);
    expect(res.body.todo.title).toBe(newItem.title);  // response contains { todo: { title, ... } }
  });
});
