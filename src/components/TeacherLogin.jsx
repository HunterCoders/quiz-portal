import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherLogin = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "/api/teacher/login",
        {
          email: formDetails.email,
          password: formDetails.password,
        }
      );

      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/teacher-dash"); // Replace with your desired route
      } else {
        setError("Login failed");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during login");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-4">Teacher Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        className="bg-white p-6 shadow-lg w-full max-w-lg bg-opacity-5 rounded-3xl border border-1px"
        onSubmit={handleSubmit}
      >
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
        <button
          type="submit"
          className="bg-transprerent hover:bg-gray-700 text-white border border-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default TeacherLogin;
