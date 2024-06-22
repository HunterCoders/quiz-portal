import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = location.state || {};

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Extract the JWT token from local storage
    console.log(token);
    console.log(" dslnkjf");

    try {
      // Call API to invalidate JWT token
      await axios.post('/api/admin/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      // Clear any stored JWT token
      localStorage.removeItem("token");
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray">
      <h1 className="text-3xl font-bold text-white mb-4">Quiz Created Successfully!</h1>
      <p className="text-2xl text-white">Your quiz code is:</p>
      <p className="text-4xl text-white font-bold mb-8">{code}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default QuizCode;
