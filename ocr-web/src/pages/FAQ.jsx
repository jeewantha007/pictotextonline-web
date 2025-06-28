import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, FileText, Shield, Zap, Globe } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: "General Questions",
      icon: <HelpCircle size={20} />,
      questions: [
        {
          question: "What is PictoTextOnline?",
          answer: "PictoTextOnline is a free, privacy-focused online tool that converts images containing text into editable text using advanced Optical Character Recognition (OCR) technology. It supports multiple languages including English and Sinhala, and works with various image formats like JPG, PNG, and PDF files."
        },
        {
          question: "Is PictoTextOnline really free to use?",
          answer: "Yes, PictoTextOnline is completely free to use with no hidden costs, registration requirements, or usage limits. We believe in making powerful OCR technology accessible to everyone."
        },
        {
          question: "What file formats are supported?",
          answer: "We support most common image formats including JPG, JPEG, PNG, BMP, TIFF, and PDF files. The tool can handle both single-page and multi-page documents."
        },
        {
          question: "How accurate is the text extraction?",
          answer: "Our OCR technology achieves up to 99% accuracy for clear, well-formatted text. Accuracy may vary depending on image quality, font clarity, and text formatting. For best results, use high-resolution images with clear, readable text."
        }
      ]
    },
    {
      category: "Privacy & Security",
      icon: <Shield size={20} />,
      questions: [
        {
          question: "Is my data safe and private?",
          answer: "Absolutely! We take privacy seriously. Your uploaded images are processed locally in your browser and are never stored on our servers. We don't require registration, collect personal information, or track your usage patterns."
        },
        {
          question: "Do you store my uploaded images?",
          answer: "No, we do not store any of your uploaded images or extracted text. All processing happens locally in your browser, and files are automatically deleted from memory once processing is complete."
        },
        {
          question: "Can I use this for sensitive documents?",
          answer: "Yes, you can safely use PictoTextOnline for sensitive documents since we don't store or transmit your files. However, we always recommend following your organization's security policies for document handling."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: <Zap size={20} />,
      questions: [
        {
          question: "Why is my text extraction not accurate?",
          answer: "Text extraction accuracy depends on several factors: image quality (higher resolution is better), text clarity (avoid blurry or low-contrast images), font type (standard fonts work best), and image orientation (text should be horizontal). Try improving image quality or using clearer images for better results."
        },
        {
          question: "The tool is not working. What should I do?",
          answer: "First, check your internet connection and try refreshing the page. Ensure your image file is supported (JPG, PNG, PDF, etc.) and not corrupted. If problems persist, try using a different browser or clearing your browser cache. Contact us if issues continue."
        },
        {
          question: "How can I improve OCR accuracy?",
          answer: "For best results: use high-resolution images (300+ DPI), ensure good lighting and contrast, avoid shadows or reflections, use standard fonts when possible, and make sure text is horizontal and clearly readable. Clean, well-formatted documents typically yield the best results."
        }
      ]
    },
    {
      category: "Features & Languages",
      icon: <Globe size={20} />,
      questions: [
        {
          question: "What languages are supported?",
          answer: "PictoTextOnline supports multiple languages including English, Sinhala, and many others. The tool automatically detects the language in your image and extracts text accordingly. We're continuously adding support for more languages."
        },
        {
          question: "Can I extract text from handwritten documents?",
          answer: "While our tool works best with printed text, it can also recognize clear, well-written handwriting. However, accuracy may be lower compared to printed text. For handwritten documents, ensure the writing is clear, consistent, and well-spaced."
        },
        {
          question: "Can I process multiple pages at once?",
          answer: "Yes! You can upload multi-page PDF documents and the tool will extract text from all pages. For image files, you can upload multiple images simultaneously and process them one by one."
        }
      ]
    },
    {
      category: "Usage & Applications",
      icon: <FileText size={20} />,
      questions: [
        {
          question: "What are common use cases for this tool?",
          answer: "Common uses include: digitizing printed documents, extracting text from receipts for expense tracking, converting business cards to contact lists, processing forms and surveys, digitizing handwritten notes, and making scanned books searchable."
        },
        {
          question: "Can I use this for business purposes?",
          answer: "Yes, PictoTextOnline is suitable for both personal and business use. Many businesses use our tool for document digitization, data entry automation, and improving workflow efficiency. There are no usage restrictions for commercial purposes."
        },
        {
          question: "How do I download or copy the extracted text?",
          answer: "After processing, you can copy the extracted text directly from the result box, or download it as a text file. The tool also allows you to edit the text before copying or downloading if needed."
        }
      ]
    }
  ];

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>FAQ - Frequently Asked Questions | PictoTextOnline</title>
        <meta name="description" content="Find answers to common questions about PictoTextOnline OCR tool. Learn about privacy, accuracy, supported formats, and how to use our image to text converter." />
        <meta name="keywords" content="FAQ, frequently asked questions, OCR help, image to text questions, PictoTextOnline support, OCR accuracy, privacy, supported formats, OCR troubleshooting" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | PictoTextOnline" />
        <meta property="og:description" content="Find answers to common questions about PictoTextOnline OCR tool. Learn about privacy, accuracy, supported formats, and how to use our image to text converter." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/faq" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Frequently Asked Questions | PictoTextOnline" />
        <meta name="twitter:description" content="Find answers to common questions about PictoTextOnline OCR tool. Learn about privacy, accuracy, supported formats, and how to use our image to text converter." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/faq" />
      </Helmet>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <HelpCircle size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions about PictoTextOnline. Can't find what you're looking for? 
            <Link to="/contact" className="text-blue-600 hover:underline font-semibold ml-1">Contact us</Link> for personalized support.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          <div className="mt-8">
            <Link to="/" className="text-blue-600 hover:underline font-semibold">Go to Home Page</Link>
            <span className="mx-2">|</span>
            <Link to="/about" className="text-blue-600 hover:underline font-semibold">About PictoTextOnline</Link>
            <span className="mx-2">|</span>
            <Link to="/contact" className="text-blue-600 hover:underline font-semibold">Contact Support</Link>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.has(globalIndex);
                  
                  return (
                    <div key={questionIndex} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp size={20} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Our support team is here to help! Get in touch with us for personalized assistance and quick responses.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <HelpCircle size={18} className="mr-2" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default FAQ; 