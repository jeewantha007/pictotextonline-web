import React from 'react';

const LoadingSpinner = ({ message = "Processing your image...", subMessage = "This may take a few moments" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Main Spinner Container */}
      <div className="relative mb-6">
        {/* Outer Ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
        
        {/* Spinning Ring */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
        
        {/* Inner Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-sm mx-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 animate-pulse">
          {message}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          {subMessage}
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;