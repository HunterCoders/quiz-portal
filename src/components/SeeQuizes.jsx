import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeeQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/teacher/teacher-quizzes', config);
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.log('Error fetching quizzes:', error);
        setError('Failed to fetch quizzes. Please try again.');
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 bg-transparent text-white">Quizzes Created by You</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.code} className="bg-transperent text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
            <p className="text-white-">Quiz Code: {quiz.code}</p>
            <div className="mt-4 flex justify-between">
              <button className="bg-transperent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-30 text-white font-bold py-2 px-4 rounded ease-in">
                Responses
              </button>
              <button className="bg-transperent hover:bg-red-500 hover:bg-opacity-30 border border-red-500 text-white font-bold py-2 px-4 rounded">
                Disable Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeeQuizes;
