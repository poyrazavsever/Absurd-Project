// components/ModalRiddle.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ModalRiddleProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isCorrect: boolean;
}

const ModalRiddle: React.FC<ModalRiddleProps> = ({ isOpen, onClose, message, isCorrect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className={`p-6 bg-${isCorrect ? 'green' : 'red'}-500 rounded-lg text-white`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-white text-black rounded-full"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default ModalRiddle;
