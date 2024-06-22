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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-transperent p-8 rounded-lg border border-white shadow-lg text-center w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">Quiz Result</h1>
        <p className="text-2xl text-white mb-4 flex">You scored <div className='text-blue-500 text-2xl'>{score}</div> out of <div className='text-3xl text-blue-700'>{total}</div></p>
        <button
          onClick={handleReviewAnswers}
          className="mt-4 bg-transperent hover:bg-gray-500 border border-white text-white font-bold py-2 px-4 rounded-lg"
        >
          Review Answers
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
