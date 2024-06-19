// server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://anusin1947:bzwfU4TPsC7yN70q@quiz-portal.ewkonna.mongodb.net/?retryWrites=true&w=majority&appName=quiz-portal';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/quiz', require('./routes/quizRoutes.cjs'));
app.use('/api/teacher', require('./routes/teacherRoutes.cjs'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
