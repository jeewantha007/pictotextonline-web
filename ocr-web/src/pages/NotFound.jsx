import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 text-center px-4">
    <Helmet>
      <title>404 Not Found | PictoTextOnline</title>
      <meta name="description" content="Sorry, the page you are looking for does not exist. Return to PictoTextOnline's homepage to use our free AI image to text converter." />
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
    <h1 className="text-6xl font-bold text-blue-700 mb-6">404</h1>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
    <p className="text-gray-600 mb-8 max-w-xl mx-auto">Sorry, the page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.</p>
    <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200">Go to Homepage</Link>
  </div>
);

export default NotFound; 