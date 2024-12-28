// pages/index.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingAnimation from '../components/LoadingAnimation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      router.push('/login'); // Redirect to the login page after 4 seconds
    }, 3050);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return <LoadingAnimation />;
};

export default Home;

