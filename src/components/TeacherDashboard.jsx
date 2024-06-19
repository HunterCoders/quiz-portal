import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center bg-opacity-5 border border-white">
        <h2 className="text-3xl font-bold text-white mb-6">Teacher Dashboard</h2>
        <div className="space-y-4">
          <Link
            to="/create-quiz"
            className="block bg-custom-dark-gray border border-white hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Create Quiz
          </Link>
          <Link
            to="/see-quizzes"
            className="block bg-custom-dark-gray border border-white hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            See Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
