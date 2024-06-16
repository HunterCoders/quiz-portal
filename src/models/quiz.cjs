// models/quiz.js

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  questions: [{
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctIndex: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Quiz', quizSchema);
