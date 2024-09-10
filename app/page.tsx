// app/page.tsx
"use client";

import React, { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
      const sections = document.querySelectorAll('.section');
      let currentSection = Array.from(sections).find((section) =>
        section.classList.contains('active')
      );
      if (scrollDirection === 'down') {
        const nextSection = currentSection?.nextElementSibling as HTMLElement;
        if (nextSection) {
          currentSection?.classList.remove('active');
          nextSection.classList.add('active');
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (scrollDirection === 'up') {
        const prevSection = currentSection?.previousElementSibling as HTMLElement;
        if (prevSection) {
          currentSection?.classList.remove('active');
          prevSection.classList.add('active');
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <div className="section h-screen w-screen bg-red-500 flex items-center justify-center text-white text-3xl active">
        Section 1
      </div>
      <div className="section h-screen w-screen bg-blue-500 flex items-center justify-center text-white text-3xl">
        Section 2
      </div>
      <div className="section h-screen w-screen bg-green-500 flex items-center justify-center text-white text-3xl">
        Section 3
      </div>
    </div>
  );
};

export default Page;
