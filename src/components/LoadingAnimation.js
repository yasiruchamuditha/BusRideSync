// components/LoadingAnimation.js
import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-white mb-8"></div>
      <h1 className="text-5xl font-bold text-white mb-2">RIDESYNC</h1>
      <p className="text-xl text-white">SYNC Your Rides With RIDESYNC</p>
    </div>
  );
};

export default LoadingAnimation;