import User from '../models/user.model.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// User registration
export async function register(req, res) {
  try {
    const { name, email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// User login
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check the password
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update the last login date
    user.lastLogin = new Date();
    await user.save();

    // Create and sign a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secret-key',
      {
        expiresIn: '1d',
      }
    );

    // Set the token as a cookie
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// get user
export async function getUser(req, res) {
  try {
    const userId = req.params.userId;

    console.log(userId);

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send(`No user with id: ${userId}`);

    // Find the user by id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User found', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// User logout
export async function logout(req, res) {
  try {
    // Clear the cookie
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
