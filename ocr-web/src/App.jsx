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
import BlogPostOCRRevolution2025 from "./pages/BlogPostOCRRevolution2025";
import GrammarChecker from "./pages/GrammarChecker";
import WordCounter from "./pages/WordCounter";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop/>
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/words-counter" element={<WordCounter />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/blog/how-to-extract-text-from-image" element={<BlogPostImageToText />} />
          <Route path="/blog/boost-productivity-using-ai" element={<BlogPostBoostProductivityOCR />} />
          <Route path="/blog/top-5-reasons-to-use-online-ocr-tools-for-your-business" element={<BlogPostTop5ReasonsOnlineOCR />} />
          <Route path="/blog/how-online-ocr-tools-are-revolutionizing-document-management-2025" element={<BlogPostOCRRevolution2025 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
