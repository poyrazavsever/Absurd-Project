import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal'; // Modallerin doğru yolunu ayarlayın

function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='relative w-full h-full bg-gradient-to-r from-neutral-950 to-black flex items-center justify-center overflow-hidden'>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      <motion.div
        className='flex flex-col items-start gap-12 px-8 md:px-48 z-20'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h5 className='text-5xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200'>
          Did you see this too?
        </h5>
        <p className='text-3xl md:text-5xl text-neutral-200 font-semibold'>
          No, I didn't see anything either, it's just bullshit. I don't know why I did it. But it was fun.
        </p>
        {/* Animasyonlu Buton */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#636363' }} // Hover animasyonu
          whileTap={{ scale: 0.9 }} // Tıklama animasyonu
          transition={{ type: 'spring', stiffness: 300 }} // Geçiş ayarları
          onClick={handleButtonClick}
          className='px-6 py-3 text-lg font-bold text-white rounded-full bg-neutral-900 bg-opacity-50 border-2 border-transparent hover:border-neutral-400 transition-colors cursor-none'
        >
          Explore More
        </motion.button>
      </motion.div>

      {/* Scroll yazısı */}
      <motion.div
        className='absolute bottom-8 right-8 text-white text-lg font-semibold'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
      >
        <p className='flex items-center text-2xl space-x-2'>
          <span>Scroll</span>
          <motion.span
            className='text-2xl'
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⬇️
          </motion.span>
        </p>
      </motion.div>
    </div>
  );
}

export default Hero;
