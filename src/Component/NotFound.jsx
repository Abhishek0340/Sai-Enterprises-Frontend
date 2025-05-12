
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Oops! We can't find that page.
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back to shopping!
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
