const express = require('express');
const { registerTeacher } = require('../controllers/teacherController.cjs');
const Teacher = require('../models/teacherModel.cjs'); 
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';
const bcrypt = require('bcryptjs');
const router = express.Router();
const Quiz = require('../models/quiz.cjs');
const verifyToken = require('../controllers/jwtverify.cjs');

router.post('/register', registerTeacher);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(400).json({ success: false, error: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: 'Invalid email or password' });
      }
      
      console.log(isMatch);
      const token = jwt.sign({ id: teacher._id }, secret, { expiresIn: '1h' });
  
      res.json({ success: true, token });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server error' });
    }
  });

  
router.get('/teacher-quizzes', verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ teacher: req.teacherId }).select('title code');
    res.json({ success: true, quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
