import React from 'react';

const ProcessingStats = ({ ocrResult, extractedText }) => {
  if (!ocrResult) return null;

  const wordCount = extractedText.split(/\s+/).length;
  const charCount = extractedText.length;
  const confidence = ocrResult.confidence ? Math.round(ocrResult.confidence) : 'N/A';

  return (
    <section className="mb-6 sm:mb-8 lg:mb-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Processing Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {typeof confidence === 'number' ? `${confidence}%` : confidence}
            </div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {wordCount}
            </div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {charCount}
            </div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessingStats;