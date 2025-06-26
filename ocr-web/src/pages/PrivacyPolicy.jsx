import React from 'react';
import { Shield, Eye, Lock, Globe, FileText, Clock } from 'lucide-react';
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: <FileText size={20} />,
    content: "Welcome to PicToTextOnline. We are committed to protecting your privacy and ensuring transparency about how we handle your data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our web application."
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    icon: <Eye size={20} />,
    content: [
      "Uploaded Images & Text: Images you upload are processed using AWS Textract for OCR functionality. These files are not stored permanently on our servers.",
      "Grammar Checks: Text submitted for grammar checking is sent to LanguageTool API for processing.",
      "IP Address: We temporarily track IP addresses to enforce usage limits and prevent abuse.",
      "No Personal Data: We do not require account creation or store personal information."
    ]
  },
  {
    id: "data-usage",
    title: "3. How We Use Information",
    icon: <Shield size={20} />,
    content: "We use the collected data solely to operate and improve our service, monitor usage patterns, prevent abuse, and ensure optimal performance for all users."
  },
  {
    id: "cookies",
    title: "4. Cookies & Analytics",
    icon: <Globe size={20} />,
    content: "We may use third-party cookies (such as Google AdSense) for ad personalization and analytics. These help us understand usage patterns and improve our service while keeping it free for everyone."
  },
  {
    id: "third-party",
    title: "5. Third-Party Services",
    icon: <Lock size={20} />,
    content: "We integrate with trusted services including AWS Textract for OCR processing, LanguageTool for grammar checking, and Google AdSense for advertising. Each service follows its own privacy practices and security standards."
  },
  {
    id: "user-rights",
    title: "6. Your Rights & Control",
    icon: <Shield size={20} />,
    content: "You maintain full control over your data. You may stop using the service at any time, and no permanent records of your uploads are maintained. For questions or concerns, contact us at pictotext.online@gmail.com ."
  },
  {
    id: "updates",
    title: "7. Policy Updates",
    icon: <Clock size={20} />,
    content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Continued use of the service constitutes agreement to any updates."
  }
];


  return (
    <section className="relative max-w-5xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>Privacy Policy | PictoTextOnline</title>
        <meta name="description" content="Read PictoTextOnline's privacy policy. Learn how we protect your data and ensure your privacy when using our free AI image to text converter for scanned PDFs, receipts, business cards, and handwritten notes." />
        <meta name="keywords" content="privacy policy, data protection, PictoTextOnline, user privacy, AI OCR, convert scanned PDF to text, extract text from receipts, OCR for business cards, digital document workflow, multi-language OCR, OCR for forms, OCR for invoices, OCR for handwriting, OCR for students, OCR for professionals" />
        <meta property="og:title" content="Privacy Policy | PictoTextOnline" />
        <meta property="og:description" content="Read PictoTextOnline's privacy policy. Learn how we protect your data and ensure your privacy when using our free AI image to text converter." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/privacy-policy" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | PictoTextOnline" />
        <meta name="twitter:description" content="Read PictoTextOnline's privacy policy. Learn how we protect your data and ensure your privacy when using our free AI image to text converter." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/privacy-policy" />
      </Helmet>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Shield size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full mb-4"></div>
          <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-blue-50 rounded-full px-6 py-2 border border-green-200 shadow-sm">
            <Clock size={16} className="text-green-600 mr-2" />
            <p className="text-gray-700 font-medium">Effective Date: May 26, 2025</p>
          </div>
        </div>

        {/* Privacy Commitment Banner */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Privacy Commitment</h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in <span className="font-bold text-green-600">privacy by design</span>. Your data is processed securely, never stored permanently, and you maintain complete control over your information at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {section.title}
                </h2>
              </div>
              
              <div className="ml-14">
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-green-50 rounded-full px-8 py-4 border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 font-medium">
              Questions about your privacy? 
              <span className="font-bold text-green-600 ml-1">We're here to help and always transparent</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default PrivacyPolicy;