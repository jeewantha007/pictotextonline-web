import React from 'react';

const ConvertButton = ({ onClick, disabled, loading = false }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          group relative w-full overflow-hidden rounded-xl font-semibold py-4 px-6
          text-base sm:text-lg transition-all duration-300 transform
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
          ${disabled || loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
          }
        `}
      >
        {/* Background Animation */}
        {!disabled && !loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
        
        <div className="relative flex items-center justify-center space-x-2">
          {loading ? (
            <>
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg 
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
              <span>Convert Image to Text</span>
            </>
          )}
        </div>
        
        {/* Shimmer Effect */}
        {!disabled && !loading && (
          <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-pulse"></div>
        )}
      </button>
      
      {/* Helper Text */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mt-3">
        {disabled 
          ? 'Please upload an image first' 
          : 'Click to extract text from your image'
        }
      </p>
    </div>
  );
};

export default ConvertButton;