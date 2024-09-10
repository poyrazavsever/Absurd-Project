// components/Modal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const modalVariants = {
    open: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
  };

  const handleClick = () => {
    // Önceki modal'ı kapat
    onClose();

    // Yeni modal'ı aç ve 5 saniye sonra kapat
    setIsAlertOpen(true);
    setTimeout(() => {
      setIsAlertOpen(false);
    }, 3000);
  };

  return (
    <>
      <motion.div
        className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md text-white flex items-center justify-center z-50 ${!isOpen ? 'hidden' : ''}`}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={modalVariants}
      >
        <div className='bg-neutral-950 bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-start gap-4'>
          <h2 className='text-2xl mb-4 text-left'>This website serves no purpose</h2>
          <p className='text-lg mb-4 text-left'>
            I made this website during a boring night around 12 AM. There’s really no reason for it, but you can keep browsing. Since you’re here, you must be bored too. If you’re really bored, click this button.
          </p>
          <button
            className='px-4 py-2 bg-red-900 bg-opacity-60 border border-red-700 text-red-500 rounded hover:bg-red-700 transition-colors'
            onClick={handleClick}
          >
            Click me
          </button>
        </div>
      </motion.div>

      {/* Yeni Modal */}
      {isAlertOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md text-white flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className='bg-neutral-950 bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center gap-4'>
            <h2 className='text-3xl font-bold mb-4 text-center'>Just kidding! Hahaha</h2>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
