import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

// Dynamic Icon loader helper
const SkillIcon = ({ name, size = 20, ...props }) => {
  const IconComponent = Icons[name] || Icons.Code;
  return <IconComponent size={size} {...props} />;
};

const fallbackSkills = [
  // Frontend
  { name: "HTML5", category: "Frontend", icon_name: "FileCode" },
  { name: "CSS3", category: "Frontend", icon_name: "Palette" },
  { name: "Bootstrap", category: "Frontend", icon_name: "Globe" },
  { name: "Tailwind CSS", category: "Frontend", icon_name: "Compass" },
  { name: "JavaScript (ES6+)", category: "Frontend", icon_name: "Code" },
  { name: "React.js", category: "Frontend", icon_name: "Layers" },
  { name: "Responsive Web Design", category: "Frontend", icon_name: "Monitor" },
  
  // Backend
  { name: "Node.js", category: "Backend", icon_name: "Cpu" },
  { name: "Express.js", category: "Backend", icon_name: "Server" },
  { name: "Python", category: "Backend", icon_name: "Cpu" },
  { name: "C++", category: "Backend", icon_name: "Code" },

  // Database
  { name: "SQLite", category: "Database", icon_name: "Database" },

  // Prompt Engineering
  { name: "Prompt Design", category: "Prompt Engineering", icon_name: "MessageSquare" },
  { name: "Prompt Optimization", category: "Prompt Engineering", icon_name: "Sliders" },
  { name: "Few-shot Prompting", category: "Prompt Engineering", icon_name: "Sparkles" },
  { name: "Zero-shot Prompting", category: "Prompt Engineering", icon_name: "Activity" },
  { name: "Role-based Prompting", category: "Prompt Engineering", icon_name: "UserCheck" },

  // Tools
  { name: "Git", category: "Tools", icon_name: "GitBranch" },
  { name: "GitHub", category: "Tools", icon_name: "Github" },
  { name: "REST APIs", category: "Tools", icon_name: "Activity" },
  { name: "VS Code", category: "Tools", icon_name: "AppWindow" },
  { name: "Postman", category: "Tools", icon_name: "Send" }
];

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('API error, falling back to local seed data', err);
        setSkills(fallbackSkills);
        setLoading(false);
      });
  }, []);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
    marginTop: '16px'
  };

  const cardStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '8px',
    position: 'relative',
    display: 'inline-block'
  };

  return (
    <section id="skills">
      <h2 style={titleStyles}>
        &lt; <span className="gradient-text">Skills</span> /&gt;
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1rem' }}>
        The technologies, languages, and frameworks in my current fullstack toolbelt.
      </p>

      {loading ? (
        <div style={{ color: 'var(--accent-primary)', textAlign: 'center', padding: '40px' }}>Loading Skills...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {Object.keys(categories).map(catName => (
            <div key={catName}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-primary)',
                marginBottom: '16px',
                borderLeft: '3px solid var(--accent-primary)',
                paddingLeft: '10px'
              }}>
                {catName}
              </h3>
              <div style={gridStyles}>
                {categories[catName].map((skill, idx) => (
                  <div key={idx} className="glass-panel" style={cardStyles}>
                    <div style={{
                      color: 'var(--accent-primary)',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <SkillIcon name={skill.icon_name} style={{ color: 'var(--accent-primary)' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>{skill.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
