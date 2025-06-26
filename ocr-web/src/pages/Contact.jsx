import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, User, AtSign, Heart } from 'lucide-react';
import emailjs from 'emailjs-com';
import { Helmet } from "react-helmet";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.send(
        'service_xxieh2c',       // your service ID
        'template_52lvo5o',      // your template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'y4FZjS8nzsFFcjJRV'     // your public key (user ID)
      );
      console.log('Email sent successfully:', result.text);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); // clear form
    } catch (error) {
      console.error('Email send error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      description: "Get in touch for support or feedback",
      detail: "pictotext.online@gmail.com "
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Quick Response",
      description: "We typically respond within 24 hours",
      detail: "Fast & Friendly Support"
    },
    {
      icon: <Heart size={24} />,
      title: "Community Driven",
      description: "Your feedback helps us improve",
      detail: "Built for Users, by Users"
    }
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-6 py-20 overflow-hidden">
      <Helmet>
        <title>Contact Us | PictoTextOnline</title>
        <meta name="description" content="Contact PictoTextOnline for support, feedback, partnership inquiries, or help with converting images, scanned PDFs, and handwritten notes to text. Fast, friendly, and privacy-focused support for all your OCR needs." />
        <meta name="keywords" content="contact, support, PictoTextOnline, feedback, help, OCR support, convert scanned PDF to text, extract text from receipts, OCR for business cards, digital document workflow, multi-language OCR, OCR for forms, OCR for invoices, OCR for handwriting, OCR for students, OCR for professionals" />
        <meta property="og:title" content="Contact Us | PictoTextOnline" />
        <meta property="og:description" content="Contact PictoTextOnline for support, feedback, or partnership inquiries. Fast, friendly, and privacy-focused support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pictotextonline.com/contact" />
        <meta property="og:image" content="https://pictotextonline.com/preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | PictoTextOnline" />
        <meta name="twitter:description" content="Contact PictoTextOnline for support, feedback, or partnership inquiries. Fast, friendly, and privacy-focused support." />
        <meta name="twitter:image" content="https://pictotextonline.com/preview.png" />
        <link rel="canonical" href="https://pictotextonline.com/contact" />
      </Helmet>
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      
      <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <MessageCircle size={36} className="text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or need support? We'd love to hear from you. 
            <span className="font-semibold text-cyan-600"> Your feedback drives our innovation</span>.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-cyan-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  {info.icon}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                {info.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{info.description}</p>
              <p className="text-cyan-600 font-semibold text-sm">{info.detail}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact Form or Success Message */}
          <div>
            {submitted ? (
              <div className="bg-gradient-to-r from-green-50 to-cyan-50 rounded-2xl p-8 shadow-lg border border-green-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Thank you for reaching out! We've received your message and will get back to you within 24 hours. 
                    We appreciate you taking the time to contact us.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} className="mr-2 text-cyan-600" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <AtSign size={16} className="mr-2 text-cyan-600" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <MessageCircle size={16} className="mr-2 text-cyan-600" />
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-4 py-4 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us how we can help you, share feedback, or ask any questions..."
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:scale-105'
                  } text-white`}

                  style={{cursor:'pointer'}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" ></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right side - Additional Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Report bugs or technical issues</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Suggest new features or improvements</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Get help with OCR or grammar checking</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Business inquiries and partnerships</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Share feedback about your experience</p>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a <span className="font-semibold text-cyan-600">community-driven project</span>, we value every piece of feedback. 
                Your input directly influences our development priorities and helps us create better tools for everyone.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                <span>24-hour response time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-cyan-50 rounded-full px-8 py-4 border border-gray-200 shadow-sm">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-gray-700 font-medium">
              Every message matters to us — 
              <span className="font-bold text-cyan-600 ml-1">let's build something amazing together</span>
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

export default Contact;