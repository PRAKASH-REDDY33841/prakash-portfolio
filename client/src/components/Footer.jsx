import React from 'react';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const footerStyles = {
    borderTop: '1px solid var(--border-color)',
    background: 'rgba(9, 11, 17, 0.8)',
    padding: '40px 8%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
    marginTop: '60px',
  };

  const socialContainer = {
    display: 'flex',
    gap: '16px',
  };

  const iconStyles = {
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <footer style={footerStyles}>
      <div style={socialContainer}>
        <a href="https://github.com/PRAKASH-REDDY33841" target="_blank" rel="noreferrer" style={iconStyles} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <Github size={20} />
        </a>
        <a href="https://linkedin.com/in/prakashreddyr" target="_blank" rel="noreferrer" style={iconStyles} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <Linkedin size={20} />
        </a>
        <a href="https://www.instagram.com/prakash_reddy___1?igsh=MTZybXJpMm1lN3VrZg==" target="_blank" rel="noreferrer" style={iconStyles} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <Instagram size={20} />
        </a>
        <a href="mailto:prakash33841@gmail.com" style={iconStyles} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <Mail size={20} />
        </a>
      </div>

      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} Prakash Reddy. All rights reserved.</p>
        <p style={{ marginTop: '4px' }}>
          Designed & Engineered with React, Express, & SQLite.
        </p>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.color = 'var(--accent-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
