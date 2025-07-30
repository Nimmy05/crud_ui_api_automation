import Todo from '../models/todo.js';

export async function clearTestTodos() {
  await Todo.deleteMany({ test: true });
}
