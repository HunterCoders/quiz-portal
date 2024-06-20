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
import QuizResult from './components/QuizResult';
import ReviewAnswers from './components/ReviewAnswers';
import ReviewAnswersSubmitted from './components/ReviewAnswersSubmitted';
import TeacherRegistrationForm from './components/TeacherRegistration';
import TeacherLogin from './components/TeacherLogin';
import TeacherLandingPage from './components/TeacherLandingPage';
import TeacherDashboard from './components/TeacherDashboard';
import SeeQuizzes from './components/SeeQuizes';
import ViewResponses from './components/ViewResponses';

// import AdminPage from './AdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserLandingPage />} />
        <Route path="/admin" element={<TeacherLandingPage />} />
        <Route path="/register" element={<TeacherRegistrationForm />} />
        <Route path="/login" element={<TeacherLogin />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/teacher-dash" element={<TeacherDashboard />} />
        <Route path="/see-quizzes" element={<SeeQuizzes />} />
        <Route path="/view-responses" element={<ViewResponses />} />


        <Route path="/quiz-code" element={<QuizCode />} />
        <Route path="/take-quiz-form" element={<TakeQuizForm />} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/review-answers" element={<ReviewAnswers />} />
        <Route path="/review-answers-submitted" element={<ReviewAnswersSubmitted />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
