// routes/quizRoutes.js

const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.cjs');
const verifyToken = require('../controllers/jwtverify.cjs');


const QuizResult=require("../models/quizResult.cjs");
// Create quiz
router.post('/create', verifyToken, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const code = generateUniqueCode(); // Make sure this function generates a unique quiz code
    const newQuiz = new Quiz({title,
      code,
      questions,
      teacherId: req.teacher.id, // Storing the teacher ID from the JWT
    });
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

// Assuming you have a middleware to parse JSON bodies
router.use(express.json());

// Fetch quiz by code middleware
async function fetchQuizByCode(quizCode) {
  try {
    const quiz = await Quiz.findOne({ code: quizCode });
    return quiz;
  } catch (err) {
    console.error('Error fetching quiz:', err);
    throw err;
  }
}

// POST /api/quiz/submit-quiz
router.post('/submit-quiz', async (req, res) => {
  const { quizCode, rollNo, selectedOptions } = req.body;

  try {
    // Retrieve the quiz from the database using the quizCode
    const quiz = await Quiz.findOne({ code: quizCode });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Calculate score based on selected options
    const score = selectedOptions.reduce((totalScore, selectedOption, index) => {
      const correctOptionIndex = quiz.questions[index].correctIndex;
      return totalScore + (selectedOption === correctOptionIndex ? 1 : 0);
    }, 0);

    // Save quiz result in the database
    const quizResult = new QuizResult({
      quizCode,
      rollNo,
      selectedOptions,
      score,
      totalQuestions: quiz.questions.length
    });

    await quizResult.save();

    // Return score and total questions back to the client
    res.json({ score, total: quiz.questions.length });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
});

router.get('/retrieve-quiz-attempt/:rollNo/:quizCode', async (req, res) => {
  const { rollNo, quizCode } = req.params;

  try {
    const quizAttempt = await QuizResult.findOne({ rollNo, quizCode });

    if (!quizAttempt) {
      return res.status(200).json({valid:false, message: 'Quiz attempt not found' });
    }
    res.json({valid:true, quizAttempt:quizAttempt });
  } catch (error) {
    console.error('Error retrieving quiz attempt:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/fetch-quiz/:quizCode', async (req, res) => {
  const { quizCode } = req.params;

  try {
    const quiz = await Quiz.findOne({ code: quizCode });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ quiz });
  } catch (error) {
    console.error('Error fetching correct answers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
