import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SeeQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "/api/teacher/teacher-quizzes",
        config
      );
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.log("Error fetching quizzes:", error);
      setError("Failed to fetch quizzes. Please try again.");
    }
  };

  const handleViewResponses = (quizCode) => {
    navigate("/view-responses", { state: { quizCode } });
  };

  const handleDisableQuiz = async (quizCode) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`/api/teacher/disable/${quizCode}`, {}, config);
      fetchQuizzes(); // Refresh the list of quizzes after disabling
    } catch (error) {
      console.error('Error disabling quiz:', error);
      setError('Failed to disable quiz. Please try again.');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Extract the JWT token from local storage
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
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Quizzes Created by You
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg text-lg"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.code}
            className="bg-transparent text-white p-6 shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
            <p className="text-white">Quiz Code: {quiz.code}</p>
            <p className={`text-${quiz.isActive ? 'green' : 'red'}-500`}>Status: {quiz.isActive ? 'Active' : 'Disabled'}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleViewResponses(quiz.code)}
                className="bg-transprerent hover:bg-gray-700 text-white border border-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
              >
                Responses
              </button>
              {quiz.isActive && (
                <button 
                  onClick={() => handleDisableQuiz(quiz.code)} 
                  className="bg-transparent hover:bg-red-500 hover:bg-opacity-30 border border-red-500 text-white font-bold py-2 px-4 rounded">
                  Disable Quiz
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeQuizzes;
