import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, quiz, selectedOptions } = location.state || {};
  const [correctAnswers, setCorrectAnswers] = useState([]);

  // Effect to fetch correct answers from quiz data
  useEffect(() => {
    if (quiz) {
      const correctAnswersArray = quiz.questions.map(q => q.correctIndex);
      setCorrectAnswers(correctAnswersArray);
    }
  }, [quiz]);

  const handleReviewAnswers = () => {
    navigate('/review-answers', { state: { quiz, selectedOptions, correctAnswers } });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Quiz Result</h1>
      <p className="text-2xl text-white">You scored {score} out of {total}</p>
      <button
        onClick={handleReviewAnswers}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Review Answers
      </button>
    </div>
  );
};

export default QuizResult;
