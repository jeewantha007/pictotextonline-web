import React from 'react';

const Grammar = ({ 
  grammarErrors, 
  showGrammarModal, 
  setShowGrammarModal,
  extractedText,
  setExtractedText,
  setGrammarErrors,
  setHasProcessedText
}) => {
  
  // Apply a single grammar fix
  const applySingleFix = (errorId, replacement) => {
    const error = grammarErrors.errors.find(e => e.id === errorId);
    if (!error || error.applied) return;

    let newText = extractedText;
    
    // Apply the replacement
    const beforeText = newText.substring(0, error.offset);
    const afterText = newText.substring(error.offset + error.length);
    newText = beforeText + replacement + afterText;

    // Calculate offset adjustment for remaining errors
    const offsetDiff = replacement.length - error.length;

    // Update the extracted text
    setExtractedText(newText);
    if (setHasProcessedText) setHasProcessedText(true);

    // Mark this error as applied and adjust offsets for remaining errors
    const updatedErrors = grammarErrors.errors.map(err => {
      if (err.id === errorId) {
        return { ...err, applied: true };
      } else if (err.offset > error.offset && !err.applied) {
        return { ...err, offset: err.offset + offsetDiff };
      }
      return err;
    });

    setGrammarErrors({
      ...grammarErrors,
      errors: updatedErrors
    });

    // Check if all errors are fixed and close modal automatically
    const remainingErrors = updatedErrors.filter(err => !err.applied);
    if (remainingErrors.length === 0) {
      setTimeout(() => {
        setShowGrammarModal(false);
        alert('✅ All grammar issues have been fixed!');
      }, 1000);
    }
  };

  // Apply all grammar fixes automatically
  const applyAllFixes = () => {
    if (!grammarErrors || !grammarErrors.hasErrors) return;

    let newText = extractedText;
    const sortedErrors = grammarErrors.errors
      .filter(error => !error.applied && error.replacements.length > 0)
      .sort((a, b) => b.offset - a.offset); // Apply from end to beginning to maintain offsets

    sortedErrors.forEach(error => {
      const beforeText = newText.substring(0, error.offset);
      const afterText = newText.substring(error.offset + error.length);
      newText = beforeText + error.replacements[0] + afterText;
    });

    setExtractedText(newText);
    if (setHasProcessedText) setHasProcessedText(true);

    // Mark all errors as applied
    const updatedErrors = grammarErrors.errors.map(err => ({
      ...err,
      applied: true
    }));

    setGrammarErrors({
      ...grammarErrors,
      errors: updatedErrors
    });

    // Close modal automatically after applying all fixes
    setTimeout(() => {
      setShowGrammarModal(false);
      alert(`✅ Applied ${sortedErrors.length} grammar fixes!`);
    }, 1000);
  };

  // Grammar Modal Component
  const GrammarModal = () => {
    if (!showGrammarModal || !grammarErrors?.hasErrors) return null;

    const unappliedErrors = grammarErrors.errors.filter(error => !error.applied);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white rounded-lg max-w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[80vh] w-full overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold">Grammar Check Results</h3>
                <p className="text-blue-100 mt-1 text-sm sm:text-base">
                  Found {grammarErrors.totalErrors} issue(s) • {unappliedErrors.length} remaining
                </p>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="text-white hover:text-blue-200 text-2xl font-bold ml-4 flex-shrink-0"
              >
                ×
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[60vh]">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={applyAllFixes}
                disabled={unappliedErrors.length === 0}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Apply All Fixes ({unappliedErrors.filter(e => e.replacements.length > 0).length})
              </button>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Close
              </button>
            </div>

            {/* Error List */}
            <div className="space-y-4">
              {grammarErrors.errors.map((error) => (
                <div
                  key={error.id}
                  className={`border rounded-lg p-3 sm:p-4 ${
                    error.applied 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      {error.applied ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 w-fit">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Fixed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 w-fit">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Pending
                        </span>
                      )}
                      <span className="text-xs text-gray-500">{error.category}</span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{error.message}</h4>
                    
                    <div className="text-xs sm:text-sm text-gray-600 mb-3">
                      <span className="font-medium">Context: </span>
                      <span className="bg-red-100 px-1 rounded break-words">{error.originalText}</span>
                      <span> in "{error.context.length > 50 ? error.context.substring(0, 50) + '...' : error.context}"</span>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {error.replacements.length > 0 && !error.applied && (
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {error.replacements.map((replacement, idx) => (
                          <button
                            key={idx}
                            onClick={() => applySingleFix(error.id, replacement)}
                            className="inline-flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs sm:text-sm rounded-full transition-colors break-words"
                          >
                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {replacement}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {error.replacements.length === 0 && !error.applied && (
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-500 italic">No automatic suggestions available</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Grammar Results Summary
  const GrammarSummary = () => {
    if (!grammarErrors || showGrammarModal) return null;

    return (
      <section className="mb-6 sm:mb-8 lg:mb-12">
        <div className={`rounded-lg p-3 sm:p-4 max-w-2xl mx-auto ${
          grammarErrors.hasErrors 
            ? 'bg-yellow-50 border border-yellow-200' 
            : grammarErrors.error
            ? 'bg-red-50 border border-red-200'
            : 'bg-green-50 border border-green-200'
        }`}>
          <div className="flex items-start">
            {grammarErrors.hasErrors ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : grammarErrors.error ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <div>
              <h3 className={`font-medium text-sm sm:text-base ${
                grammarErrors.hasErrors 
                  ? 'text-yellow-800' 
                  : grammarErrors.error 
                  ? 'text-red-800' 
                  : 'text-green-800'
              }`}>
                {grammarErrors.hasErrors 
                  ? 'Grammar Issues Found' 
                  : grammarErrors.error 
                  ? 'Grammar Check Failed' 
                  : 'Grammar Check Complete'
                }
              </h3>
              <p className={`mt-1 text-sm sm:text-base ${
                grammarErrors.hasErrors 
                  ? 'text-yellow-700' 
                  : grammarErrors.error 
                  ? 'text-red-700' 
                  : 'text-green-700'
              }`}>
                {grammarErrors.hasErrors 
                  ? `Found ${grammarErrors.totalErrors} grammar issue(s). Click "View Details" to see and fix them.`
                  : grammarErrors.error 
                  ? grammarErrors.error 
                  : grammarErrors.message
                }
              </p>
              {grammarErrors.hasErrors && (
                <button
                  onClick={() => setShowGrammarModal(true)}
                  className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  View Details & Fix Issues
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <GrammarSummary />
      <GrammarModal />
    </>
  );
};

export default Grammar;