import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary text-white px-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-8">The page you’re looking for doesn’t exist.</p>
      
      <Link to="/">
        <button className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#0f0d23] transition cursor-pointer">
          Go back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
