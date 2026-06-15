import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import EducationCertifications from './components/EducationCertifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  return (
    <div style={containerStyles}>
      <Navbar />
      <Hero />
      <Skills />
      <EducationCertifications />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
