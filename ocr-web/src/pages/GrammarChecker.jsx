import React, { useState } from 'react';
import Grammar from '../components/Grammar';
import Format from '../components/Format';
import Header from '../components/Header';
import { Helmet } from "react-helmet";
import Breadcrumbs from '../components/Breadcrumbs';

const GrammarChecker = () => {
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [grammarErrors, setGrammarErrors] = useState(null);
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success', 'error', 'info'
  const [hasProcessedText, setHasProcessedText] = useState(false);

  // Grammar check function
  const handleGrammarCheck = async (text) => {
    if (!text.trim()) {
      setFeedbackMessage('No text available to check grammar.');
      setFeedbackType('info');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    setGrammarLoading(true);
    setGrammarErrors(null);
    setFeedbackMessage('');

    try {
      const result = await Format.checkGrammar(text);
      
      if (result.hasErrors) {
        setGrammarErrors(result);
        setShowGrammarModal(true);
        setFeedbackMessage(`Found ${result.errors?.length || 0} grammar issues to review.`);
        setFeedbackType('info');
      } else {
        setGrammarErrors(result);
        setFeedbackMessage('Great! No grammar errors found in your text.');
        setFeedbackType('success');
      }
      
      // Clear message after 4 seconds
      setTimeout(() => setFeedbackMessage(''), 4000);
    } catch (error) {
      console.error('Grammar check failed:', error);
      setGrammarErrors({
        hasErrors: false,
        error: 'Failed to check grammar. Please try again.'
      });
      setFeedbackMessage('Failed to check grammar. Please try again.');
      setFeedbackType('error');
      setTimeout(() => setFeedbackMessage(''), 4000);
    } finally {
      setGrammarLoading(false);
    }
  };

  // Copy text to clipboard
  const handleCopy = () => {
    const textToCopy = processedText || inputText;
    if (!textToCopy.trim()) {
      setFeedbackMessage('No text to copy.');
      setFeedbackType('info');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setFeedbackMessage('Text copied to clipboard!');
      setFeedbackType('success');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }).catch(() => {
      setFeedbackMessage('Failed to copy text.');
      setFeedbackType('error');
      setTimeout(() => setFeedbackMessage(''), 3000);
    });
  };

  // Download text as file
  const handleDownload = () => {
    const textToDownload = processedText || inputText;
    if (!textToDownload.trim()) {
      setFeedbackMessage('No text to download.');
      setFeedbackType('info');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    const blob = new Blob([textToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grammar-checked-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setFeedbackMessage('Text downloaded successfully!');
    setFeedbackType('success');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  // Reset function
  const handleReset = () => {
    setInputText('');
    setProcessedText('');
    setGrammarErrors(null);
    setShowGrammarModal(false);
    setFeedbackMessage('');
    setHasProcessedText(false);
  };

  // Subtle feedback component
  const FeedbackMessage = () => {
    if (!feedbackMessage) return null;

    const bgColor = feedbackType === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                   feedbackType === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                   'bg-blue-50 border-blue-200 text-blue-800';

    const icon = feedbackType === 'success' ? '✓' :
                feedbackType === 'error' ? '✗' : 'ℹ';

    return (
      <div className={`${bgColor} border rounded-lg px-4 py-3 mb-6 flex items-center transition-all duration-300 ease-in-out`}>
        <span className="mr-2 font-semibold">{icon}</span>
        <span className="text-sm font-medium">{feedbackMessage}</span>
      </div>
    );
  };

  // Loading Spinner Component
  const LoadingSpinner = ({ message, subMessage }) => (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500 mb-4"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-blue-300"></div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600 max-w-md">{subMessage}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Grammar Checker | Free Online Grammar & Spelling Tool - PictoTextOnline</title>
        <meta name="description" content="Check your text for grammar and spelling errors with PictoTextOnline's free online grammar checker. Instantly fix punctuation, style, and spelling for essays, business writing, and more. Fast, accurate, and privacy-friendly." />
        <meta name="keywords" content="grammar checker, spelling checker, free online tool, grammar correction, PictoTextOnline, fix punctuation, essay grammar checker, business writing checker, style checker, writing tool, student writing tool, professional grammar tool, content editing, text proofreading" />
        <meta property="og:title" content="Grammar Checker | Free Online Grammar & Spelling Tool - PictoTextOnline" />
        <meta property="og:description" content="Check your text for grammar and spelling errors with PictoTextOnline's free online grammar checker. Fast, accurate, and privacy-friendly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/grammar-checker" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Grammar Checker | Free Online Grammar & Spelling Tool - PictoTextOnline" />
        <meta name="twitter:description" content="Check your text for grammar and spelling errors with PictoTextOnline's free online grammar checker. Fast, accurate, and privacy-friendly." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/grammar-checker" />
      </Helmet>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Grammar Checker', path: '/grammar-checker' }]} />
      {/* Header Section */}
      <Header title={'Grammar Checker'} des={'An online grammar checker to fix grammar, spelling, and punctuation mistakes instantly.'}/>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-20">
        
        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Input Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
               
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Paste or type your text below and our AI will check it for grammar, spelling, and style errors
                </p>
              </div>

              {/* Text Input Area */}
              <div className="mb-6 sm:mb-8">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type your text here..."
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
                <div className="mt-2 text-sm text-gray-500 text-right">
                  {inputText.length} characters
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => handleGrammarCheck(inputText)}
                  disabled={!inputText.trim() || grammarLoading}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[160px] flex items-center justify-center shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {grammarLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Checking...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Check Grammar
                    </>
                  )}
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  disabled={!inputText.trim() && !processedText.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white border-0 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={!inputText.trim() && !processedText.trim()}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white border-0 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>

                {/* Reset Button */}
                {(inputText || hasProcessedText) && (
                  <button
                    onClick={handleReset}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Grammar Check Loading State */}
        {grammarLoading && (
          <section className="mb-8 sm:mb-12">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-8 sm:py-12">
              <LoadingSpinner 
                message="Checking grammar..." 
                subMessage="Analyzing your text for grammar, spelling, and style errors"
              />
            </div>
          </section>
        )}

        {/* Results Section */}
        {hasProcessedText && processedText && (
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Processed Text
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Your text has been analyzed for grammar and style issues.
                  </p>
                </div>
                
                {/* Processed Text Display */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-base">
                      {processedText}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Grammar Component */}
        <Grammar 
          grammarErrors={grammarErrors}
          showGrammarModal={showGrammarModal}
          setShowGrammarModal={setShowGrammarModal}
          extractedText={processedText}
          setExtractedText={setProcessedText}
          setGrammarErrors={setGrammarErrors}
          setHasProcessedText={setHasProcessedText}
        />

        {/* Tips Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                ✨ Grammar Checker Tips
              </h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Get the most out of our AI-powered grammar checker
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Paste Your Text</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Copy and paste your text from any document, email, or article for instant grammar checking</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Review Suggestions</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Our AI will highlight errors and provide intelligent suggestions for improvement</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Apply Corrections</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Accept or reject suggestions to improve your writing quality and clarity</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Export Results</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Copy the corrected text or download it as a file for use in your documents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
                 
      </main>
    </div>
  );
};

export default GrammarChecker;