import express from 'express';
import { body, param, validationResult } from 'express-validator';
import verifyToken from '../middleware/verifyToken.js';
import TodoModel from '../models/todo.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const router = express.Router();

// Apply Helmet for security headers
router.use(helmet());

// Simple rate limiting - customize as per need
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: 'Too many requests, please try again later.',
});
router.use(limiter);

// Helper middleware for input validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Create Todo (POST)
// Create Todo (POST)
router.post(
  '/todos',
  verifyToken,
  body('title').trim().notEmpty().withMessage('Title is required'),
  handleValidationErrors, // ✅ add this instead of ...
  async (req, res) => {
    try {
      const userId = req.userId;
      const { title, completed = false } = req.body;

      const newTodo = new TodoModel({ title, completed, userId });
      await newTodo.save();

      res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (err) {
      console.error('Create Todo error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Read Todos (GET)
router.get('/todos', verifyToken, async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.userId });
    res.status(200).json({ todos });
  } catch (error) {
    console.error('Read Todos error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Full Update Todo (PUT)
router.put(
  '/todos/:id',
  verifyToken,
  param('id').isMongoId().withMessage('Invalid Todo ID'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('completed').isBoolean().withMessage('Completed must be boolean'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const todoId = req.params.id;
      const userId = req.userId;

      const todo = await TodoModel.findOne({ _id: todoId, userId });
      if (!todo) return res.status(404).json({ message: 'Todo not found or unauthorized' });

      todo.title = req.body.title;
      todo.completed = req.body.completed;

      await todo.save();

      res.status(200).json({ message: 'Todo replaced successfully', todo });
    } catch (error) {
      console.error('Put Todo error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Delete Todo
router.delete(
  '/todos/:id',
  verifyToken,
  param('id').isMongoId().withMessage('Invalid Todo ID'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const todoId = req.params.id;
      const userId = req.userId;

      const deleted = await TodoModel.findOneAndDelete({ _id: todoId, userId });
      if (!deleted) return res.status(404).json({ message: 'Todo not found or unauthorized' });

      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error('Delete Todo error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;

