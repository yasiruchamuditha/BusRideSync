// components/LoadingAnimation.js
import React, { useState, useEffect } from 'react';

const LoadingAnimation = () => {
  const [visibleText, setVisibleText] = useState('');
  const fullText = 'SYNC YOUR RIDES WITH RIDESYNC SEAMLESSLY';

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setVisibleText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="relative flex items-center justify-center animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white mb-8">
        <span className="absolute text-white text-2xl font-bold">RC</span>
      </div>
      <h1 className="text-6xl font-bold text-white mb-2">RIDESYNC</h1>
      <p className="text-3xl text-white">{visibleText}</p>
    </div>
  );
};

export default LoadingAnimation;