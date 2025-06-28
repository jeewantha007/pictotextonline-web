import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-center px-4">
    <Helmet>
      <title>404 Not Found | PictoTextOnline</title>
      <meta name="description" content="Sorry, the page you are looking for does not exist. Return to PictoTextOnline's homepage to use our free AI image to text converter." />
      <meta name="robots" content="noindex, nofollow" />
      <meta property="og:title" content="404 Not Found | PictoTextOnline" />
      <meta property="og:description" content="Sorry, the page you are looking for does not exist. Return to PictoTextOnline's homepage to use our free AI image to text converter." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pictotextonline.com/404" />
      <meta property="og:image" content="https://pictotextonline.com/preview.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="404 Not Found | PictoTextOnline" />
      <meta name="twitter:description" content="Sorry, the page you are looking for does not exist. Return to PictoTextOnline's homepage to use our free AI image to text converter." />
      <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
      <link rel="canonical" href="https://pictotextonline.com/404" />
    </Helmet>
    
    <div className="max-w-2xl mx-auto">
      <h1 className="text-6xl font-bold text-blue-700 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">Sorry, the page you are looking for does not exist or has been moved. Please check the URL or use one of the links below.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200">
          Go to Homepage
        </Link>
        <Link to="/contact" className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200">
          Contact Support
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Pages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/grammar-checker" className="text-blue-600 hover:text-blue-700 hover:underline">Grammar Checker</Link>
          <Link to="/words-counter" className="text-blue-600 hover:text-blue-700 hover:underline">Words Counter</Link>
          <Link to="/about" className="text-blue-600 hover:text-blue-700 hover:underline">About Us</Link>
          <Link to="/blog/how-to-extract-text-from-image" className="text-blue-600 hover:text-blue-700 hover:underline">How to Extract Text</Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound; 