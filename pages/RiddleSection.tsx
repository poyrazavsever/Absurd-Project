// pages/Landing/RiddleSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const riddles = [
  { question: "Why did the scarecrow become a successful neurosurgeon?", answer: "Because he was outstanding in his field!" },
  { question: "What do you call fake spaghetti?", answer: "An impasta!" },
  { question: "Why don’t skeletons fight each other?", answer: "They don’t have the guts!" },
  // Add more riddles as needed
];

const RiddleSection = () => {
  const [currentRiddle, setCurrentRiddle] = useState<number>(0);

  const handleRiddleAnswer = () => {
    setCurrentRiddle((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="h-screen w-screen bg-yellow-500 flex flex-col items-center justify-center text-white text-3xl">
      <h2 className="mb-8">Riddle Me This!</h2>
      <motion.div
        className="p-6 bg-yellow-700 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <p>{riddles[currentRiddle].question}</p>
      </motion.div>
      <button
        onClick={handleRiddleAnswer}
        className="mt-8 px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
      >
        Get Next Riddle
      </button>
    </div>
  );
};

export default RiddleSection;
