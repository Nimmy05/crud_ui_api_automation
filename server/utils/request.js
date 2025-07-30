import express from 'express';
import request from 'supertest';
import app from '../app';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todo.js';
const router = express.Router();

// Get all todos
router.get('/', getTodos);

// Create a new todo
router.post('/', createTodo);

// Update a todo
router.patch('/', updateTodo);  

// Delete a todo
router.delete('/', deleteTodo);  

export default request(app);
