// components/TakeQuiz.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const TakeQuiz = () => {
  const location = useLocation();
  const history = useNavigate();
  const { studentDetails, quiz } = location.state || {};
  const [shuffledQuestions, setShuffledQuestions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (quiz && !shuffledQuestions) {
      // Check if shuffled questions are already in local storage
      const storedShuffledQuestions = localStorage.getItem(`shuffledQuiz_${quiz.code}`);
      if (storedShuffledQuestions) {
        setShuffledQuestions(JSON.parse(storedShuffledQuestions));
      } else {
        // Shuffle questions and options if not already shuffled
        const shuffledQuestionsArray = shuffleArray(quiz.questions).map((q) => ({
          ...q,
          options: shuffleArray([...q.options])
        }));
        setShuffledQuestions(shuffledQuestionsArray);
        localStorage.setItem(`shuffledQuiz_${quiz.code}`, JSON.stringify(shuffledQuestionsArray));
      }
    }
  }, [quiz, shuffledQuestions]);

  useEffect(() => {
    // Override history pushState to add an extra entry in the history stack
    const originalPushState = history.pushState;
    history.pushState = function(state) {
      originalPushState.apply(history, arguments);
      history.pushState({ quizPage: true }, ''); // Add extra entry
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // Chrome requires returnValue to be set
    };

    const handlePopState = (event) => {
      if (window.confirm("Are you sure you want to leave? Your progress will be lost.")) {
        history.go(-2); // Go back two steps if the user confirms (to counteract the extra entry)
      } else {
        history.go(1); // Stay on the current page
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      history.pushState = originalPushState; // Restore original pushState
    };
  }, [history]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = optionIndex;
    setSelectedOptions(updatedSelectedOptions);
    localStorage.setItem(`selectedOptions_${quiz.code}`, JSON.stringify(updatedSelectedOptions));
  };

  if (!quiz) {
    return <div className="text-center text-white">No quiz data found.</div>;
  }

  if (!shuffledQuestions) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Quiz: {quiz.title}</h1>
      <p className="text-xl text-white">Roll Number: {studentDetails.rollNo}</p>
      <div className="bg-transparent text-white text-2xl p-6 shadow-lg border border-white rounded-3xl">
        {shuffledQuestions.map((q, index) => (
          <div key={index} className="mb-4 px-5 py-5">
            <p className="font-bold mb-2 border border-white rounded-xl px-3 py-2 bg-white bg-opacity-5">{`${q.question}`}</p>
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="mb-2">
                <input
                  type="radio"
                  id={`q${index}_opt${optIndex}`}
                  name={`q${index}`}
                  className="mr-2"
                  checked={selectedOptions[index] === optIndex}
                  onChange={() => handleOptionChange(index, optIndex)}
                />
                <label htmlFor={`q${index}_opt${optIndex}`}>{opt}</label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeQuiz;
