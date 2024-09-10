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

const jokes = [,
  'Why don’t scientists trust atoms? Because they make up everything!',
  'Why did the bicycle fall over? Because it was two-tired!',
  'Why don’t skeletons fight each other? They don’t have the guts!',
  'What do you call fake spaghetti? An impasta!',
  'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
  'How does a penguin build its house? Igloos it together!',
  'Why did the math book look sad? Because it had too many problems!',
  'What do you call cheese that isn’t yours? Nacho cheese!',
  'Why couldn’t the leopard play hide and seek? Because he was always spotted!'
];

function About() {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setCurrentJoke((prev) => (prev + 1) % jokes.length);
  };

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
    <div className='relative w-full h-full bg-gradient-to-r from-neutral-950 to-black flex flex-col items-center justify-start overflow-hidden'>
      {/* Main Content */}
      <motion.div
        className='flex flex-col items-center gap-12 px-8 md:px-12 z-20'
        initial={{ opacity: 0, y: 100 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: [1.2, 1.1, 1] } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <h5 className='text-5xl md:text-[600px] font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200'>
          Joke
        </h5>

        <motion.p
          className='text-3xl md:text-5xl text-neutral-200 font-semibold'
          key={currentJoke}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {jokes[currentJoke]}
        </motion.p>
        
      </motion.div>

      {/* Button */}
      <motion.button
        className='mt-8 p-4 bg-neutral-900 bg-opacity-50 border border-neutral-700 text-white rounded-full shadow-lg flex items-center justify-center'
        whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleButtonClick}
      >
        <span className='text-2xl'>😂</span>
      </motion.button>

      {/* Multilingual Slider */}
      <motion.div
        className='absolute bottom-8 right-8 text-white text-lg font-semibold whitespace-nowrap overflow-hidden'
        initial={{ x: '100%' }}
        animate={{ x: `-${100 * languages.length}vw` }}
        transition={{ duration: 400, repeat: Infinity, ease: 'linear' }}
      >
        <div className='flex'>
          {languages.map((lang, index) => (
            <span key={index} className='inline-block px-4 py-2 bg-neutral-900 mx-4 bg-opacity-50 border border-neutral-700'>{lang}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About;
