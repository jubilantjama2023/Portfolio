import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsSection from "./components/ProjectPreview"

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <ProjectsSection/>
      
    </div>
  );
}

export default App;