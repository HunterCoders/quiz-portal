import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TakeQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentDetails, quiz } = location.state || {};
  const [selectedOptions, setSelectedOptions] = useState([]);

  const radioButtonStyles = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid blue',
    backgroundColor: 'white',
    cursor: 'pointer',
    outline: 'none',
    marginRight: '10px'
  };

  const radioButtonCheckedStyles = {
    ...radioButtonStyles,
    backgroundColor: 'blue'
  };

  useEffect(() => {
    if (quiz) {
      const storedSelectedOptions = localStorage.getItem(
        `selectedOptions_${quiz.code}`
      );
      if (storedSelectedOptions) {
        setSelectedOptions(JSON.parse(storedSelectedOptions));
      } else {
        setSelectedOptions(new Array(quiz.questions.length).fill(null));
      }
    }
  }, [quiz]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
    localStorage.setItem(
      `selectedOptions_${quiz.code}`,
      JSON.stringify(updatedSelectedOptions)
    );
  };

  // components/TakeQuiz.js

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post("/api/quiz/submit-quiz", {
        quizCode: quiz.code,
        rollNo: studentDetails.rollNo, // Assuming rollNo is part of studentDetails
        selectedOptions,
      });

      const { score, total } = response.data;

      navigate("/quiz-result", {
        state: { score, total, quiz, selectedOptions },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) {
    return <div className="text-center text-white">No quiz data found.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Quiz: {quiz.title}</h1>
      <p className="text-xl text-white">Roll Number: {studentDetails.rollNo}</p>
      <div className="bg-transparent text-white text-2xl p-6 shadow-lg border border-white rounded-3xl">
        {quiz.questions.map((q, index) => (
          <div key={index} className="mb-4 px-5 py-5">
            <p className="font-bold mb-2 border border-white rounded-xl px-3 py-2 bg-white bg-opacity-5">{`${q.question}`}</p>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="mb-2">
                <input
                  type="radio"
                  style={selectedOptions[index] === optIndex ? radioButtonCheckedStyles : radioButtonStyles}
                  id={`q${index}_opt${optIndex}`}
                  name={`q${index}`}
                  className="mr-2 text-2xl"
                  checked={selectedOptions[index] === optIndex}
                  onChange={() => handleOptionChange(index, optIndex)}
                />
                <label htmlFor={`q${index}_opt${optIndex}`}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitQuiz}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default TakeQuiz;
