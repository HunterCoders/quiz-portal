const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
