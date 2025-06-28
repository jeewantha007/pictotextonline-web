import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Helmet } from "react-helmet-async";

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');

  // Calculate statistics whenever text changes
  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText) => {
    if (!inputText.trim()) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
      });
      return;
    }

    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Count words (split by whitespace and filter out empty strings)
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences (split by sentence endings)
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Count paragraphs (split by double line breaks or single line breaks)
    const paragraphs = inputText.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    setText('');
    setFeedbackMessage('Text cleared successfully!');
    setFeedbackType('success');
    setTimeout(() => setFeedbackMessage(''), 3000);
  };

  const handleCopy = async () => {
    if (!text.trim()) {
      setFeedbackMessage('No text to copy.');
      setFeedbackType('info');
      setTimeout(() => setFeedbackMessage(''), 3000);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setFeedbackMessage('Text copied to clipboard!');
      setFeedbackType('success');
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      setFeedbackMessage('Failed to copy text.');
      setFeedbackType('error');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText);
        setFeedbackMessage('Text pasted from clipboard!');
        setFeedbackType('success');
        setTimeout(() => setFeedbackMessage(''), 3000);
      }
    } catch (error) {
      setFeedbackMessage('Failed to paste text.');
      setFeedbackType('error');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  // Feedback message component
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

  // Statistics display component
  const StatCard = ({ icon, label, value, description }) => (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-105">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">{icon}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg">{label}</h3>
        </div>
        <span className="text-3xl font-bold text-indigo-600">{value}</span>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Word Counter | Free Text Analysis Tool - PictoTextOnline</title>
        <meta name="description" content="Use PictoTextOnline's free word counter to analyze your text for word count, character count, sentences, and more. No signup required." />
        <meta name="keywords" content="word counter, text analysis, free online tool, character count, sentence count, PictoTextOnline, text statistics, reading time calculator, writing tool, student writing tool, professional writing tool, essay checker, content analysis, document analysis" />
        <meta property="og:title" content="Word Counter | Free Online Text Analysis Tool - PictoTextOnline" />
        <meta property="og:description" content="Use PictoTextOnline's free word counter to analyze your text for word count, character count, sentences, and more. No signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/words-counter" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Word Counter | Free Online Text Analysis Tool - PictoTextOnline" />
        <meta name="twitter:description" content="Use PictoTextOnline's free word counter to analyze your text for word count, character count, sentences, and more. No signup required." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/words-counter" />
      </Helmet>
      {/* Header Section */}
      <Header title={'Word & Character Counter'} des={'A simple tool to count words, characters, sentences, and paragraphs in your text.'}/>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12 lg:pb-20">
        
        {/* Feedback Message */}
        <FeedbackMessage />

        {/* Text Input Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Paste or type your text below to get instant word count, character count, and reading time statistics
                </p>
              </div>

              {/* Text Area */}
              <div className="mb-6">
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Type or paste your text here..."
                  className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 resize-none font-mono text-sm leading-relaxed min-h-[256px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handlePaste}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Paste
                </button>
                
                <button
                  onClick={handleCopy}
                  disabled={!text.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
                
                <button
                  onClick={handleClear}
                  disabled={!text.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base min-w-[120px] flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Text Statistics
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Detailed analysis of your text content
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                  icon="📝"
                  label="Characters"
                  value={stats.characters.toLocaleString()}
                  description="Total number of characters including spaces"
                />
                
                <StatCard 
                  icon="🔤"
                  label="Characters (No Spaces)"
                  value={stats.charactersNoSpaces.toLocaleString()}
                  description="Total characters excluding spaces and punctuation"
                />
                
                <StatCard 
                  icon="📖"
                  label="Words"
                  value={stats.words.toLocaleString()}
                  description="Total number of words in your text"
                />
                
                <StatCard 
                  icon="💬"
                  label="Sentences"
                  value={stats.sentences.toLocaleString()}
                  description="Number of sentences based on punctuation"
                />
                
                <StatCard 
                  icon="📄"
                  label="Paragraphs"
                  value={stats.paragraphs.toLocaleString()}
                  description="Number of paragraphs separated by line breaks"
                />
                
                <StatCard 
                  icon="⏱️"
                  label="Reading Time"
                  value={`${stats.readingTime} min`}
                  description="Estimated reading time at 200 words per minute"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-blue-100 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                💡 Usage Tips
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Get the most out of your word counting experience with these helpful tips and best practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Real-time Counting</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Statistics update automatically as you type or paste content. Watch your word count, character count, and reading time change in real-time as you write or edit your text.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Multiple Formats</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Works with any text format - articles, essays, emails, or social media posts. Perfect for students checking essay lengths, writers tracking content, and professionals analyzing documents.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Privacy Focused</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">All counting happens in your browser - no data is sent to servers. Your text remains completely private and secure while you analyze it.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Reading Time</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Estimate how long it takes to read your content based on average reading speed. Useful for presentations, articles, and content planning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                🚀 Advanced Text Analysis Features
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Our word counter provides comprehensive text analysis with multiple metrics and insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Character Analysis</h3>
                <p className="text-gray-600 text-sm">Get detailed character counts including spaces and excluding spaces for precise text analysis and formatting requirements.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Word & Sentence Count</h3>
                <p className="text-gray-600 text-sm">Accurate word counting with intelligent sentence detection based on punctuation patterns for comprehensive text analysis.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reading Time</h3>
                <p className="text-gray-600 text-sm">Calculate estimated reading time based on average reading speed to help with content planning and audience engagement.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WordCounter;