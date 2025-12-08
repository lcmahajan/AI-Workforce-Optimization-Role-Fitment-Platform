import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { username, email, password, role, department } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name: username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    if (user) {
      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          username: user.name, // Add username for frontend consistency
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid user data',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for user by email or name (usernameOrEmail is sent in both fields)
    let user;
    const loginInput = email || username; // Use email field as it contains usernameOrEmail

    if (loginInput.includes('@')) {
      user = await User.findOne({ email: loginInput });
    } else {
      user = await User.findOne({ name: loginInput });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          username: user.name, // Add username for frontend consistency
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};
