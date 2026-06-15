import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './database/db.js';

import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import contactRouter from './routes/contact.js';
import educationRouter from './routes/education.js';
import certificationsRouter from './routes/certifications.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/education', educationRouter);
app.use('/api/certifications', certificationsRouter);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date() });
});

// Serve static assets from React client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// Fallback all other routes to React frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Initialize database then start server
async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database or start server:', error);
    process.exit(1);
  }
}

startServer();
