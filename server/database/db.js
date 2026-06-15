import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'database.sqlite');

let db = null;

export async function getDbConnection() {
  if (db) return db;

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  return db;
}

export async function initDb() {
  const connection = await getDbConnection();

  // Re-seed projects and tables with actual URLs and names
  await connection.exec('DROP TABLE IF EXISTS projects');
  await connection.exec('DROP TABLE IF EXISTS skills');
  await connection.exec('DROP TABLE IF EXISTS education');
  await connection.exec('DROP TABLE IF EXISTS certifications');

  // Create Projects Table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      live_url TEXT,
      github_url TEXT,
      image_url TEXT,
      category TEXT NOT NULL
    )
  `);

  // Create Skills Table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      icon_name TEXT NOT NULL
    )
  `);

  // Create Education Table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      duration TEXT NOT NULL,
      details TEXT
    )
  `);

  // Create Certifications Table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      issuer TEXT NOT NULL,
      date TEXT,
      link TEXT
    )
  `);

  // Create Messages Table
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_name TEXT NOT NULL,
      sender_email TEXT NOT NULL,
      message_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed Actual Projects
  const defaultProjects = [
    // Fullstack Projects
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
    
    // React.js / Frontend
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

    // Frontend (HTML/CSS/JS)
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

  for (const project of defaultProjects) {
    await connection.run(
      'INSERT INTO projects (title, description, live_url, github_url, image_url, category) VALUES (?, ?, ?, ?, ?, ?)',
      [project.title, project.description, project.live_url, project.github_url, project.image_url, project.category]
    );
  }

  // Seed Resume Skills (No new skills added)
  const defaultSkills = [
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

  for (const skill of defaultSkills) {
    await connection.run(
      'INSERT INTO skills (name, category, icon_name) VALUES (?, ?, ?)',
      [skill.name, skill.category, skill.icon_name]
    );
  }

  // Seed Education
  const defaultEducation = [
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

  for (const edu of defaultEducation) {
    await connection.run(
      'INSERT INTO education (institution, degree, duration, details) VALUES (?, ?, ?, ?)',
      [edu.institution, edu.degree, edu.duration, edu.details]
    );
  }

  // Seed Certifications
  const defaultCertifications = [
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

  for (const cert of defaultCertifications) {
    await connection.run(
      'INSERT INTO certifications (name, issuer, date, link) VALUES (?, ?, ?, ?)',
      [cert.name, cert.issuer, cert.date, cert.link]
    );
  }

  console.log("SQLite Database initialized and seeded with Prakash's custom project URLs and skills successfully.");
}
