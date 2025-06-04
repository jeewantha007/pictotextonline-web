import React from 'react';

const FileInfoDisplay = ({ selectedFile }) => {
  if (!selectedFile) return null;

  return (
    <div className="mt-4 sm:mt-6 max-w-md mx-auto px-2">
      <div className="bg-white rounded-lg border border-green-200 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center text-green-700">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-sm sm:text-base">File Selected:</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      </div>
    </div>
  );
};

export default FileInfoDisplay;