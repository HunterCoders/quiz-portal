import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TakeQuizForm = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollNo: '',
    class: '',
    section: '',
    quizCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate quiz code
      const response = await axios.post('/api/quiz/validate-code', { code: studentDetails.quizCode });
      if (response.data.valid==="True") {
        // Check if student has already attempted the quiz
        const attemptResponse = await axios.get(`/api/quiz/retrieve-quiz-attempt/${studentDetails.rollNo}/${studentDetails.quizCode}`);
        console.log(attemptResponse.data.valid);
        if (attemptResponse.data.valid) {
          // If attempt exists, redirect to review answers page
          const { selectedOptions,score } = attemptResponse.data.quizAttempt;
          navigate('/review-answers-submitted', { state: { quizCode: studentDetails.quizCode,rollNo:studentDetails.rollNo, selectedOptions,score } });
        } else {
          // Store roll number and quiz code in session storage
          sessionStorage.setItem(`quiz_${studentDetails.rollNo}_${studentDetails.quizCode}`, JSON.stringify({
            quizCode: studentDetails.quizCode,
            rollNo: studentDetails.rollNo
          }));

          // Navigate to take quiz page
          navigate('/take-quiz', { state: { studentDetails, quiz: response.data.quiz } });
        }
      }else if(response.data.valid==='NActive') {
        const attemptResponse = await axios.get(`/api/quiz/retrieve-quiz-attempt/${studentDetails.rollNo}/${studentDetails.quizCode}`);
        console.log(attemptResponse.data.valid);
        if (attemptResponse.data.valid) {
          // If attempt exists, redirect to review answers page
          const { selectedOptions,score } = attemptResponse.data.quizAttempt;
          navigate('/review-answers-submitted', { state: { quizCode: studentDetails.quizCode,rollNo:studentDetails.rollNo, selectedOptions,score } });
        }
        else
        setError(response.data.message);
      }
      else if(response.data.valid==='NFound') {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while validating the quiz code. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-4">Take Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="bg-white p-6 shadow-lg w-full max-w-lg bg-opacity-5 rounded-3xl border border-1px" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={studentDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Roll No</label>
          <input
            type="text"
            name="rollNo"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={studentDetails.rollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Class</label>
          <input
            type="text"
            name="class"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={studentDetails.class}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Section</label>
          <input
            type="text"
            name="section"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={studentDetails.section}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Quiz Code</label>
          <input
            type="text"
            name="quizCode"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={studentDetails.quizCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default TakeQuizForm;
