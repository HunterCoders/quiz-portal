import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LandingPage from './components/LandingPage';
import UserLandingPage from './components/UserLandingPage';
import CreateQuiz from './components/CreateQuiz';
import QuizCode from './components/QuizCode';
import TakeQuizForm from './components/TakeQuizForm';
import TakeQuiz from './components/TakeQuiz';
// import AdminPage from './AdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserLandingPage />} />
        <Route path="/admin" element={<CreateQuiz />} />
        <Route path="/quiz-code" element={<QuizCode />} />
        <Route path="/take-quiz-form" element={<TakeQuizForm />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
