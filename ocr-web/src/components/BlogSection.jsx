import React from 'react';
import BlogCard from './BlogCard';
import { ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const posts = [
    {
      title: "How to Extract Text from Images for Free Online in 2025",
      description: "Step-by-step guide to converting images into editable text using the latest free AI-powered OCR tools. Perfect for students, professionals, and everyday users.",
      url: "/blog/how-to-extract-text-from-image",
      readTime: "8 min read",
      date: "Jan 2025"
    },
    {
      title: "Boost Your Productivity with AI-Powered OCR Tools in 2025",
      description: "Explore the top AI-based OCR tools designed to save time and increase efficiency by quickly extracting text from images and scanned documents.",
      url: "/blog/boost-productivity-using-ai",
      readTime: "6 min read",
      date: "Jan 2025"
    },
    {
      title: "Top 5 Reasons to Use Online OCR Tools for Business Success",
      description: "Discover how online OCR tools can streamline your business operations, improve document management, and enhance data accuracy in 2025.",
      url: "/blog/top-5-reasons-to-use-online-ocr-tools-for-your-business",
      readTime: "7 min read",
      date: "March 2025"
    },
    {
      title: "How OCR Tools Are Transforming Document Management in 2025",
      description: "Learn about the impact of online OCR technology on modern document workflows and how it's transforming data accessibility and efficiency.",
      url: "/blog/how-online-ocr-tools-are-revolutionizing-document-management-2025",
      readTime: "10 min read",
      date: "Feb 2025"
    }
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Latest Updates
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Articles
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest insights, tips, and trends in OCR technology and document management
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="animate-fade-in"
              style={{
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <BlogCard 
                title={post.title} 
                description={post.description} 
                url={post.url}
                readTime={post.readTime}
                date={post.date}
              />
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center">
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center gap-2">
              Load More Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
