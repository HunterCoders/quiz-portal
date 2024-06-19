// quizModel.js

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  questions: [
    // Define your questions schema or reference to another schema
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
