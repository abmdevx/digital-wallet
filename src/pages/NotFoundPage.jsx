// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-black">
      {/* <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1> */}
      <h1 className="text-6xl font-bold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-white mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;