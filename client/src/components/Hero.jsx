import React from 'react';
import { ArrowRight, Sparkles, FileText } from 'lucide-react';

export default function Hero() {
  const containerStyles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-color)',
    padding: '6px 16px',
    borderRadius: '100px',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--accent-primary)',
    marginBottom: '24px',
    fontFamily: 'var(--font-display)',
  };

  const titleStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    lineHeight: '1.1',
    fontWeight: '800',
    marginBottom: '20px',
    letterSpacing: '-0.03em',
  };

  const subheadStyles = {
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    marginBottom: '40px',
    fontWeight: '400',
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  };

  return (
    <section id="hero" className="animate-fade-in">
      {/* Background glow blobs */}
      <div className="glow-blob" style={{ top: '-10%', right: '10%' }}></div>
      <div className="glow-blob" style={{ bottom: '-10%', left: '-10%', background: 'rgba(79, 172, 254, 0.12)' }}></div>

      <div style={badgeStyles}>
        <Sparkles size={14} />
        <span>Ramireddy Gnana Prakash Reddy</span>
      </div>

      <h1 style={titleStyles}>
        Hi, I am <span className="gradient-text">Prakash Reddy</span> <br />
        Fullstack Software <br />
        Engineer
      </h1>

      <p style={subheadStyles}>
        Specializing in responsive web design, Express APIs, SQLite database configurations, and dynamic React frontends.
      </p>

      <div style={buttonGroupStyles}>
        <a href="#projects" className="btn btn-primary">
          Explore Projects
          <ArrowRight size={16} />
        </a>
        <a href="/prakash_resume.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary">
          <FileText size={16} style={{ color: 'var(--accent-primary)' }} />
          View Resume
        </a>
        <a href="#contact" className="btn btn-secondary">
          Get in Touch
        </a>
      </div>
    </section>
  );
}
