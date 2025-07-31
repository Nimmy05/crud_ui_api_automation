// server/app.js
import express  from 'express' ;
import cors  from 'cors' ;
import bodyParser  from 'body-parser' ;
import morgan   from 'morgan' ;              
import authRouter from './routes/auth.js';
import todoRouters from './routes/todo.js';
import { config } from 'dotenv';

config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); 

// Routes
app.use('/api/auth', authRouter);
app.use('/api', todoRouters);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Global error handler (optional, improve robustness)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
