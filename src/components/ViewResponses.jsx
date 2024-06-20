import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewResponses = () => {
  const location = useLocation();
  const { quizCode } = location.state || {};
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/teacher/responses/${quizCode}`, config);
        setResponses(response.data.responses);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setError('Failed to fetch responses. Please try again.');
      }
    };

    if (quizCode) {
      fetchResponses();
    }
  }, [quizCode]);

  if (!quizCode) {
    return <div className="text-center text-white">No quiz code provided.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Responses for Quiz Code: {quizCode}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="bg-transparent text-white text-2xl p-6 shadow-lg border border-white rounded-3xl">
        {responses.length > 0 ? (
          responses.map((response, index) => (
            <div key={index} className="mb-4 px-5 py-5 border-b border-white">
              <p><b>Roll No: </b>{response.rollNo}</p>
              <p><b>Score: </b>{response.score}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No responses found for this quiz code.</p>
        )}
      </div>
    </div>
  );
};

export default ViewResponses;
