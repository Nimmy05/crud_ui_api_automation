// server/app.js
const { express } = require ('express');
const { cors } = require ('cors');
const { bodyParser } = require ('body-parser');
const { morgan }  = require ('morgan');              // For HTTP request logging
const { dotenv } = require ('dotenv');
const  { todoRouter } = require ('./routes/todo.js');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));  // Logs requests to the console

// Routes
app.use('/api', todoRouter);

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
