import React from 'react';
import { Eye, Zap, Shield, Globe } from 'lucide-react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <Eye size={24} />,
      title: "Advanced OCR",
      description: "Cutting-edge text recognition technology"
    },
    {
      icon: <Zap size={24} />,
      title: "Lightning Fast", 
      description: "Extract text in seconds, not minutes"
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy First",
      description: "No registration, no data storage"
    },
    {
      icon: <Globe size={24} />,
      title: "Multi-Language",
      description: "Support for English, Sinhala & more"
    }
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>About PictoTextOnline | Free AI Image to Text Converter</title>
        <meta name="description" content="Learn about PictoTextOnline, our mission, and our privacy-first AI OCR technology." />
        <meta name="keywords" content="about PictoTextOnline, image to text, AI OCR, privacy, technology, convert scanned PDF to text, extract text from receipts, OCR for business cards, digital document workflow, multi-language OCR, OCR for forms, OCR for invoices, OCR for handwriting, OCR for students, OCR for professionals" />
        <meta property="og:title" content="About PictoTextOnline | Free AI Image to Text Converter" />
        <meta property="og:description" content="Learn about PictoTextOnline, our mission, and our privacy-first AI OCR technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/about" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About PictoTextOnline | Free AI Image to Text Converter" />
        <meta name="twitter:description" content="Learn about PictoTextOnline, our mission, and our privacy-first AI OCR technology." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/about" />
      </Helmet>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Eye size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            About PictoTextOnline
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-xl">
              PicToTextOnline is a <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">free and powerful online tool</span> that transforms images into editable text using state-of-the-art Optical Character Recognition technology.
            </p>
            <p className="text-gray-700 leading-relaxed text-xl">
              Our mission is to democratize text extraction, making it <span className="italic font-semibold text-blue-600">accessible, accurate, and instant</span> for everyone, with special focus on multi-language support including English and Sinhala.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed text-lg font-medium">
                No registration, no hassle, no privacy concerns — just upload your image and extract text instantly.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/" className="text-blue-600 hover:underline font-semibold">Go to Home Page</Link>
              <span className="mx-2">|</span>
              <Link to="/contact" className="text-blue-600 hover:underline font-semibold">Contact Support</Link>
              <span className="mx-2">|</span>
              <Link to="/privacy-policy" className="text-blue-600 hover:underline font-semibold">Read Privacy Policy</Link>
              <span className="mx-2">|</span>
              <Link to="/terms-of-use" className="text-blue-600 hover:underline font-semibold">Terms of Use</Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Credit */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-blue-50 rounded-full px-8 py-4 border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 font-medium">
              Crafted with ❤️ by a solo developer passionate about creating 
              <span className="font-bold text-blue-600 ml-1">useful, fast, and privacy-friendly tools</span>
            </p>
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

export default About;
