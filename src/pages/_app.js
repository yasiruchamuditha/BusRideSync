//_app.js
import '../styles/globals.css'; // Import Tailwind CSS
import { useEffect } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import Footer from '../components/Footer'; // Import Footer component

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Any necessary initializations or scripts here
  }, []);

  return (
    <>
      <Navbar /> {/* Include Navbar at the top */}
      <Component {...pageProps} /> {/* Render the current page */}
      <Footer /> {/* Include Footer at the bottom */}
    </>
  );
}

export default MyApp;
