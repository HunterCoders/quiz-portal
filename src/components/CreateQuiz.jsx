import React, { useState } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md"; // Importing MdAdd icon from react-icons
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError("Quiz title cannot be blank.");
      return;
    }
    
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        setError(`Question ${i + 1} cannot be blank.`);
        return;
      }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) {
          setError(`Option ${j + 1} for question ${i + 1} cannot be blank.`);
          return;
        }
      }
    }

    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

      if (!token) {
        setError("No authorization token found. Please log in.");
        return;
      }

      const response = await axios.post(
        "/api/quiz/create",
        { title, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Handle success (e.g., display unique code to user)
      console.log("Quiz created:", response.data);
      navigate("/quiz-code", { state: { code: response.data.code } });
    } catch (error) {
      console.error("Failed to create quiz:", error);
      setError("Failed to create quiz. Please try again.");
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleCorrectIndexChange = (questionIndex, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctIndex = index;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Create Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-white text-3xl font-bold mb-3">Title</label>
        <input
          type="text"
          className={`px-4 py-2 w-full text-white outline-none border-b-2 bg-transparent ${
            isFocused || "border-b-2"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
      </div>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <textarea
            className="border text-white border-gray-500 rounded-3xl bg-white bg-opacity-10 px-4 py-2 mb-2 w-full resize-none"
            placeholder={`Question ${index + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />

          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              type="text"
              className="border border-gray-300 bg-white text-white bg-opacity-20 px-4 py-2 mb-2 w-full rounded"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) =>
                handleOptionChange(index, optIndex, e.target.value)
              }
            />
          ))}
          <select
            className="border border-green-600 text-black px-4 py-2 mb-2 w-full bg-green-500 bg-opacity-50 rounded appearance-auto"
            value={q.correctIndex}
            onChange={(e) =>
              handleCorrectIndexChange(index, parseInt(e.target.value))
            }
          >
            {q.options.map((opt, optIndex) => (
              <option key={optIndex} value={optIndex}>{`Option ${
                optIndex + 1
              }`}</option>
            ))}
          </select>
          <button
            className="bg-custom-dark-gray hover:bg-red-900 border border-red-500 text-white font-bold py-2 px-4 rounded-lg mt-2"
            onClick={() => handleDeleteQuestion(index)}
          >
            Delete Question
          </button>
        </div>
      ))}
      <div className="flex justify-end">
        <MdAdd
          className="mr-2 text-blue-500 text-3xl border-4 border-blue-500 rounded-full cursor-pointer"
          onClick={handleAddQuestion}
        />
      </div>
      <button
        className="bg-custom-dark-gray border border-white hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg mt-4"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
