import React from 'react';

const Header = ({title ,des}) => {
  return (
    <header className="pt-6 sm:pt-8 lg:pt-16 pb-4 sm:pb-6 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 sm:mb-4">
          {title}
         
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
          {des}
        
        </p>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-blue-100 text-blue-800 font-medium">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            High Accuracy
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800 font-medium">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Multi-Language
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-purple-100 text-purple-800 font-medium">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Fast Processing
          </span>
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-orange-100 text-orange-800 font-medium">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
            Grammar Check & Fix
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;