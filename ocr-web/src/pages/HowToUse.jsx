import React from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Lightbulb, Clock, Shield } from 'lucide-react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';

const HowToUse = () => {
  const steps = [
    {
      step: 1,
      title: "Upload Your Image",
      description: "Click the upload area or drag and drop your image file. We support JPG, PNG, PDF, and other common formats.",
      icon: <Upload size={24} />,
      tips: [
        "Use high-resolution images (300+ DPI) for best results",
        "Ensure good lighting and contrast",
        "Avoid shadows or reflections on the text"
      ]
    },
    {
      step: 2,
      title: "Wait for Processing",
      description: "Our AI-powered OCR technology will analyze your image and extract the text. This usually takes just a few seconds.",
      icon: <Clock size={24} />,
      tips: [
        "Processing time depends on image size and complexity",
        "Larger files may take slightly longer",
        "You can process multiple images one after another"
      ]
    },
    {
      step: 3,
      title: "Review & Edit",
      description: "Check the extracted text for accuracy. You can edit any mistakes directly in the result box before copying.",
      icon: <FileText size={24} />,
      tips: [
        "Review the text carefully, especially numbers and special characters",
        "Make any necessary corrections before copying",
        "The text is fully editable in the result area"
      ]
    },
    {
      step: 4,
      title: "Copy or Download",
      description: "Copy the text to your clipboard or download it as a text file for your convenience.",
      icon: <Download size={24} />,
      tips: [
        "Use the copy button for quick copying",
        "Download as .txt file for offline use",
        "The text is ready to paste into any application"
      ]
    }
  ];

  const bestPractices = [
    {
      icon: <CheckCircle size={20} />,
      title: "Image Quality",
      description: "Use clear, high-resolution images with good contrast. Avoid blurry or low-quality scans."
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Text Clarity",
      description: "Ensure text is clearly readable and not obscured by shadows, reflections, or background elements."
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Font Type",
      description: "Standard fonts work best. Avoid decorative or handwritten fonts when possible for maximum accuracy."
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Orientation",
      description: "Make sure text is horizontal and properly aligned. Rotate images if necessary before uploading."
    },
    {
      icon: <CheckCircle size={20} />,
      title: "File Size",
      description: "Keep file sizes reasonable (under 10MB) for faster processing. Compress large images if needed."
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Language Support",
      description: "Our tool supports multiple languages including English and Sinhala. The language is automatically detected."
    }
  ];

  const commonIssues = [
    {
      icon: <AlertCircle size={20} />,
      title: "Low Accuracy",
      description: "Try improving image quality, using better lighting, or ensuring text is clearly visible and properly oriented.",
      solution: "Use higher resolution images and ensure good contrast between text and background."
    },
    {
      icon: <AlertCircle size={20} />,
      title: "File Not Uploading",
      description: "Check that your file is in a supported format (JPG, PNG, PDF, etc.) and not corrupted.",
      solution: "Try converting your file to a different format or use a different browser."
    },
    {
      icon: <AlertCircle size={20} />,
      title: "Processing Errors",
      description: "This might be due to network issues or browser compatibility problems.",
      solution: "Refresh the page, check your internet connection, or try using a different browser."
    },
    {
      icon: <AlertCircle size={20} />,
      title: "Text Not Recognized",
      description: "Very small text, unusual fonts, or poor image quality can cause recognition issues.",
      solution: "Zoom in on the text area, use clearer images, or try standard fonts when possible."
    }
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>How to Use PictoTextOnline - Step by Step Guide</title>
        <meta name="description" content="Learn how to use PictoTextOnline OCR tool effectively. Step-by-step guide with tips for best results and troubleshooting common issues." />
        <meta name="keywords" content="how to use OCR, image to text guide, OCR tutorial, PictoTextOnline guide, OCR best practices, OCR tips, image to text steps, OCR troubleshooting" />
        <meta property="og:title" content="How to Use PictoTextOnline - Step by Step Guide" />
        <meta property="og:description" content="Learn how to use PictoTextOnline OCR tool effectively. Step-by-step guide with tips for best results and troubleshooting common issues." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/how-to-use" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How to Use PictoTextOnline - Step by Step Guide" />
        <meta name="twitter:description" content="Learn how to use PictoTextOnline OCR tool effectively. Step-by-step guide with tips for best results and troubleshooting common issues." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/how-to-use" />
      </Helmet>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Lightbulb size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent mb-4">
            How to Use PictoTextOnline
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Follow this simple guide to get the best results from our OCR tool. Learn tips and tricks for maximum accuracy.
          </p>
          
          <div className="mt-8">
            <Link to="/" className="text-blue-600 hover:underline font-semibold">Try OCR Tool</Link>
            <span className="mx-2">|</span>
            <Link to="/about" className="text-blue-600 hover:underline font-semibold">About PictoTextOnline</Link>
            <span className="mx-2">|</span>
            <Link to="/faq" className="text-blue-600 hover:underline font-semibold">FAQ</Link>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Step-by-Step Process</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-start gap-8 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="bg-white rounded-xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <Lightbulb size={16} className="mr-2" />
                      Pro Tips:
                    </h4>
                    <ul className="space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-gray-700 text-sm flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Best Practices for Optimal Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white">
                    {practice.icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{practice.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Issues & Solutions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Issues & Solutions</h2>
          <div className="space-y-6">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {issue.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{issue.title}</h3>
                    <p className="text-gray-700 mb-3">{issue.description}</p>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-1">Solution:</h4>
                      <p className="text-gray-700 text-sm">{issue.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security Note */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="text-white">
                <Shield size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy & Security</h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is our priority. All image processing happens locally in your browser - we never store your uploaded images or extracted text on our servers. Your documents remain completely private and secure.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Try It Out?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Now that you know how to use PictoTextOnline effectively, give it a try! Upload your first image and experience the power of our OCR technology.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Upload size={20} className="mr-2" />
              Start Converting Images to Text
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

export default HowToUse; 