// routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.cjs');
// Create quiz
router.post('/create', async (req, res) => {
  try {
    const { questions } = req.body;
    const code = generateUniqueCode();
    const newQuiz = new Quiz({ code, questions });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
});

// Helper function to generate unique code (for example purposes)
function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// routes/quiz.js
router.post('/validate-code', async (req, res) => {
  try {
    const { code } = req.body;
    const quiz = await Quiz.findOne({ code });
    if (quiz) {
      res.status(200).json({ valid: true, quiz });
    } else {
      res.status(200).json({ valid: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to validate quiz code' });
  }
});


module.exports = router;
