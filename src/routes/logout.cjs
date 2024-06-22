// authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to check JWT and blacklist token
const verifyToken = require("../controllers/jwtverify.cjs");

// In-memory blacklist (for demonstration purposes)
const tokenBlacklist = new Set();

// Logout route
router.post('/logout', verifyToken, (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    tokenBlacklist.add(token);  // Add token to the blacklist
    res.send('Logged out successfully');
  } else {
    res.status(400).send('No token provided');
  }
});

// Middleware to check if token is blacklisted
const checkBlacklist = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).send('Token has been logged out');
  }
  next();
};

// Apply blacklist check middleware to the router
router.use(checkBlacklist);

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
