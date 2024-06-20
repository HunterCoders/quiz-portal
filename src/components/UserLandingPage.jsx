import React from 'react';
import { Link } from 'react-router-dom';

const UserLandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center bg-opacity-5 border border-white">
        <h2 className="text-3xl font-bold text-white mb-6">Welcome Student</h2>
        <div className="space-y-4">
          <Link to="/take-quiz-form" className="block bg-custom-dark-gray border border-white hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
            Take Quiz
          </Link>
          {/* <Link to="/quizzes" className="block bg-custom-dark-gray border border-white hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
            View Quizzes
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
