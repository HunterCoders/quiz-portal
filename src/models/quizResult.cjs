const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  quizCode: { type: String, required: true },
  rollNo: { type: String, required: true },
  selectedOptions: { type: [Number], required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;