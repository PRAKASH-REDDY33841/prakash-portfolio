import React, { useState, useEffect } from 'react';
import { ExternalLink, GitBranch, Terminal } from 'lucide-react';

const fallbackProjects = [
  {
    title: "Collaborative Canvas",
    description: "A collaborative drawing platform enabling multiple users to draw on a synchronized canvas in real-time, utilizing WebSockets and HTML5 Canvas API.",
    live_url: "https://collaborative-canvas-webapp.onrender.com/",
    github_url: "https://github.com/PRAKASH-REDDY33841/collaborative-canvas.git",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    category: "Fullstack"
  },
  {
    title: "Contact Display Webapp",
    description: "A fullstack application showcasing developer profiles and message lists, featuring dynamic REST endpoints, Express routes, and structured database queries.",
    live_url: "https://contact-display-app-v6ww.vercel.app/",
    github_url: "https://github.com/PRAKASH-REDDY33841/contact-display-app.git",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Fullstack"
  },
  {
    title: "Display Profiles Using API's",
    description: "A React.js application querying external user profile feeds, rendering them in organized Ant Design lists, with layout grid controls and client search filters.",
    live_url: "https://displaying-profile-using-api-and-an.vercel.app",
    github_url: "https://github.com/PRAKASH-REDDY33841/Displaying-Profile-Using-API-and-AntDesign-library-React.js.git",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "React.js / Frontend"
  },
  {
    title: "Emoji Game",
    description: "Developed a responsive React-based memory application with dynamic state management. Implemented randomization logic and conditional rendering for win/loss handling.",
    live_url: "https://emojisgame11.ccbp.tech",
    github_url: "https://github.com/PRAKASH-REDDY33841",
    image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    category: "React.js / Frontend"
  },
  {
    title: "Sports Vision Trainer Web Application",
    description: "Developed an interactive sports vision training web application using HTML, CSS, and JavaScript. Implemented dynamic visual exercises and timer-based challenges to improve reaction speed and focus.",
    live_url: "https://sports-vision-trainer-web-application.onrender.com",
    github_url: "https://github.com/PRAKASH-REDDY33841/sports-vision-trainer-web-application.git",
    image_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Todos Application",
    description: "A responsive, feature-rich task management application utilizing local storage persistence, category sorting, search filtering, and custom animations.",
    live_url: "https://todos-application-using-js.onrender.com",
    github_url: "https://github.com/PRAKASH-REDDY33841/Todos-Application-using-js.git",
    image_url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Wiki Quiz App",
    description: "An interactive quiz dashboard querying dynamic educational questions, incorporating user scoring systems, detailed breakdown analytics, and custom timer controls.",
    live_url: "https://wiki-quiz-frontend-app.onrender.com",
    github_url: "https://github.com/PRAKASH-REDDY33841/wiki-quiz-app.git",
    image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Wikipedia Search Application",
    description: "Built a Wikipedia search interface using JavaScript Fetch API and REST services. Designed responsive UI with Bootstrap and custom CSS. Integrated asynchronous API requests.",
    live_url: "https://wikepediaweb1.ccbp.tech",
    github_url: "https://github.com/PRAKASH-REDDY33841",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Tip Calculator",
    description: "A clean utility app calculating billing tip percentages, custom splits per person, and cash distributions, featuring interactive range inputs and validation.",
    live_url: "https://tip-calculator-usin-git-22e516-prakash-reddys-projects-efb5fd32.vercel.app/",
    github_url: "https://github.com/PRAKASH-REDDY33841/Tip-Calculator-Using-Javascript.git",
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Color Picker",
    description: "An aesthetic utility tool for web designers to generate, display, and export custom HSL/RGB/HEX color palettes, featuring copy-to-clipboard actions.",
    live_url: "https://color-picker-using-javascript-basic.onrender.com/",
    github_url: "https://github.com/PRAKASH-REDDY33841/color-picker-using-javascript-basic-Fundamentals.git",
    image_url: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Guessing Game",
    description: "A game assessing binary search strategies. Prompts users to guess target numbers, providing reactive suggestions (higher/lower), scoring, and stats logs.",
    live_url: "https://guessing-game-javascript.onrender.com",
    github_url: "https://github.com/PRAKASH-REDDY33841/Guessing-Game-Javascript.git",
    image_url: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  },
  {
    title: "Bulb Switch Operator",
    description: "An interactive DOM event-handling demonstration utilizing custom click handlers, state toggling, and glowing SVG visuals.",
    live_url: "https://bulb-switch-project-javascript-dom-and.onrender.com",
    github_url: "https://github.com/PRAKASH-REDDY33841/bulb-switch-project-javascript-Dom-and-Event-Fundamentals.git",
    image_url: "https://images.unsplash.com/photo-1490623970972-ae8bb3da45e9?auto=format&fit=crop&w=800&q=80",
    category: "Frontend (HTML/CSS/JS)"
  }
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('API error, falling back to local projects data', err);
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  const filterCategories = ['All', 'Frontend (HTML/CSS/JS)', 'React.js / Frontend', 'Fullstack'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '30px',
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  };

  const imageContainer = {
    position: 'relative',
    height: '200px',
    width: '100%',
    overflow: 'hidden',
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  };

  const bodyStyles = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const footerStyles = {
    display: 'flex',
    gap: '12px',
    marginTop: 'auto',
    paddingTop: '20px',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    position: 'relative',
    display: 'inline-block'
  };

  const filterContainerStyles = {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '32px'
  };

  return (
    <section id="projects">
      <h2 style={titleStyles}>
        &lt; <span className="gradient-text">Projects</span> /&gt;
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1rem' }}>
        A selection of recent applications and open source tools I've engineered.
      </p>

      {/* Filter Tabs */}
      <div style={filterContainerStyles}>
        {filterCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`btn ${activeFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              border: activeFilter === cat ? 'none' : '1px solid var(--border-color)',
              background: activeFilter === cat ? 'var(--accent-gradient)' : 'transparent',
              color: activeFilter === cat ? '#090b11' : 'var(--text-secondary)',
              boxShadow: activeFilter === cat ? 'var(--neon-glow)' : 'none'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: 'var(--accent-primary)', textAlign: 'center', padding: '40px' }}>Loading Projects...</div>
      ) : (
        <div>
          {filteredProjects.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
              No projects added in this category yet.
            </div>
          ) : (
            <div style={gridStyles}>
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="glass-panel" style={cardStyles}
                     onMouseEnter={(e) => {
                       const img = e.currentTarget.querySelector('img');
                       if (img) img.style.transform = 'scale(1.08)';
                     }}
                     onMouseLeave={(e) => {
                       const img = e.currentTarget.querySelector('img');
                       if (img) img.style.transform = 'scale(1)';
                     }}
                >
                  <div style={imageContainer}>
                    <img src={project.image_url} alt={project.title} style={imageStyles} />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(9, 11, 17, 0.85)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--text-primary)',
                      fontWeight: '500'
                    }}>
                      <Terminal size={12} style={{ color: 'var(--accent-primary)' }} />
                      {project.category}
                    </div>
                  </div>

                  <div style={bodyStyles}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '10px'
                    }}>
                      {project.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '20px'
                    }}>
                      {project.description}
                    </p>

                    <div style={footerStyles}>
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Live Demo
                        <ExternalLink size={14} />
                      </a>
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        GitHub
                        <GitBranch size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
