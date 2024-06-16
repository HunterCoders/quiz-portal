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
      const response = await axios.post('http://localhost:5000/api/quiz/validate-code', { code: studentDetails.quizCode });
      if (response.data.valid) {
        navigate('/take-quiz', { state: { studentDetails, quiz: response.data.quiz } });
      } else {
        setError('Invalid quiz code. Please try again.');
      }
    } catch (err) {
      setError('An error occurred while validating the quiz code. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-4">Take Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="bg-white p-6 shadow-lg w-full max-w-lg bg-opacity-5 rounded-3xl border boder-1px" onSubmit={handleSubmit}>
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
