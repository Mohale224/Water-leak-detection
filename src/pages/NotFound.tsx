import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-cyan-100 rounded-full mb-6">
          <AlertTriangle className="h-12 w-12 text-cyan-600" />
        </div>
        <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight">404</h1>
        <p className="mt-2 text-3xl font-bold text-gray-900">Page not found</p>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;