import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import jsPDF from 'jspdf';

const ResultBox = ({ text, onGrammarCheck }) => {
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('txt');
  const [isGrammarChecking, setIsGrammarChecking] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback copy method
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Existing TXT download
  const downloadTXT = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    saveAs(blob, 'extracted-text.txt');
  };

  // Word (.docx) download
  const downloadWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(text)],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'extracted-text.docx');
    });
  };

  // PDF download
  const downloadPDF = () => {
    const doc = new jsPDF();
    const splitText = doc.splitTextToSize(text, 180);
    doc.text(splitText, 10, 10);
    doc.save('extracted-text.pdf');
  };

  const handleDownload = () => {
    if (!text) return;
    switch (downloadFormat) {
      case 'txt':
        downloadTXT();
        break;
      case 'pdf':
        downloadPDF();
        break;
      case 'docx':
        downloadWord();
        break;
      default:
        downloadTXT();
    }
  };

  const handleGrammarCheck = async () => {
    if (onGrammarCheck && text) {
      setIsGrammarChecking(true);
      try {
        await onGrammarCheck(text);
      } finally {
        setIsGrammarChecking(false);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Extracted Text
              </h3>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {text.length} characters
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 relative">
          <textarea
            readOnly
            value={text}
            rows={12}
            className="w-full p-4 border border-gray-300 rounded-xl resize-y bg-gradient-to-br from-gray-50 to-white text-gray-800 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Your extracted text will appear here..."
          />
          {text && (
            <div className="absolute top-7 right-7 bg-white bg-opacity-90 rounded-lg px-2 py-1 text-xs text-gray-500 shadow-sm">
              {text.split('\n').length} lines
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {text && (
          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              
              {/* Copy button - Reduced size */}
              <button
                onClick={handleCopy}
                className={`sm:w-auto px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 cursor-pointer ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-200 focus:ring-green-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 shadow-sm hover:shadow-md'
                }`}
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-1 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-1 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy
                  </>
                )}
              </button>

              {/* Grammar Check with loader */}
              <button
                onClick={handleGrammarCheck}
                className="flex-1 sm:flex-initial flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm sm:text-base bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                disabled={!onGrammarCheck || isGrammarChecking}
                title={
                  !onGrammarCheck
                    ? 'Grammar check function not available'
                    : 'Check grammar and spelling'
                }
              >
                {isGrammarChecking ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="hidden sm:inline">Checking...</span>
                    <span className="sm:hidden">Checking</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Check Grammar</span>
                    <span className="sm:hidden">Grammar</span>
                  </>
                )}
              </button>

              {/* Enhanced Download Section */}
              <div className="flex-1 sm:flex-initial flex flex-col sm:flex-row gap-2">
                {/* Styled Dropdown */}
                <div className="relative">
                  <select
                    value={downloadFormat}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="appearance-none w-full sm:w-auto px-4 py-3 pr-10 rounded-lg border-2 border-gray-300 bg-white text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 cursor-pointer shadow-sm hover:shadow-md"
                    aria-label="Select download format"
                  >
                    <option value="txt">TXT Format</option>
                    <option value="pdf">PDF Format</option>
                    <option value="docx">Word Format</option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm hover:shadow-md cursor-pointer font-medium text-sm sm:text-base"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultBox;