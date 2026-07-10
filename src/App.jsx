import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsSection from "./components/ProjectPreview";
import Blog from "./components/Blog";
import BlogPostPage from "./components/BlogPostPage";
import Footer from "./components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSection />
      <Blog />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="site-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;