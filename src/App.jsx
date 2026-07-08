import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsSection from "./components/ProjectPreview";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <Hero />
      <About />
      <ProjectsSection />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;
