// pages/Landing/RiddleSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const riddles = [
  { 
    question: "Why did the scarecrow become a successful neurosurgeon?", 
    answers: [
      { text: "Because he was outstanding in his field!", correct: true },
      { text: "Because he was the best in the business.", correct: false },
      { text: "Because he had a lot of connections.", correct: false },
      { text: "Because he was a real brainiac.", correct: false }
    ]
  },
  { 
    question: "What do you call fake spaghetti?", 
    answers: [
      { text: "An impasta!", correct: true },
      { text: "A noodle in disguise.", correct: false },
      { text: "A faux pasta.", correct: false },
      { text: "A pasta pretender.", correct: false }
    ]
  },
  { 
    question: "Why don’t skeletons fight each other?", 
    answers: [
      { text: "They don’t have the guts!", correct: true },
      { text: "They’re too bony.", correct: false },
      { text: "They’re not in the mood.", correct: false },
      { text: "They don’t have the energy.", correct: false }
    ]
  },
  // Add more riddles as needed
];

const RiddleSection = () => {
  const [currentRiddle, setCurrentRiddle] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnswerChange = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    const correctAnswer = riddles[currentRiddle].answers.find(answer => answer.correct);
    if (selectedAnswer !== null) {
      if (riddles[currentRiddle].answers[selectedAnswer].correct) {
        setFeedback('correct');
      } else {
        setFeedback('incorrect');
      }
    }
  };

  const handleNextRiddle = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setCurrentRiddle((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="h-screen w-screen bg-pink-300 flex flex-col items-center justify-center text-gray-900 text-3xl relative">
      <h2 className="mb-8 text-9xl font-extrabold">Riddle Me This!</h2>
      <motion.div
        className="p-8 bg-pink-500 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <p className="text-xl mb-4">{riddles[currentRiddle].question}</p>
        <div className="flex flex-col space-y-4">
          {riddles[currentRiddle].answers.map((answer, index) => (
            <label key={index} className={`block p-3 rounded-lg cursor-pointer transition-colors ${selectedAnswer === index ? (feedback === 'correct' ? 'bg-green-500' : 'bg-red-500') : 'bg-white'} ${feedback ? 'pointer-events-none' : ''}`}>
              <input
                type="radio"
                name="answer"
                value={index}
                className="hidden"
                checked={selectedAnswer === index}
                onChange={() => handleAnswerChange(index)}
              />
              {answer.text}
            </label>
          ))}
        </div>
        <motion.button
          onClick={handleCheckAnswer}
          className="mt-8 px-6 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Check Answer
        </motion.button>
        <motion.button
          onClick={handleNextRiddle}
          className="mt-4 px-6 py-3 text-lg font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Next Riddle
        </motion.button>
      </motion.div>
      {/* Score Display */}
      <div className="absolute top-4 right-4 text-lg font-bold text-gray-900">
        <p>Score: {/* Implement score logic here */}</p>
      </div>
    </div>
  );
};

export default RiddleSection;
