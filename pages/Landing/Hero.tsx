
import React from 'react';
import { motion } from 'framer-motion';

function Hero() {

  return (
    <div className='w-full h-full bg-neutral-950 flex items-center justify-center'>
        <div className='flex flex-col items-start gap-12 px-8 md:px-24'>
            <h5 className='text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-sky-500'>
              Did you see this too?
            </h5>
            <p className='text-3xl md:text-5xl text-neutral-200 font-semibold'>
              No, I didn't see anything either, it's just bullshit. I don't know why I did it. But it was fun.
            </p>
            {/* Animasyonlu Buton */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#A78BFA' }} // Hover animasyonu
              whileTap={{ scale: 0.9 }} // Tıklama animasyonu
              transition={{ type: 'spring', stiffness: 300 }} // Geçiş ayarları
              className='px-6 py-3 text-lg font-bold text-white rounded-full bg-violet-600 border-2 border-transparent hover:border-violet-400 transition-colors cursor-none'
            >
              Explore More
            </motion.button>
        </div>
    </div>
  )
}

export default Hero;
