import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('default');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  const navStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    padding: isScrolled ? '16px 8%' : '24px 8%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: isScrolled ? 'var(--bg-glass)' : 'transparent',
    borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
    transition: 'all 0.3s ease',
  };

  const logoStyles = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  };

  const menuStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    listStyle: 'none',
  };

  const linkStyles = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  };

  const dropdownContainer = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-color)',
    padding: '8px 12px',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    cursor: 'pointer',
  };

  const selectStyles = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.85rem',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'var(--font-display)',
    fontWeight: '500',
  };

  return (
    <nav style={navStyles}>
      <a href="#hero" style={logoStyles}>
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>&lt;</span>
        Prakash Reddy
        <span style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>/&gt;</span>
      </a>

      <ul style={menuStyles}>
        <li><a href="#hero" style={linkStyles} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Home</a></li>
        <li><a href="#skills" style={linkStyles} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Skills</a></li>
        <li><a href="#projects" style={linkStyles} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Projects</a></li>
        <li><a href="#contact" style={linkStyles} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Contact</a></li>
        <li><a href="/prakash_resume.pdf" target="_blank" rel="noreferrer" style={linkStyles} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Resume</a></li>
        
        <li style={dropdownContainer}>
          <Palette size={16} style={{ color: 'var(--accent-primary)' }} />
          <select 
            value={theme} 
            onChange={(e) => changeTheme(e.target.value)} 
            style={selectStyles}
          >
            <option value="default" style={{background: '#090b11', color: '#fff'}}>Cyber Neon</option>
            <option value="ocean" style={{background: '#020f14', color: '#fff'}}>Deep Ocean</option>
            <option value="amber" style={{background: '#0e0d0f', color: '#fff'}}>Sunset Amber</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}
