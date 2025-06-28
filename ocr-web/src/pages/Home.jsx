import React, { useState, useRef, useEffect } from 'react';
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
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>AI Image to Text Converter | Free Online OCR - PictoTextOnline</title>
        <meta name="description" content="Convert images, scanned PDFs, and handwritten notes to editable text instantly with PictoTextOnline's free AI-powered OCR tool. Fast, accurate, and secure." />
        <meta name="keywords" content="image to text, free ocr, online ocr, handwriting to text, convert image to text, extract text from image, AI OCR, scanned document to text, screenshot to text, PictoTextOnline, convert scanned PDF to text, extract text from receipts, OCR for business cards, digital document workflow, multi-language OCR, extract text from forms, OCR for invoices, OCR for handwriting, OCR for students, OCR for professionals" />
        <meta property="og:title" content="AI Image to Text Converter | Free Online OCR for Handwriting & Photos - PictoTextOnline" />
        <meta property="og:description" content="Convert images, scanned PDFs, and handwritten notes to editable text instantly with PictoTextOnline's free AI-powered OCR tool. Fast, accurate, and secure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Image to Text Converter | Free Online OCR - PictoTextOnline" />
        <meta name="twitter:description" content="Convert images, scanned PDFs, and handwritten notes to editable text instantly with PictoTextOnline's free AI-powered OCR tool. Fast, accurate, and secure." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/" />
      </Helmet>
      {/* Header Section */}
      <Header title={'Image to Text Converter'} des={'An online image to text converter to extract text from images.'}/>

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-20">
        
        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Upload and Convert Section - Combined for better UX */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Upload Image & Extract Text
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
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section for SEO */}
        <section className="mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
                  The Ultimate Guide to Image-to-Text Conversion
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    What is OCR Technology?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Optical Character Recognition (OCR) is a revolutionary technology that converts images containing text into editable digital text. Our advanced AI-powered OCR system can accurately extract text from various sources including scanned documents, photographs, screenshots, and even handwritten notes. This technology has transformed how businesses and individuals handle document processing, making it faster, more efficient, and more accessible than ever before.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Why Choose PictoTextOnline for OCR?
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    PictoTextOnline stands out as the premier choice for image-to-text conversion due to our cutting-edge AI technology, exceptional accuracy rates, and user-friendly interface. Our platform processes documents in seconds, supports multiple languages, and maintains the highest standards of data security. Whether you're a student digitizing handwritten notes, a business professional processing invoices, or a researcher extracting data from printed materials, our tool provides the reliability and precision you need.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Key Features and Benefits
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li><strong>High Accuracy:</strong> Our AI achieves 99%+ accuracy even with complex fonts and handwriting</li>
                    <li><strong>Multi-language Support:</strong> Extract text from documents in over 100 languages</li>
                    <li><strong>Fast Processing:</strong> Get results in seconds, not minutes</li>
                    <li><strong>Privacy Focused:</strong> Your documents are processed securely and never stored</li>
                    <li><strong>No Registration Required:</strong> Start converting immediately without creating an account</li>
                    <li><strong>Multiple Format Support:</strong> Work with JPG, PNG, PDF, and more file types</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Common Use Cases and Applications
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Image-to-text conversion has become essential across various industries and personal use cases:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li><strong>Business & Finance:</strong> Digitize invoices, receipts, contracts, and financial documents for automated processing</li>
                    <li><strong>Education:</strong> Convert handwritten notes, textbooks, and research papers into searchable digital formats</li>
                    <li><strong>Healthcare:</strong> Extract patient information from medical forms and prescription labels</li>
                    <li><strong>Legal:</strong> Process legal documents, contracts, and case files for digital archiving</li>
                    <li><strong>Research:</strong> Extract data from printed research papers and historical documents</li>
                    <li><strong>Personal Use:</strong> Digitize family photos with text, handwritten letters, and personal documents</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    How Our Advanced OCR Technology Works
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our OCR system employs state-of-the-art machine learning algorithms that have been trained on millions of documents. The process begins with image preprocessing, where we enhance image quality and remove noise. Next, our AI analyzes the visual patterns to identify individual characters and words. The system then applies contextual understanding to improve accuracy, recognizing common phrases and correcting potential errors. Finally, the extracted text is formatted and presented in a clean, editable format that maintains the original document's structure.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Expert Tips for Best Results
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To achieve optimal results with our OCR tool, consider these expert recommendations:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Ensure good lighting and high image resolution (300 DPI or higher)</li>
                    <li>Position the camera or scanner perpendicular to the document surface</li>
                    <li>Avoid shadows, glare, and creases that could interfere with text recognition</li>
                    <li>For handwritten text, use clear, legible handwriting for better accuracy</li>
                    <li>Process documents in their original language for best results</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Security and Privacy Commitment
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    At PictoTextOnline, we prioritize the security and privacy of your documents. All file processing occurs in secure, encrypted environments, and we implement strict data protection measures. Your documents are automatically deleted from our servers after processing, ensuring that sensitive information never remains in our system. We comply with international data protection regulations and maintain the highest standards of cybersecurity to protect your valuable information.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    The Future of Document Processing
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    As technology continues to evolve, OCR capabilities are becoming increasingly sophisticated. Future developments include enhanced handwriting recognition, real-time translation capabilities, and integration with cloud storage platforms. PictoTextOnline remains at the forefront of these innovations, continuously improving our algorithms and expanding our feature set to meet the growing demands of our users.
                  </p>
                </div>
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
                    Text Extraction Results
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
          </div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who trust PictoTextOnline for their document conversion needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Incredibly fast and accurate! I use this daily for converting receipts and business cards. The multi-language support is a game-changer."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah M.</p>
                    <p className="text-sm text-gray-600">Business Owner</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Perfect for students! I scan handwritten notes and convert them to text for my research papers. Saves me hours of typing."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Michael R.</p>
                    <p className="text-sm text-gray-600">Graduate Student</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The privacy-first approach is what sold me. No registration, no data storage, just pure functionality. Exactly what I needed!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    L
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lisa K.</p>
                    <p className="text-sm text-gray-600">Freelance Writer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Statistics */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-600">
                Join our growing community of satisfied users
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <p className="text-gray-600">Images Processed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
                <p className="text-gray-600">Happy Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <p className="text-gray-600">Available</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;