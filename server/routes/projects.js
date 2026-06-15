import express from 'express';
import { getDbConnection } from '../database/db.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const db = await getDbConnection();
    const projects = await db.all('SELECT * FROM projects');
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
