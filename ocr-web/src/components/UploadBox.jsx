import React, { useRef, useState, useEffect } from 'react';

const UploadBox = ({ onFileSelect }) => {
  const fileInputRef = useRef();
  const [dragOver, setDragOver] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  // Clean up the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl cursor-pointer text-center
          transition-all duration-300 ease-in-out transform hover:scale-[1.02]
          p-8 sm:p-12 lg:p-16
          ${dragOver
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
            : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white hover:border-gray-400 hover:shadow-md'
          }
        `}
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* If previewSrc exists, show preview image */}
        {previewSrc ? (
          <img
            src={previewSrc}
            alt="Preview"
            className="mx-auto max-h-64 rounded-lg object-contain mb-4"
          />
        ) : (
          <>
            {/* Upload Icon */}
            <div className="mb-4">
              <svg
                className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto transition-colors duration-300 ${
                  dragOver ? 'text-blue-500' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            {/* Text Content */}
            <div className="space-y-2">
              <p className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                dragOver ? 'text-blue-700' : 'text-gray-700'
              }`}>
                Drop your image here
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                or{' '}
                <span className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2">
                  click to browse
                </span>
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Supports JPG, PNG, GIF up to 5MB
              </p>
            </div>
          </>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            dragOver ? 'bg-blue-400' : 'bg-gray-300'
          }`}></div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            dragOver ? 'bg-blue-400' : 'bg-gray-300'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
