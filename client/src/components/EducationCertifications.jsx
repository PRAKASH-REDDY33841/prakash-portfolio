import React, { useState, useEffect } from 'react';
import { BookOpen, Award, Calendar, ArrowUpRight } from 'lucide-react';

const fallbackEdu = [
  {
    institution: "Saveetha Institute of Medical and Technical Sciences, Thandalam",
    degree: "Bachelor of Technology in Computer Science and Engineering (CSE)",
    duration: "2022 – 2026",
    details: "CGPA: 8.1 / 10"
  },
  {
    institution: "NxtWave Disruptive Technologies",
    degree: "Industry Ready Certification in Full Stack Development",
    duration: "Jul 2023 – Present",
    details: "Comprehensive MERN fullstack application development training."
  },
  {
    institution: "Sri Shiridi Sai Junior College, Annamayya",
    degree: "Intermediate (MPC)",
    duration: "2020 – 2022",
    details: "CGPA: 7.9 / 10"
  },
  {
    institution: "Silver Bells English Medium High School, Annamayya",
    degree: "Secondary School Certificate (SSC)",
    duration: "2019 – 2020",
    details: "CGPA: 10.0 / 10"
  }
];

const fallbackCert = [
  {
    name: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle",
    date: "2024",
    link: "https://education.oracle.com/"
  },
  {
    name: "Build a Static Website",
    issuer: "NxtWave / NxtWave Academy",
    date: "2023",
    link: "/certifications/static_website.pdf"
  },
  {
    name: "Build a Responsive Website",
    issuer: "NxtWave / NxtWave Academy",
    date: "2023",
    link: "/certifications/responsive-website.pdf"
  },
  {
    name: "JavaScript Essentials",
    issuer: "NxtWave / NxtWave Academy",
    date: "2023",
    link: "/certifications/Javascript.pdf"
  },
  {
    name: "JS Essentials",
    issuer: "NxtWave / NxtWave Academy",
    date: "2023",
    link: "/certifications/js-essentials.pdf"
  },
  {
    name: "CSS Flexbox",
    issuer: "NxtWave / NxtWave Academy",
    date: "2023",
    link: "/certifications/flex-box.pdf"
  }
];

export default function EducationCertifications() {
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/education').then(res => res.json()),
      fetch('/api/certifications').then(res => res.json())
    ])
      .then(([eduData, certData]) => {
        setEducation(eduData);
        setCertifications(certData);
        setLoading(false);
      })
      .catch(err => {
        console.warn('API error, falling back to local resume data', err);
        setEducation(fallbackEdu);
        setCertifications(fallbackCert);
        setLoading(false);
      });
  }, []);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '20px'
  };

  const itemStyles = {
    padding: '24px',
    marginBottom: '20px',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    position: 'relative'
  };

  return (
    <section id="education">
      <div style={gridStyles}>
        {/* Education Section */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={24} style={{ color: 'var(--accent-primary)' }} />
            Education
          </h2>
          {loading ? (
            <div style={{ color: 'var(--accent-primary)' }}>Loading Education...</div>
          ) : (
            education.map((edu, idx) => (
              <div key={idx} className="glass-panel" style={itemStyles}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', maxWidth: '80%' }}>
                    {edu.institution}
                  </h3>
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--accent-primary)',
                    background: 'rgba(0, 242, 254, 0.08)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '500'
                  }}>
                    <Calendar size={12} />
                    {edu.duration}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '6px' }}>
                  {edu.degree}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {edu.details}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Certifications Section */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} style={{ color: 'var(--accent-primary)' }} />
            Certifications
          </h2>
          {loading ? (
            <div style={{ color: 'var(--accent-primary)' }}>Loading Certifications...</div>
          ) : (
            certifications.map((cert, idx) => (
              <div key={idx} className="glass-panel" style={{ ...itemStyles, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {cert.name}
                    </h3>
                    <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {cert.issuer}
                  </h4>
                </div>
                <span style={{
                  alignSelf: 'flex-start',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Calendar size={12} />
                  Issued: {cert.date}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
