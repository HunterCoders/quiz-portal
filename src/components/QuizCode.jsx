// components/QuizCode.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizCode = () => {
  const location = useLocation();
  const { code } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray">
      <h1 className="text-3xl font-bold text-white mb-4">Quiz Created Successfully!</h1>
      <p className="text-2xl text-white">Your quiz code is:</p>
      <p className="text-4xl text-white font-bold">{code}</p>
    </div>
  );
};

export default QuizCode;
