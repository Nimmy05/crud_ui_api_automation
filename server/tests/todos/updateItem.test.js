import request from 'supertest';
import app from '../../app.js';
import Todo from '../../models/todo.js';

describe('PUT /api/:id (update todo)', () => {
    let todoId;

    beforeAll(async () => {
        const todo = new Todo({ todo: 'Initial Todo' });
        const savedTodo = await todo.save();
        todoId = savedTodo._id.toString();
    });

    afterAll(async () => {
        await Todo.deleteMany({});
    });

    it('should update todo with valid data and return 200', async () => {
        const updatedText = 'Updated Todo Text';
        const res = await request(app)
            .put(`/api/${todoId}`)
            .send({ updatedTodo: updatedText });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Todo updated');
        expect(res.body.todo).toHaveProperty('todo', updatedText);
    });

    it('should return 400 if updatedTodo is missing or empty', async () => {

        let res = await request(app)
            .put(`/api/${todoId}`)
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Updated todo text is required');


        res = await request(app)
            .put(`/api/${todoId}`)
            .send({ updatedTodo: ' ' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Updated todo text is required');
    });

    it('should return 404 if todo not found', async () => {
        const fakeId = '64b5d70c9c16f1421f1c9a99'
        const res = await request(app)
            .put(`/api/${fakeId}`)
            .send({ updatedTodo: 'New Todo Text' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'Todo not found');
    });

    it('should return 500 on server error', async () => {
        const invalidId = 'invalid-id';
        const res = await request(app)
            .put(`/api/${invalidId}`)
            .send({ updatedTodo: 'New Todo Text' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message', 'Error updating todo');
    });
});
