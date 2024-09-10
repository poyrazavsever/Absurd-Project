"use client";

import React, { useEffect } from 'react';
import Hero from '@/pages/Hero';
import { debounce } from "../utils/debounce";
import About from '@/pages/About';
import RiddleSection from '@/pages/RiddleSection';

const Page = () => {
  useEffect(() => {
    const handleScroll = debounce((event: WheelEvent) => {
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
    }, 200); // 200ms debounce delay

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const handleMouseMove = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden h-screen w-screen">
      <div className="section h-screen w-screen active">
        <Hero />
      </div>
      <div className="section h-screen w-screen">
        <About />
      </div>
      <div className="section h-screen w-screen">
        <RiddleSection />
      </div>
    </div>
  );
};

export default Page;
