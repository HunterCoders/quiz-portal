import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReviewAnswersSubmitted = () => {
  const location = useLocation();
  const { quizCode, rollNo, selectedOptions,score } = location.state || {};

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(
          `/api/quiz/fetch-quiz/${quizCode}`
        );
        const { quiz } = response.data;
        setQuiz(quiz);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        setLoading(false);
      }
    };

    if (quizCode) {
      fetchQuizDetails();
    }
  }, [quizCode]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!quiz) {
    return <div className="text-center text-white">Quiz not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Review Answers for {`${rollNo}`}
        
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-green-500">
      You scored: {`${score}`}
      </h2>
      <div className="bg-transparent text-white text-2xl p-6 shadow-lg border border-white rounded-3xl">
        {quiz.questions.map((q, index) => (
          <div key={index} className="mb-4 px-5 py-5">
            <p className="font-bold mb-2 border border-white rounded-xl px-3 py-2 bg-white bg-opacity-5">
              {`${q.question}`}
            </p>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="mb-2">
                <input
                  type="radio"
                  id={`q${index}_opt${optIndex}`}
                  name={`q${index}`}
                  className="mr-2"
                  checked={selectedOptions[index] === optIndex}
                  disabled
                />
                <label
                  htmlFor={`q${index}_opt${optIndex}`}
                  className={`ml-2 ${
                    selectedOptions[index] === optIndex
                      ? selectedOptions[index] === q.correctIndex
                        ? "text-green-500"
                        : "text-red-500"
                      : "text-white"
                  }`}
                >
                  {opt}{" "}
                  {optIndex === q.correctIndex ? "(Correct)" : ""}
                </label>
              </div>
            ))}
            <p className="text-red-500">
              Your Answer: {q.options[selectedOptions[index]]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewAnswersSubmitted;
