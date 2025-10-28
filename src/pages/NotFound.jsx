import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 className="text-5xl font-bold mb-4">404</h1>
    <p className="mb-6 text-lg">Oops! Page not found.</p>
    <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Go Home</Link>
  </div>
);

export default NotFound;
