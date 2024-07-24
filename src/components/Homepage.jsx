import React from 'react';
import Navbarr from './Navbarr';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { user } = useUser();
  const nav = useNavigate();
  if (user) {
    nav(`/profile/${user.id}`);
  }

  return (
    <div className="min-h-screen home">
      <Navbarr />
      <div className="flex flex-col items-center justify-center text-center mt-20 md:mt-10 relative z-10">
        <h1 className="md:text-5xl text-4xl font-bold text-white mb-6">Welcome to Sphere</h1>
        <p className="md:text-2xl text-lg text-white mb-8 px-5">
          Discover and share amazing short videos with the world!
        </p>
        <div className="relative w-full">
          <div className="absolute top-[-10%] left-1/4 transform rotate-6 w-40 h-40 rounded-lg overflow-hidden shadow-lg z-0">
            <img className="w-full h-full object-cover" src="/image1.jpg" alt="placeholder1" />
          </div>
          <div className="absolute top-10 right-1/4 transform -rotate-6 w-40 h-40 rounded-lg overflow-hidden shadow-lg z-0">
            <img className="w-full h-full object-cover" src="/image2.jpg" alt="placeholder2" />
          </div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-lg overflow-hidden shadow-lg z-0">
            <img className="w-full h-full object-cover" src="/image3.webp" alt="placeholder3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
