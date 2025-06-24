import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import ConvertButton from '../components/ConvertButton';
import ResultBox from '../components/ResultBox';
import LoadingSpinner from '../components/LoadingSpinner';
import Grammar from '../components/Grammar';
import Format from '../components/Format';
import Header from '../components/Header';
import FileInfoDisplay from '../components/FileInfoDisplay';
import ProcessingStats from '../components/ProcessingStats';
import BlogSection from '../components/BlogSection';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [error, setError] = useState('');
  const [grammarErrors, setGrammarErrors] = useState(null);
  const [grammarLoading, setGrammarLoading] = useState(false);
  const [showGrammarModal, setShowGrammarModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success', 'error', 'info'

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setExtractedText('');
    setOcrResult(null);
    setError('');
    setGrammarErrors(null);
    setFeedbackMessage('');
  };

  const handleConvert = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setExtractedText('');
    setOcrResult(null);
    setError('');
    setGrammarErrors(null);
    setFeedbackMessage('');

    try {
      const data = await Format.processOCR(selectedFile);
      
      // Apply enhanced formatting to extracted text
      const formattedText = Format.formatExtractedText(data.text);
      setExtractedText(formattedText);
      setOcrResult(data);
      setFeedbackMessage('Text extracted successfully!');
      setFeedbackType('success');
      
      // Clear success message after 3 seconds
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('OCR Error:', error);
      setError(error.message || 'Failed to extract text. Please try again.');
      setFeedbackMessage('Failed to extract text. Please try again.');
      setFeedbackType('error');
    } finally {
      setLoading(false);
    }
  };

  // Reset function
  const handleReset = () => {
    setSelectedFile(null);
    setExtractedText('');
    setOcrResult(null);
    setError('');
    setGrammarErrors(null);
    setShowGrammarModal(false);
    setFeedbackMessage('');
  };

  // Enhanced grammar check function with subtle feedback
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <Header title={'Image to Text Converter'} des={'An online image to text converter to extract text from images.'}/>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-20">
        
        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Upload and Convert Section - Combined for better UX */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Upload & Extract Text
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Select an image containing text and our AI will extract it for you with intelligent formatting
                </p>
              </div>

              {/* Upload Box */}
              <div className="mb-6 sm:mb-8">
                <UploadBox onFileSelect={handleFileSelect} />
              </div>
              
              {/* File Info Display */}
              <FileInfoDisplay selectedFile={selectedFile} />
              
              {/* Convert Button - Positioned right after upload */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <ConvertButton 
                  onClick={handleConvert} 
                  disabled={!selectedFile || loading}
                  loading={loading}
                />
                {/* Reset Button - shown after extraction or error */}
                {(extractedText || error) && (
                  <button
                    onClick={handleReset}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start Over
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <section className="mb-8 sm:mb-12">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-8 sm:py-12">
              <LoadingSpinner 
                message="Analyzing your image..." 
                subMessage="Our AI is extracting and formatting text from your image"
              />
            </div>
          </section>
        )}

        {/* Grammar Check Loading State */}
        {grammarLoading && (
          <section className="mb-8 sm:mb-12">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 py-8 sm:py-12">
              <LoadingSpinner 
                message="Checking grammar..." 
                subMessage="Analyzing your text for grammar and spelling errors"
              />
            </div>
          </section>
        )}

        {/* Results Section with Action Buttons */}
        {extractedText && (
          <section className="mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    Extracted Text
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Your text has been successfully extracted and formatted. Use the tools below to copy, download, or check grammar.
                  </p>
                </div>
                
                {/* Result Box with integrated action buttons */}
                <ResultBox 
                  text={extractedText} 
                  onGrammarCheck={handleGrammarCheck}
                  grammarLoading={grammarLoading}
                />
              </div>
            </div>
          </section>
        )}

        {/* Grammar Component */}
        <Grammar 
          grammarErrors={grammarErrors}
          showGrammarModal={showGrammarModal}
          setShowGrammarModal={setShowGrammarModal}
          extractedText={extractedText}
          setExtractedText={setExtractedText}
          setGrammarErrors={setGrammarErrors}
        />

        {/* Processing Stats Component */}
        <ProcessingStats ocrResult={ocrResult} extractedText={extractedText} />

        {/* Tips Section - Enhanced Design */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                💡 Tips for Best Results
              </h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Follow these guidelines to get the most accurate text extraction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Clear Image Quality</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Use high-resolution images with good lighting and minimal blur for optimal recognition</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Proper Orientation</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Ensure text is right-side up and not rotated for better accuracy</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Good Contrast</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Dark text on light background provides the best recognition results</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">Grammar Check</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Use our built-in grammar checker to automatically fix OCR mistakes</p>
                  </div>
                </div>
              </div>
            </div>
               <BlogSection />
          </div>


        </section>
                 
      </main>

    
    </div>
  );
};

export default Home;