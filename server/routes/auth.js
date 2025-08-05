import express from 'express';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'No user exist with this email' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(200).json({ 
      token });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Login Error', error: error.message });
  }
});

export default authRouter;
