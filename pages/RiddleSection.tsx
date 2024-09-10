import React, { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleAnswerChange = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      const correctAnswer = riddles[currentRiddle].answers.find(answer => answer.correct);
      if (riddles[currentRiddle].answers[selectedAnswer].correct) {
        setFeedback('correct');
        setScore(prevScore => prevScore + 1);
        setModalMessage("Correct! Aren't you busy? And you're solving this? And you're doing it right. My God...");
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Valid threshold value between 0 and 1
    );

    const sectionElement = document.querySelector('#riddle-section');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  return (
    <div id="riddle-section" className="h-full w-full bg-neutral-950 flex flex-col items-center justify-center text-3xl relative px-4 sm:px-6 md:px-8 lg:px-12">
      <ModalRiddle 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        message={modalMessage} 
        isCorrect={isAnswerCorrect} 
      />
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-100 mb-8 text-center">Riddle Me This!</h2>
      <motion.div
        className="p-6 md:p-8 lg:p-10 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg text-center w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-neutral-300 pb-6">{riddles[currentRiddle].question}</p>
        <div className="flex flex-col space-y-4">
          {riddles[currentRiddle].answers.map((answer, index) => (
            <label 
              key={index} 
              className={`block p-4 rounded-lg cursor-pointer text-neutral-300 transition-colors ${selectedAnswer === index ? (feedback === 'correct' ? 'bg-green-500' : 'bg-red-500') : 'bg-neutral-800 hover:bg-neutral-700'} ${feedback ? 'pointer-events-none' : ''}`}
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
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'>
          <motion.button
            onClick={handleCheckAnswer}
            className="px-6 py-3 text-lg font-bold text-white bg-blue-950 rounded hover:bg-blue-800 transition-all duration-300"
            whileHover={{ scale: 1.1, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Check Answer
          </motion.button>
          <motion.button
            onClick={handleNextRiddle}
            className="px-6 py-3 text-lg font-bold text-white bg-purple-950 rounded hover:bg-purple-800 transition-all duration-300"
            whileHover={{ scale: 1.1, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Next Riddle
          </motion.button>
        </div>
      </motion.div>
      {/* Score Display */}
      <motion.div
        className="absolute top-4 right-4 text-sm md:text-lg font-bold text-gray-200 bg-neutral-800 bg-opacity-50 border border-neutral-700 p-3 md:p-4 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p>Score: {score}</p>
      </motion.div>
    </div>
  );
};

export default RiddleSection;