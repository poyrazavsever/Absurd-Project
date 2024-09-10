import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const languages = [
  'Not funny at all',
  'Komik miydi abisi',
  'No tiene gracia en absoluto',
  'Pas drôle du tout',
  'Überhaupt nicht lustig',
  'Per niente divertente',
  'Nada engraçado',
  'Helemaal niet grappig',
  'Совсем не смешно',
  '一点也不好笑',
  '全く面白くない',
  'Helemaal niet grappig',
  'Nada engraçado',
  'Pas drôle du tout',
  'Überhaupt nicht lustig'
];

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const languagesList = [...languages, ...languages]; // Duplicate for continuous effect

  // Intersection observer to handle visibility
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    const element = document.querySelector('.section:nth-of-type(2)');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div className='relative w-full h-full bg-gradient-to-r from-neutral-950 to-black flex items-center justify-center overflow-hidden'>
      {/* Main Content */}
      <motion.div
        className='flex flex-col items-start gap-12 px-8 md:px-48 z-20'
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: [1.2, 1.1, 1] } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h5 className='text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-sky-500'>
          About Us
        </h5>
        <p className='text-3xl md:text-5xl text-neutral-200 font-semibold'>
          Why did the scarecrow become a successful neurosurgeon? Because he was outstanding in his field!
        </p>
      </motion.div>

      {/* Multilingual Slider */}
      <motion.div
        className='absolute bottom-8 right-8 text-white text-lg font-semibold whitespace-nowrap overflow-hidden'
        initial={{ x: '100%' }}
        animate={{ x: `-${100 * languagesList.length}vw` }}
        transition={{ duration: 400, repeat: Infinity, ease: 'linear' }} // Adjust duration for desired speed
      >
        <div className='flex'>
          {languagesList.map((lang, index) => (
            <span key={index} className='inline-block px-4 py-2 bg-neutral-900 mx-4 bg-opacity-50 border border-neutral-700'>{lang}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About;
