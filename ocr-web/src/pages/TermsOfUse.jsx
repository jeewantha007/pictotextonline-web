import React from 'react';
import { FileText, Users, Shield, AlertCircle, Scale, Crown, Gavel, Clock } from 'lucide-react';
import { Helmet } from "react-helmet";
import Breadcrumbs from '../components/Breadcrumbs';

const TermsOfUse = () => {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <FileText size={20} />,
      content: "By accessing and using PicToTextOnline, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of our service immediately."
    },
    {
      id: "service-description",
      title: "2. Service Description",
      icon: <Users size={20} />,
      content: "PicToTextOnline provides free online optical character recognition (OCR) services, allowing users to extract text from images, perform grammar checks, and download processed results. Our service is designed to be accessible, fast, and privacy-focused."
    },
    {
      id: "usage-limits",
      title: "3. Free Usage Limits",
      icon: <Crown size={20} />,
      content: "To ensure fair access for all users, free accounts are subject to daily usage limits for OCR operations and grammar checking services per IP address. These limits help us maintain service quality while keeping the tool free for everyone."
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities",
      icon: <Shield size={20} />,
      content: [
        "Upload only content you own or have permission to process",
        "Do not submit illegal, harmful, offensive, or copyrighted material",
        "Refrain from attempting to circumvent usage limits or automate requests",
        "Use the service in good faith and respect other users' access",
        "Report any technical issues or suspicious activity promptly"
      ]
    },
    {
      id: "no-warranties",
      title: "5. Service Availability & Warranties",
      icon: <AlertCircle size={20} />,
      content: "PicToTextOnline is provided 'as is' without warranties of any kind. While we strive for high accuracy and uptime, we cannot guarantee perfect OCR results, continuous availability, or error-free operation. Users should verify critical text extractions."
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      icon: <Scale size={20} />,
      content: "We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use our service. This includes but is not limited to data loss, business interruption, or inaccurate text recognition."
    },
    {
      id: "intellectual-property",
      title: "7. Intellectual Property Rights",
      icon: <Gavel size={20} />,
      content: "All branding, logos, design elements, and proprietary technology of PicToTextOnline remain our exclusive property. Users may not copy, modify, distribute, or commercialize any part of our service without explicit written permission."
    },
    {
      id: "modifications",
      title: "8. Terms Modifications",
      icon: <Clock size={20} />,
      content: "We reserve the right to modify these Terms of Use at any time to reflect changes in our service, legal requirements, or business practices. Continued use of the service after modifications constitutes acceptance of the updated terms."
    }
  ];

  return (
    <section className="relative max-w-5xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>Terms of Use | PictoTextOnline</title>
        <meta name="description" content="Read the terms of use for PictoTextOnline. Understand your rights and responsibilities when using our free AI image to text converter for scanned PDFs, receipts, business cards, and handwritten notes." />
        <meta name="keywords" content="terms of use, PictoTextOnline, user agreement, legal, AI OCR, convert scanned PDF to text, extract text from receipts, OCR for business cards, digital document workflow, multi-language OCR, OCR for forms, OCR for invoices, OCR for handwriting, OCR for students, OCR for professionals" />
        <meta property="og:title" content="Terms of Use | PictoTextOnline" />
        <meta property="og:description" content="Read the terms of use for PictoTextOnline. Understand your rights and responsibilities when using our free AI image to text converter." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/terms-of-use" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Use | PictoTextOnline" />
        <meta name="twitter:description" content="Read the terms of use for PictoTextOnline. Understand your rights and responsibilities when using our free AI image to text converter." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/terms-of-use" />
      </Helmet>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Terms of Use', path: '/terms-Of-use' }]} />
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-red-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
            <Scale size={36} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent mb-4">
            Terms of Use
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full mb-4"></div>
          <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-full px-6 py-2 border border-orange-200 shadow-sm">
            <Clock size={16} className="text-orange-600 mr-2" />
            <p className="text-gray-700 font-medium">Effective Date: May 26, 2025</p>
          </div>
        </div>

        {/* Fair Use Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fair Use & Community Guidelines</h3>
              <p className="text-gray-700 leading-relaxed">
                These terms ensure <span className="font-bold text-orange-600">fair access for everyone</span> while protecting our service and community. By using PicToTextOnline, you're joining a community that values respect, integrity, and responsible usage.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {section.title}
                </h2>
              </div>
              
              <div className="ml-14">
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-2 flex-shrink-0"></div>
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

        {/* Agreement Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Gavel size={18} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Legal Agreement</h3>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              By continuing to use PicToTextOnline, you acknowledge that you have read, understood, and agree to these Terms of Use. 
              <span className="font-bold text-orange-600 ml-1">Your use of our service constitutes acceptance of these terms.</span>
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-orange-50 rounded-full px-8 py-4 border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 font-medium">
              Questions about these terms? 
              <span className="font-bold text-orange-600 ml-1">We believe in transparency and open communication</span>
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

export default TermsOfUse;
