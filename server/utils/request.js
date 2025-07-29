import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.js';
const router = express.Router();

// Get all todos
router.get('/', getTodos);

// Create a new todo
router.post('/', createTodo);

// Update a todo
router.patch('/', updateTodo);  // You may want to add an ID param

// Delete a todo
router.delete('/', deleteTodo);  // You may want to add an ID param

export default router;
