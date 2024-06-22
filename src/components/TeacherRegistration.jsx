import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherRegistrationForm = () => {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formDetails.password !== formDetails.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/teacher/register', {
        email: formDetails.email,
        password: formDetails.password,
      });

      if (response.data.success) {
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-4">Teacher Registration</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="bg-white p-6 shadow-lg w-full max-w-lg bg-opacity-5 rounded-3xl border border-1px" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={formDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={formDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="border border-gray-300 px-4 py-2 w-full bg-transparent text-white rounded"
            value={formDetails.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-transprerent hover:bg-gray-700 text-white border border-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto">
          Register
        </button>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;
