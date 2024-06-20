import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const SeeQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const navigate=useNavigate();

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
          "http://localhost:5000/api/teacher/teacher-quizzes",
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
      await axios.post(`http://localhost:5000/api/teacher/disable/${quizCode}`, {}, config);
      fetchQuizzes(); // Refresh the list of quizzes after disabling
    } catch (error) {
      console.error('Error disabling quiz:', error);
      setError('Failed to disable quiz. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 bg-transparent text-white">
        Quizzes Created by You
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.code}
            className="bg-transperent text-white p-6 shadow-lg rounded-lg"
          >
            <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
            <p className="text-white-">Quiz Code: {quiz.code}</p>
            <p className={`text-${quiz.isActive ? 'green' : 'red'}-500`}>Status: {quiz.isActive ? 'Active' : 'Disabled'}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleViewResponses(quiz.code)}
                className="bg-transperent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded ease-in"
              >
                Responses
              </button>
              {quiz.isActive && (
                <button 
                  onClick={() => handleDisableQuiz(quiz.code)} 
                  className="bg-transperent hover:bg-red-500 hover:bg-opacity-30 border border-red-500 text-white font-bold py-2 px-4 rounded">
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

export default SeeQuizes;
