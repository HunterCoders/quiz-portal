const Teacher = require('../models/teacherModel.cjs');
const bcrypt = require('bcryptjs');

const registerTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newTeacher = new Teacher({
      email,
      password: hashedPassword,
    });

    await newTeacher.save();

    res.status(201).json({ success: true, message: 'Teacher registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerTeacher };
