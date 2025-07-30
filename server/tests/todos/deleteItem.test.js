import request from 'supertest';
import app from '../../app.js';
import Todo from '../../models/todo.js';

describe('DELETE /api/:id (delete todo)', () => {
  let todoId;

  beforeAll(async () => {
    const todo = new Todo({ todo: 'Todo to delete' });
    const savedTodo = await todo.save();
    todoId = savedTodo._id.toString();
  });

  afterAll(async () => {
    await Todo.deleteMany({});
  });

  it('should delete the todo and return 200 with deleted todo', async () => {
    const res = await request(app)
      .delete(`/api/${todoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Todo deleted');
    expect(res.body.todo).toHaveProperty('_id', todoId);
    expect(res.body.todo).toHaveProperty('todo', 'Todo to delete');

    const deletedTodo = await Todo.findById(todoId);
    expect(deletedTodo).toBeNull();
  });

  it('should return 404 if todo not found', async () => {
    const fakeId = '64b5d70c9c16f1421f1c9a99'; 

    const res = await request(app)
      .delete(`/api/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Todo not found');
  });

  it('should return 500 on server error (invalid id format)', async () => {
    const invalidId = 'invalid-id';

    const res = await request(app)
      .delete(`/api/${invalidId}`);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'Error deleting todo');
  });
});
