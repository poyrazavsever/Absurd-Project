// pages/Landing/RiddleSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ModalRiddle from '@/components/ModalRiddle';

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
    { 
      question: "What do you get when you cross a snowman and a vampire?", 
      answers: [
        { text: "Frostbite!", correct: true },
        { text: "A chilly vampire.", correct: false },
        { text: "A snow monster.", correct: false },
        { text: "A frost vampire.", correct: false }
      ]
    },
    { 
      question: "Why did the bicycle fall over?", 
      answers: [
        { text: "Because it was two-tired!", correct: true },
        { text: "Because it lost its balance.", correct: false },
        { text: "Because it was too old.", correct: false },
        { text: "Because the tires were flat.", correct: false }
      ]
    },
    { 
      question: "Why did the math book look sad?", 
      answers: [
        { text: "Because it had too many problems.", correct: true },
        { text: "Because it was out of date.", correct: false },
        { text: "Because it was too difficult.", correct: false },
        { text: "Because it was missing pages.", correct: false }
      ]
    },
    { 
      question: "What did one wall say to the other wall?", 
      answers: [
        { text: "I'll meet you at the corner.", correct: true },
        { text: "We need to talk.", correct: false },
        { text: "Let's go for a walk.", correct: false },
        { text: "I need to get a new coat.", correct: false }
      ]
    },
    { 
      question: "Why was the computer cold?", 
      answers: [
        { text: "Because it left its Windows open.", correct: true },
        { text: "Because it was old.", correct: false },
        { text: "Because it was malfunctioning.", correct: false },
        { text: "Because it was out of date.", correct: false }
      ]
    },
    { 
      question: "Why don’t scientists trust atoms?", 
      answers: [
        { text: "Because they make up everything.", correct: true },
        { text: "Because they are unpredictable.", correct: false },
        { text: "Because they are too small.", correct: false },
        { text: "Because they are unstable.", correct: false }
      ]
    },
    { 
      question: "What do you call cheese that isn't yours?", 
      answers: [
        { text: "Nacho cheese!", correct: true },
        { text: "Stolen cheese.", correct: false },
        { text: "Shared cheese.", correct: false },
        { text: "Borrowed cheese.", correct: false }
      ]
    },
    { 
      question: "How do you organize a space party?", 
      answers: [
        { text: "You planet!", correct: true },
        { text: "You book a venue.", correct: false },
        { text: "You invite aliens.", correct: false },
        { text: "You set up the stars.", correct: false }
      ]
    }
  ];
  

const RiddleSection = () => {
  const [currentRiddle, setCurrentRiddle] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  const handleAnswerChange = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      const correctAnswer = riddles[currentRiddle].answers.find(answer => answer.correct);
      if (riddles[currentRiddle].answers[selectedAnswer].correct) {
        setFeedback('correct');
        setScore((prevScore) => prevScore + 1);
        setModalMessage('Correct!');
        setIsAnswerCorrect(true);
      } else {
        setFeedback('incorrect');
        setModalMessage('Incorrect! The correct answer is: ' + correctAnswer?.text);
        setIsAnswerCorrect(false);
      }
      
      setModalOpen(true);
      
      // Automatically go to the next riddle after the modal closes
      setTimeout(() => {
        setModalOpen(false);
        setFeedback(null);
        setSelectedAnswer(null);
        setCurrentRiddle((prev) => (prev + 1) % riddles.length);
      }, 3000); // 3 seconds for the modal to display
    }
  };

  const handleNextRiddle = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    setCurrentRiddle((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="h-screen w-screen bg-pink-300 flex flex-col items-center justify-center text-gray-900 text-3xl relative">
      <ModalRiddle 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        message={modalMessage} 
        isCorrect={isAnswerCorrect} 
      />
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
            <label 
              key={index} 
              className={`block p-3 rounded-lg cursor-pointer transition-colors ${selectedAnswer === index ? (feedback === 'correct' ? 'bg-green-500' : 'bg-red-500') : 'bg-white'} ${feedback ? 'pointer-events-none' : ''}`}
            >
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
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default RiddleSection;
