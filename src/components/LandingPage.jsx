import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const messages = ["Quizzie..", "your only quiz taker..."];
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingEffect = setTimeout(() => {
      if (wordIndex < messages.length) {
        if (charIndex < messages[wordIndex].length) {
          setDisplayedText((prev) => prev + messages[wordIndex][charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          setDisplayedText('');
          setCharIndex(0);
          setWordIndex(wordIndex + 1);
        }
      } else {
        setDisplayedText('');
        setCharIndex(0);
        setWordIndex(0);
      }
    }, charIndex < messages[wordIndex].length ? 100 : 1500);

    return () => clearTimeout(typingEffect);
  }, [charIndex, wordIndex, messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-dark-gray">
      <div className="relative text-center w-full px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          Welcome to {displayedText}
        </h1>
        <h1 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 opacity-0">
          {messages.join(' ')}
        </h1>
      </div>
      <div className="flex space-x-4 mt-4">
        <Link to="/user" className="bg-custom-dark-gray hover:bg-gray-600 text-white text-xl sm:text-2xl md:text-3xl font-bold py-2 px-4 border border-gray-500 rounded transition duration-300 ease-in-out">
          User
        </Link>
        <Link to="/admin" className="bg-custom-dark-gray hover:bg-gray-700 text-white text-xl sm:text-2xl md:text-3xl font-bold py-2 px-4 border border-gray-500 rounded transition duration-300 ease-in-out">
          Admin
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
