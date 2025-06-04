import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import ScrollToTop from "./components/ScrollToTop";
import BlogPostImageToText from "./pages/BlogPostImageToText";
import BlogPostBoostProductivityOCR from "./pages/BlogPostBoostProductivityOCR";
import BlogPostTop5ReasonsOnlineOCR from "./pages/BlogPostTop5ReasonsOnlineOCR";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop/>
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-Of-use" element={<TermsOfUse />} />
             <Route path="/blog/how-to-extract-text-from-image" element={<BlogPostImageToText />} />
             <Route path="/blog/Boost-Productivity-Using-AI" element={<BlogPostBoostProductivityOCR />} />
              <Route path="/blog/top-5-reasons-to-use-online-ocr-tools-for-your-business" element={<BlogPostTop5ReasonsOnlineOCR />} />
               <Route path="/blog/how-online-ocr-tools-are-revolutionizing-document-management-2025" element={<BlogPostTop5ReasonsOnlineOCR />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
